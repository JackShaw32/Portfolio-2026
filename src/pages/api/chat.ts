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
import { getToolsDefinition }                          from '../../ai/tools';
import { pipeStreamToController }                      from '../../ai/streamPipeline';
import { FALLBACK_MODEL }               from '../../ai/model';

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
  const toolsDefinition = getToolsDefinition(safeLang);

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
    ? '\n\n⚡ LANGUAGE LOCK: This session is in ENGLISH. EVERY response MUST be in English — even for math, greetings, or short answers. Example: "2+2=4. Want to know about Eduardo\'s profile?" NOT "¿Querés saber?". No Spanish. Zero exceptions.'
    : '\n\n⚡ IDIOMA LOCK: Esta sesión es en ESPAÑOL RIOPLATENSE. TODA respuesta debe ser en español con "vos". Ejemplo: "2+2=4. ¿Querés saber algo sobre el perfil de Eduardo?". Sin excepciones.';

  const safeSection  = typeof pageContext === 'string' && VALID_SECTIONS.has(pageContext) ? pageContext : null;
  const isProjectPage = safeSection && ['uncuartodemilla', 'expresoomega'].includes(safeSection);
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

  const systemPrompt = BASE_PROMPT + pageContextStr + LANG_INSTRUCTION + langLock;

  function buildPrepareStep(opts: {
    forcedTool: string | null;
    multiProject: boolean;
    isSendMsg: boolean;
    isDataCollectionTurn: boolean;
    isContactMessageStep: boolean;
  }) {
    return ({ stepNumber }: { stepNumber: number }) => {
      if (opts.multiProject) {
        if (stepNumber >= 3) return { toolChoice: 'none' as const, activeTools: [] as any };
        return { toolChoice: 'auto' as const };
      }
      if (stepNumber === 0 && opts.isSendMsg) {
        return { toolChoice: 'none' as const };
      }
      if (stepNumber === 0 && opts.isDataCollectionTurn) {
        return { toolChoice: 'none' as const };
      }
      if (stepNumber === 0 && opts.isContactMessageStep) {
        return {
          toolChoice: { type: 'tool', toolName: 'sendContactForm' } as any,
          activeTools: ['sendContactForm'] as any,
        };
      }
      if (stepNumber === 0 && opts.forcedTool) {
        return {
          toolChoice: { type: 'tool', toolName: opts.forcedTool } as any,
          activeTools: [opts.forcedTool] as any,
        };
      }
      if (stepNumber >= 1) return { toolChoice: 'none' as const, activeTools: [] as any };
      return { toolChoice: 'none' as const };
    };
  }

  const stepOpts = { forcedTool, multiProject, isSendMsg, isDataCollectionTurn, isContactMessageStep };

  const encoderForStream = encoder;

  function buildStreamResponse(
    result: Awaited<ReturnType<typeof streamText<any>>>,
    tools?: typeof toolsDefinition,
  ) {
    return new ReadableStream({
      async start(controller) {
        let toolCallsEmitted = 0;
        try {
          await pipeStreamToController(
            result, controller, encoderForStream, tools,
            () => { toolCallsEmitted++; },
          );
        } catch (streamErr) {
          console.error('[EduBot] Stream error:', (streamErr as any)?.message);
          const isRateLimit = (streamErr as any)?.statusCode === 429 ||
                              String((streamErr as any)?.message).includes('Rate limit') ||
                              String((streamErr as any)?.message).includes('rate_limit');

          if (isRateLimit) {
            markKeyCooldown(getKeyIdx(), streamErr);
            rotateKey();
          }

          const finalMsg = isRateLimit ? rateLimitMessage : errorMessage;
          controller.enqueue(encoder.encode(`0:${JSON.stringify(finalMsg)}\n`));
        } finally {
          controller.close();
        }
      }
    });
  }

  function streamResponseHeaders() {
    return { 'Content-Type': 'text/plain; charset=utf-8', 'x-vercel-ai-data-stream': 'v1' };
  }

  if (forcedTool && !multiProject) {
    const toolName = forcedTool;
    const tool = (activeTools as any)[toolName];
    if (tool?.execute) {
      try {
        let toolArgs: Record<string, unknown> = {};
        if (isContactMessageStep) {
          const nameMatch = lastQuestion?.match(/(?:soy|me llamo|mi nombre es|I am|my name is|I'm)\s+([A-ZÁ-Úa-zá-ú]+)/i);
          const emailMatch = lastQuestion?.match(/[\w.-]+@[\w.-]+\.\w+/);
          const msgContent = lastQuestion?.replace(/[\w.-]+@[\w.-]+\.\w+/g, '').replace(/(?:soy|me llamo|mi nombre es|I am|my name is|I'm)\s+[A-ZÁ-Úa-zá-ú]+/gi, '').trim();
          toolArgs = {
            name: nameMatch?.[1] ?? 'Usuario',
            email: emailMatch?.[0] ?? 'user@example.com',
            message: msgContent ?? lastQuestion ?? '',
          };
        }

        const toolCallId = `forced_${Date.now()}`;
        const toolResult = await tool.execute(toolArgs);

        const toolCallEvent = `9:${JSON.stringify({ toolCallId, toolName, args: toolArgs })}\n`;
        const toolResultEvent = `a:${JSON.stringify({ toolCallId, result: toolResult })}\n`;

        const stream = new ReadableStream({
          async start(controller) {
            controller.enqueue(encoder.encode(toolCallEvent));
            controller.enqueue(encoder.encode(toolResultEvent));
            controller.close();
          }
        });

        return new Response(stream, { headers: streamResponseHeaders() });

      } catch (toolErr) {
        console.error('[EduBot] Tool execution error:', toolErr);
        return new Response(errorStream(errorMessage), { headers: streamResponseHeaders() });
      }
    }
  }

  try {
    const result = await streamText({
      model:      getGroq()(FALLBACK_MODEL),
      system:     systemPrompt,
      messages:   trimmedMessages,
      tools:      activeTools as typeof toolsDefinition,
      toolChoice: 'auto',
      stopWhen:   stepCountIs(multiProject ? 5 : 2),
      maxOutputTokens:  600,
      maxRetries: 2,
      temperature: 0.3,
      onError: ({ error }) => {
        console.error('[EduBot] streamText onError:', error);
      },
      prepareStep: buildPrepareStep(stepOpts),
    });

    return new Response(buildStreamResponse(result, activeTools as typeof toolsDefinition), {
      headers: streamResponseHeaders(),
    });

  } catch (err: any) {
    console.error('[EduBot] Error:', err?.message);
    return new Response(errorStream(errorMessage), {
      headers: streamResponseHeaders(),
    });
  }
};
