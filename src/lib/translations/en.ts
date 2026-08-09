export const en = {
    nav: {
      home: "Home",
      about: "About Me",
      skills: "Skills",
      projects: "Projects",
      chat: "AI Chat",
      contact: "Contact",
      comments: "Feedback",
      downloadCV: "Download CV",
      contactBtn: "Contact",
      navigation: "Navigation",
      contactSection: "Contact",
      switchLang: "ES",
      trajectory: "Journey",
      impact: "Impact",
      hireMe: "Hire Me",
      rightsReserved: "All rights reserved",
    },
    hero: {
      heading: "Development & Product Engineering",
      subtitle:
        "Building with a developer's mindset, designing with a product-focused approach.",
      description:
        "Software Engineer specialized in Full Stack Development, e-commerce and modern web products.",
      viewProjects: "View my projects",
      connectLinkedIn: "Connect on LinkedIn",
    },
    about: {
      title: "About",
      titleHighlight: "Me",
      bio1: "My name is Eduardo Cabral and I'm a software developer based in Argentina. I got into programming out of curiosity: I wanted to understand how applications work under the hood and how the systems we use every day on the internet are built.",
      bio2: "Today I work mainly with JavaScript, React and Node.js, building full-stack web applications and digital products. One of my standout projects is an e-commerce platform built from scratch with full-stack architecture, secure authentication and online payments.",
      bio3: "When I'm not coding, I'm usually learning new technologies or working on personal projects. My goal is to keep growing as a developer and contribute to projects that solve real problems with technology.",
    },
    skills: {
      title: "Career Path",
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
      title: "Featured Projects",
      titleHighlight: "",
      subtitle:
        "Selected applications and digital products I’ve built.",
      keyFeatures: "Key Features:",
      visitSite: "Visit live website",
      viewProject: "View Project",
      viewDetails: "View details",
      repository: "Repository",
      backToPortfolio: "Back to portfolio",
      yearLabel: "Year",
      techStack: "Tech Stack",
      nextProject: "Next project",
      archOverview: "Architecture Overview",
      systemDiagramLabel: "System Diagram",
      externalIntegrations: "External Integrations",
      projects: [
        {
          title: "1/4 Mile E-Commerce",
          role: "Full-Stack Developer & Architect",
          description:
            "Full **B2C** e-commerce for automotive apparel with **React 18**, **Vite 6**, **Express 4**, **MongoDB**, **MercadoPago**, **Meta CAPI** and **Cloudinary**, prioritizing scalability, testing and **performance**.",
          intro:
            "Complete platform built from scratch with **React 18** + **Vite 6** frontend and **Express 4** + **MongoDB** backend. Integrates **MercadoPago**, **Meta CAPI**, **Google OAuth** and **Cloudinary**. Includes **119 tests** and **11 E2E specs**.",
          features: [
            "React 18 + Vite 6 frontend: lazy loading, code splitting, Tailwind CSS, Framer Motion, Swiper carousel, Lenis smooth scroll",
            "Express 4 + MongoDB backend: 30+ endpoints, 12 models, multi-layer security, idempotent background jobs",
            "JWT auth + Google OAuth: httpOnly cookies, refresh tokens, account lockout, protected routes",
            "MercadoPago: Bricks, bank transfers, idempotent webhooks, gift cards, coupons with reserve/consume",
            "Meta Pixel + CAPI: dual browser/server events with hashed PII for post-iOS14 attribution",
            "Admin panel: full CRUD for products, combos, gift cards, coupons, banners, users and orders",
            "Background jobs: abandoned cart emails, expired order cleanup, stale reservation cleanup",
            "Testing: 119 unit tests (Vitest) + 11 E2E (Playwright) + automated Lighthouse audits",
          ],
          sections: [
            {
              title: "Frontend — React 18 + Vite 6",
              description: "Modern **SPA** with **React 18** and **Vite 6**, replacing CRA for instant HMR and better tree shaking.",
              items: [
                "**Manual code splitting**: separate chunks for Swiper, SweetAlert2, icons and MercadoPago SDK",
                "**Lazy loading** all pages with `React.lazy()` + `<Suspense>`",
                "**React Router DOM** with pathname pagination (`/autos-page2`) for SEO",
                "**Three React contexts** (Auth, Cart, Products) without Redux",
                "**Lenis** for smooth scroll as singleton",
                "**Cloudinary** with width buckets (240–1600px), `f_auto`, `q_auto:good` and LRU cache",
                "**Facebook Pixel** + **Meta CAPI** with shared `event_id` for deduplication",
              ],
            },
            {
              title: "Backend — Express 4 + MongoDB",
              description: "**REST API** in **Express 4** with **MongoDB** (Mongoose), multi-layer security and robustness patterns.",
              items: [
                "**Layered security**: NoSQL sanitization, Origin validation, CSRF, rate limiting, Helmet headers",
                "**JWT in httpOnly cookies** with access_token (3h) + refresh_token (30d) and auto-renewal",
                "**Account lockout**: 10 failed attempts block login temporarily",
                "**Reserve/consume pattern** for stock, coupons and gift cards",
                "**Idempotent background jobs**: abandoned carts, expired orders, stale reservations",
                "**Graceful shutdown**: SIGINT/SIGTERM close connections without losing requests",
                "30+ **REST endpoints** and 12 **Mongoose models**",
              ],
            },
            {
              title: "Payments — MercadoPago",
              description: "Full **MercadoPago** integration via Bricks, webhooks and bank transfers.",
              items: [
                "Flow: frontend creates preference → Bricks renders → webhook notifies → backend verifies real status",
                "**Idempotent webhooks**: check current status before processing duplicate notifications",
                "**Bank transfers**: stock reserved until confirmation, auto-release on expiry",
                "**Gift cards** with reserve → consume → auto-release on failure cycle",
                "**Discount coupons** (percentage or fixed) with reserve/consume and email distribution",
              ],
            },
            {
              title: "Tracking — Meta Pixel + CAPI",
              description: "**Dual** strategy (browser + server) for maximum post-iOS14 attribution.",
              items: [
                "**Facebook Pixel** from browser: ViewContent, AddToCart, InitiateCheckout, Purchase",
                "**Meta CAPI** from backend: same events with hashed PII (email, name, IP)",
                "**Deduplication**: same `event_id` on both sources",
                "**Server-side tracking** works even with ad blockers",
              ],
            },
            {
              title: "Cloudinary — Media",
              description: "CDN with automatic optimization and intelligent transformations.",
              items: [
                "**`f_auto`**: WebP/AVIF based on browser support",
                "**`q_auto:good`**: adaptive quality per image",
                "**`dpr_auto`**: retina support (2x, 3x)",
                "**Width buckets** (240–1600px) for maximum CDN cache hits",
                "**LRU memory cache** (500 entries)",
                "**Strict MIME validation** with file-type on uploads",
              ],
            },
            {
              title: "Testing",
              description: "Complete suite with coverage thresholds and performance audits.",
              items: [
                "**119 unit tests** (Vitest + Testing Library)",
                "**11 E2E specs** (Playwright): 122 passed, 2 skipped, 0 failed",
                "**Lighthouse audits**: Desktop 92–98 Performance, CLS <0.01",
                "**Backend coverage**: 70% lines, 60.5% branches (fails CI if unmet)",
              ],
            },
          ],
          techCategories: [
            { label: "Frontend", items: ["React 18", "Vite 6", "Tailwind CSS 3", "Framer Motion", "Swiper", "React Router DOM", "Axios", "Lenis"] },
            { label: "Backend", items: ["Node.js", "Express 4", "MongoDB", "Mongoose", "JWT", "bcrypt", "Nodemailer", "Cloudinary SDK", "Helmet"] },
            { label: "Payments & Tracking", items: ["MercadoPago SDK", "Meta Pixel", "Meta Conversions API", "Google OAuth"] },
            { label: "Testing", items: ["Vitest", "Testing Library", "Playwright", "Supertest", "Lighthouse"] },
            { label: "Infrastructure", items: ["Netlify", "Render", "Cloudinary CDN", "MongoDB Atlas"] },
          ],
          responsibilities: [
            "Complete full-stack architecture (frontend + backend + DB + infra)",
            "React 18 SPA with Vite 6, lazy loading and manual code splitting",
            "Express 4 REST backend with MongoDB, multi-layer security and 30+ endpoints",
            "MercadoPago integration (Bricks, webhooks, transfers, gift cards, coupons)",
            "Meta Pixel + CAPI with dual browser/server tracking and deduplication",
            "Testing: 119 unit tests + 11 E2E + Lighthouse audits",
            "Deploy on Netlify (frontend) + Render (backend)",
          ],
          architectureOverview: [
            { layer: "Frontend",       tech: "React 18 SPA + Vite 6 + Tailwind CSS 3" },
            { layer: "Backend",        tech: "Express 4 REST API + MongoDB (Mongoose)" },
            { layer: "Auth",           tech: "JWT httpOnly + Google OAuth + bcrypt" },
            { layer: "Payments",       tech: "MercadoPago Bricks + Webhooks + Transfers" },
            { layer: "Tracking",       tech: "Meta Pixel + CAPI (browser + server)" },
            { layer: "Media",          tech: "Cloudinary (f_auto, q_auto, buckets)" },
            { layer: "Testing",        tech: "Vitest + Testing Library + Playwright" },
            { layer: "Deployment",     tech: "Netlify + Render" },
          ],
          systemDiagram: {
            flow: ["User Browser", "React 18 SPA (Netlify)", "Express 4 API (Render)", "MongoDB Atlas"],
            integrations: ["MercadoPago", "Cloudinary", "Meta Pixel + CAPI", "Google OAuth"],
          },
          highlight: "Star Project",
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
          architectureOverview: [
            { layer: "Frontend",    tech: "HTML5 + CSS3 + Vanilla JavaScript" },
            { layer: "CSS Framework", tech: "Bootstrap" },
            { layer: "SEO",         tech: "Semantic HTML + Meta tags" },
            { layer: "Performance", tech: "Asset optimization + lazy loading" },
            { layer: "Deployment",  tech: "Web Hosting" },
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
    impact: {
      title: "Real",
      titleHighlight: " Impact",
      subtitle: "Numbers that show the work, not just the code.",
      cta: "Work with me",
      metrics: [
        { value: 10, suffix: "+", label: "Projects Built",          description: "Full-stack web applications in production", ring: 80 },
        { value: 3,  suffix: "+", label: "Years of Experience",     description: "Building digital products",                ring: 60 },
        { value: 45, suffix: "%", label: "Performance Improved",    description: "Optimization in React production projects", ring: 45 },
        { value: 30, suffix: "%", label: "Technical Debt Reduced",  description: "In React component refactoring projects",   ring: 30 },
      ],
    },
    footer: {
      tagline:
        "I build digital products that create real impact.",
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
        { name: "Email", href: "mailto:jackshaw@live.com.ar" },
      ],
    },
    comments: {
      title: "Feedback",
      titleHighlight: "",
      subtitle: "",
      empty: "",
      loading: "Loading...",
      verified: "Verified review",
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
      placeholder: "Type /help or ask anything...",
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
};
