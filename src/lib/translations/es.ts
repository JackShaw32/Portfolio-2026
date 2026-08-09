export const es = {
    nav: {
      home: "Inicio",
      about: "Acerca de mí",
      skills: "Skills",
      performance: "Rendimiento",
      projects: "Proyectos",
      chat: "Chat IA",
      contact: "Contacto",
      comments: "Feedback",
      downloadCV: "Descargar CV",
      contactBtn: "Contactar",
      navigation: "Navegación",
      contactSection: "Contacto",
      switchLang: "EN",
      trajectory: "Experiencia",
      impact: "Impacto",
      hireMe: "Contrátame",
      rightsReserved: "Todos los derechos reservados",
    },
    hero: {
      heading: "Desarrollo Web & Productos Digitales",
      subtitle:
        "Construyendo con una mirada técnica y creando experiencias modernas.",
      description:
        "Software Engineer especializado en Full Stack Development, e-commerce y productos web modernos.",
      viewProjects: "Ver mis proyectos",
      connectLinkedIn: "Conectar en LinkedIn",
    },
    about: {
      title: "Acerca de",
      titleHighlight: "mí",
      bio1: "Me llamo Eduardo Cabral y soy desarrollador de software en Argentina. Empecé en programación por curiosidad: quería entender cómo funcionan las aplicaciones por dentro y cómo se construyen los sistemas que usamos todos los días en internet.",
      bio2: "Hoy trabajo principalmente con JavaScript, React y Node.js, desarrollando aplicaciones web completas y productos digitales. Entre mis proyectos destaca un e-commerce creado desde cero con arquitectura full-stack, autenticación segura y pagos online.",
      bio3: "Cuando no estoy programando, suelo estar aprendiendo nuevas tecnologías o construyendo proyectos propios. Mi objetivo es seguir creciendo como desarrollador y contribuir a proyectos que resuelvan problemas reales con tecnología.",
    },
    skills: {
      title: "Trayectoria",
      contactMe: "Contáctame",
      whatsappContact: "Contacto en WhatsApp",
      downloadCVSpanish: "Descargar CV en Español",
      downloadCVEnglish: "Download CV in English",
      workExperience: "Experiencia Laboral",
      education: "Estudios",
      yearsExp: "Años Exp.",
      seeMore: "Ver más",
      seeLess: "Ver menos",
      languages: "Español / Inglés (B2)",
      experience: [
        {
          role: "Full Stack SSR Developer",
          company: "Gearthlogic LLC",
          period: "Jun. 2025 - Oct. 2025",
          description:
            "Resolución de problemas críticos en producción, refactorización de componentes en React + TypeScript y optimización de APIs en Node/Express. Sincronización de datos en tiempo real con Firestore y Cloud Functions. Implementación de Strapi v5 como CMS e integración de IA (Gemini 2.5) para el autocompletado inteligente de formularios dinámicos.",
          tech: ["React.js", "TypeScript", "Node.js", "Firebase", "GCP", "Strapi"],
        },
        {
          role: "Desarrollador Full Stack",
          company: "Freelance",
          period: "Mar. 2023 - Presente",
          description:
            "Desarrollo integral de aplicaciones web escalables y a medida. Creación de interfaces de usuario dinámicas, responsivas y optimizadas, abarcando desde el frontend hasta el diseño de arquitectura de bases de datos y desarrollo de APIs RESTful.",
          tech: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "JavaScript"],
        },
      ],
      educationItems: [
        {
          degree: "Programador Web FullStack",
          institution: "DevSchool Academia",
          period: "Ene. 2023",
        },
        {
          degree: "Bootcamp Real",
          institution: "Código en Casa",
          period: "Jul. 2022",
        },
        {
          degree: "Programación desde Cero",
          institution: "Egg Live",
          period: "Ene. 2022",
        },
      ],
    },
    projects: {
      title: "Proyectos Destacados",
      titleHighlight: "",
      subtitle:
        "Aplicaciones y productos digitales en los que trabajé.",
      keyFeatures: "Características Clave:",
      visitSite: "Ver sitio",
      viewProject: "Ver Proyecto",
      viewDetails: "Ver detalle",
      repository: "Repositorio",
      backToPortfolio: "Volver al portfolio",
      yearLabel: "Año",
      techStack: "Stack tecnológico",
      nextProject: "Siguiente proyecto",
      archOverview: "Resumen de Arquitectura",
      systemDiagramLabel: "Diagrama del Sistema",
      externalIntegrations: "Integraciones Externas",
      projects: [
        {
          title: "1/4 de Milla E-Commerce",
          role: "Full-Stack Developer & Architect",
          description:
            "E-commerce **B2C** de indumentaria automotriz con **React 18**, **Vite 6**, **Express 4**, **MongoDB**, **MercadoPago**, **Meta CAPI** y **Cloudinary**, priorizando escalabilidad, testing y **rendimiento**.",
          intro:
            "Plataforma completa construida desde cero con frontend en **React 18** + **Vite 6** y backend en **Express 4** + **MongoDB**. Integra **MercadoPago**, **Meta CAPI**, **Google OAuth** y **Cloudinary**. Incluye **119 tests** y **11 specs E2E**.",
          features: [
            "Frontend React 18 + Vite 6: lazy loading, code splitting, Tailwind CSS, Framer Motion, Swiper carousel, Lenis smooth scroll",
            "Backend Express 4 + MongoDB: 30+ endpoints, 12 modelos, seguridad multicapa, background jobs idempotentes",
            "Autenticación JWT + Google OAuth: cookies httpOnly, refresh tokens, lockout de cuenta, rutas protegidas",
            "MercadoPago: Bricks, transferencias, webhooks idempotentes, gift cards, cupones con reserve/consume",
            "Meta Pixel + CAPI: eventos duplicados browser/server con PII hasheada para atribución post-iOS14",
            "Panel admin: CRUD completo de productos, combos, gift cards, cupones, banners, usuarios y pedidos",
            "Background jobs: email de carrito abandonado, limpieza de órdenes expiradas y reservas stale",
            "Testing: 119 unitarios (Vitest) + 11 E2E (Playwright) + auditorías Lighthouse automáticas",
          ],
          sections: [
            {
              title: "Frontend — React 18 + Vite 6",
              description: "Aplicación **SPA** moderna con **React 18** y **Vite 6**, reemplazando CRA por HMR instantáneo y mejor tree shaking.",
              items: [
                "**Code splitting manual**: chunks separados para Swiper, SweetAlert2, iconos y MercadoPago SDK",
                "**Lazy loading** de todas las páginas con `React.lazy()` + `<Suspense>`",
                "**React Router DOM** con paginación en pathname (`/autos-page2`) para SEO",
                "**Tres contextos** (Auth, Cart, Products) sin Redux ni Zustand",
                "**Lenis** para smooth scroll como singleton",
                "**Cloudinary** con buckets de ancho (240–1600px), `f_auto`, `q_auto:good` y cache LRU",
                "**Facebook Pixel** + **Meta CAPI** con `event_id` compartido para deduplicación",
              ],
            },
            {
              title: "Backend — Express 4 + MongoDB",
              description: "**API REST** en **Express 4** con **MongoDB** (Mongoose), seguridad multicapa y patrones de robustez.",
              items: [
                "**Seguridad en capas**: sanitización NoSQL, validación de Origen, CSRF, rate limiting, Helmet headers",
                "**JWT en cookies httpOnly** con access_token (3h) + refresh_token (30d) y renovación automática",
                "**Lockout de cuenta**: 10 intentos fallidos bloquean el login temporalmente",
                "**Reserve/consume** para stock, cupones y gift cards — evita race conditions",
                "**Background jobs** idempotentes: carritos abandonados, órdenes expiradas, reservas stale",
                "**Graceful shutdown**: SIGINT/SIGTERM cierran conexiones sin perder requests",
                "30+ **endpoints REST** y 12 **modelos Mongoose**",
              ],
            },
            {
              title: "Pagos — MercadoPago",
              description: "Integración completa con **MercadoPago** vía Bricks, webhooks y transferencias bancarias.",
              items: [
                "Flujo: frontend crea preferencia → Brick renderiza → webhook notifica → backend verifica estado real",
                "**Webhooks idempotentes**: verifican estado actual antes de procesar notificaciones duplicadas",
                "**Transferencia bancaria**: stock reservado hasta confirmación, liberación automática si expira",
                "**Gift cards** con ciclo reserve → consume → auto-release en fallo",
                "**Cupones** (porcentaje o fijo) con reserve/consume y distribución por email",
              ],
            },
            {
              title: "Tracking — Meta Pixel + CAPI",
              description: "Estrategia **dual** (browser + server) para máxima atribución post-iOS14.",
              items: [
                "**Facebook Pixel** desde browser: ViewContent, AddToCart, InitiateCheckout, Purchase",
                "**Meta CAPI** desde backend: mismos eventos con PII hasheada (email, nombre, IP)",
                "**Deduplicación**: mismo `event_id` en ambas fuentes",
                "**Server-side tracking** funciona incluso con ad blockers",
              ],
            },
            {
              title: "Cloudinary — Imágenes",
              description: "CDN con optimización automática y transformaciones inteligentes.",
              items: [
                "**`f_auto`**: WebP/AVIF según soporte del browser",
                "**`q_auto:good`**: calidad adaptativa por contenido",
                "**`dpr_auto`**: soporte retina (2x, 3x)",
                "**Buckets de ancho** (240–1600px) para máximos cache hits",
                "**Cache LRU** en memoria (500 entradas)",
                "**Validación MIME** estricta con file-type en uploads",
              ],
            },
            {
              title: "Testing",
              description: "Suite completa con cobertura y auditorías de performance.",
              items: [
                "**119 unit tests** (Vitest + Testing Library)",
                "**11 E2E specs** (Playwright): 122 passed, 2 skipped, 0 failed",
                "**Lighthouse audits** automáticas: Desktop 92–98 Performance, CLS <0.01",
                "**Cobertura backend**: 70% líneas, 60.5% branches (falla CI si no se alcanza)",
              ],
            },
          ],
          techCategories: [
            { label: "Frontend", items: ["React 18", "Vite 6", "Tailwind CSS 3", "Framer Motion", "Swiper", "React Router DOM", "Axios", "Lenis"] },
            { label: "Backend", items: ["Node.js", "Express 4", "MongoDB", "Mongoose", "JWT", "bcrypt", "Nodemailer", "Cloudinary SDK", "Helmet"] },
            { label: "Pagos y Tracking", items: ["MercadoPago SDK", "Meta Pixel", "Meta Conversions API", "Google OAuth"] },
            { label: "Testing", items: ["Vitest", "Testing Library", "Playwright", "Supertest", "Lighthouse"] },
            { label: "Infraestructura", items: ["Netlify", "Render", "Cloudinary CDN", "MongoDB Atlas"] },
          ],
          responsibilities: [
            "Arquitectura full-stack completa (frontend + backend + DB + infra)",
            "Frontend SPA con React 18, Vite 6, lazy loading y code splitting manual",
            "Backend REST con Express 4, MongoDB, seguridad multicapa y 30+ endpoints",
            "Integración de pagos MercadoPago (Bricks, webhooks, transferencias, gift cards, cupones)",
            "Meta Pixel + CAPI con tracking dual browser/server y deduplicación",
            "Testing: 119 unitarios + 11 E2E + auditorías Lighthouse",
            "Deploy en Netlify (frontend) + Render (backend)",
          ],
          architectureOverview: [
            { layer: "Frontend",       tech: "React 18 SPA + Vite 6 + Tailwind CSS 3" },
            { layer: "Backend",        tech: "Express 4 REST API + MongoDB (Mongoose)" },
            { layer: "Autenticación",  tech: "JWT httpOnly + Google OAuth + bcrypt" },
            { layer: "Pagos",          tech: "MercadoPago Bricks + Webhooks + Transferencias" },
            { layer: "Tracking",       tech: "Meta Pixel + CAPI (browser + server)" },
            { layer: "Media",          tech: "Cloudinary (f_auto, q_auto, buckets)" },
            { layer: "Testing",        tech: "Vitest + Testing Library + Playwright" },
            { layer: "Deploy",         tech: "Netlify + Render" },
          ],
          systemDiagram: {
            flow: ["User Browser", "React 18 SPA (Netlify)", "Express 4 API (Render)", "MongoDB Atlas"],
            integrations: ["MercadoPago", "Cloudinary", "Meta Pixel + CAPI", "Google OAuth"],
          },
          highlight: "Proyecto Estrella",
        },
        {
          title: "Logistica Expreso Omega",
          role: "Frontend Developer",
          description:
            "Sitio corporativo **B2B** desarrollado con tecnologías web nativas (**HTML5**, **CSS3**, **JavaScript Vanilla**) para una empresa del sector **logístico y de transporte**, priorizando velocidad de carga, simplicidad y **optimización SEO**.",
          intro:
            "El proyecto prioriza velocidad de carga, simplicidad tecnológica y optimización **SEO**, permitiendo que el sitio cargue rápidamente incluso en conexiones móviles o redes de baja velocidad.",
          features: [
            "Arquitectura Vanilla: Sin frameworks pesados para máximo rendimiento",
            "Generación de Leads: Formulario de cotización con validación nativa en JavaScript",
            "Carrusel personalizado: Visualización de contenido corporativo con transiciones suaves",
            "SEO Técnico: Estructura semántica HTML5 y optimización de metadatos",
          ],
          sections: [
            {
              title: "Ultra-Lightweight Architecture",
              description:
                "El sitio fue construido utilizando **HTML5**, **CSS3** y **JavaScript Vanilla**, evitando dependencias innecesarias.",
              items: [
                "Menor tamaño del bundle",
                "Tiempos de carga más rápidos",
                "Mayor control sobre el código",
                "Mejor rendimiento en dispositivos móviles",
              ],
            },
            {
              title: "Corporate Service Presentation",
              description:
                "La plataforma presenta los servicios logísticos de la empresa mediante una estructura clara y orientada a conversión.",
              items: [
                "Presentación institucional de la empresa",
                "Descripción de servicios de transporte y logística",
                "Secciones informativas para clientes",
                "Contenido estructurado para facilitar la lectura",
              ],
            },
            {
              title: "Lead Generation System",
              description:
                "Se implementó un formulario de contacto orientado a la generación de leads y solicitudes de cotización.",
              items: [
                "Validación nativa en **JavaScript**",
                "Campos optimizados para consultas comerciales",
                "Diseño accesible y fácil de completar",
                "Integración con el flujo de contacto de la empresa",
              ],
            },
            {
              title: "Custom Image Carousel",
              description:
                "Se desarrolló un carrusel visual personalizado para mostrar contenido corporativo e imágenes de las operaciones logísticas.",
              items: [
                "Navegación manual",
                "Transiciones suaves",
                "Optimización para dispositivos móviles",
              ],
            },
            {
              title: "Diseño Responsive",
              description:
                "La interfaz fue diseñada utilizando **Bootstrap** y **CSS** personalizado, garantizando compatibilidad con todos los dispositivos.",
              items: ["Desktop", "Tablets", "Smartphones"],
            },
            {
              title: "SEO Optimization",
              description:
                "Se implementaron prácticas de **SEO técnico** para mejorar la visibilidad del sitio en buscadores.",
              items: [
                "Estructura semántica con **HTML5**",
                "Optimización de metadatos",
                "Estructura clara de headings",
                "Mejora de indexación en motores de búsqueda",
              ],
            },
            {
              title: "Arquitectura del Proyecto",
              description:
                "El proyecto fue desarrollado como un sitio estático optimizado utilizando tecnologías web nativas.",
              subsections: [
                {
                  title: "Frontend",
                  description:
                    "Desarrollo completo con tecnologías nativas, responsable de:",
                  items: [
                    "Estructura semántica **HTML5**",
                    "Estilos responsivos con **CSS** y **Bootstrap**",
                    "Interacciones dinámicas con **JavaScript Vanilla**",
                    "Optimización para SEO y rendimiento",
                  ],
                },
              ],
            },
          ],
          techCategories: [
            { label: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "Bootstrap"] },
            { label: "SEO & Performance", items: ["SEO Optimization"] },
            { label: "Infraestructura", items: ["Web Hosting", "Responsive Design"] },
          ],
          responsibilities: [
            "Diseño de la arquitectura del sitio",
            "Desarrollo completo del frontend",
            "Implementación de UI responsive",
            "Optimización SEO y rendimiento",
          ],
          architectureOverview: [
            { layer: "Frontend",    tech: "HTML5 + CSS3 + Vanilla JavaScript" },
            { layer: "CSS Framework", tech: "Bootstrap" },
            { layer: "SEO",         tech: "HTML semántico + Meta tags" },
            { layer: "Rendimiento", tech: "Optimización de assets + lazy loading" },
            { layer: "Deploy",      tech: "Web Hosting" },
          ],
          systemDiagram: {
            flow: ["User Browser", "HTML + CSS + JS", "Web Hosting / CDN"],
            integrations: [],
          },
          highlight: "Corporate & Performance",
        },
      ],
    },
    optimizations: {
      title: "Enfoque en ",
      titleHighlight: "rendimiento",
      subtitle: "Desarrollo web centrado en rendimiento, usabilidad y claridad técnica.",
      techUsed: "Tecnologías que utilizo para lograr alto rendimiento",
      features: [
        {
          title: "Carga optimizada",
          description:
            "Implementación de SSR/SSG, lazy loading y optimización de recursos para mejorar los tiempos de carga y la experiencia del usuario desde el primer render.",
        },
        {
          title: "SEO Técnico",
          description:
            "Estructura semántica, meta etiquetas dinámicas, sitemap y datos estructurados para mejorar la indexación y visibilidad en buscadores.",
        },
        {
          title: "Accesibilidad",
          description:
            "Buenas prácticas de accesibilidad: navegación por teclado, contrastes adecuados y uso correcto de atributos ARIA según estándares WCAG.",
        },
        {
          title: "Diseño Responsivo",
          description:
            "Interfaces adaptables que mantienen consistencia y usabilidad en distintos tamaños de pantalla.",
        },
      ],
    },
    impact: {
      title: "Impacto",
      titleHighlight: " Real",
      subtitle: "Números que muestran el trabajo, no solo el código.",
      cta: "Trabajar juntos",
      metrics: [
        { value: 10, suffix: "+", label: "Proyectos Construidos",    description: "Aplicaciones web full-stack en producción", ring: 80 },
        { value: 3,  suffix: "+", label: "Años de Experiencia",      description: "Desarrollando productos digitales",          ring: 60 },
        { value: 45, suffix: "%", label: "Mejora de Performance",    description: "Optimización en proyectos React en producción", ring: 45 },
        { value: 30, suffix: "%", label: "Reducción de Deuda Técnica", description: "En refactorizaciones de componentes React",  ring: 30 },
      ],
    },
    footer: {
      tagline:
        "Construyo productos digitales que generan impacto real.",
      navigation: "Navegación",
      technologies: "Built with",
      madeWith: "Hecho con",
      by: "por",
      privacy: "Privacidad",
      terms: "Términos",
      links: [
        { name: "Inicio", href: "#top" },
        { name: "Experiencia", href: "#skills" },
        { name: "Proyectos", href: "#projects" },
        { name: "Rendimiento", href: "#optimizations" },
        { name: "Acerca de mí", href: "#about" },
        { name: "Contacto", href: "#contact" },
        { name: "Email", href: "mailto:jackshaw@live.com.ar" },
      ],
    },
    comments: {
      title: "Feedback",
      titleHighlight: "",
      subtitle: "",
      empty: "",
      loading: "Cargando...",
      verified: "Comentario verificado",
    },
    contact: {
      sectionTitle: "Contacto",
      findMe: "Encontrame en",
      available: "Disponible",
      availableText: "Abierto a nuevos desafíos profesionales.",
      locationLabel: "Ubicación",
      locationValue: "Córdoba, Argentina 🇦🇷",
      modalTitle: "Contacto",
      modalSubtitle: "Te respondo en menos de 24 horas.",
      nameLabel: "Nombre",
      emailLabel: "Email",
      messageLabel: "Mensaje",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@email.com",
      messagePlaceholder: "Contame sobre tu proyecto...",
      sendBtn: "Enviar mensaje",
      sendingBtn: "Enviando...",
      errorText: "Hubo un error al enviar. Intentá de nuevo.",
      successTitle: "¡Mensaje enviado!",
      successText: "¡Gracias por contactarte! Te respondo pronto.",
      successTextLong:
        "Te respondo en menos de 24 horas. ¡Gracias por contactarte!",
      sendAnother: "Enviar otro mensaje",
      closeBtn: "Cerrar",
    },
    chat: {
      online: "En línea",
      typing: "Escribiendo...",
      placeholder: "Escribí /help o preguntá...",
      openLabel: "¡Hablá conmigo!",
      closeLabel: "Cerrar Chat",
      expandLabel: "Expandir chat",
      collapseLabel: "Reducir chat",
      closeChat: "Cerrar chat",
      openChat: "Abrir chat con EduBot",
      suggestions: [
        "¿Qué sabe de React?",
        "¿Cómo contactarlo?",
        "Quiero enviarle un mensaje a Edu",
      ],
      responses: {
        default:
          "¡Hola! Soy el asistente virtual de Eduardo Cabral. Puedo contarte sobre su experiencia en React, Node.js, MongoDB y más. ¿Qué quieres saber?",
        react:
          "Eduardo tiene amplia experiencia con React. Ha construido desde e-commerces hasta landing pages complejas con hooks avanzados, context y optimizaciones de rendimiento.",
        node:
          "Eduardo usa Node.js y Express para construir APIs robustas y escalables. Tiene experiencia en integración con bases de datos como MongoDB y PostgreSQL.",
        contact:
          "Podés contactar a Eduardo en LinkedIn o por email a jackshaw@live.com.ar. También podés usar el formulario de contacto de este mismo portafolio.",
      },
    },
};
