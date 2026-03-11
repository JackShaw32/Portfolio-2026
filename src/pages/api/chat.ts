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

// Prevents Vercel from killing long streams
export const maxDuration = 30;
export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
             request.headers.get('x-real-ip') || '0.0.0.0';

  // -- Rate limit --
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return new Response(JSON.stringify({ error: rateCheck.reason }), {
      status: 429, headers: { 'Content-Type': 'application/json' }
    });
  }

  // ── API key pool ──
  if (groqKeyPool.length === 0) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }

  // -- Parse body --
  let messages: any[], language: string, pageContext: unknown;
  try {
    ({ messages, language, pageContext } = await request.json());
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }

  // -- Validar idioma --
  const safeLang = language === 'en' ? 'en' : 'es';

  // -- Validar y sanitizar mensajes --
  const msgCheck = validateMessages(messages);
  if (!msgCheck.valid) {
    return new Response(JSON.stringify({ error: 'Mensaje inválido.' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }

  // -- Solo roles user/assistant � filtrar cualquier otra cosa --
  // IMPORTANT: do NOT filter out empty assistant messages � they represent tool-only
  // turns and removing them creates consecutive user messages that Groq rejects.
  const rawMessages = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .slice(-LIMITS.MAX_HISTORY)
    .map(m => ({
      role:    m.role as 'user' | 'assistant',
      content: typeof m.content === 'string'
        ? (m.content.trim().length > 0 ? m.content.slice(0, LIMITS.MAX_MSG_LENGTH) : '[visual response]')
        : String(m.content).slice(0, LIMITS.MAX_MSG_LENGTH),
    }));

  // Deduplicate: collapse consecutive same-role messages by keeping the last one.
  // This is a safety net in case the frontend sends malformed history.
  const trimmedMessages: { role: 'user' | 'assistant'; content: string }[] = [];
  for (const msg of rawMessages) {
    if (trimmedMessages.length > 0 && trimmedMessages[trimmedMessages.length - 1].role === msg.role) {
      // Replace the previous same-role message with the current (more recent) one
      trimmedMessages[trimmedMessages.length - 1] = msg;
    } else {
      trimmedMessages.push(msg);
    }
  }

  const errorMessage    = safeLang === 'en' ? ERROR_EN : ERROR_ES;
  const rateLimitMessage = safeLang === 'en'
    ? '⚠️ The assistant is temporarily busy. Please wait a few seconds and try again.'
    : '⚠️ El asistente está ocupado en este momento. Esperá unos segundos y volvé a intentarlo.';
  // Hard language lock — appended after LANG_INSTRUCTION so the model has no ambiguity.
  // LANG_INSTRUCTION handles auto-detect as a base; this overrides with the UI setting.
  const langLock = safeLang === 'en'
    ? '\n\n⚡ LANGUAGE LOCK: This session is in ENGLISH. Every single response MUST be in English. No Spanish. No exceptions.'
    : '\n\n⚡ IDIOMA LOCK: Esta sesión es en ESPAÑOL RIOPLATENSE. Respondé TODO en español con "vos". Sin excepciones.';

  // -- Page context injection (optional, whitelist-validated) --
  const safeSection  = typeof pageContext === 'string' && VALID_SECTIONS.has(pageContext) ? pageContext : null;
  const isProjectPage = safeSection && ['uncuartodemilla', 'expresoomega', 'alfyvivi'].includes(safeSection);
  const pageContextStr = safeSection
    ? isProjectPage
      ? `\nUSER CONTEXT: The user is currently on the ${SECTION_LABELS[safeSection]}. When they say "mostrame el proyecto" / "show me the project" without specifying which one, they mean THIS project (${safeSection}). Show ONLY this project's card.\n`
      : `\nUSER CONTEXT: The user is currently viewing the "${SECTION_LABELS[safeSection]}" of the portfolio.\n`
    : '';

  // -- Analytics --
  const lastQuestion = trimmedMessages.at(-1)?.content;
  if (lastQuestion) {
    logInteraction({
      ip:       ip.slice(0, 8) + '****',
      question: lastQuestion.slice(0, 100),
      lang:     safeLang,
      date:     new Date().toISOString(),
    });
  }

  // -- Detect show intent to force tool usage --
  const forcedTool     = lastQuestion ? detectForcedTool(lastQuestion) : null;
  const multiProject   = forcedTool === 'showProject' && !!lastQuestion && wantsAllProjects(lastQuestion);
  // When user opens the contact flow ("I want to send a message"), block ALL tools on step 0
  // so the model cannot call sendContactForm with invented placeholder data.
  // On subsequent turns the message won't match this pattern and tools re-enable normally.
  const isSendMsg      = lastQuestion ? isSendMessageIntent(lastQuestion) : false;

  // -- Guard: if sendContactForm already succeeded in this conversation, remove it
  // from the available tools so the LLM cannot call it again.
  const contactFormAlreadySent = trimmedMessages.some(
    m => m.role === 'assistant' && m.content.includes('sendContactForm was already called and succeeded')
  );
  const activeTools = contactFormAlreadySent
    ? (Object.keys(toolsDefinition) as (keyof typeof toolsDefinition)[])
        .filter(k => k !== 'sendContactForm')
        .reduce((acc, k) => ({ ...acc, [k]: toolsDefinition[k] }), {} as Partial<typeof toolsDefinition>)
    : toolsDefinition;

  const encoder = new TextEncoder();

  // Pick an available key from the pool (skips rate-limited keys)
  const primaryKeySlot = getAvailableGroq();
  const groq = primaryKeySlot?.groq ?? createGroq({ apiKey: groqKeyPool[0] });
  let   currentKeyIndex = primaryKeySlot?.index ?? 0;

  // Helper: try to get a fresh key when current one is rate-limited
  function rotateKey(): boolean {
    const slot = getAvailableGroq();
    if (!slot) return false;
    // reassign via closure mutation isn’t possible, so we use a wrapper object
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

  // 1?? PRIMARIO — llama-3.1-8b-instant (fast ~80-200ms)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // Block all tools on step 0 for send-message intent — model must ask for name first.
  // Note: keep tool schemas in context (no activeTools: []) so the model doesn't get
  // confused and return an empty response on some LLM backends (e.g. Groq/8b + English).
  if (stepNumber === 0 && isSendMsg) {
    return { toolChoice: 'none' as const };
  }

  // -- Step 0: force whichever tool was detected --
  // This guarantees the card always appears for explicit show-intents,
  // and prevents the model from replacing a tool call with plain text.
  if (stepNumber === 0 && forcedTool) {
    return {
      toolChoice: { type: 'tool', toolName: forcedTool } as any,
      activeTools: [forcedTool] as any,
    };
  }

  // -- Step 1+: text-only follow-up, no more tool calls --
  // activeTools:[] removes tool schemas from the prompt, saving ~500-1000 tokens
  // (tool_choice:'none' alone still sends all tool definitions to the API)
  if (stepNumber >= 1) return { toolChoice: 'none', activeTools: [] as any };

  // -- No forced tool: model decides freely (text or tool) --
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
      // Key rotada disponible — reintentar con 8b (rápido, sin degradar a 70b)
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
    // Reintent� sin forzar tool � modelo m�s capaz para recuperar tool calling
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

  // 2?? FALLBACK � llama-3.3-70b-versatile (m�s capaz cuando 8b falla)
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

  // ?? STREAM AL CLIENTE
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
        // Always use 70b for non-rate-limit errors (reliability > speed).
        // For rate limits: if a fresh key is available, 8b is faster; otherwise 70b
        // has a separate TPM bucket and might still respond.
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
        // Can only show tools in emergency if:
        // 1. No cards were emitted yet (avoid duplicates)
        // 2. A specific tool was forced (text-only intents like send-message must stay text-only)
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
              // Mirror primary prepareStep: force tool on step 0 only, then text-only
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
