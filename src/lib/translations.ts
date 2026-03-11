export const translations = {
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      skills: "Skills",
      projects: "Proyectos",
      chat: "Chat IA",
      contact: "Contacto",
      downloadCV: "Descargar CV",
      contactBtn: "Contactar",
      navigation: "Navegación",
      contactSection: "Contacto",
      switchLang: "EN",
      trajectory: "Experiencia",
    },
    hero: {
      available: "Disponible para nuevos desafíos",
      heading: "Soluciones Web Escalables con Impacto",
      description:
        "Full-Stack Developer especializado en soluciones e-commerce y arquitectura web moderna.",
      viewProjects: "Ver mis proyectos",
      connectLinkedIn: "Conectar en LinkedIn",
    },
    about: {
      title: "Sobre",
      titleHighlight: "mí",
      bio1: "Me llamo Eduardo Cabral y soy desarrollador de software en Argentina. Empecé en programación por curiosidad: quería entender cómo funcionan las aplicaciones por dentro y cómo se construyen los sistemas que usamos todos los días en internet.",
      bio2: "Hoy trabajo principalmente con JavaScript, React y Node.js, desarrollando aplicaciones web completas y productos digitales. Entre mis proyectos destaca un e-commerce creado desde cero con arquitectura full-stack, autenticación segura y pagos online.",
      bio3: "Cuando no estoy programando, suelo estar aprendiendo nuevas tecnologías o construyendo proyectos propios. Mi objetivo es seguir creciendo como desarrollador y contribuir a proyectos que resuelvan problemas reales con tecnología.",
    },
    skills: {
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
      title: "Mis Proyectos.. ",
      titleHighlight: "Mis Trabajos",
      subtitle:
        "Cada proyecto es un desafío, mi enfoque una solución sólida y escalable.",
      keyFeatures: "Características Clave:",
      visitSite: "Visitar sitio web en vivo",
      viewProject: "Ver Proyecto",
      viewDetails: "Ver detalle",
      repository: "Repositorio",
      backToPortfolio: "Volver al portfolio",
      yearLabel: "Año",
      techStack: "Stack tecnológico",
      nextProject: "Siguiente proyecto",
      projects: [
        {
          title: "1/4 de Milla E-Commerce",
          role: "Full-Stack Developer & Architect",
          description:
            "Plataforma completa de comercio electrónico **B2C** desarrollada con arquitectura **MERN** (**MongoDB**, **Express**, **React**, **Node.js**) para la venta de indumentaria inspirada en la cultura automotriz.",
          intro:
            "El proyecto fue diseñado y construido desde cero, implementando una arquitectura escalable basada en **API REST**, permitiendo gestionar el ciclo completo de un ecommerce: catálogo de productos, carrito de compras, procesamiento de pagos, gestión de usuarios y administración del contenido. La plataforma integra herramientas modernas de marketing, analítica y automatización de ventas, optimizando tanto la experiencia de compra del usuario como la gestión del negocio.",
          features: [
            "Panel de administración CMS: Gestión de productos, banners y usuarios",
            "Pagos automatizados: Integración nativa con Mercado Pago",
            "Marketing y SEO: Meta Pixel, API Conversions y recuperación de carrito",
            "Autenticación segura: Historial de órdenes, registro y recuperación de contraseñas",
          ],
          sections: [
            {
              title: "Panel de administración (CMS interno)",
              description: "Sistema administrativo desarrollado a medida para gestionar el contenido del **ecommerce**. Permite:",
              items: [
                "Crear, editar y eliminar **productos**",
                "Administrar **banners** y contenido visual",
                "Gestionar usuarios y clientes",
                "Controlar pedidos y estados de compra",
                "Subir imágenes optimizadas mediante **Cloudinary**",
              ],
            },
            {
              title: "Sistema de Ecommerce Completo",
              description: "Implementación de las funcionalidades esenciales de una tienda online moderna:",
              items: [
                "**Catálogo dinámico** de productos",
                "Visualización detallada de artículos",
                "Sistema de **carrito de compras**",
                "Actualización de cantidades en tiempo real",
                "Flujo completo de **checkout**",
              ],
            },
            {
              title: "Pagos automatizados",
              description: "Integración completa con **MercadoPago API** para el procesamiento seguro de pagos online. Incluye:",
              items: [
                "Generación dinámica de **preferencias de pago**",
                "Redirección automática al **checkout**",
                "Confirmación de transacciones",
                "Gestión de estados de compra",
              ],
            },
            {
              title: "Sistema de autenticación segura",
              description: "Sistema de autenticación basado en **JSON Web Tokens (JWT)**. Funcionalidades:",
              items: [
                "Registro de usuarios",
                "Inicio de sesión seguro",
                "Recuperación de contraseñas mediante email",
                "**Historial de órdenes** de compra",
                "Protección de **rutas privadas**",
              ],
            },
            {
              title: "Marketing y optimización de conversiones",
              description: "Herramientas de analítica y marketing para mejorar el rendimiento del ecommerce. Incluye:",
              items: [
                "**Meta Pixel**",
                "**Meta Conversions API**",
                "Seguimiento de eventos de compra",
                "Recuperación de **carritos abandonados**",
                "Optimización para campañas publicitarias",
              ],
            },
            {
              title: "SEO y optimización de contenido",
              description: "Implementación de mejoras para visibilidad en buscadores:",
              items: [
                "**Metadatos dinámicos**",
                "Optimización de estructura de páginas",
                "Mejor indexación de productos",
                "Discoverability en motores de búsqueda",
              ],
            },
            {
              title: "Arquitectura Técnica",
              description: "Arquitectura **cliente-servidor** desacoplada, separando el frontend de la lógica de negocio.",
              subsections: [
                {
                  title: "Frontend",
                  description: "Aplicación **Single Page Application (SPA)** desarrollada en **React** que gestiona:",
                  items: [
                    "Renderizado dinámico de productos",
                    "Navegación entre páginas",
                    "Interacción con la API",
                    "Gestión del carrito de compras",
                    "Experiencia visual del usuario",
                  ],
                },
                {
                  title: "Backend",
                  description: "**API REST** desarrollada con **Node.js** y **Express**, encargada de:",
                  items: [
                    "Lógica del ecommerce",
                    "Autenticación y seguridad",
                    "Gestión de productos y pedidos",
                    "Integración con pasarelas de pago",
                    "Procesamiento de datos",
                  ],
                },
                {
                  title: "Base de datos",
                  description: "**MongoDB** con **Mongoose** para el modelado de datos. Modelos principales:",
                  items: ["Usuarios", "Productos", "Pedidos", "Clientes"],
                },
              ],
            },
          ],
          techCategories: [
            { label: "Frontend", items: ["React", "JavaScript", "CSS3", "Bootstrap", "Axios", "Framer Motion", "Swiper", "React Helmet"] },
            { label: "Backend", items: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Nodemailer", "Cloudinary", "Multer"] },
            { label: "Integraciones", items: ["MercadoPago API", "Meta Pixel", "Meta Conversions API"] },
            { label: "Infraestructura", items: ["Netlify", "Render"] },
          ],
          responsibilities: [
            "Arquitectura completa del sistema",
            "Desarrollo del frontend",
            "Desarrollo del backend",
            "Integración de pasarela de pagos",
            "Implementación de marketing analytics",
            "Deployment e infraestructura",
          ],
          highlight: "Proyecto Estrella",
        },
        {
          title: "Alfy & Vivi — Evento",
          role: "Frontend Developer",
          description:
            "Landing page **interactiva** desarrollada para un **evento de casamiento**, centraliza toda la información en una experiencia web moderna, visual y completamente **responsive** que funciona como invitación digital.",
          intro:
            "El proyecto fue desarrollado como una **Single Page Application (SPA)** con **React**, incorporando animaciones, efectos visuales y optimización de recursos para ofrecer una experiencia **inmersiva** y de alto impacto visual.",
          features: [
            "SPA interactiva: Navegación fluida sin recargar la página",
            "Scroll Animations: Animaciones de entrada activadas por scroll con AOS",
            "Galería multimedia: Sliders con Swiper.js y lightbox con Yet Another React Lightbox",
            "UI Responsiva: Diseño adaptado a todos los dispositivos con Bootstrap y React Bootstrap",
          ],
          sections: [
            {
              title: "Interactive Landing Experience",
              description:
                "La aplicación fue desarrollada como una **Single Page Application** con **React**, permitiendo navegación fluida y carga dinámica de secciones sin recargar la página.",
              items: [
                "Navegación suave entre secciones",
                "Estructura modular de **componentes**",
                "Renderizado dinámico del contenido",
                "Optimización de carga",
              ],
            },
            {
              title: "Motion Design & Scroll Animations",
              description:
                "Para mejorar la experiencia visual se implementaron animaciones activadas por scroll mediante **AOS (Animate On Scroll)**.",
              items: [
                "Transiciones suaves entre secciones",
                "Animaciones de entrada de elementos",
                "Mejora del **storytelling visual** del sitio",
              ],
            },
            {
              title: "Galería Multimedia",
              description:
                "Se implementó una galería interactiva que permite explorar fotografías del evento.",
              items: [
                "**Swiper.js** para sliders dinámicos",
                "**Yet Another React Lightbox** para visualización ampliada",
                "Navegación táctil optimizada para dispositivos móviles",
              ],
            },
            {
              title: "Efectos Visuales Interactivos",
              description:
                "Para agregar dinamismo al sitio se integraron efectos visuales interactivos.",
              items: [
                "**Canvas Confetti** para efectos celebratorios",
                "Transiciones visuales suaves",
                "Interacción visual con elementos del sitio",
              ],
            },
            {
              title: "Diseño Totalmente Responsive",
              description:
                "La interfaz fue desarrollada utilizando **Bootstrap** y **React Bootstrap**, garantizando compatibilidad con todos los tamaños de pantalla.",
              items: ["Desktop", "Tablets", "Smartphones"],
            },
            {
              title: "Optimización de Rendimiento",
              description:
                "Se implementaron herramientas para mejorar el rendimiento y reducir el peso del bundle final.",
              items: [
                "**PurgeCSS** para eliminar CSS no utilizado",
                "**Sharp** para optimización de imágenes",
                "Build optimizado para producción",
              ],
            },
            {
              title: "Arquitectura del Proyecto",
              description:
                "Aplicación **SPA** desarrollada con **React**, responsable de:",
              subsections: [
                {
                  title: "Frontend",
                  description:
                    "Estructura basada en **componentes reutilizables** con **React**, facilitando la escalabilidad y el mantenimiento del código.",
                  items: [
                    "Renderizado del contenido",
                    "Navegación entre secciones",
                    "Manejo de componentes interactivos",
                    "Animaciones y experiencia visual",
                  ],
                },
              ],
            },
          ],
          techCategories: [
            { label: "Frontend", items: ["React", "React Router", "JavaScript", "Bootstrap", "React Bootstrap"] },
            { label: "UI & Animaciones", items: ["Swiper.js", "AOS Animations", "Yet Another React Lightbox", "Canvas Confetti"] },
            { label: "Optimización", items: ["PurgeCSS", "Sharp"] },
          ],
          responsibilities: [
            "Arquitectura del frontend",
            "Desarrollo de la interfaz",
            "Implementación de animaciones",
            "Integración de galerías multimedia",
            "Optimización de rendimiento",
          ],
          highlight: "Interactive Event Landing",
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
    footer: {
      tagline:
        "Construyo experiencias digitales con enfoque en rendimiento, accesibilidad y diseño moderno.",
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
        { name: "Skills", href: "#optimizations" },
        { name: "Sobre Mí", href: "#about" },
        { name: "Contacto", href: "#contact" },
      ],
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
      placeholder: "Escribí un mensaje...",
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
  },

  en: {
    nav: {
      home: "Home",
      about: "About me",
      skills: "Skills",
      projects: "Projects",
      chat: "AI Chat",
      contact: "Contact",
      downloadCV: "Download CV",
      contactBtn: "Contact",
      navigation: "Navigation",
      contactSection: "Contact",
      switchLang: "ES",
      trajectory: "Journey",
    },
    hero: {
      available: "Available for new challenges",
      heading: "Scalable web solutions with impact",
      description:
        "Full-Stack Developer specialized in e-commerce solutions and modern web architecture.",
      viewProjects: "View my projects",
      connectLinkedIn: "Connect on LinkedIn",
    },
    about: {
      title: "About",
      titleHighlight: "me",
      bio1: "My name is Eduardo Cabral and I'm a software developer based in Argentina. I got into programming out of curiosity: I wanted to understand how applications work under the hood and how the systems we use every day on the internet are built.",
      bio2: "Today I work mainly with JavaScript, React and Node.js, building full-stack web applications and digital products. One of my standout projects is an e-commerce platform built from scratch with full-stack architecture, secure authentication and online payments.",
      bio3: "When I'm not coding, I'm usually learning new technologies or working on personal projects. My goal is to keep growing as a developer and contribute to projects that solve real problems with technology.",
    },
    skills: {
      contactMe: "Contact me",
      whatsappContact: "WhatsApp Contact",
      downloadCVSpanish: "Descargar CV en Español",
      downloadCVEnglish: "Download CV in English",
      workExperience: "Work Experience",
      education: "Education",
      yearsExp: "Years Exp.",
      seeMore: "See more",
      seeLess: "See less",
      languages: "Spanish / English (B2)",
      experience: [
        {
          role: "Full Stack SSR Developer",
          company: "Gearthlogic LLC",
          period: "Jun. 2025 - Oct. 2025",
          description:
            "Resolution of critical production issues, component refactoring in React + TypeScript and API optimization in Node/Express. Real-time data synchronization with Firestore and Cloud Functions. Implementation of Strapi v5 as CMS and AI integration (Gemini 2.5) for intelligent auto-completion of dynamic forms.",
          tech: ["React.js", "TypeScript", "Node.js", "Firebase", "GCP", "Strapi"],
        },
        {
          role: "Full Stack Developer",
          company: "Freelance",
          period: "Mar. 2023 - Present",
          description:
            "Full-cycle development of scalable and custom web applications. Creation of dynamic, responsive and optimized user interfaces, ranging from frontend to database architecture design and RESTful API development.",
          tech: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "JavaScript"],
        },
      ],
      educationItems: [
        {
          degree: "FullStack Web Developer",
          institution: "DevSchool Academia",
          period: "Jan. 2023",
        },
        {
          degree: "Real Bootcamp",
          institution: "Código en Casa",
          period: "Jul. 2022",
        },
        {
          degree: "Programming from Scratch",
          institution: "Egg Live",
          period: "Jan. 2022",
        },
      ],
    },
    projects: {
      title: "My Projects.. ",
      titleHighlight: "My Work",
      subtitle:
        "Every project is a challenge; my approach, a solid and scalable solution.",
      keyFeatures: "Key Features:",
      visitSite: "Visit live website",
      viewProject: "View Project",
      viewDetails: "View details",
      repository: "Repository",
      backToPortfolio: "Back to portfolio",
      yearLabel: "Year",
      techStack: "Tech Stack",
      nextProject: "Next project",
      projects: [
        {
          title: "1/4 Mile E-Commerce",
          role: "Full-Stack Developer & Architect",
          description:
            "Complete **B2C** e-commerce platform built with **MERN** architecture (**MongoDB**, **Express**, **React**, **Node.js**) for automotive-inspired clothing.",
          intro:
            "Designed and built from scratch, implementing a scalable architecture based on **REST API**, managing the full ecommerce cycle: product catalog, shopping cart, payment processing, user management and content administration. The platform integrates modern marketing, analytics and sales automation tools, optimizing both the user shopping experience and business management.",
          features: [
            "CMS Admin Panel: Product, banner and user management",
            "Automated payments: Native Mercado Pago integration",
            "Marketing & SEO: Meta Pixel, Conversions API and cart recovery",
            "Secure authentication: Order history, registration and password recovery",
          ],
          sections: [
            {
              title: "Admin Panel (Internal CMS)",
              description: "Custom-built admin system to manage **ecommerce** content. Features:",
              items: [
                "Create, edit and delete **products**",
                "Manage **banners** and visual content",
                "Manage users and customers",
                "Track orders and purchase status",
                "Upload optimized images via **Cloudinary**",
              ],
            },
            {
              title: "Complete Ecommerce System",
              description: "Essential features for a modern online store:",
              items: [
                "**Dynamic product catalog**",
                "Detailed product view",
                "**Shopping cart** system",
                "Real-time quantity updates",
                "Complete **checkout** flow",
              ],
            },
            {
              title: "Automated Payments",
              description: "Full integration with **MercadoPago API** for secure online payment processing. Includes:",
              items: [
                "Dynamic **payment preferences** generation",
                "Automatic redirect to **checkout**",
                "Transaction confirmation",
                "Purchase state management",
              ],
            },
            {
              title: "Secure Authentication System",
              description: "Authentication system based on **JSON Web Tokens (JWT)**. Features:",
              items: [
                "User registration",
                "Secure login",
                "Password recovery via email",
                "**Order history**",
                "**Private route** protection",
              ],
            },
            {
              title: "Marketing & Conversion Optimization",
              description: "Analytics and marketing tools to improve ecommerce performance. Includes:",
              items: [
                "**Meta Pixel**",
                "**Meta Conversions API**",
                "Purchase event tracking",
                "**Abandoned cart** recovery",
                "Ad campaign optimization",
              ],
            },
            {
              title: "SEO & Content Optimization",
              description: "Improvements for search engine visibility:",
              items: [
                "**Dynamic metadata**",
                "Page structure optimization",
                "Better product indexing",
                "Search engine discoverability",
              ],
            },
            {
              title: "Technical Architecture",
              description: "Decoupled **client-server** architecture separating frontend from business logic.",
              subsections: [
                {
                  title: "Frontend",
                  description: "**Single Page Application (SPA)** in **React** managing:",
                  items: [
                    "Dynamic product rendering",
                    "Page navigation",
                    "API interaction",
                    "Shopping cart management",
                    "User visual experience",
                  ],
                },
                {
                  title: "Backend",
                  description: "**REST API** built with **Node.js** and **Express**, handling:",
                  items: [
                    "Ecommerce logic",
                    "Authentication and security",
                    "Product and order management",
                    "Payment gateway integration",
                    "Data processing",
                  ],
                },
                {
                  title: "Database",
                  description: "**MongoDB** with **Mongoose** for data modeling. Main models:",
                  items: ["Users", "Products", "Orders", "Customers"],
                },
              ],
            },
          ],
          techCategories: [
            { label: "Frontend", items: ["React", "JavaScript", "CSS3", "Bootstrap", "Axios", "Framer Motion", "Swiper", "React Helmet"] },
            { label: "Backend", items: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Nodemailer", "Cloudinary", "Multer"] },
            { label: "Integrations", items: ["MercadoPago API", "Meta Pixel", "Meta Conversions API"] },
            { label: "Infrastructure", items: ["Netlify", "Render"] },
          ],
          responsibilities: [
            "Complete system architecture",
            "Frontend development",
            "Backend development",
            "Payment gateway integration",
            "Marketing analytics implementation",
            "Deployment and infrastructure",
          ],
          highlight: "Star Project",
        },
        {
          title: "Alfy & Vivi — Event",
          role: "Frontend Developer",
          description:
            "**Interactive** landing page developed for a **wedding event**, centralizing all event information into a modern, visual and fully **responsive** web experience that works as a digital invitation.",
          intro:
            "The project was developed as a **Single Page Application (SPA)** with **React**, incorporating animations, visual effects and resource optimization to deliver an **immersive** and high-impact visual experience.",
          features: [
            "Interactive SPA: Smooth navigation without page reloads",
            "Scroll Animations: Entry animations triggered by scroll with AOS",
            "Multimedia gallery: Sliders with Swiper.js and lightbox with Yet Another React Lightbox",
            "Responsive UI: Design adapted to all devices with Bootstrap and React Bootstrap",
          ],
          sections: [
            {
              title: "Interactive Landing Experience",
              description:
                "The application was built as a **Single Page Application** with **React**, enabling smooth navigation and dynamic section loading without page reloads.",
              items: [
                "Smooth navigation between sections",
                "Modular **component** structure",
                "Dynamic content rendering",
                "Load optimization",
              ],
            },
            {
              title: "Motion Design & Scroll Animations",
              description:
                "Visual experience was enhanced by implementing scroll-triggered animations using **AOS (Animate On Scroll)**.",
              items: [
                "Smooth transitions between sections",
                "Element entry animations",
                "Enhanced **visual storytelling**",
              ],
            },
            {
              title: "Multimedia Gallery",
              description:
                "An interactive gallery was implemented to allow guests to explore event photos.",
              items: [
                "**Swiper.js** for dynamic sliders",
                "**Yet Another React Lightbox** for expanded viewing",
                "Touch-optimized navigation for mobile devices",
              ],
            },
            {
              title: "Interactive Visual Effects",
              description:
                "Interactive visual effects were integrated to add dynamism to the site.",
              items: [
                "**Canvas Confetti** for celebratory effects",
                "Smooth visual transitions",
                "Visual interaction with site elements",
              ],
            },
            {
              title: "Fully Responsive Design",
              description:
                "The interface was built using **Bootstrap** and **React Bootstrap**, ensuring compatibility with all screen sizes.",
              items: ["Desktop", "Tablets", "Smartphones"],
            },
            {
              title: "Performance Optimization",
              description:
                "Tools were implemented to improve performance and reduce the final bundle size.",
              items: [
                "**PurgeCSS** to eliminate unused CSS",
                "**Sharp** for image optimization",
                "Production-optimized build",
              ],
            },
            {
              title: "Project Architecture",
              description:
                "**SPA** application built with **React**, responsible for:",
              subsections: [
                {
                  title: "Frontend",
                  description:
                    "Structure based on **reusable components** with **React**, facilitating scalability and code maintainability.",
                  items: [
                    "Content rendering",
                    "Navigation between sections",
                    "Interactive component handling",
                    "Animations and visual experience",
                  ],
                },
              ],
            },
          ],
          techCategories: [
            { label: "Frontend", items: ["React", "React Router", "JavaScript", "Bootstrap", "React Bootstrap"] },
            { label: "UI & Animations", items: ["Swiper.js", "AOS Animations", "Yet Another React Lightbox", "Canvas Confetti"] },
            { label: "Optimization", items: ["PurgeCSS", "Sharp"] },
          ],
          responsibilities: [
            "Frontend architecture",
            "Interface development",
            "Animation implementation",
            "Multimedia gallery integration",
            "Performance optimization",
          ],
          highlight: "Interactive Event Landing",
        },
        {
          title: "Expreso Omega Logistics",
          role: "Frontend Developer",
          description:
            "**B2B** corporate website built with native web technologies (**HTML5**, **CSS3**, **Vanilla JavaScript**) for a company in the **logistics and transport** sector, prioritizing load speed, simplicity and **SEO optimization**.",
          intro:
            "The project prioritizes load speed, technological simplicity and **SEO** optimization, allowing the site to load quickly even on mobile connections or low-speed networks.",
          features: [
            "Vanilla Architecture: No heavy frameworks for maximum performance",
            "Lead Generation: Quote form with native JavaScript validation",
            "Custom Carousel: Corporate content display with smooth transitions",
            "Technical SEO: Semantic HTML5 structure and metadata optimization",
          ],
          sections: [
            {
              title: "Ultra-Lightweight Architecture",
              description:
                "The site was built using **HTML5**, **CSS3** and **Vanilla JavaScript**, avoiding unnecessary dependencies.",
              items: [
                "Smaller bundle size",
                "Faster load times",
                "Greater code control",
                "Better performance on mobile devices",
              ],
            },
            {
              title: "Corporate Service Presentation",
              description:
                "The platform presents the company's logistics services through a clear, conversion-oriented structure.",
              items: [
                "Company institutional presentation",
                "Description of transport and logistics services",
                "Informational sections for clients",
                "Structured content for easy reading",
              ],
            },
            {
              title: "Lead Generation System",
              description:
                "A contact form was implemented for lead generation and quote requests.",
              items: [
                "Native **JavaScript** validation",
                "Fields optimized for commercial inquiries",
                "Accessible and easy-to-complete design",
                "Integration with the company's contact flow",
              ],
            },
            {
              title: "Custom Image Carousel",
              description:
                "A custom visual carousel was developed to display corporate content and images of the company's logistics operations.",
              items: [
                "Manual navigation",
                "Smooth transitions",
                "Mobile-optimized",
              ],
            },
            {
              title: "Responsive UI Design",
              description:
                "The interface was designed using **Bootstrap** and custom **CSS**, ensuring compatibility with all screen sizes.",
              items: ["Desktop", "Tablets", "Smartphones"],
            },
            {
              title: "SEO Optimization",
              description:
                "**Technical SEO** practices were implemented to improve site visibility in search engines.",
              items: [
                "Semantic structure with **HTML5**",
                "Metadata optimization",
                "Clear heading structure",
                "Improved indexing in search engines",
              ],
            },
            {
              title: "Project Architecture",
              description:
                "The project was developed as an optimized static site using native web technologies.",
              subsections: [
                {
                  title: "Frontend",
                  description:
                    "Full development with native technologies, responsible for:",
                  items: [
                    "Semantic **HTML5** structure",
                    "Responsive styles with **CSS** and **Bootstrap**",
                    "Dynamic interactions with **Vanilla JavaScript**",
                    "SEO and performance optimization",
                  ],
                },
              ],
            },
          ],
          techCategories: [
            { label: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "Bootstrap"] },
            { label: "SEO & Performance", items: ["SEO Optimization"] },
            { label: "Infrastructure", items: ["Web Hosting", "Responsive Design"] },
          ],
          responsibilities: [
            "Site architecture design",
            "Complete frontend development",
            "Responsive UI implementation",
            "SEO and performance optimization",
          ],
          highlight: "Corporate & Performance",
        },
      ],
    },
    optimizations: {
      title: "Focus on ",
      titleHighlight: "performance",
      subtitle: "Web development centered on performance, usability, and technical clarity.",
      techUsed: "Technologies I use to achieve high performance",
      features: [
        {
          title: "Optimized loading",
          description:
            "Implementation of SSR/SSG, lazy loading and resource optimization to improve load times and user experience from the first render.",
        },
        {
          title: "Technical SEO",
          description:
            "Semantic structure, dynamic meta tags, sitemap and structured data to improve indexing and visibility in search engines.",
        },
        {
          title: "Accessibility",
          description:
            "Accessibility best practices: keyboard navigation, adequate contrasts and correct use of ARIA attributes according to WCAG standards.",
        },
        {
          title: "Responsive Design",
          description:
            "Adaptive interfaces that maintain consistency and usability across different screen sizes.",
        },
      ],
    },
    footer: {
      tagline:
        "I build exceptional digital experiences with a focus on performance, accessibility, and modern design.",
      navigation: "Navigation",
      technologies: "Stack of this portfolio",
      madeWith: "Made with",
      by: "by",
      privacy: "Privacy",
      terms: "Terms",
      links: [
        { name: "Home", href: "#top" },
        { name: "Journey", href: "#skills" },
        { name: "Skills", href: "#optimizations" },
        { name: "Projects", href: "#projects" },
        { name: "About Me", href: "#about" },
        { name: "Contact", href: "#contact" },
      ],
    },
    contact: {
      sectionTitle: "Contact",
      findMe: "Find me at",
      available: "Available",
      availableText: "Open to new professional challenges.",
      locationLabel: "Location",
      locationValue: "Córdoba, Argentina 🇦🇷",
      modalTitle: "Let's talk",
      modalSubtitle: "I'll reply in less than 24 hours.",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Tell me about your project...",
      sendBtn: "Send message",
      sendingBtn: "Sending...",
      errorText: "Something went wrong. Please try again.",
      successTitle: "Message sent!",
      successText: "Thanks for reaching out! I'll be in touch soon.",
      successTextLong: "I'll reply in less than 24 hours. Thank you for reaching out!",
      sendAnother: "Send another message",
      closeBtn: "Close",
    },
    chat: {
      online: "Online",
      typing: "Typing...",
      placeholder: "Type a message...",
      openLabel: "Talk to me!",
      closeLabel: "Close Chat",
      expandLabel: "Expand chat",
      collapseLabel: "Collapse chat",
      closeChat: "Close chat",
      openChat: "Open chat with EduBot",
      suggestions: [
        "What does he know about React?",
        "How to contact him?",
        "I want to send a message to Edu",
      ],
      responses: {
        default:
          "Hi! I'm Eduardo Cabral's virtual assistant. I can tell you about his experience in React, Node.js, MongoDB and more. What would you like to know?",
        react:
          "Eduardo has extensive experience with React. He has built everything from e-commerces to complex landing pages with advanced hooks, context and performance optimizations.",
        node:
          "Eduardo uses Node.js and Express to build robust and scalable APIs. He has experience integrating with databases like MongoDB and PostgreSQL.",
        contact:
          "You can contact Eduardo on LinkedIn or by email at jackshaw@live.com.ar. You can also use the contact form on this portfolio.",
      },
    },
  },
} as const;

export type Translations = typeof translations;
export type Lang = keyof Translations;
