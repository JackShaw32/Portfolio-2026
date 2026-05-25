import { jsonSchema } from 'ai';
import { sendEmail } from '../services/emailService';

const sanitizeStr = (s: string) =>
  s.replace(/<[^>]*>/g, '').replace(/[<>"'`]/g, '').slice(0, 300);

export const toolsDefinition = {
  // showProject
  showProject: {
    description: 'Muestra una tarjeta visual interactiva de un proyecto de Eduardo. Llamar SOLO cuando el usuario pide explícitamente VER un proyecto. Para mostrar TODOS los proyectos, llamar esta función UNA VEZ POR CADA proyecto.',
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
      if (!args?.title) return { title: 'Proyecto', description: '', tech: [], url: '#', image: '' };
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
      return {
        title:       sanitizeStr(args.title),
        description: sanitizeStr(args.description),
        tech:        (args.tech ?? '').split(',').map((t: string) => sanitizeStr(t.trim())).filter(Boolean),
        url:         safeUrl,
        image:       safeImage,
      };
    },
  },

  // showContact
  showContact: {
    description: 'Muestra una tarjeta interactiva con todos los medios para contactar a Eduardo: LinkedIn, email, CV y portfolio. Llamar cuando alguien pregunta cómo contactar o contratar a Eduardo.',
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
    description: 'Muestra una visualización del tech stack de Eduardo con badges organizados por categoría. Llamar cuando preguntan por tecnologías, habilidades o conocimientos técnicos.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => ({
      categories: [
        { name: 'Frontend',       skills: ['React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind CSS', 'Redux', 'Angular'] },
        { name: 'Backend',        skills: ['Node.js', 'NestJS', 'Express.js', 'JWT', 'Firebase', 'Strapi', 'REST APIs'] },
        { name: 'Bases de datos', skills: ['MongoDB', 'PostgreSQL', 'Firestore'] },
        { name: 'Cloud & DevOps', skills: ['AWS EC2', 'S3', 'GCP', 'Docker', 'Git & GitHub'] },
        { name: 'Pagos & otros',  skills: ['Mercado Pago', 'Meta Pixel', 'Scrum/Agile', 'Zod', 'React Hook Form'] },
      ],
    }),
  },

  // showExperience
  showExperience: {
    description: 'Muestra un timeline visual con la experiencia profesional y educación de Eduardo. Llamar cuando preguntan por experiencia, trayectoria, o historial laboral.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => ({
      items: [
        {
          period:  '2023 – Presente',
          role:    'Freelance Full-Stack Developer',
          company: 'Proyectos propios y para clientes',
          years:   '3+ años',
          current: true,
        },
        {
          period:  'Jun. 2025 - Oct. 2025',
          role:    'Full Stack SSR Developer',
          company: 'Gearthlogic LLC',
          years:   '',
          current: false,
          description: 'Resolución de problemas críticos en producción, refactorización en React + TypeScript y optimización de APIs Node/Express. Sincronización en tiempo real con Firestore y Cloud Functions. Strapi v5 como CMS e integración de IA (Gemini 2.5) para autocompletado de formularios dinámicos.',
          tech: 'React.js, TypeScript, Node.js, Firebase, GCP, Strapi',
        },
        {
          period:  'Dic. 2023',
          role:    'Full Stack Web Developer',
          company: 'DevSchool Academia',
          years:   '',
          current: false,
        },
        {
          period:  'Jul. 2022',
          role:    'Frontend Developer Bootcamp',
          company: 'Primera Edición en Código en Casa',
          years:   '',
          current: false,
        },
        {
          period:  'Ene. 2022',
          role:    'Programación desde Cero',
          company: 'Egg Live',
          years:   '',
          current: false,
        },
      ],
    }),
  },

  // showRecommendation
  showRecommendation: {
    description: 'Muestra una tarjeta de recomendación profesional explicando por qué contratar a Eduardo, para qué tipo de proyectos es ideal, y qué lo hace destacar. Llamar cuando preguntan "por qué contratarlo", "recomiéndame", "would you recommend him", "why should I hire", "es bueno para", "is he a good fit", o evaluaciones de su perfil.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => ({
      strengths: [
        'Arquitectura full-stack completa: diseña y construye desde la DB hasta el frontend',
        'E-commerce end-to-end: pagos, tracking, auth, CMS, testing, deploy — todo hecho por él',
        'Seguridad y robustez: rate limiting, sanitización, JWT httpOnly, inyección NoSQL, CSRF',
        'Testing real: 119 unit tests + 11 E2E + Lighthouse audits automáticas',
        'Product mindset: entiende el negocio, no solo el código',
        'Autodidacta y rápido: de bootcamp a e-commerce en producción en menos de 2 años',
      ],
      idealFor: [
        'E-commerce y plataformas B2C con pagos integrados',
        'Aplicaciones web full-stack con React + Node.js',
        'Startups que necesitan un dev que cubra frontend y backend',
        'Proyectos que requieren integraciones con APIs externas (pagos, tracking, auth OAuth)',
        'Equipos remotos, Scrum, código con review y testing',
      ],
      differentiators: [
        'Stack moderno y actualizado (React 18, Vite 6, Tailwind v4, Astro v5)',
        'Experiencia con IA (Gemini 2.5, Vercel AI SDK, Groq)',
        'Arquitecturas limpias con separación de concerns',
        'Inglés intermedio, comunicación clara, auto-gestión',
        'Disponibilidad inmediata para proyectos freelance y remoto',
      ],
      recommendationScore: 92,
    }),
  },

  // showArchitecture
  showArchitecture: {
    description: 'Muestra un diagrama visual de la arquitectura técnica de los proyectos de Eduardo o del portfolio en sí. Llamar cuando preguntan "arquitectura", "cómo está estructurado", "diagrama", "flujo", "architecture", "stack diagram", o cómo se conectan los componentes.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => ({
      portfolio: {
        title: 'Portfolio — EduCabral',
        layers: [
          { name: 'CDN / Edge',     tech: 'Vercel Edge + ISR',       color: 'blue' },
          { name: 'Frontend',       tech: 'Astro v5 + React 19',    color: 'indigo' },
          { name: 'Estilos',        tech: 'Tailwind CSS v4',        color: 'cyan' },
          { name: 'Animaciones',    tech: 'GSAP + Lenis',          color: 'purple' },
          { name: 'API Routes',     tech: 'Astro SSR Functions',    color: 'emerald' },
          { name: 'AI Chatbot',     tech: 'Vercel AI SDK + Groq',  color: 'pink' },
          { name: 'Seguridad',      tech: 'Rate Limit + Sanitize',  color: 'red' },
        ],
        flow: ['User Browser', 'Astro SSR / ISR', 'React Islands', 'API (Groq / Resend / OG)'],
        integrations: ['Groq LLM', 'Resend Email', 'Vercel Edge'],
      },
      projects: [
        {
          title: '1/4 de Milla E-Commerce',
          layers: [
            { name: 'Frontend',     tech: 'React 18 + Vite 6',     color: 'blue' },
            { name: 'Estilos',      tech: 'Tailwind CSS 3',         color: 'cyan' },
            { name: 'Auth',         tech: 'JWT httpOnly + Google',  color: 'amber' },
            { name: 'Backend',      tech: 'Express 4 REST API',    color: 'emerald' },
            { name: 'DB',           tech: 'MongoDB + Mongoose',     color: 'green' },
            { name: 'Pagos',        tech: 'MercadoPago Bricks',    color: 'pink' },
            { name: 'Tracking',     tech: 'Meta Pixel + CAPI',     color: 'purple' },
            { name: 'Infra',        tech: 'Netlify + Render',       color: 'slate' },
          ],
          flow: ['User', 'React SPA (Netlify)', 'Express API (Render)', 'MongoDB Atlas'],
          integrations: ['MercadoPago', 'Cloudinary', 'Meta CAPI', 'Google OAuth'],
        },
        {
          title: 'Expreso Omega Logistics',
          layers: [
            { name: 'Frontend',     tech: 'HTML5 + CSS3 + JS',     color: 'blue' },
            { name: 'Framework CSS',tech: 'Bootstrap 5',            color: 'purple' },
            { name: 'SEO',          tech: 'Meta + Semántica',      color: 'green' },
            { name: 'Hosting',      tech: 'Web Hosting',            color: 'slate' },
          ],
          flow: ['User', 'Static Site', 'Web Hosting'],
          integrations: [],
        },
      ],
    }),
  },

  // showProfile
  showProfile: {
    description: 'Muestra un resumen completo del perfil profesional de Eduardo: rol, ubicación, stack principal, enfoque y disponibilidad. Llamar cuando preguntan quién es, qué hace, su perfil en general, o "contame sobre vos".',
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
        focus: 'Construyendo aplicaciones web modernas, e-commerce y productos escalables con React, Next.js, Node.js y TypeScript.',
        experience: '3+ años como Full-Stack Developer',
        stack: [
          'Frontend: React, Next.js, Astro, TypeScript, Tailwind CSS v4',
          'Backend: Node.js, Express, NestJS, REST APIs, JWT',
          'DBs: MongoDB, PostgreSQL, Firestore',
          'Cloud: AWS (EC2, S3, CloudFront), GCP, Docker',
          'Pagos: MercadoPago, Meta Pixel & Conversions API',
        ],
        available,
        availableFrom: import.meta.env.AVAILABLE_FROM ?? 'Inmediato',
        workMode: ['Remoto', 'Híbrido'],
        portfolio: 'https://jackshaw32.vercel.app/',
      };
    },
  },

  // showAvailability
  showAvailability: {
    description: 'Muestra el estado actual de disponibilidad de Eduardo para nuevas oportunidades laborales. Llamar cuando preguntan si está disponible, buscando trabajo, o cuándo puede empezar.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => {
      const available     = (import.meta.env.EDUARDO_AVAILABLE ?? 'true') !== 'false';
      const availableFrom = import.meta.env.AVAILABLE_FROM ?? 'Inmediato';
      return {
        available,
        availableFrom,
        timezone: 'GMT-3 (Argentina)',
        preferredRoles: ['Full-Stack Developer', 'Frontend Developer', 'Backend Developer'],
        workMode: ['Remoto', 'Híbrido'],
      };
    },
  },

  // showImpact
  showImpact: {
    description: 'Muestra una tarjeta con las métricas de impacto, logros y Lighthouse scores de Eduardo. Llamar cuando preguntan por impacto, métricas, KPIs, logros, números o resultados profesionales.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => ({
      metrics: [
        { value: '10+', labelEs: 'Proyectos construidos',   labelEn: 'Projects built',       description: 'Aplicaciones web full-stack en producción' },
        { value: '3+',  labelEs: 'Años de experiencia',     labelEn: 'Years of experience',  description: 'Desarrollando productos digitales' },
        { value: '45%', labelEs: 'Mejora de performance',   labelEn: 'Performance boost',    description: 'Optimizaciones React en producción' },
        { value: '30%', labelEs: 'Reducción deuda técnica', labelEn: 'Tech debt cut',        description: 'Refactorizaciones de componentes React' },
        { value: '100%',labelEs: 'Sistemas en producción',  labelEn: 'Production systems',   description: 'Proyectos desplegados y en vivo' },
      ],
      lighthouse: { performance: 97, accessibility: 94, bestPractices: 95, seo: 98 },
    }),
  },

  // sendContactForm
  sendContactForm: {
    description: 'Envía un formulario de contacto a Eduardo con nombre, email y mensaje del recruiter/cliente. Llamar SOLO cuando el usuario ya proporcionó explícitamente su nombre, email y mensaje.',
    inputSchema: jsonSchema<{ name: string; email: string; message: string }>({
      type: 'object',
      properties: {
        name:    { type: 'string', description: 'Nombre del contacto' },
        email:   { type: 'string', description: 'Email del contacto' },
        message: { type: 'string', description: 'Mensaje para Eduardo' },
      },
      required: ['name', 'email', 'message'],
    }),
    execute: async (args: { name: string; email: string; message: string }) => {
      const safeName    = sanitizeStr(args.name).slice(0, 100);
      const safeEmail   = args.email.replace(/[<>"'`\s]/g, '').slice(0, 200);
      const safeMessage = sanitizeStr(args.message).slice(0, 1000);

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
        return { success: false, reason: 'invalid_email' };
      }

      if (safeMessage.length < 10 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeMessage)) {
        return { success: false, reason: 'missing_message' };
      }

      const result = await sendEmail({
        name:    safeName,
        email:   safeEmail,
        message: safeMessage,
        source:  'EduBot',
      });

      return result.success
        ? { success: true, name: safeName }
        : { success: false, reason: result.reason };
    },
  },
};
