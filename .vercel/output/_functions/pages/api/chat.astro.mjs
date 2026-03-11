import { createGroq } from '@ai-sdk/groq';
import { jsonSchema, streamText, stepCountIs } from 'ai';
import { B as BASE_PROMPT, L as LANG_INSTRUCTION_EN, a as LANG_INSTRUCTION_ES, E as ERROR_EN, b as ERROR_ES } from '../../chunks/prompt_CtxjbIgR.mjs';
import { s as sendEmail } from '../../chunks/sendEmail_t5E3o4V2.mjs';
export { renderers } from '../../renderers.mjs';

const SECTION_LABELS = {
  top: "Home / Hero section",
  skills: "Skills & Tech Stack section",
  projects: "Projects section",
  optimizations: "Optimizations & Performance section",
  about: "About Eduardo section",
  contact: "Contact section"
};
const VALID_SECTIONS = new Set(Object.keys(SECTION_LABELS));

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://jackshaw32.vercel.app", "SSR": true};
function buildKeyPool() {
  const keys = [];
  const single = "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";
  keys.push(single);
  for (let i = 1; i <= 19; i++) {
    const k = Object.assign(__vite_import_meta_env__, { GROQ_API_KEY: "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" })[`GROQ_API_KEY_${i}`];
    if (k && !keys.includes(k)) keys.push(k);
  }
  return keys;
}
const groqKeyPool = buildKeyPool();
const keyCooldownUntil = groqKeyPool.map(() => 0);
let keyPoolPointer = 0;
function getAvailableGroq() {
  const now = Date.now();
  for (let i = 0; i < groqKeyPool.length; i++) {
    const idx = (keyPoolPointer + i) % groqKeyPool.length;
    if (now >= keyCooldownUntil[idx]) {
      keyPoolPointer = (idx + 1) % groqKeyPool.length;
      return { groq: createGroq({ apiKey: groqKeyPool[idx] }), index: idx };
    }
  }
  return null;
}
function markKeyCooldown(index, err) {
  const seconds = err?.responseHeaders?.["retry-after"] ? Math.ceil(parseFloat(err.responseHeaders["retry-after"])) : 60;
  keyCooldownUntil[index] = Date.now() + seconds * 1e3;
  console.warn(`[EduBot] Key #${index + 1} rate-limited → cooldown ${seconds}s`);
}

const LIMITS = {
  PER_MINUTE: 5,
  PER_HOUR: 20,
  PER_DAY: 50,
  MAX_MSG_LENGTH: 500};
const ipStore = /* @__PURE__ */ new Map();
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipStore.entries()) {
    if (now > record.day.reset) ipStore.delete(ip);
  }
}, 60 * 60 * 1e3);
function checkRateLimit(ip) {
  const now = Date.now();
  const record = ipStore.get(ip) ?? {
    minute: { count: 0, reset: now + 6e4 },
    hour: { count: 0, reset: now + 36e5 },
    day: { count: 0, reset: now + 864e5 }
  };
  if (now > record.minute.reset) record.minute = { count: 0, reset: now + 6e4 };
  if (now > record.hour.reset) record.hour = { count: 0, reset: now + 36e5 };
  if (now > record.day.reset) record.day = { count: 0, reset: now + 864e5 };
  if (record.minute.count >= LIMITS.PER_MINUTE)
    return { allowed: false, reason: "Mandaste demasiados mensajes seguidos. Esperá un minuto 🙏" };
  if (record.hour.count >= LIMITS.PER_HOUR)
    return { allowed: false, reason: "Alcanzaste el límite por hora. Volvé en unos minutos 😅" };
  if (record.day.count >= LIMITS.PER_DAY)
    return { allowed: false, reason: "Alcanzaste el límite diario. Volvé mañana 😅" };
  record.minute.count++;
  record.hour.count++;
  record.day.count++;
  ipStore.set(ip, record);
  return { allowed: true };
}

