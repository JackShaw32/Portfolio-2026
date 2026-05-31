import { jsonSchema } from 'ai';
import { sendEmail } from '../services/emailService';

const sanitizeStr = (s: string) =>
  s.replace(/<[^>]*>/g, '').replace(/[<>"'`]/g, '').slice(0, 300);

export function getToolsDefinition(lang: string) {
  const es = lang !== 'en';

  return {
  // showProject
  showProject: {
    description: es
      ? 'Muestra una tarjeta visual interactiva de un proyecto de Eduardo. Llamar SOLO cuando el usuario pide explícitamente VER un proyecto. Para mostrar TODOS los proyectos, llamar esta función UNA VEZ POR CADA proyecto.'
      : 'Shows an interactive visual card of an Eduardo project. Call ONLY when the user explicitly wants to SEE a project. To show ALL projects, call this function ONCE PER project.',
    inputSchema: jsonSchema<{
      title: string;
      description: string;
      tech: string;
      url: string;
      image: string;
    }>({
      type: 'object',
      properties: {
        title:       { type: 'string' },
        description: { type: 'string' },
        tech:        { type: 'string' },
        url:         { type: 'string' },
        image:       { type: 'string' },
      },
      required: ['title', 'description', 'tech', 'url', 'image'],
    }),
    execute: async (args: {
      title: string; description: string; tech: string;
      url: string; image: string;
    }) => {
      if (!args?.title) return { title: es ? 'Proyecto' : 'Project', description: '', tech: [], url: '#', image: '' };
      const ALLOWED_URLS = [
        'https://uncuartodemilla.com/',
        'https://www.expresoomega.com/',
      ];
      const ALLOWED_IMAGES = [
        '/projects/14milla.webp',
        '/projects/omega.webp',
      ];
      const safeUrl   = ALLOWED_URLS.includes(args.url)     ? args.url   : '#';
      const safeImage = ALLOWED_IMAGES.includes(args.image) ? args.image : '';
      const projectDescs: Record<string, { es: string; en: string }> = {
        '/projects/14milla.webp': {
          es: 'E-commerce B2C completo de indumentaria automotriz. Frontend: React 18 + Vite 6 + Tailwind CSS 3 + Framer Motion. Backend: Express 4 + MongoDB + JWT httpOnly + Google OAuth. Pagos: MercadoPago (Bricks + webhooks + transferencias + gift cards + cupones). Tracking: Meta Pixel + Conversions API (browser + server). Testing: 119 unitarios (Vitest) + 11 E2E (Playwright). Deploy: Netlify + Render.',
          en: 'Full B2C e-commerce for automotive apparel. Frontend: React 18 + Vite 6 + Tailwind CSS 3 + Framer Motion. Backend: Express 4 + MongoDB + JWT httpOnly + Google OAuth. Payments: MercadoPago (Bricks + webhooks + transfers + gift cards + coupons). Tracking: Meta Pixel + Conversions API (browser + server). Testing: 119 unit (Vitest) + 11 E2E (Playwright). Deploy: Netlify + Render.',
        },
        '/projects/omega.webp': {
          es: 'Sitio corporativo B2B desarrollado con HTML5, CSS3 y JavaScript Vanilla para una empresa de logística y transporte. Sin frameworks pesados, enfocado en velocidad de carga, SEO técnico y generación de leads.',
          en: 'B2B corporate website built with HTML5, CSS3 and Vanilla JavaScript for a logistics and transportation company. No heavy frameworks, focused on load speed, technical SEO and lead generation.',
        },
      };
      const safeDesc = projectDescs[safeImage]?.[lang as 'es' | 'en'] ?? sanitizeStr(args.description);
      const safeTech = safeImage === '/projects/14milla.webp'
        ? 'React 18, Vite 6, Tailwind CSS 3, Framer Motion, Swiper, Express 4, MongoDB, Mongoose, JWT, bcrypt, Google OAuth, Cloudinary, MercadoPago API, Meta Pixel, Meta Conversions API, Helmet, Vitest, Playwright, Netlify, Render'
        : (args.tech ?? '');
      return {
        title:       sanitizeStr(args.title),
        description: safeDesc,
        tech:        safeTech.split(',').map((t: string) => sanitizeStr(t.trim())).filter(Boolean),
        url:         safeUrl,
        image:       safeImage,
      };
    },
  },

  // showContact
  showContact: {
    description: es
      ? 'Muestra una tarjeta interactiva con todos los medios para contactar a Eduardo: LinkedIn, email, CV y portfolio. Llamar cuando alguien pregunta cómo contactar o contratar a Eduardo.'
      : 'Shows an interactive card with all ways to contact Eduardo: LinkedIn, email, CV and portfolio. Call when someone asks how to contact or hire Eduardo.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => ({
      linkedin:  'https://linkedin.com/in/raul-eduardo-cabral',
      email:     'jackshaw@live.com.ar',
      cvEs:      'https://jackshaw32.vercel.app/Eduardo-Cabral-Full-Stack-Developer-ES.pdf',
      cvEn:      'https://jackshaw32.vercel.app/Eduardo-Cabral-Full-Stack-Developer-EN.pdf',
      portfolio: 'https://jackshaw32.vercel.app/',
      phone:     '+54 9 351 858-8034',
      github:    'https://github.com/JackShaw32',
    }),
  },

  // showSkills
  showSkills: {
    description: es
      ? 'Muestra una visualización del tech stack de Eduardo con badges organizados por categoría. Llamar cuando preguntan por tecnologías, habilidades o conocimientos técnicos.'
      : 'Shows a visual of Eduardo\'s tech stack with badges organized by category. Call when asked about technologies, skills or technical knowledge.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => ({
      categories: [
        { name: 'Frontend',                      skills: ['React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind CSS', 'Redux', 'Angular'] },
        { name: 'Backend',                       skills: ['Node.js', 'NestJS', 'Express.js', 'JWT', 'Firebase', 'Strapi', 'REST APIs'] },
        { name: es ? 'Bases de datos' : 'Databases', skills: ['MongoDB', 'PostgreSQL', 'Firestore'] },
        { name: 'Cloud & DevOps',                skills: ['AWS EC2', 'S3', 'GCP', 'Docker', 'Git & GitHub'] },
        { name: es ? 'Pagos & otros' : 'Payments & Other', skills: ['Mercado Pago', 'Meta Pixel', 'Scrum/Agile', 'Zod', 'React Hook Form'] },
      ],
    }),
  },

  // showExperience
  showExperience: {
    description: es
      ? 'Muestra un timeline visual con la experiencia profesional y educación de Eduardo. Llamar cuando preguntan por experiencia, trayectoria, o historial laboral.'
      : 'Shows a visual timeline of Eduardo\'s professional experience and education. Call when asked about experience, career, or work history.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => ({
      items: [
        {
          period:  es ? '2023 – Presente' : '2023 – Present',
          role:    'Freelance Full-Stack Developer',
          company: es ? 'Proyectos propios y para clientes' : 'Own and client projects',
          years:   es ? '3+ años' : '3+ years',
          current: true,
        },
        {
          period:  'Jun. 2025 - Oct. 2025',
          role:    'Full Stack SSR Developer',
          company: 'Gearthlogic LLC',
          years:   '',
          current: false,
          description: es
            ? 'Resolución de problemas críticos en producción, refactorización en React + TypeScript y optimización de APIs Node/Express. Sincronización en tiempo real con Firestore y Cloud Functions. Strapi v5 como CMS e integración de IA (Gemini 2.5) para autocompletado de formularios dinámicos.'
            : 'Resolved critical production issues, refactored React + TypeScript code, and optimized Node/Express APIs. Real-time Firestore sync with Cloud Functions. Strapi v5 CMS and Gemini 2.5 AI integration for dynamic form autocompletion.',
          tech: 'React.js, TypeScript, Node.js, Firebase, GCP, Strapi',
        },
        {
          period:  es ? 'Dic. 2023' : 'Dec. 2023',
          role:    'Full Stack Web Developer',
          company: 'DevSchool Academia',
          years:   '',
          current: false,
        },
        {
          period:  es ? 'Jul. 2022' : 'Jul. 2022',
          role:    'Frontend Developer Bootcamp',
          company: es ? 'Primera Edición en Código en Casa' : 'First Edition at Código en Casa',
          years:   '',
          current: false,
        },
        {
          period:  es ? 'Ene. 2022' : 'Jan. 2022',
          role:    es ? 'Programación desde Cero' : 'Programming from Scratch',
          company: 'Egg Live',
          years:   '',
          current: false,
        },
      ],
    }),
  },

  // showRecommendation
  showRecommendation: {
    description: es
      ? 'Muestra una tarjeta de recomendación profesional explicando por qué contratar a Eduardo, para qué tipo de proyectos es ideal, y qué lo hace destacar. Llamar cuando preguntan "por qué contratarlo", "recomiéndame", "would you recommend him", "why should I hire", "es bueno para", "is he a good fit", o evaluaciones de su perfil.'
      : 'Shows a professional recommendation card explaining why to hire Eduardo, what projects he\'s ideal for, and what makes him stand out. Call when asked "why hire him", "would you recommend", "is he a good fit", or profile evaluations.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => ({
      strengths: es
        ? [
            'Arquitectura full-stack completa: diseña y construye desde la DB hasta el frontend',
            'E-commerce end-to-end: pagos, tracking, auth, CMS, testing, deploy — todo hecho por él',
            'Seguridad y robustez: rate limiting, sanitización, JWT httpOnly, inyección NoSQL, CSRF',
            'Testing real: 119 unit tests + 11 E2E + Lighthouse audits automáticas',
            'Product mindset: entiende el negocio, no solo el código',
            'Autodidacta y rápido: de bootcamp a e-commerce en producción en menos de 2 años',
          ]
        : [
            'Full-stack architecture: designs and builds from DB to frontend',
            'End-to-end e-commerce: payments, tracking, auth, CMS, testing, deploy — all built by him',
            'Security & robustness: rate limiting, sanitization, JWT httpOnly, NoSQL injection, CSRF',
            'Real testing: 119 unit tests + 11 E2E + automated Lighthouse audits',
            'Product mindset: understands business, not just code',
            'Self-taught and fast: from bootcamp to production e-commerce in under 2 years',
          ],
      idealFor: es
        ? [
            'E-commerce y plataformas B2C con pagos integrados',
            'Aplicaciones web full-stack con React + Node.js',
            'Startups que necesitan un dev que cubra frontend y backend',
            'Proyectos que requieren integraciones con APIs externas (pagos, tracking, auth OAuth)',
            'Equipos remotos, Scrum, código con review y testing',
          ]
        : [
            'E-commerce and B2C platforms with integrated payments',
            'Full-stack web applications with React + Node.js',
            'Startups needing a dev who covers frontend and backend',
            'Projects requiring external API integrations (payments, tracking, OAuth auth)',
            'Remote teams, Scrum, code review and testing',
          ],
      differentiators: es
        ? [
            'Stack moderno y actualizado (React 18, Vite 6, Tailwind v4, Astro v5)',
            'Experiencia con IA (Gemini 2.5, Vercel AI SDK, Groq)',
            'Arquitecturas limpias con separación de concerns',
            'Inglés intermedio, comunicación clara, auto-gestión',
            'Disponibilidad inmediata para proyectos freelance y remoto',
          ]
        : [
            'Modern and up-to-date stack (React 18, Vite 6, Tailwind v4, Astro v5)',
            'AI experience (Gemini 2.5, Vercel AI SDK, Groq)',
            'Clean architectures with separation of concerns',
            'Intermediate English, clear communication, self-management',
            'Immediate availability for freelance and remote projects',
          ],
      recommendationScore: 92,
    }),
  },

  // showArchitecture
  showArchitecture: {
    description: es
      ? 'Muestra un diagrama visual de la arquitectura técnica de los proyectos de Eduardo o del portfolio en sí. Llamar cuando preguntan "arquitectura", "cómo está estructurado", "diagrama", "flujo", "architecture", "stack diagram", o cómo se conectan los componentes.'
      : 'Shows a visual diagram of the technical architecture of Eduardo\'s projects or the portfolio itself. Call when asked about architecture, diagram, flow, how components connect.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => ({
      portfolio: {
        title: 'Portfolio — EduCabral',
        layers: [
          { name: 'CDN / Edge',                   tech: 'Vercel Edge + ISR',       color: 'blue' },
          { name: 'Frontend',                     tech: 'Astro v5 + React 19',    color: 'indigo' },
          { name: es ? 'Estilos' : 'Styling',     tech: 'Tailwind CSS v4',        color: 'cyan' },
          { name: es ? 'Animaciones' : 'Animations', tech: 'GSAP + Lenis',       color: 'purple' },
          { name: 'API Routes',                   tech: 'Astro SSR Functions',    color: 'emerald' },
          { name: 'AI Chatbot',                   tech: 'Vercel AI SDK + Groq',  color: 'pink' },
          { name: es ? 'Seguridad' : 'Security',  tech: 'Rate Limit + Sanitize',  color: 'red' },
        ],
        flow: ['User Browser', 'Astro SSR / ISR', 'React Islands', 'API (Groq / Resend / OG)'],
        integrations: ['Groq LLM', 'Resend Email', 'Vercel Edge'],
      },
      projects: [
        {
          title: '1/4 de Milla E-Commerce',
          layers: [
            { name: 'Frontend',     tech: 'React 18 + Vite 6',     color: 'blue' },
            { name: es ? 'Estilos' : 'Styling', tech: 'Tailwind CSS 3', color: 'cyan' },
            { name: 'Auth',         tech: 'JWT httpOnly + Google',  color: 'amber' },
            { name: 'Backend',      tech: 'Express 4 REST API',    color: 'emerald' },
            { name: 'DB',           tech: 'MongoDB + Mongoose',     color: 'green' },
            { name: es ? 'Pagos' : 'Payments', tech: 'MercadoPago Bricks', color: 'pink' },
            { name: 'Tracking',     tech: 'Meta Pixel + CAPI',     color: 'purple' },
            { name: es ? 'Infra' : 'Infra', tech: 'Netlify + Render', color: 'slate' },
          ],
          flow: ['User', 'React SPA (Netlify)', 'Express API (Render)', 'MongoDB Atlas'],
          integrations: ['MercadoPago', 'Cloudinary', 'Meta CAPI', 'Google OAuth'],
        },
        {
          title: 'Expreso Omega Logistics',
          layers: [
            { name: 'Frontend',     tech: 'HTML5 + CSS3 + JS',     color: 'blue' },
            { name: 'Framework CSS',tech: 'Bootstrap 5',            color: 'purple' },
            { name: 'SEO',          tech: es ? 'Meta + Semántica' : 'Meta + Semantic', color: 'green' },
            { name: es ? 'Hosting' : 'Hosting', tech: 'Web Hosting', color: 'slate' },
          ],
          flow: ['User', 'Static Site', 'Web Hosting'],
          integrations: [],
        },
      ],
    }),
  },

  // showProfile
  showProfile: {
    description: es
      ? 'Muestra un resumen completo del perfil profesional de Eduardo: rol, ubicación, stack principal, enfoque y disponibilidad. Llamar cuando preguntan quién es, qué hace, su perfil en general, o "contame sobre vos".'
      : 'Shows a complete summary of Eduardo\'s professional profile: role, location, main stack, focus and availability. Call when asked who he is, what he does, his profile in general.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => {
      const available = (import.meta.env.EDUARDO_AVAILABLE ?? 'true') !== 'false';
      return {
        name: 'Raúl Eduardo Cabral',
        role: 'Software Engineer · Full Stack Developer',
        location: 'Córdoba, Argentina (GMT-3)',
        focus: es
          ? 'Construyendo aplicaciones web modernas, e-commerce y productos escalables con React, Next.js, Node.js y TypeScript.'
          : 'Building modern web applications, e-commerce and scalable products with React, Next.js, Node.js and TypeScript.',
        experience: es ? '3+ años como Full-Stack Developer' : '3+ years as Full-Stack Developer',
        stack: [
          'Frontend: React, Next.js, Astro, TypeScript, Tailwind CSS v4',
          'Backend: Node.js, Express, NestJS, REST APIs, JWT',
          'DBs: MongoDB, PostgreSQL, Firestore',
          'Cloud: AWS (EC2, S3, CloudFront), GCP, Docker',
          es ? 'Pagos: MercadoPago, Meta Pixel & Conversions API' : 'Payments: MercadoPago, Meta Pixel & Conversions API',
        ],
        available,
        availableFrom: import.meta.env.AVAILABLE_FROM ?? (es ? 'Inmediato' : 'Immediate'),
        workMode: es ? ['Remoto', 'Híbrido'] : ['Remote', 'Hybrid'],
        portfolio: 'https://jackshaw32.vercel.app/',
      };
    },
  },

  // showAvailability
  showAvailability: {
    description: es
      ? 'Muestra el estado actual de disponibilidad de Eduardo para nuevas oportunidades laborales. Llamar cuando preguntan si está disponible, buscando trabajo, o cuándo puede empezar.'
      : 'Shows Eduardo\'s current availability for new job opportunities. Call when asked if he\'s available, looking for work, or when he can start.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => {
      const available     = (import.meta.env.EDUARDO_AVAILABLE ?? 'true') !== 'false';
      const availableFrom = import.meta.env.AVAILABLE_FROM ?? (es ? 'Inmediato' : 'Immediate');
      return {
        available,
        availableFrom,
        timezone: 'GMT-3 (Argentina)',
        preferredRoles: ['Full-Stack Developer', 'Frontend Developer', 'Backend Developer'],
        workMode: es ? ['Remoto', 'Híbrido'] : ['Remote', 'Hybrid'],
      };
    },
  },

  // showImpact
  showImpact: {
    description: es
      ? 'Muestra una tarjeta con las métricas de impacto, logros y Lighthouse scores de Eduardo. Llamar cuando preguntan por impacto, métricas, KPIs, logros, números o resultados profesionales.'
      : 'Shows a card with Eduardo\'s impact metrics, achievements and Lighthouse scores. Call when asked about impact, metrics, KPIs, achievements, numbers or professional results.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => ({
      metrics: [
        { value: '10+', labelEs: 'Proyectos construidos',   labelEn: 'Projects built',       description: es ? 'Aplicaciones web full-stack en producción' : 'Full-stack web applications in production' },
        { value: '3+',  labelEs: 'Años de experiencia',     labelEn: 'Years of experience',  description: es ? 'Desarrollando productos digitales' : 'Building digital products' },
        { value: '45%', labelEs: 'Mejora de performance',   labelEn: 'Performance boost',    description: es ? 'Optimizaciones React en producción' : 'React production optimizations' },
        { value: '30%', labelEs: 'Reducción deuda técnica', labelEn: 'Tech debt cut',        description: es ? 'Refactorizaciones de componentes React' : 'React component refactoring' },
        { value: '100%',labelEs: 'Sistemas en producción',  labelEn: 'Production systems',   description: es ? 'Proyectos desplegados y en vivo' : 'Projects deployed and running live' },
      ],
      lighthouse: { performance: 97, accessibility: 94, bestPractices: 95, seo: 98 },
    }),
  },

  // sendContactForm
  sendContactForm: {
    description: es
      ? 'Envía un formulario de contacto a Eduardo con nombre, email y mensaje del recruiter/cliente. Llamar SOLO cuando el usuario ya proporcionó explícitamente su nombre, email y mensaje.'
      : 'Sends a contact form to Eduardo with the recruiter/client\'s name, email and message. Call ONLY when the user has explicitly provided their name, email and message.',
    inputSchema: jsonSchema<{ name: string; email: string; message: string }>({
      type: 'object',
      properties: {
        name:    { type: 'string', description: es ? 'Nombre del contacto' : 'Contact name' },
        email:   { type: 'string', description: es ? 'Email del contacto' : 'Contact email' },
        message: { type: 'string', description: es ? 'Mensaje para Eduardo' : 'Message for Eduardo' },
      },
      required: ['name', 'email', 'message'],
    }),
    execute: async (args: { name: string; email: string; message: string }) => {
      const safeName    = sanitizeStr(args.name).slice(0, 100);
      const rawEmail    = args.email.replace(/[<>"'`\s]/g, '').slice(0, 200);
      const safeMessage = sanitizeStr(args.message).slice(0, 1000);

      if (/[^\x00-\x7F]/.test(rawEmail)) {
        return { success: false, reason: 'email_non_ascii' };
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
        return { success: false, reason: 'invalid_email' };
      }

      if (safeMessage.length < 10 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeMessage)) {
        return { success: false, reason: 'missing_message' };
      }

      const result = await sendEmail({
        name:    safeName,
        email:   rawEmail,
        message: safeMessage,
        source:  'EduBot',
      });

      return result.success
        ? { success: true, name: safeName }
        : { success: false, reason: result.reason };
    },
  },

  showCommentForm: {
    description: es
      ? 'Muestra un formulario para dejar un comentario o reseña sobre Eduardo. Llamar cuando el usuario quiere dejar un comentario, review, testimonio o valoración.'
      : 'Shows a form to leave a comment or review about Eduardo. Call when the user wants to leave a comment, review, testimonial or rating.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => ({
      showForm: true,
    }),
  },

  submitComment: {
    description: es
      ? 'Envía un comentario/reseña del usuario. Llamar SOLO cuando el usuario proporcionó nombre, estrellas (1-5) y mensaje.'
      : 'Submits a user comment/review. Call ONLY when the user provided name, stars (1-5) and message.',
    inputSchema: jsonSchema<{ name: string; stars: number; message: string }>({
      type: 'object',
      properties: {
        name:    { type: 'string', description: es ? 'Nombre del usuario' : 'User name' },
        stars:   { type: 'number', description: es ? 'Estrellas (1-5)' : 'Stars (1-5)' },
        message: { type: 'string', description: es ? 'Comentario' : 'Comment' },
      },
      required: ['name', 'stars', 'message'],
    }),
    execute: async (args: { name: string; stars: number; message: string }) => {
      const safeName    = sanitizeStr(args.name).slice(0, 100);
      const safeStars   = Math.min(5, Math.max(1, Number(args.stars) || 5));
      const safeMessage = sanitizeStr(args.message).slice(0, 1000);

      if (!safeName || !safeMessage) {
        return { success: false, reason: 'missing_fields' };
      }

      try {
        const url = process.env.KV_REST_API_URL;
        const token = process.env.KV_REST_API_TOKEN;
        if (!url || !token) {
          return { success: false, reason: 'db_not_configured' };
        }

        const getRes = await fetch(`${url}/get/portfolio:comments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const getData = await getRes.json();
        const comments: { name: string; stars: number; message: string; date: string }[] =
          Array.isArray(getData.result) ? getData.result : [];

        comments.push({ name: safeName, stars: safeStars, message: safeMessage, date: new Date().toISOString() });

        const setRes =         await fetch(`${url}/set/portfolio:comments`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(JSON.stringify(comments)),
        });
        const setData = await setRes.json();

        return { success: true, name: safeName, count: comments.length, setResult: setData.result };
      } catch (err) {
        return { success: false, reason: 'save_error', error: String(err) };
      }
    },
  },
};
}

export const toolsDefinition = getToolsDefinition('es');
