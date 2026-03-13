import { jsonSchema } from 'ai';
import { sendEmail } from '../services/emailService';

const sanitizeStr = (s: string) =>
  s.replace(/<[^>]*>/g, '').replace(/[<>"'`]/g, '').slice(0, 300);

export const toolsDefinition = {
  // -- 1. showProject ----------------------
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
      if (!args?.title) return null;
      const ALLOWED_URLS = [
        'https://uncuartodemilla.com/',
        'https://www.expresoomega.com/',
        'https://alfyvivi.com/',
      ];
      const ALLOWED_IMAGES = [
        '/projects/14milla.webp',
        '/projects/alfyvivi.webp',
        '/projects/omega.webp',
      ];
      const safeUrl   = ALLOWED_URLS.includes(args.url)     ? args.url   : '#';
      const safeImage = ALLOWED_IMAGES.includes(args.image) ? args.image : '';
      return {
        title:       sanitizeStr(args.title),
        description: sanitizeStr(args.description),
        tech:        args.tech.split(',').map((t: string) => sanitizeStr(t.trim())).filter(Boolean),
        url:         safeUrl,
        image:       safeImage,
      };
    },
  },

  // -- 2. showContact ----------------------
  showContact: {
    description: 'Muestra una tarjeta interactiva con todos los medios para contactar a Eduardo: LinkedIn, email, CV y portfolio. Llamar cuando alguien pregunta cómo contactar o contratar a Eduardo.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async () => ({
      linkedin:  'https://linkedin.com/in/raul-eduardo-cabral',
      email:     'jackshaw@live.com.ar',
      cvEs:      'https://drive.google.com/file/d/1rowPwlyhJPDIUqs-4N_WmLW_LS1Y7Noz/view?usp=sharing',
      cvEn:      'https://drive.google.com/file/d/1dPo1RNqasoNxXUjwk6nGuDBWIPoD2_mY/view?usp=sharing',
      portfolio: 'https://educabral.site/',
      phone:     '+54 9 351 858-8034',
      github:    'https://github.com/JackShaw32',
    }),
  },

  // -- 3. showSkills -----------------------
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

  // -- 4. showExperience -------------------
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

  // -- 5. showAvailability -----------------
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

  // -- 6. showImpact ----------------------
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

  // -- 7. sendContactForm ------------------
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

      // Require a real message — not empty, not an email address, not too short.
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