const INJECTION_PATTERNS = [
  /ignore\s+(previous|all|above|prior)\s+instructions?/i,
  /forget\s+(your|the|all)\s+(instructions?|prompt|rules?|context)/i,
  /you\s+are\s+now\s+/i,
  /act\s+as\s+(a\s+)?(different|new|another|unrestricted)/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /new\s+(persona|personality|identity|role|instructions?)/i,
  /jailbreak/i,
  /\bDAN\b/,
  /developer\s+mode/i,
  /turn\s+off\s+(your\s+)?(filters?|restrictions?|rules?)/i,
  /speak\s+freely/i,
  /no\s+restrictions?/i,
  /bypass\s+(your\s+)?(rules?|filters?|restrictions?)/i,
  /system\s*:/i,
  /\[INST\]/i,
  /<<SYS>>/i,
  /\bbase64\b.*\bdecode\b/i,
  /reveal\s+(your\s+)?(system\s+)?prompt/i,
  /show\s+(me\s+)?(your\s+)?(system\s+)?instructions?/i,
  /what\s+(are\s+)?(your\s+)?(system\s+)?(prompt|instructions?)/i
];

function sanitizeInput(text) {
  if (!text || text.trim().length === 0) {
    return { safe: false, reason: "Mensaje vacío" };
  }
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(text)) {
      return { safe: false, reason: "INJECTION_ATTEMPT" };
    }
  }
  const words = text.split(/\s+/);
  if (words.length > 10) {
    const uniqueWords = new Set(words.map((w) => w.toLowerCase()));
    const ratio = uniqueWords.size / words.length;
    if (ratio < 0.2) {
      return { safe: false, reason: "FLOOD_DETECTED" };
    }
  }
  return { safe: true };
}
function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0)
    return { valid: false, reason: "Mensaje inválido" };
  const validRoles = /* @__PURE__ */ new Set(["user", "assistant"]);
  for (const msg of messages) {
    if (!validRoles.has(msg?.role)) {
      return { valid: false, reason: "Rol de mensaje inválido" };
    }
    if (msg.role === "user") {
      const content2 = typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content);
      const check = sanitizeInput(content2);
      if (!check.safe && check.reason === "INJECTION_ATTEMPT") {
        return { valid: false, reason: "INJECTION_ATTEMPT" };
      }
    }
  }
  const last = messages[messages.length - 1];
  if (!last?.content) return { valid: false, reason: "Mensaje vacío" };
  const content = typeof last.content === "string" ? last.content : JSON.stringify(last.content);
  if (content.length > LIMITS.MAX_MSG_LENGTH)
    return { valid: false, reason: `Mensaje demasiado largo (máx ${LIMITS.MAX_MSG_LENGTH} caracteres)` };
  return { valid: true };
}

async function logInteraction(data) {
}

const SHOW_INTENTS = [
  // Note: the generic "mostrame" → showProject fallback was intentionally removed.
  // PROJECT_OVERRIDE + PROJECT_BY_NAME already handle explicit project show requests.
  // Keeping only non-project specific overrides as a fallback layer.
  { pattern: /mostrame.*(?:skill|tech|tecnolog|stack)|show.*(?:skill|tech|stack)|ver.*(?:skill|tech|stack)/i, tool: "showSkills" },
  { pattern: /mostrame.*(?:experiencia|experience|trayectoria|historial)|show.*(?:experience|career)/i, tool: "showExperience" },
  { pattern: /mostrame.*(?:contacto|contact)|datos de contacto|c[oó]mo.*contact[ao]|how.*contact|c[oó]mo.*contratar|how.*hire/i, tool: "showContact" },
  { pattern: /está disponible|is he available|cuándo puede empezar|está buscando trabajo|open to opportunities/i, tool: "showAvailability" }
];
const PROJECT_OVERRIDE = /(?:mostrame|show me|ver|muéstrame|muestrame|quiero ver|puedo ver|dejame ver|podés mostrarme|can you show|show me)\s+(?:el\s+)?(?:proyecto|project)?\s*(?:de\s+)?/i;
const PROJECT_BY_NAME = /(?:uncuartodemilla|1\/4\s*mile|milla|omega|expresoomega|alfyvivi|alfy)/i;
const SKILLS_OVERRIDE = /(?:mostrame|show me|ver).*(?:skill|tech|tecnolog|stack|conocimiento)/i;
const EXP_OVERRIDE = /(?:mostrame|show me|ver).*(?:experiencia|experience|trayectoria|historial)/i;
const CONTACT_OVERRIDE = /(?:mostrame|show me|ver).*(?:contacto|contact|linkedin)|c[oó]mo.*contact[ao]|how.*contact/i;
const AVAILABILITY_OVERRIDE = /(?:disponib|available|busca trabajo|buscando trabajo)/i;
const SEND_MESSAGE_PATTERN = /envi[aá](rle|le|r)?\s+un\s+mensaje|mandar(le)?\s+un\s+mensaje|escribir(le)?|send.*message|contact.*him|write.*to|quiero.*mensaje|mensaje.*a\s+edu/i;
const ALL_PROJECTS_PATTERN = /todos|all|ambos|both|los proyectos|the projects|show.*projects|projec.*all|ver todos|mostrame todos/i;
function detectForcedTool(msg) {
  if (SEND_MESSAGE_PATTERN.test(msg)) return null;
  if (SKILLS_OVERRIDE.test(msg)) return "showSkills";
  if (EXP_OVERRIDE.test(msg)) return "showExperience";
  if (CONTACT_OVERRIDE.test(msg)) return "showContact";
  if (AVAILABILITY_OVERRIDE.test(msg)) return "showAvailability";
  if (PROJECT_OVERRIDE.test(msg) || PROJECT_BY_NAME.test(msg) && /mostrame|show|ver|muéstrame|quiero|puedo|dejame/i.test(msg)) {
    return "showProject";
  }
  for (const { pattern, tool } of SHOW_INTENTS) {
    if (pattern.test(msg)) return tool;
  }
  return null;
}
function wantsAllProjects(msg) {
  return ALL_PROJECTS_PATTERN.test(msg);
}

