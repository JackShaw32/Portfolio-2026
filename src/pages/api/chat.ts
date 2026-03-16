import { createGroq } from '@ai-sdk/groq';
import { streamText, stepCountIs } from 'ai';
import type { APIRoute } from 'astro';
import { BASE_PROMPT, ERROR_ES, ERROR_EN, LANG_INSTRUCTION } from './prompt';
import { SECTION_LABELS, VALID_SECTIONS }              from '../../config/pageContext';
import { groqKeyPool, getAvailableGroq, markKeyCooldown } from '../../services/groqKeyPool';
import { LIMITS, checkRateLimit }                      from '../../security/rateLimit';
import { validateMessages }                            from '../../security/sanitize';
import { logInteraction }                              from '../../analytics/interactionLogger';
import { detectForcedTool, wantsAllProjects, isSendMessageIntent } from '../../ai/intentDetection';
import { toolsDefinition }                             from '../../ai/tools';
import { pipeStreamToController }                      from '../../ai/streamPipeline';
import { PRIMARY_MODEL, FALLBACK_MODEL }               from '../../ai/model';

export const maxDuration = 30;
export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
             request.headers.get('x-real-ip') || '0.0.0.0';

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return new Response(JSON.stringify({ error: rateCheck.reason }), {
      status: 429, headers: { 'Content-Type': 'application/json' }
    });
  }

  if (groqKeyPool.length === 0) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }

  let messages: any[], language: string, pageContext: unknown;
  try {
    ({ messages, language, pageContext } = await request.json());
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }

  const safeLang = language === 'en' ? 'en' : 'es';

  const msgCheck = validateMessages(messages);
  if (!msgCheck.valid) {
    return new Response(JSON.stringify({ error: 'Mensaje inválido.' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }

  const rawMessages = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .slice(-LIMITS.MAX_HISTORY)
    .map(m => ({
      role:    m.role as 'user' | 'assistant',
      content: typeof m.content === 'string'
        ? (m.content.trim().length > 0 ? m.content.slice(0, LIMITS.MAX_MSG_LENGTH) : '[visual response]')
        : String(m.content).slice(0, LIMITS.MAX_MSG_LENGTH),
    }));

  const trimmedMessages: { role: 'user' | 'assistant'; content: string }[] = [];
  for (const msg of rawMessages) {
    if (trimmedMessages.length > 0 && trimmedMessages[trimmedMessages.length - 1].role === msg.role) {
      trimmedMessages[trimmedMessages.length - 1] = msg;
    } else {
      trimmedMessages.push(msg);
    }
  }

  const errorMessage    = safeLang === 'en' ? ERROR_EN : ERROR_ES;
  const rateLimitMessage = safeLang === 'en'
    ? '⚠️ The assistant is temporarily busy. Please wait a few seconds and try again.'
    : '⚠️ El asistente está ocupado en este momento. Esperá unos segundos y volvé a intentarlo.';
  const langLock = safeLang === 'en'
    ? '\n\n⚡ LANGUAGE LOCK: This session is in ENGLISH. Every single response MUST be in English. No Spanish. No exceptions.'
    : '\n\n⚡ IDIOMA LOCK: Esta sesión es en ESPAÑOL RIOPLATENSE. Respondé TODO en español con "vos". Sin excepciones.';

  const safeSection  = typeof pageContext === 'string' && VALID_SECTIONS.has(pageContext) ? pageContext : null;
  const isProjectPage = safeSection && ['uncuartodemilla', 'expresoomega', 'alfyvivi'].includes(safeSection);
  const pageContextStr = safeSection
    ? isProjectPage
      ? `\nUSER CONTEXT: The user is currently on the ${SECTION_LABELS[safeSection]}. When they say "mostrame el proyecto" / "show me the project" without specifying which one, they mean THIS project (${safeSection}). Show ONLY this project's card.\n`
      : `\nUSER CONTEXT: The user is currently viewing the "${SECTION_LABELS[safeSection]}" of the portfolio.\n`
    : '';

  const lastQuestion = trimmedMessages.at(-1)?.content;
  if (lastQuestion) {
    logInteraction({
      ip:       ip.slice(0, 8) + '****',
      question: lastQuestion.slice(0, 100),
      lang:     safeLang,
      date:     new Date().toISOString(),
    });
  }

  const forcedTool     = lastQuestion ? detectForcedTool(lastQuestion) : null;
  const multiProject   = forcedTool === 'showProject' && !!lastQuestion && wantsAllProjects(lastQuestion);
  const isSendMsg      = lastQuestion ? isSendMessageIntent(lastQuestion) : false;

  const isDataCollectionTurn =
    !!lastQuestion &&
    !isSendMsg &&
    !forcedTool &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lastQuestion.trim());

  const contactFormAlreadySent = trimmedMessages.some(
    m => m.role === 'assistant' && m.content.includes('sendContactForm was already called and succeeded')
  );
  const activeTools = contactFormAlreadySent
    ? (Object.keys(toolsDefinition) as (keyof typeof toolsDefinition)[])
        .filter(k => k !== 'sendContactForm')
        .reduce((acc, k) => ({ ...acc, [k]: toolsDefinition[k] }), {} as Partial<typeof toolsDefinition>)
    : toolsDefinition;

  const prevUserMsgs = trimmedMessages.slice(0, -1).filter(m => m.role === 'user');
  const isContactMessageStep =
    !isSendMsg &&
    !forcedTool &&
    !isDataCollectionTurn &&
    !contactFormAlreadySent &&
    trimmedMessages.length >= 5 &&
    trimmedMessages.some(m => m.role === 'user' && isSendMessageIntent(m.content)) &&
    prevUserMsgs.some(m => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.content.trim())) &&
    !!lastQuestion &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lastQuestion.trim());

  const encoder = new TextEncoder();

  const primaryKeySlot = getAvailableGroq();
  const groq = primaryKeySlot?.groq ?? createGroq({ apiKey: groqKeyPool[0] });
  let   currentKeyIndex = primaryKeySlot?.index ?? 0;

  function rotateKey(): boolean {
    const slot = getAvailableGroq();
    if (!slot) return false;
    Object.assign(groqRef, { groq: slot.groq, index: slot.index });
    currentKeyIndex = slot.index;
    return true;
  }
  const groqRef = { groq, index: currentKeyIndex };
  const getGroq  = () => groqRef.groq;
  const getKeyIdx = () => groqRef.index;

  function errorStream(msg: string) {
    return new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`0:${JSON.stringify(msg)}\n`));
        controller.close();
      }
    });
  }

  let primaryResult: Awaited<ReturnType<typeof streamText<any>>> | null = null;
  let useFallback = false;

  try {
    primaryResult = await streamText({
      model:      getGroq()(PRIMARY_MODEL),
      system:     BASE_PROMPT + pageContextStr + LANG_INSTRUCTION + langLock,
      messages:   trimmedMessages,
      tools:      activeTools as typeof toolsDefinition,
      toolChoice: 'auto',
      stopWhen:   stepCountIs(5),
      maxOutputTokens:  600,
      maxRetries: 0,
      prepareStep: ({ stepNumber }) => {
  if (multiProject) {
    if (stepNumber >= 3) return { toolChoice: 'none', activeTools: [] as any };
    return { toolChoice: 'auto' };
  }

  if (stepNumber === 0 && isSendMsg) {
    return { toolChoice: 'none' as const };
  }

  if (stepNumber === 0 && isDataCollectionTurn) {
    return { toolChoice: 'none' as const };
  }

  if (stepNumber === 0 && isContactMessageStep) {
    return {
      toolChoice: { type: 'tool', toolName: 'sendContactForm' } as any,
      activeTools: ['sendContactForm'] as any,
    };
  }

  if (stepNumber === 0 && forcedTool) {
    return {
      toolChoice: { type: 'tool', toolName: forcedTool } as any,
      activeTools: [forcedTool] as any,
    };
  }

  if (stepNumber >= 1) return { toolChoice: 'none', activeTools: [] as any };

  return { toolChoice: 'auto' };
},
    });
  } catch (primaryErr: any) {
  const errMsg = primaryErr?.message ?? primaryErr?.data?.error?.message ?? '';
  const isRateLimitErr = primaryErr?.statusCode === 429 ||
                         errMsg.includes('Rate limit') ||
                         errMsg.includes('rate_limit');
  const isFunctionFail = errMsg.includes('Failed to call a function') ||
                         errMsg.includes('failed_generation') ||
                         errMsg.includes('invalid_request_error');

  if (isRateLimitErr) {
    markKeyCooldown(getKeyIdx(), primaryErr);
    const rotated = rotateKey();
    if (rotated) {
      console.warn('[EduBot] 8b rate limited → rotated key, retrying 8b');
      try {
        primaryResult = await streamText({
          model:      getGroq()(PRIMARY_MODEL),
          system:     BASE_PROMPT + pageContextStr + LANG_INSTRUCTION + langLock,
          messages:   trimmedMessages,
          tools:      activeTools as typeof toolsDefinition,
          toolChoice: 'auto',
          stopWhen:   stepCountIs(5),
          maxOutputTokens:  600,
          maxRetries: 0,
          prepareStep: ({ stepNumber }) => {
            if (multiProject) {
              if (stepNumber >= 3) return { toolChoice: 'none', activeTools: [] as any };
              return { toolChoice: 'auto' };
            }
            if (stepNumber === 0 && isSendMsg) {
              return { toolChoice: 'none' as const };
            }
            if (stepNumber === 0 && isDataCollectionTurn) {
              return { toolChoice: 'none' as const };
            }
            if (stepNumber === 0 && isContactMessageStep) {
              return { toolChoice: { type: 'tool', toolName: 'sendContactForm' } as any, activeTools: ['sendContactForm'] as any };
            }
            if (stepNumber === 0 && forcedTool) {
              return { toolChoice: { type: 'tool', toolName: forcedTool } as any, activeTools: [forcedTool] as any };
            }
            if (stepNumber >= 1) return { toolChoice: 'none', activeTools: [] as any };
            return { toolChoice: 'auto' };
          },
        });
      } catch (retryErr: any) {
        const retryIsRL = retryErr?.statusCode === 429 ||
          String(retryErr?.message).includes('Rate limit') || String(retryErr?.message).includes('rate_limit');
        if (retryIsRL) markKeyCooldown(getKeyIdx(), retryErr);
        console.warn('[EduBot] Rotated key also failed → fallback 70b');
        useFallback = true;
      }
    } else {
      console.warn('[EduBot] 8b rate limited, no keys available → fallback 70b');
      useFallback = true;
    }
  } else if (isFunctionFail) {
    console.warn('[EduBot] Function call failed, retrying with 70b...');
    try {
      primaryResult = await streamText({
        model:      getGroq()(FALLBACK_MODEL),
        system:     BASE_PROMPT + pageContextStr + LANG_INSTRUCTION + langLock,
        messages:   trimmedMessages,
        tools:      activeTools as typeof toolsDefinition,
        toolChoice: 'auto',
        stopWhen:   stepCountIs(3),
        maxOutputTokens:  600,
        maxRetries: 0,
        prepareStep: ({ stepNumber }: { stepNumber: number }) => {
          if (stepNumber === 0 && forcedTool) {
            return {
              toolChoice: { type: 'tool', toolName: forcedTool } as any,
              activeTools: [forcedTool] as any,
            };
          }
          if (stepNumber === 0 && isContactMessageStep) {
            return { toolChoice: { type: 'tool', toolName: 'sendContactForm' } as any, activeTools: ['sendContactForm'] as any };
          }
          if (stepNumber >= 1) return { toolChoice: 'none', activeTools: [] as any };
          return { toolChoice: 'auto' };
        },
      });
    } catch (retryErr) {
      console.error('[EduBot] Retry also failed:', retryErr);
      useFallback = true;
    }
  } else {
    console.error('[EduBot] Primary model error:', primaryErr);
    useFallback = true;
  }
}

  if (useFallback) {
    try {
      const fallbackResult = await streamText({
        model:    getGroq()(FALLBACK_MODEL),
        system:   BASE_PROMPT + pageContextStr + LANG_INSTRUCTION + langLock,
        messages: trimmedMessages,
        maxOutputTokens: 600,
      });

      const stream = new ReadableStream({
        async start(controller) {
          try {
            await pipeStreamToController(fallbackResult, controller, encoder);
          } catch {
            controller.enqueue(encoder.encode(`0:${JSON.stringify(errorMessage)}\n`));
          } finally {
            controller.close();
          }
        }
      });

      return new Response(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'x-vercel-ai-data-stream': 'v1' }
      });

    } catch (fallbackErr) {
      console.error('[EduBot] Fallback error:', fallbackErr);
      return new Response(errorStream(errorMessage), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'x-vercel-ai-data-stream': 'v1' }
      });
    }
  }

  if (!primaryResult) {
    return new Response(errorStream(errorMessage), {
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'x-vercel-ai-data-stream': 'v1' }
    });
  }

  const captured = primaryResult;

  const stream = new ReadableStream({
    async start(controller) {
      let toolCallsEmitted = 0;
      try {
        await pipeStreamToController(
          captured, controller, encoder, activeTools as typeof toolsDefinition,
          () => { toolCallsEmitted++; },
        );
      } catch (streamErr) {
        console.error('[EduBot] Stream error ? fallback');
        const isRateLimit = (streamErr as any)?.statusCode === 429 ||
                            String((streamErr as any)?.message).includes('Rate limit') ||
                            String((streamErr as any)?.message).includes('rate_limit');

        let emergencyModel = FALLBACK_MODEL;
        if (isRateLimit) {
          markKeyCooldown(getKeyIdx(), streamErr);
          const rotated = rotateKey();
          if (rotated) {
            emergencyModel = PRIMARY_MODEL;
            console.warn('[EduBot] Stream rate limit → rotated key, emergency 8b');
          } else {
            console.warn('[EduBot] Stream rate limit → no keys, emergency 70b (separate TPM)');
          }
        } else {
          console.warn('[EduBot] Stream error → emergency 70b');
        }

        const emergencyCanShowTools = toolCallsEmitted === 0 && forcedTool !== null;
        try {
          const emergency = await streamText({
            model:      getGroq()(emergencyModel),
            system:     BASE_PROMPT + pageContextStr + LANG_INSTRUCTION,
            messages:   trimmedMessages,
            maxOutputTokens:  600,
            ...(emergencyCanShowTools ? {
              tools:    activeTools as typeof toolsDefinition,
              stopWhen: stepCountIs(multiProject ? 4 : 2),
              prepareStep: ({ stepNumber }: { stepNumber: number }) => {
                if (multiProject) {
                  if (stepNumber >= 3) return { toolChoice: 'none', activeTools: [] as any };
                  return { toolChoice: 'auto' };
                }
                if (stepNumber === 0 && forcedTool) {
                  return {
                    toolChoice: { type: 'tool', toolName: forcedTool } as any,
                    activeTools: [forcedTool] as any,
                  };
                }
                if (stepNumber >= 1) return { toolChoice: 'none', activeTools: [] as any };
                return { toolChoice: 'auto' };
              },
            } : {
              toolChoice: 'none' as const,
            }),
            maxRetries: 0,
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await pipeStreamToController(
            emergency as any, controller, encoder,
            emergencyCanShowTools ? activeTools as typeof toolsDefinition : undefined,
          );
        } catch (emergencyErr: any) {
          const emergencyIsRateLimit = (emergencyErr)?.statusCode === 429 ||
            String(emergencyErr?.message).includes('Rate limit') ||
            String(emergencyErr?.message).includes('rate_limit');
          const finalMsg = emergencyIsRateLimit ? rateLimitMessage : errorMessage;
          controller.enqueue(encoder.encode(`0:${JSON.stringify(finalMsg)}\n`));
        }
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'x-vercel-ai-data-stream': 'v1' },
  });
};