const sanitizeStr = (s) => s.replace(/<[^>]*>/g, "").replace(/[<>"'`]/g, "").slice(0, 300);
const toolsDefinition = {
  // -- 1. showProject ----------------------
  showProject: {
    description: "Muestra una tarjeta visual interactiva de un proyecto de Eduardo. Llamar SOLO cuando el usuario pide explícitamente VER un proyecto. Para mostrar TODOS los proyectos, llamar esta función UNA VEZ POR CADA proyecto.",
    inputSchema: jsonSchema({
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        tech: { type: "string" },
        url: { type: "string" },
        video: { type: "string" },
        image: { type: "string" }
      },
      required: ["title", "description", "tech", "url", "video", "image"]
    }),
    execute: async (args) => {
      if (!args?.title) return null;
      const ALLOWED_URLS = [
        "https://uncuartodemilla.com/",
        "https://www.expresoomega.com/",
        "https://alfyvivi.com/"
      ];
      const safeUrl = ALLOWED_URLS.includes(args.url) ? args.url : "#";
      return {
        title: sanitizeStr(args.title),
        description: sanitizeStr(args.description),
        tech: args.tech.split(",").map((t) => sanitizeStr(t.trim())).filter(Boolean),
        url: safeUrl,
        video: args.video ?? "",
        image: args.image ?? ""
      };
    }
  },
  // -- 2. showContact ----------------------
  showContact: {
    description: "Muestra una tarjeta interactiva con todos los medios para contactar a Eduardo: LinkedIn, email, CV y portfolio. Llamar cuando alguien pregunta cómo contactar o contratar a Eduardo.",
    inputSchema: jsonSchema({
      type: "object",
      properties: {}
    }),
    execute: async () => ({
      linkedin: "https://linkedin.com/in/raul-eduardo-cabral",
      email: "jackshaw32@live.com.ar",
      cvEs: "https://drive.google.com/file/d/1rowPwlyhJPDIUqs-4N_WmLW_LS1Y7Noz/view?usp=sharing",
      cvEn: "https://drive.google.com/file/d/1dPo1RNqasoNxXUjwk6nGuDBWIPoD2_mY/view?usp=sharing",
      portfolio: "https://educabral.site/",
      phone: "+54 9 351 858-8034",
      github: "https://github.com/JackShaw32"
    })
  },
  // -- 3. showSkills -----------------------
  showSkills: {
    description: "Muestra una visualización del tech stack de Eduardo con badges organizados por categoría. Llamar cuando preguntan por tecnologías, habilidades o conocimientos técnicos.",
    inputSchema: jsonSchema({
      type: "object",
      properties: {}
    }),
    execute: async () => ({
      categories: [
        { name: "Frontend", skills: ["React", "Next.js", "Astro", "TypeScript", "Tailwind CSS", "Redux", "Angular"] },
        { name: "Backend", skills: ["Node.js", "NestJS", "Express.js", "JWT", "Firebase", "Strapi", "REST APIs"] },
        { name: "Bases de datos", skills: ["MongoDB", "PostgreSQL", "Firestore"] },
        { name: "Cloud & DevOps", skills: ["AWS EC2", "S3", "GCP", "Docker", "Git & GitHub"] },
        { name: "Pagos & otros", skills: ["Mercado Pago", "Meta Pixel", "Scrum/Agile", "Zod", "React Hook Form"] }
      ]
    })
  },
  // -- 4. showExperience -------------------
  showExperience: {
    description: "Muestra un timeline visual con la experiencia profesional y educación de Eduardo. Llamar cuando preguntan por experiencia, trayectoria, o historial laboral.",
    inputSchema: jsonSchema({
      type: "object",
      properties: {}
    }),
    execute: async () => ({
      items: [
        {
          period: "2023 – Presente",
          role: "Freelance Full-Stack Developer",
          company: "Proyectos propios y para clientes",
          years: "3+ años",
          current: true
        },
        {
          period: "Jun. 2025 - Oct. 2025",
          role: "Full Stack SSR Developer",
          company: "Gearthlogic LLC",
          years: "",
          current: false,
          description: "Resolución de problemas críticos en producción, refactorización en React + TypeScript y optimización de APIs Node/Express. Sincronización en tiempo real con Firestore y Cloud Functions. Strapi v5 como CMS e integración de IA (Gemini 2.5) para autocompletado de formularios dinámicos.",
          tech: "React.js, TypeScript, Node.js, Firebase, GCP, Strapi"
        },
        {
          period: "Dic. 2023",
          role: "Full Stack Web Developer",
          company: "DevSchool Academia",
          years: "",
          current: false
        },
        {
          period: "Jul. 2022",
          role: "Frontend Developer Bootcamp",
          company: "Primera Edición en Código en Casa",
          years: "",
          current: false
        },
        {
          period: "Ene. 2022",
          role: "Programación desde Cero",
          company: "Egg Live",
          years: "",
          current: false
        }
      ]
    })
  },
  // -- 5. showAvailability -----------------
  showAvailability: {
    description: "Muestra el estado actual de disponibilidad de Eduardo para nuevas oportunidades laborales. Llamar cuando preguntan si está disponible, buscando trabajo, o cuándo puede empezar.",
    inputSchema: jsonSchema({
      type: "object",
      properties: {}
    }),
    execute: async () => {
      const available = true;
      const availableFrom = "Inmediato";
      return {
        available,
        availableFrom,
        timezone: "GMT-3 (Argentina)",
        preferredRoles: ["Full-Stack Developer", "Frontend Developer", "Backend Developer"],
        workMode: ["Remoto", "Híbrido"]
      };
    }
  },
  // -- 6. sendContactForm ------------------
  sendContactForm: {
    description: "Envía un formulario de contacto a Eduardo con nombre, email y mensaje del recruiter/cliente. Llamar SOLO cuando el usuario ya proporcionó explícitamente su nombre, email y mensaje.",
    inputSchema: jsonSchema({
      type: "object",
      properties: {
        name: { type: "string", description: "Nombre del contacto" },
        email: { type: "string", description: "Email del contacto" },
        message: { type: "string", description: "Mensaje para Eduardo" }
      },
      required: ["name", "email", "message"]
    }),
    execute: async (args) => {
      const safeName = sanitizeStr(args.name).slice(0, 100);
      const safeEmail = args.email.replace(/[<>"'`\s]/g, "").slice(0, 200);
      const safeMessage = sanitizeStr(args.message).slice(0, 1e3);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
        return { success: false, reason: "invalid_email" };
      }
      const result = await sendEmail({
        name: safeName,
        email: safeEmail,
        message: safeMessage,
        source: "EduBot"
      });
      return result.success ? { success: true, name: safeName } : { success: false, reason: result.reason };
    }
  }
};

const TEXT_TOOL_CALL_RE = /<function\/([\w]+)>([\s\S]*?)<\/function>/g;
async function parseAndExecuteTextToolCalls(text, tools, controller, encoder) {
  let lastIndex = 0;
  TEXT_TOOL_CALL_RE.lastIndex = 0;
  let match;
  while ((match = TEXT_TOOL_CALL_RE.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index).replace(/<\/?function[^>]*>/g, "").trim();
    if (before) controller.enqueue(encoder.encode(`0:${JSON.stringify(before)}
`));
    const toolName = match[1];
    if (toolName in tools) {
      let args = {};
      try {
        args = JSON.parse(match[2]);
      } catch {
      }
      const toolCallId = `txt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      controller.enqueue(encoder.encode(`9:${JSON.stringify({ toolCallId, toolName, args })}
`));
      try {
        const tool = tools[toolName];
        const result = await tool.execute(args);
        controller.enqueue(encoder.encode(`a:${JSON.stringify({ toolCallId, result })}
`));
      } catch {
        controller.enqueue(encoder.encode(`a:${JSON.stringify({ toolCallId, result: null })}
`));
      }
    }
    lastIndex = match.index + match[0].length;
  }
  const after = text.slice(lastIndex).replace(/<\/?function[^>]*>/g, "").trim();
  if (after) controller.enqueue(encoder.encode(`0:${JSON.stringify(after)}
`));
}

async function pipeStreamToController(result, controller, encoder, tools, onToolCallEmitted) {
  let textBuffer = [];
  let postToolBuffer = [];
  let hadToolCall = false;
  const TOOL_LEAK_RE = /\[tool\s*call\]|\btool_call\b|showProject\s*[–\-]|showContact\s*[–\-]|showSkills\s*[–\-]|showExperience\s*[–\-]|showAvailability\s*[–\-]|sendContactForm\s*[–\-]|Título\s*:|Descripción\s*:|Tecnologías\s*:|VIDEO\s*:|Image\s*:/i;
  const flushBuffer = (buf) => {
    for (const chunk of buf) {
      controller.enqueue(encoder.encode(`0:${JSON.stringify(chunk)}
`));
    }
  };
  for await (const part of result.fullStream) {
    if (part.type === "text-delta") {
      const chunk = part.text ?? part.textDelta ?? part.delta ?? "";
      if (!chunk) continue;
      if (hadToolCall) {
        postToolBuffer.push(chunk);
      } else {
        textBuffer.push(chunk);
      }
    } else if (part.type === "tool-call") {
      textBuffer = [];
      hadToolCall = true;
      onToolCallEmitted?.();
      const args = part.input ?? part.args ?? {};
      controller.enqueue(encoder.encode(`9:${JSON.stringify({
        toolCallId: part.toolCallId,
        toolName: part.toolName,
        args
      })}
`));
    } else if (part.type === "tool-result") {
      const p = part;
      controller.enqueue(encoder.encode(`a:${JSON.stringify({
        toolCallId: p.toolCallId,
        result: p.output ?? p.result
      })}
`));
    } else if (part.type === "tool-error") {
      const p = part;
      controller.enqueue(encoder.encode(`a:${JSON.stringify({
        toolCallId: p.toolCallId,
        result: null
      })}
`));
    } else if (part.type === "error") {
      throw part.error;
    }
  }
  if (!hadToolCall && textBuffer.length > 0) {
    const full = textBuffer.join("");
    if (tools && TEXT_TOOL_CALL_RE.test(full)) {
      await parseAndExecuteTextToolCalls(full, tools, controller, encoder);
    } else {
      flushBuffer(textBuffer);
    }
  }
  if (hadToolCall && postToolBuffer.length > 0) {
    const full = postToolBuffer.join("").trim();
    if (full && !TOOL_LEAK_RE.test(full)) {
      flushBuffer(postToolBuffer);
    }
  }
}

const PRIMARY_MODEL = "llama-3.1-8b-instant";
const FALLBACK_MODEL = "llama-3.3-70b-versatile";

const maxDuration = 30;
const POST = async ({ request }) => {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "0.0.0.0";
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return new Response(JSON.stringify({ error: rateCheck.reason }), {
      status: 429,
      headers: { "Content-Type": "application/json" }
    });
  }
  if (groqKeyPool.length === 0) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
  let messages, language, pageContext;
  try {
    ({ messages, language, pageContext } = await request.json());
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const safeLang = language === "en" ? "en" : "es";
  const msgCheck = validateMessages(messages);
  if (!msgCheck.valid) {
    const status = msgCheck.reason === "INJECTION_ATTEMPT" ? 400 : 400;
    return new Response(JSON.stringify({ error: "Mensaje inv�lido." }), {
      status,
      headers: { "Content-Type": "application/json" }
    });
  }
  const rawMessages = messages.filter((m) => m.role === "user" || m.role === "assistant").slice(-8).map((m) => ({
    role: m.role,
    content: typeof m.content === "string" ? m.content.trim().length > 0 ? m.content.slice(0, LIMITS.MAX_MSG_LENGTH) : "[visual response]" : String(m.content).slice(0, LIMITS.MAX_MSG_LENGTH)
  }));
  const trimmedMessages = [];
  for (const msg of rawMessages) {
    if (trimmedMessages.length > 0 && trimmedMessages[trimmedMessages.length - 1].role === msg.role) {
      trimmedMessages[trimmedMessages.length - 1] = msg;
    } else {
      trimmedMessages.push(msg);
    }
  }
  const errorMessage = safeLang === "en" ? ERROR_EN : ERROR_ES;
  const rateLimitMessage = safeLang === "en" ? "? The assistant is temporarily busy. Please wait a few seconds and try again." : "? El asistente est� ocupado en este momento. Esper� unos segundos y volv� a intentarlo.";
  const langInstruction = safeLang === "en" ? LANG_INSTRUCTION_EN : LANG_INSTRUCTION_ES;
  const safeSection = typeof pageContext === "string" && VALID_SECTIONS.has(pageContext) ? pageContext : null;
  const pageContextStr = safeSection ? `
USER CONTEXT: The user is currently viewing the "${SECTION_LABELS[safeSection]}" of the portfolio.
` : "";
  const lastQuestion = trimmedMessages.at(-1)?.content;
  if (lastQuestion) {
    logInteraction({
      ip: ip.slice(0, 8) + "****",
      question: lastQuestion.slice(0, 100),
      date: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  const forcedTool = lastQuestion ? detectForcedTool(lastQuestion) : null;
  const multiProject = forcedTool === "showProject" && !!lastQuestion && wantsAllProjects(lastQuestion);
  const contactFormAlreadySent = trimmedMessages.some(
    (m) => m.role === "assistant" && m.content.includes("sendContactForm was already called and succeeded")
  );
  const activeTools = contactFormAlreadySent ? Object.keys(toolsDefinition).filter((k) => k !== "sendContactForm").reduce((acc, k) => ({ ...acc, [k]: toolsDefinition[k] }), {}) : toolsDefinition;
  const encoder = new TextEncoder();
  const primaryKeySlot = getAvailableGroq();
  const groq = primaryKeySlot?.groq ?? createGroq({ apiKey: groqKeyPool[0] });
  let currentKeyIndex = primaryKeySlot?.index ?? 0;
  function rotateKey() {
    const slot = getAvailableGroq();
    if (!slot) return false;
    Object.assign(groqRef, { groq: slot.groq, index: slot.index });
    currentKeyIndex = slot.index;
    return true;
  }
  const groqRef = { groq, index: currentKeyIndex };
  const getGroq = () => groqRef.groq;
  const getKeyIdx = () => groqRef.index;
  function errorStream(msg) {
    return new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`0:${JSON.stringify(msg)}
`));
        controller.close();
      }
    });
  }
  let primaryResult = null;
  let useFallback = false;
  try {
    primaryResult = await streamText({
      model: getGroq()(PRIMARY_MODEL),
      system: BASE_PROMPT + pageContextStr + langInstruction,
      messages: trimmedMessages,
      tools: activeTools,
      toolChoice: "auto",
      stopWhen: stepCountIs(5),
      maxOutputTokens: 600,
      maxRetries: 0,
      prepareStep: ({ stepNumber }) => {
        if (multiProject) {
          if (stepNumber >= 3) return { toolChoice: "none" };
          return { toolChoice: "auto" };
        }
        if (stepNumber === 0 && forcedTool) {
          return {
            toolChoice: { type: "tool", toolName: forcedTool },
            activeTools: [forcedTool]
          };
        }
        if (stepNumber >= 1) return { toolChoice: "none" };
        return { toolChoice: "auto" };
      }
    });
  } catch (primaryErr) {
    const errMsg = primaryErr?.message ?? primaryErr?.data?.error?.message ?? "";
    const isRateLimitErr = primaryErr?.statusCode === 429 || errMsg.includes("Rate limit") || errMsg.includes("rate_limit");
    const isFunctionFail = errMsg.includes("Failed to call a function") || errMsg.includes("failed_generation") || errMsg.includes("invalid_request_error");
    if (isRateLimitErr) {
      markKeyCooldown(getKeyIdx(), primaryErr);
      const rotated = rotateKey();
      console.warn(`[EduBot] 8b rate limited, ${rotated ? "rotated key → 70b" : "no keys available → fallback"}`);
      useFallback = true;
    } else if (isFunctionFail) {
      console.warn("[EduBot] Function call failed, retrying with 70b...");
      try {
        primaryResult = await streamText({
          model: getGroq()(FALLBACK_MODEL),
          system: BASE_PROMPT + pageContextStr + langInstruction,
          messages: trimmedMessages,
          tools: activeTools,
          toolChoice: "auto",
          // sin forzar
          stopWhen: stepCountIs(3),
          maxOutputTokens: 600,
          maxRetries: 0
        });
      } catch (retryErr) {
        console.error("[EduBot] Retry also failed:", retryErr);
        useFallback = true;
      }
    } else {
      console.error("[EduBot] Primary model error:", primaryErr);
      useFallback = true;
    }
  }
  if (useFallback) {
    try {
      const fallbackResult = await streamText({
        model: getGroq()(FALLBACK_MODEL),
        system: BASE_PROMPT + pageContextStr + langInstruction,
        messages: trimmedMessages,
        maxOutputTokens: 600
      });
      const stream2 = new ReadableStream({
        async start(controller) {
          try {
            await pipeStreamToController(fallbackResult, controller, encoder);
          } catch {
            controller.enqueue(encoder.encode(`0:${JSON.stringify(errorMessage)}
`));
          } finally {
            controller.close();
          }
        }
      });
      return new Response(stream2, {
        headers: { "Content-Type": "text/plain; charset=utf-8", "x-vercel-ai-data-stream": "v1" }
      });
    } catch (fallbackErr) {
      console.error("[EduBot] Fallback error:", fallbackErr);
      return new Response(errorStream(errorMessage), {
        headers: { "Content-Type": "text/plain; charset=utf-8", "x-vercel-ai-data-stream": "v1" }
      });
    }
  }
  if (!primaryResult) {
    return new Response(errorStream(errorMessage), {
      headers: { "Content-Type": "text/plain; charset=utf-8", "x-vercel-ai-data-stream": "v1" }
    });
  }
  const captured = primaryResult;
  const stream = new ReadableStream({
    async start(controller) {
      let toolCallsEmitted = 0;
      try {
        await pipeStreamToController(
          captured,
          controller,
          encoder,
          activeTools,
          () => {
            toolCallsEmitted++;
          }
        );
      } catch (streamErr) {
        console.error("[EduBot] Stream error ? fallback");
        const isRateLimit = streamErr?.statusCode === 429 || String(streamErr?.message).includes("Rate limit") || String(streamErr?.message).includes("rate_limit");
        if (isRateLimit) {
          markKeyCooldown(getKeyIdx(), streamErr);
          rotateKey();
          console.warn("[EduBot] Stream rate limit → emergency with rotated key");
        } else {
          console.warn("[EduBot] Stream error → emergency 70b");
        }
        const emergencyCanShowTools = toolCallsEmitted === 0 && forcedTool !== null;
        try {
          const emergency = await streamText({
            model: getGroq()(FALLBACK_MODEL),
            system: BASE_PROMPT + pageContextStr + langInstruction,
            messages: trimmedMessages,
            maxOutputTokens: 600,
            ...emergencyCanShowTools ? {
              tools: activeTools,
              stopWhen: stepCountIs(multiProject ? 4 : 2),
              // Mirror primary prepareStep: force tool on step 0 only, then text-only
              prepareStep: ({ stepNumber }) => {
                if (multiProject) {
                  if (stepNumber >= 3) return { toolChoice: "none" };
                  return { toolChoice: "auto" };
                }
                if (stepNumber === 0 && forcedTool) {
                  return {
                    toolChoice: { type: "tool", toolName: forcedTool },
                    activeTools: [forcedTool]
                  };
                }
                if (stepNumber >= 1) return { toolChoice: "none" };
                return { toolChoice: "auto" };
              }
            } : {
              toolChoice: "none"
            },
            maxRetries: 0
          });
          await pipeStreamToController(
            emergency,
            controller,
            encoder,
            emergencyCanShowTools ? activeTools : void 0
          );
        } catch (emergencyErr) {
          const emergencyIsRateLimit = emergencyErr?.statusCode === 429 || String(emergencyErr?.message).includes("Rate limit") || String(emergencyErr?.message).includes("rate_limit");
          const finalMsg = emergencyIsRateLimit ? rateLimitMessage : errorMessage;
          controller.enqueue(encoder.encode(`0:${JSON.stringify(finalMsg)}
`));
        }
      } finally {
        controller.close();
      }
    }
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "x-vercel-ai-data-stream": "v1" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  maxDuration
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
