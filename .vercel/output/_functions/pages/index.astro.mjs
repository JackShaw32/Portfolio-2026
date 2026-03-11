import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D3sYOqQv.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_CrUp9LjC.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, Mail, Linkedin, Github, Lock, Send, Download, Sun, Moon, Menu, MapPin, ExternalLink, Coffee, FileDown, ChevronRight, FileText, Briefcase, ChevronDown, GraduationCap, Languages, Globe, Code2, Zap, CheckCircle2, Smartphone, Search, Sparkles, Phone, Clock, XCircle, Bot, Trash2, Maximize2, User, Twitter, ArrowUpRight } from 'lucide-react';
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiAstro, SiAngular, SiTailwindcss, SiNodedotjs, SiNestjs, SiExpress, SiMongodb, SiPostgresql, SiFirebase, SiAmazonwebservices, SiDocker, SiGit } from 'react-icons/si';
export { renderers } from '../renderers.mjs';

const STORAGE_KEY = "lang";
const EVENT_NAME = "langchange";
function useLanguage() {
  const [lang, setLangState] = useState("es");
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") {
      setLangState(saved);
    }
    const handler = (e) => {
      const customEvent = e;
      setLangState(customEvent.detail);
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);
  const setLang = (newLang) => {
    const scrollY = window.scrollY;
    localStorage.setItem(STORAGE_KEY, newLang);
    setLangState(newLang);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: newLang }));
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, behavior: "instant" });
    });
  };
  const toggleLang = () => setLang(lang === "es" ? "en" : "es");
  return { lang, setLang, toggleLang };
}

const translations = {
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
      trajectory: "Experiencia"
    },
    hero: {
      available: "Disponible para nuevos desafíos",
      heading: "Soluciones Web Escalables con Impacto",
      description: "Full-Stack Developer especializado en soluciones e-commerce y arquitectura web moderna.",
      viewProjects: "Ver mis proyectos",
      connectLinkedIn: "Conectar en LinkedIn"
    },
    about: {
      title: "Sobre",
      titleHighlight: "mí",
      bio1: "Me llamo Eduardo Cabral y soy desarrollador de software en Argentina. Empecé en programación por curiosidad: quería entender cómo funcionan las aplicaciones por dentro y cómo se construyen los sistemas que usamos todos los días en internet.",
      bio2: "Hoy trabajo principalmente con JavaScript, React y Node.js, desarrollando aplicaciones web completas y productos digitales. Entre mis proyectos destaca un e-commerce creado desde cero con arquitectura full-stack, autenticación segura y pagos online.",
      bio3: "Cuando no estoy programando, suelo estar aprendiendo nuevas tecnologías o construyendo proyectos propios. Mi objetivo es seguir creciendo como desarrollador y contribuir a proyectos que resuelvan problemas reales con tecnología."
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
          description: "Resolución de problemas críticos en producción, refactorización de componentes en React + TypeScript y optimización de APIs en Node/Express. Sincronización de datos en tiempo real con Firestore y Cloud Functions. Implementación de Strapi v5 como CMS e integración de IA (Gemini 2.5) para el autocompletado inteligente de formularios dinámicos.",
          tech: ["React.js", "TypeScript", "Node.js", "Firebase", "GCP", "Strapi"]
        },
        {
          role: "Desarrollador Full Stack",
          company: "Freelance",
          period: "Mar. 2023 - Presente",
          description: "Desarrollo integral de aplicaciones web escalables y a medida. Creación de interfaces de usuario dinámicas, responsivas y optimizadas, abarcando desde el frontend hasta el diseño de arquitectura de bases de datos y desarrollo de APIs RESTful.",
          tech: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "JavaScript"]
        }
      ],
      educationItems: [
        {
          degree: "Programador Web FullStack",
          institution: "DevSchool Academia",
          period: "Ene. 2023"
        },
        {
          degree: "Bootcamp Real",
          institution: "Código en Casa",
          period: "Jul. 2022"
        },
        {
          degree: "Programación desde Cero",
          institution: "Egg Live",
          period: "Ene. 2022"
        }
      ]
    },
    projects: {
      title: "Mis Proyectos.. ",
      titleHighlight: "Mis Trabajos",
      subtitle: "Cada proyecto es un desafío, mi enfoque una solución sólida y escalable.",
      keyFeatures: "Características Clave:",
      visitSite: "Visitar sitio web en vivo",
      viewProject: "Ver Proyecto",
      repository: "Repositorio",
      projects: [
        {
          title: "1/4 de Milla E-Commerce",
          role: "Full-Stack Developer & Architect",
          description: "Plataforma completa de comercio electrónico B2C (MERN) para indumentaria automotriz. Arquitectura escalable desarrollada desde cero, gestionando el ciclo completo del producto, carrito de compras, y pagos online.",
          features: [
            "Panel de administración CMS: Gestión de productos, banners y usuarios",
            "Pagos automatizados: Integración nativa con Mercado Pago",
            "Marketing y SEO: Meta Pixel, API Conversions y recuperación de carrito",
            "Autenticación segura: Historial de órdenes, registro y recuperación de contraseñas"
          ],
          highlight: "Proyecto Estrella"
        },
        {
          title: "Logistica Expreso Omega",
          role: "Frontend Developer",
          description: "Landing page corporativa B2B de alto rendimiento para el sector logístico y de transporte. Desarrollada intencionalmente sin frameworks pesados para garantizar tiempos de carga ultrarrápidos y maximizar el SEO.",
          features: [
            "Arquitectura Vanilla: Cero dependencias externas complejas",
            "UI/UX Moderna: Carrusel de imágenes custom y diseño 100% responsivo",
            "Generación de Leads: Formulario de cotización con validación nativa",
            "Rendimiento optimizado: Carga rápida, SEO técnico y soporte multidispositivo"
          ],
          highlight: "Corporate & Performance"
        },
        {
          title: "Alfy & Vivi — Evento",
          role: "Frontend Developer",
          description: "Landing page interactiva para un evento especial. Construida con React 18, Three.js y Framer Motion para lograr animaciones y efectos visuales de alto impacto, con un diseño 100% responsivo y experiencia inmersiva.",
          features: [
            "Animaciones 3D: Efectos visuales interactivos con Three.js",
            "Motion design: Transiciones fluidas y animaciones con Framer Motion y AOS",
            "Carrusel multimedia: Galería de imágenes con Swiper.js",
            "UI Responsiva: Diseño adaptado a todos los dispositivos con React Bootstrap"
          ],
          highlight: "Interactive Event Landing"
        }
      ]
    },
    optimizations: {
      title: "Enfoque en ",
      titleHighlight: "rendimiento",
      subtitle: "Desarrollo web centrado en rendimiento, usabilidad y claridad técnica.",
      techUsed: "Tecnologías que utilizo para lograr alto rendimiento",
      features: [
        {
          title: "Carga optimizada",
          description: "Implementación de SSR/SSG, lazy loading y optimización de recursos para mejorar los tiempos de carga y la experiencia del usuario desde el primer render."
        },
        {
          title: "SEO Técnico",
          description: "Estructura semántica, meta etiquetas dinámicas, sitemap y datos estructurados para mejorar la indexación y visibilidad en buscadores."
        },
        {
          title: "Accesibilidad",
          description: "Buenas prácticas de accesibilidad: navegación por teclado, contrastes adecuados y uso correcto de atributos ARIA según estándares WCAG."
        },
        {
          title: "Diseño Responsivo",
          description: "Interfaces adaptables que mantienen consistencia y usabilidad en distintos tamaños de pantalla."
        }
      ]
    },
    footer: {
      tagline: "Construyo experiencias digitales con enfoque en rendimiento, accesibilidad y diseño moderno.",
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
        { name: "Contacto", href: "#contact" }
      ]
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
      successTextLong: "Te respondo en menos de 24 horas. ¡Gracias por contactarte!",
      sendAnother: "Enviar otro mensaje",
      closeBtn: "Cerrar"
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
        "Quiero enviarle un mensaje a Edu"
      ],
      responses: {
        default: "¡Hola! Soy el asistente virtual de Eduardo Cabral. Puedo contarte sobre su experiencia en React, Node.js, MongoDB y más. ¿Qué quieres saber?",
        react: "Eduardo tiene amplia experiencia con React. Ha construido desde e-commerces hasta landing pages complejas con hooks avanzados, context y optimizaciones de rendimiento.",
        node: "Eduardo usa Node.js y Express para construir APIs robustas y escalables. Tiene experiencia en integración con bases de datos como MongoDB y PostgreSQL.",
        contact: "Podés contactar a Eduardo en LinkedIn o por email a jackshaw32@live.com.ar. También podés usar el formulario de contacto de este mismo portafolio."
      }
    }
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
      trajectory: "Journey"
    },
    hero: {
      available: "Available for new challenges",
      heading: "Scalable web solutions with impact",
      description: "Full-Stack Developer specialized in e-commerce solutions and modern web architecture.",
      viewProjects: "View my projects",
      connectLinkedIn: "Connect on LinkedIn"
    },
    about: {
      title: "About",
      titleHighlight: "me",
      bio1: "My name is Eduardo Cabral and I'm a software developer based in Argentina. I got into programming out of curiosity: I wanted to understand how applications work under the hood and how the systems we use every day on the internet are built.",
      bio2: "Today I work mainly with JavaScript, React and Node.js, building full-stack web applications and digital products. One of my standout projects is an e-commerce platform built from scratch with full-stack architecture, secure authentication and online payments.",
      bio3: "When I'm not coding, I'm usually learning new technologies or working on personal projects. My goal is to keep growing as a developer and contribute to projects that solve real problems with technology."
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
          description: "Resolution of critical production issues, component refactoring in React + TypeScript and API optimization in Node/Express. Real-time data synchronization with Firestore and Cloud Functions. Implementation of Strapi v5 as CMS and AI integration (Gemini 2.5) for intelligent auto-completion of dynamic forms.",
          tech: ["React.js", "TypeScript", "Node.js", "Firebase", "GCP", "Strapi"]
        },
        {
          role: "Full Stack Developer",
          company: "Freelance",
          period: "Mar. 2023 - Present",
          description: "Full-cycle development of scalable and custom web applications. Creation of dynamic, responsive and optimized user interfaces, ranging from frontend to database architecture design and RESTful API development.",
          tech: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "JavaScript"]
        }
      ],
      educationItems: [
        {
          degree: "FullStack Web Developer",
          institution: "DevSchool Academia",
          period: "Jan. 2023"
        },
        {
          degree: "Real Bootcamp",
          institution: "Código en Casa",
          period: "Jul. 2022"
        },
        {
          degree: "Programming from Scratch",
          institution: "Egg Live",
          period: "Jan. 2022"
        }
      ]
    },
    projects: {
      title: "My Projects.. ",
      titleHighlight: "My Work",
      subtitle: "Every project is a challenge; my approach, a solid and scalable solution.",
      keyFeatures: "Key Features:",
      visitSite: "Visit live website",
      viewProject: "View Project",
      repository: "Repository",
      projects: [
        {
          title: "1/4 Mile E-Commerce",
          role: "Full-Stack Developer & Architect",
          description: "Complete B2C e-commerce platform (MERN) for automotive apparel. Scalable architecture built from scratch, managing the complete product cycle, shopping cart, and online payments.",
          features: [
            "CMS Admin Panel: Product, banner and user management",
            "Automated payments: Native Mercado Pago integration",
            "Marketing & SEO: Meta Pixel, Conversions API and cart recovery",
            "Secure authentication: Order history, registration and password recovery"
          ],
          highlight: "Star Project"
        },
        {
          title: "Logistica Expreso Omega",
          role: "Frontend Developer",
          description: "High-performance B2B corporate landing page for the logistics and transport sector. Intentionally built without heavy frameworks to ensure ultra-fast load times and maximize SEO.",
          features: [
            "Vanilla Architecture: Zero complex external dependencies",
            "Modern UI/UX: Custom image carousel and 100% responsive design",
            "Lead Generation: Quote form with native validation",
            "Optimized performance: Fast loading, technical SEO and multi-device support"
          ],
          highlight: "Corporate & Performance"
        },
        {
          title: "Alfy & Vivi — Event",
          role: "Frontend Developer",
          description: "Interactive landing page for a special event. Built with React 18, Three.js and Framer Motion to achieve high-impact animations and visual effects, with a fully responsive design and immersive experience.",
          features: [
            "3D Animations: Interactive visual effects with Three.js",
            "Motion design: Smooth transitions and animations with Framer Motion and AOS",
            "Multimedia carousel: Image gallery with Swiper.js",
            "Responsive UI: Adapted design for all devices with React Bootstrap"
          ],
          highlight: "Interactive Event Landing"
        }
      ]
    },
    optimizations: {
      title: "Focus on ",
      titleHighlight: "performance",
      subtitle: "Web development centered on performance, usability, and technical clarity.",
      techUsed: "Technologies I use to achieve high performance",
      features: [
        {
          title: "Optimized loading",
          description: "Implementation of SSR/SSG, lazy loading and resource optimization to improve load times and user experience from the first render."
        },
        {
          title: "Technical SEO",
          description: "Semantic structure, dynamic meta tags, sitemap and structured data to improve indexing and visibility in search engines."
        },
        {
          title: "Accessibility",
          description: "Accessibility best practices: keyboard navigation, adequate contrasts and correct use of ARIA attributes according to WCAG standards."
        },
        {
          title: "Responsive Design",
          description: "Adaptive interfaces that maintain consistency and usability across different screen sizes."
        }
      ]
    },
    footer: {
      tagline: "I build exceptional digital experiences with a focus on performance, accessibility, and modern design.",
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
        { name: "Contact", href: "#contact" }
      ]
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
      closeBtn: "Close"
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
        "I want to send a message to Edu"
      ],
      responses: {
        default: "Hi! I'm Eduardo Cabral's virtual assistant. I can tell you about his experience in React, Node.js, MongoDB and more. What would you like to know?",
        react: "Eduardo has extensive experience with React. He has built everything from e-commerces to complex landing pages with advanced hooks, context and performance optimizations.",
        node: "Eduardo uses Node.js and Express to build robust and scalable APIs. He has experience integrating with databases like MongoDB and PostgreSQL.",
        contact: "You can contact Eduardo on LinkedIn or by email at jackshaw32@live.com.ar. You can also use the contact form on this portfolio."
      }
    }
  }
};

function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { lang } = useLanguage();
  const t = translations[lang];
  const ct = t.contact;
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(ct.errorText);
      }
    } catch {
      setError(ct.errorText);
    } finally {
      setIsLoading(false);
    }
  };
  const reset = () => {
    setSubmitted(false);
    setError("");
    setForm({ name: "", email: "", message: "" });
  };
  if (!open) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[60] flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-background/70 backdrop-blur-md",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-lg", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -inset-[1px] rounded-3xl overflow-hidden pointer-events-none", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute modal-border-conic animate-[border-spin_5s_linear_infinite]"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-background rounded-3xl p-8 shadow-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold tracking-tight text-foreground", children: ct.modalTitle }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              className: "w-9 h-9 rounded-xl flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 hover:border-foreground/20 transition-all duration-200",
              "aria-label": ct.closeBtn,
              children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-foreground/70" })
            }
          )
        ] }),
        submitted ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-10 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2 tracking-tight", children: ct.successTitle }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm font-light mb-8", children: ct.successText }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: reset,
              className: "text-sm font-medium text-primary hover:text-foreground transition-colors",
              children: ct.sendAnother
            }
          )
        ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block", children: ct.nameLabel }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  required: true,
                  value: form.name,
                  onChange: (e) => setForm({ ...form, name: e.target.value }),
                  placeholder: ct.namePlaceholder,
                  className: "w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 transition-all"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block", children: ct.emailLabel }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  required: true,
                  value: form.email,
                  onChange: (e) => setForm({ ...form, email: e.target.value }),
                  placeholder: ct.emailPlaceholder,
                  className: "w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 transition-all"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block", children: ct.messageLabel }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                required: true,
                value: form.message,
                onChange: (e) => setForm({ ...form, message: e.target.value }),
                placeholder: ct.messagePlaceholder,
                rows: 4,
                className: "w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 transition-all resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
            /* @__PURE__ */ jsxs("a", { href: "mailto:jackshaw32@live.com.ar", className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors", children: [
              /* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5" }),
              " Email"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground/20", children: "·" }),
            /* @__PURE__ */ jsxs("a", { href: "https://linkedin.com/in/raul-eduardo-cabral", target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors", children: [
              /* @__PURE__ */ jsx(Linkedin, { className: "w-3.5 h-3.5" }),
              " LinkedIn"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground/20", children: "·" }),
            /* @__PURE__ */ jsxs("a", { href: "https://github.com/JackShaw32", target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors", children: [
              /* @__PURE__ */ jsx(Github, { className: "w-3.5 h-3.5" }),
              " GitHub"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground/50", children: [
              /* @__PURE__ */ jsx(Lock, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsx("span", { children: "SSL secured" })
            ] }),
            error && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-medium", children: error }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                disabled: isLoading,
                className: "bg-foreground text-background hover:bg-foreground/90 disabled:opacity-60 font-medium px-7 py-3 rounded-xl text-sm inline-flex items-center gap-2 transition-all duration-300 group",
                children: [
                  isLoading ? ct.sendingBtn : ct.sendBtn,
                  /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [theme, setTheme] = useState(getInitialTheme);
  const [contactOpen, setContactOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang];
  [
    { href: "#top", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.skills },
    { href: "#optimizations", label: t.nav.projects },
    { href: "#chat", label: t.nav.chat },
    { href: "#contact", label: t.nav.contact }
  ];
  const mobileNavLinks = [
    { href: "#top", label: t.nav.home },
    { href: "#skills", label: t.nav.trajectory },
    { href: "#projects", label: t.nav.projects },
    { href: "#optimizations", label: t.nav.skills },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact }
  ];
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove("theme-transitioning");
      });
    });
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (menuOpen) return;
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, menuOpen]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "header",
      {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${hidden ? "-translate-y-full" : "translate-y-0"} ${isScrolled || menuOpen ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm" : "bg-transparent"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto w-full p-4 lg:px-8 flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxs("a", { className: "flex items-center gap-3 group", href: "#top", onClick: () => setMenuOpen(false), children: [
            /* @__PURE__ */ jsx("span", { className: "relative h-10 w-10 shrink-0 overflow-hidden rounded-full block md:hidden bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/20 transition-colors", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/20220924_233024.webp",
                alt: "Eduardo Cabral",
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0", children: [
              /* @__PURE__ */ jsx("div", { className: "font-semibold text-base lg:text-xl text-foreground tracking-tight", children: "Eduardo Cabral" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Full-Stack JavaScript Dev" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "a",
            {
              className: "hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 group",
              href: "#top",
              "aria-label": "Ir al inicio",
              onClick: () => setMenuOpen(false),
              title: "Go to top",
              children: /* @__PURE__ */ jsx("span", { className: "relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-foreground/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-foreground/20 transition-all duration-300", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/20220924_233024.webp",
                  alt: "Eduardo Cabral",
                  fetchPriority: "high",
                  className: "w-full h-full object-cover"
                }
              ) })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://drive.google.com/file/d/1rowPwlyhJPDIUqs-4N_WmLW_LS1Y7Noz/view?usp=sharing",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "hidden md:flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border border-border/50 bg-transparent hover:bg-foreground/5 text-foreground h-9 rounded-md px-4",
                children: [
                  /* @__PURE__ */ jsx(Download, { className: "mr-2 w-4 h-4" }),
                  t.nav.downloadCV
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setMenuOpen(false);
                  setContactOpen(true);
                },
                className: "hidden sm:inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors bg-foreground text-background hover:bg-foreground/90 h-9 rounded-md px-4",
                children: t.nav.contactBtn
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleLang,
                className: "inline-flex items-center justify-center whitespace-nowrap text-xs font-bold transition-colors border border-border/50 bg-transparent hover:bg-foreground/5 text-foreground h-9 w-9 rounded-full",
                type: "button",
                "aria-label": "Toggle language",
                title: lang === "es" ? "Switch to English" : "Cambiar a Español",
                children: t.nav.switchLang
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleTheme,
                className: "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border border-border/50 bg-transparent hover:bg-foreground/5 text-foreground h-9 w-9 rounded-full",
                type: "button",
                "aria-label": "Toggle theme",
                children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setMenuOpen(!menuOpen),
                className: "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border border-border/50 bg-foreground/5 hover:bg-foreground/10 text-foreground h-9 w-9 rounded-md ml-1 relative z-50",
                "aria-label": "Toggle menu",
                children: menuOpen ? /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
        onClick: () => setMenuOpen(false)
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-border/50 z-40 flex flex-col overflow-y-auto transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "flex-1 px-8 pt-28 pb-12 flex flex-col", children: [
          /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-6 mb-12", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2", children: t.nav.navigation }),
            mobileNavLinks.map(
              (link, i) => link.href === "#contact" ? /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setMenuOpen(false);
                    setContactOpen(true);
                  },
                  className: `text-3xl font-semibold w-fit transition-all duration-300 text-left cursor-pointer ${menuOpen ? `opacity-100 translate-x-0 nav-delay-${i}` : "opacity-0 translate-x-8 nav-delay-none"}`,
                  children: /* @__PURE__ */ jsx("span", { className: "text-foreground/70 hover:text-foreground transition-colors duration-200", children: link.label })
                },
                link.href
              ) : /* @__PURE__ */ jsx(
                "a",
                {
                  href: link.href,
                  onClick: () => setMenuOpen(false),
                  className: `text-3xl font-semibold w-fit transition-all duration-300 ${menuOpen ? `opacity-100 translate-x-0 nav-delay-${i}` : "opacity-0 translate-x-8 nav-delay-none"}`,
                  children: /* @__PURE__ */ jsx("span", { className: "text-foreground/70 hover:text-foreground transition-colors duration-200", children: link.label })
                },
                link.href
              )
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto", children: [
            /* @__PURE__ */ jsx("div", { className: "h-px w-full bg-border/50 mb-8" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mb-8", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider", children: t.nav.contactSection }),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "mailto:jackshaw32@live.com.ar",
                  className: "flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5" }),
                    /* @__PURE__ */ jsx("span", { children: "jackshaw32@live.com.ar" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-foreground/70", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsx("span", { children: "Córdoba, Argentina" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://github.com/educcabral",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  title: "GitHub Profile",
                  "aria-label": "GitHub Profile",
                  className: "w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all",
                  children: /* @__PURE__ */ jsx(Github, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://www.linkedin.com/in/eduardo-cabral-211199201/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  title: "LinkedIn Profile",
                  "aria-label": "LinkedIn Profile",
                  className: "w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all",
                  children: /* @__PURE__ */ jsx(Linkedin, { className: "w-5 h-5" })
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(ContactModal, { open: contactOpen, onClose: () => setContactOpen(false) })
  ] });
}

function useReveal(containerRef) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  useEffect(() => {
    if (!hasMounted) return;
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
    };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);
    const container = containerRef?.current ?? document;
    const elements = container.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
    };
  }, [hasMounted, containerRef]);
}

function LineGrid() {
  const cell = 72;
  const cols = 24;
  const rows = 16;
  const vw = cols * cell;
  const vh = rows * cell;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: "absolute inset-0 w-full h-full pointer-events-none",
      viewBox: `0 0 ${vw} ${vh}`,
      preserveAspectRatio: "xMidYMid slice",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs("radialGradient", { id: "grid-fade", cx: "50%", cy: "40%", r: "62%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "white", stopOpacity: "0.9" }),
            /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "white", stopOpacity: "0.4" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "white", stopOpacity: "0" })
          ] }),
          /* @__PURE__ */ jsx("mask", { id: "grid-mask", children: /* @__PURE__ */ jsx("rect", { width: "100%", height: "100%", fill: "url(#grid-fade)" }) })
        ] }),
        /* @__PURE__ */ jsxs("g", { mask: "url(#grid-mask)", stroke: "currentColor", strokeWidth: "0.5", opacity: "0.25", children: [
          Array.from({ length: cols + 1 }, (_, i) => /* @__PURE__ */ jsx("line", { x1: i * cell, y1: 0, x2: i * cell, y2: vh }, `v${i}`)),
          Array.from({ length: rows + 1 }, (_, i) => /* @__PURE__ */ jsx("line", { x1: 0, y1: i * cell, x2: vw, y2: i * cell }, `h${i}`))
        ] })
      ]
    }
  );
}
const roles = [
  "Full-Stack Developer",
  "React & Next.js Specialist",
  "Node.js & Nest.js Backend",
  "E-commerce Developer"
];
function Hero() {
  const ref = useRef(null);
  useReveal(ref);
  const { lang } = useLanguage();
  const t = translations[lang];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const role = roles[currentRole];
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2e3);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);
  return /* @__PURE__ */ jsxs("section", { ref, id: "top", className: "relative min-h-screen flex items-center justify-center overflow-hidden w-full", children: [
    /* @__PURE__ */ jsx(LineGrid, {}),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-[10%] -left-[10%] w-[600px] h-[500px] rounded-full bg-blue-600/[0.18] blur-[120px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] -right-[10%] w-[550px] h-[450px] rounded-full bg-orange-500/[0.15] blur-[120px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[35%] left-1/2 -translate-x-1/2 w-[400px] h-[350px] rounded-full bg-emerald-500/[0.10] blur-[100px]" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 pt-20 relative z-30", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center reveal", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 glass px-5 py-2.5 rounded-full text-sm border-primary/10 hover:border-primary/30 transition-colors duration-300", children: [
        /* @__PURE__ */ jsxs("span", { className: "relative flex h-2.5 w-2.5", children: [
          /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" }),
          /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-white-foreground tracking-wide", children: t.hero.available })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("h1", { className: "text-6xl md:text-8xl font-black tracking-tighter mb-4", children: /* @__PURE__ */ jsx("span", { className: "scroll-m-20 text-5xl font-heading font-bold lg:text-7xl text-balance max-w-screen-lg text-metallic inline-block leading-tight", children: t.hero.heading }) }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-6 h-12 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-xl md:text-2xl font-mono text-muted-foreground", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: ">" }),
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-foreground/90", children: displayText }),
        /* @__PURE__ */ jsx("span", { className: "animate-typing-cursor text-primary ml-0.5", children: "|" })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light text-balance", children: t.hero.description }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center mb-16", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "#projects",
            className: "group/btn bg-foreground text-background hover:bg-foreground/90 font-bold px-8 py-4 rounded-2xl text-sm inline-flex items-center justify-center gap-2 transition-all duration-300",
            children: [
              t.hero.viewProjects,
              /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://www.linkedin.com/in/raul-eduardo-cabral/",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "glass hover:bg-foreground/5 text-foreground font-bold px-8 py-4 rounded-2xl text-sm inline-flex items-center justify-center transition-all duration-300 gap-2 border border-border/50 hover:border-foreground/30",
            children: [
              /* @__PURE__ */ jsx(Linkedin, { className: "w-4 h-4" }),
              t.hero.connectLinkedIn
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-20" })
  ] });
}

function About() {
  const ref = useRef(null);
  useReveal(ref);
  const [contactOpen, setContactOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];
  const ab = t.about;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ContactModal, { open: contactOpen, onClose: () => setContactOpen(false) }),
    /* @__PURE__ */ jsx("section", { ref, id: "about", className: "py-24 relative", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto mb-14 reveal", children: /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-bold tracking-tight", children: [
        ab.title,
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: ab.titleHighlight })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start", children: [
        /* @__PURE__ */ jsx("div", { className: "md:col-span-2 order-last md:order-first reveal delay-150 space-y-5 text-muted-foreground leading-relaxed", children: lang === "es" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Me llamo ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-semibold", children: "Eduardo Cabral" }),
            " y soy",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-semibold", children: "desarrollador de software en Argentina" }),
            ".",
            " ",
            "Empecé en programación por curiosidad: quería entender",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: "cómo funcionan las aplicaciones por dentro" }),
            " ",
            "y cómo se construyen los sistemas que usamos todos los días en internet."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Hoy trabajo principalmente con",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-semibold", children: "JavaScript, React y Node.js" }),
            ",",
            " ",
            "desarrollando aplicaciones web completas y productos digitales. Entre mis proyectos destaca un",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: "e-commerce creado desde cero" }),
            " ",
            "con ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: "arquitectura full-stack, autenticación segura y pagos online" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Cuando no estoy programando, suelo estar",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: "aprendiendo nuevas tecnologías" }),
            " ",
            "o construyendo proyectos propios. Mi objetivo es seguir creciendo como desarrollador y contribuir a proyectos que",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: "resuelvan problemas reales con tecnología" }),
            "."
          ] })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "My name is ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-semibold", children: "Eduardo Cabral" }),
            " and I'm a",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-semibold", children: "software developer based in Argentina" }),
            ".",
            " ",
            "I got into programming out of curiosity: I wanted to understand",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: "how applications work under the hood" }),
            " ",
            "and how the systems we use every day on the internet are built."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Today I work mainly with",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-semibold", children: "JavaScript, React and Node.js" }),
            ",",
            " ",
            "building full-stack web applications and digital products. One of my standout projects is an",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: "e-commerce platform built from scratch" }),
            " ",
            "with ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: "full-stack architecture, secure authentication and online payments" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "When I'm not coding, I'm usually",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: "learning new technologies" }),
            " ",
            "or working on personal projects. My goal is to keep growing as a developer and contribute to projects that",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: "solve real problems with technology" }),
            "."
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6 order-first md:order-last reveal", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-blue-500/10 blur-3xl scale-[3]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-indigo-400/8 blur-[80px] scale-[4]" }),
            /* @__PURE__ */ jsx("div", { className: "relative w-56 h-56 rounded-full flex items-center justify-center overflow-hidden ring-1 ring-indigo-400/20 ring-offset-4 ring-offset-background shadow-[0_0_80px_20px_rgba(99,102,241,0.06)]", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/20220924_233024.webp",
                alt: "Eduardo Cabral",
                loading: "lazy",
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsxs("span", { className: "absolute bottom-3 left-3 flex h-4 w-4", children: [
              /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" }),
              /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-background" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "absolute -bottom-2 -right-2 glass rounded-2xl p-3 border-border/50 shadow-xl animate-float", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "w-3.5 h-3.5 text-foreground/70" }),
              /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: "Córdoba 🇦🇷" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute -top-2 -right-4 glass rounded-2xl p-3 border-border/50 shadow-xl animate-float anim-delay-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
              /* @__PURE__ */ jsx(Coffee, { className: "w-3.5 h-3.5 text-foreground/70" }),
              /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: "Full-Stack JavaScript Dev" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 w-full", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setContactOpen(true),
                title: "Contactar",
                className: "flex-1 glass hover:bg-foreground/5 text-muted-foreground hover:text-foreground h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border border-border/50 hover:border-foreground/30 cursor-pointer",
                children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://drive.google.com/file/d/1rowPwlyhJPDIUqs-4N_WmLW_LS1Y7Noz/view?usp=sharing",
                target: "_blank",
                rel: "noopener noreferrer",
                title: "Descargar CV en Español",
                className: "flex-1 glass hover:bg-foreground/5 text-muted-foreground hover:text-foreground h-12 rounded-2xl flex items-center justify-center gap-1 transition-all duration-300 border border-border/50 hover:border-foreground/30",
                children: [
                  /* @__PURE__ */ jsx(FileDown, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold", children: "ES" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://drive.google.com/file/d/1dPo1RNqasoNxXUjwk6nGuDBWIPoD2_mY/view?usp=sharing",
                target: "_blank",
                rel: "noopener noreferrer",
                title: "Download CV in English",
                className: "flex-1 glass hover:bg-foreground/5 text-muted-foreground hover:text-foreground h-12 rounded-2xl flex items-center justify-center gap-1 transition-all duration-300 border border-border/50 hover:border-foreground/30",
                children: [
                  /* @__PURE__ */ jsx(FileDown, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold", children: "EN" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://linkedin.com/in/raul-eduardo-cabral",
                target: "_blank",
                rel: "noopener noreferrer",
                title: "LinkedIn",
                "aria-label": "LinkedIn",
                className: "flex-1 glass hover:bg-foreground/5 text-muted-foreground hover:text-foreground h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border border-border/50 hover:border-foreground/30",
                children: /* @__PURE__ */ jsx(Linkedin, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://github.com/JackShaw32",
                target: "_blank",
                rel: "noopener noreferrer",
                title: "GitHub",
                "aria-label": "GitHub",
                className: "flex-1 glass hover:bg-foreground/5 text-muted-foreground hover:text-foreground h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border border-border/50 hover:border-foreground/30",
                children: /* @__PURE__ */ jsx(Github, { className: "w-5 h-5" })
              }
            )
          ] })
        ] })
      ] })
    ] }) })
  ] });
}

function Skills() {
  const ref = useRef(null);
  useReveal(ref);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggleExpand = (i) => setExpandedIndex(expandedIndex === i ? null : i);
  const { lang } = useLanguage();
  const t = translations[lang];
  const sk = t.skills;
  const experience = sk.experience;
  const education = sk.educationItems;
  return /* @__PURE__ */ jsx("section", { ref, id: "skills", className: "py-24 relative", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-8 reveal", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "https://www.linkedin.com/in/raul-eduardo-cabral/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "glass flex items-center gap-4 px-6 py-5 rounded-3xl border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 group",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0", children: /* @__PURE__ */ jsx(Linkedin, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-sm text-foreground flex-1", children: sk.contactMe }),
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-foreground/40 group-hover:text-foreground/80 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "https://api.whatsapp.com/send/?phone=5493518588034&text&type=phone_number&app_absent=0",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "glass flex items-center gap-4 px-6 py-5 rounded-3xl border border-foreground/10 hover:border-green-500/40 hover:bg-green-500/5 transition-all duration-300 group",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-green-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) }) }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-sm text-foreground flex-1", children: sk.whatsappContact }),
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-foreground/40 group-hover:text-green-500/80 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "glass flex items-center gap-4 px-6 py-5 rounded-3xl border border-foreground/10 hover:border-foreground/30 transition-all duration-300", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-sm text-foreground leading-tight", children: "CV" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground font-mono", children: "2026" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold text-red-500 leading-none", children: "ES" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://drive.google.com/file/d/1rowPwlyhJPDIUqs-4N_WmLW_LS1Y7Noz/view?usp=sharing",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "w-8 h-8 rounded-xl flex items-center justify-center bg-foreground/5 hover:bg-foreground/15 border border-foreground/10 hover:border-foreground/30 transition-all duration-300",
              title: sk.downloadCVSpanish,
              "aria-label": sk.downloadCVSpanish,
              children: /* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5 text-foreground/70" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold text-blue-500 leading-none", children: "EN" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://drive.google.com/file/d/1dPo1RNqasoNxXUjwk6nGuDBWIPoD2_mY/view?usp=sharing",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "w-8 h-8 rounded-xl flex items-center justify-center bg-foreground/5 hover:bg-foreground/15 border border-foreground/10 hover:border-foreground/30 transition-all duration-300",
              title: sk.downloadCVEnglish,
              "aria-label": sk.downloadCVEnglish,
              children: /* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5 text-foreground/70" })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8 reveal", children: [
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-8 border border-foreground/5 hover:border-foreground/10 transition-colors h-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsx(Briefcase, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ jsx("h3", { className: "font-mono text-sm font-bold uppercase tracking-wider", children: sk.workExperience })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-8 border-l border-foreground/10 pl-6 ml-2 relative", children: experience.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "relative pb-2", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-background border-2 border-primary" }),
          /* @__PURE__ */ jsx("h4", { className: "text-foreground font-semibold", children: item.role }),
          /* @__PURE__ */ jsx("div", { className: "text-primary text-sm font-medium mb-1", children: item.company }),
          /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-xs font-mono mb-3", children: item.period }),
          /* @__PURE__ */ jsxs("div", { className: "lg:hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: `overflow-hidden transition-all duration-300 ${expandedIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`, children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground/90 leading-relaxed mb-3", children: item.description }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: item.tech.map((tech, idx) => /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium border border-border/50 bg-foreground/5 px-2 py-1 rounded-md text-foreground/80", children: tech }, idx)) })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => toggleExpand(i),
                className: "flex items-center gap-1 text-xs text-primary/80 hover:text-primary font-medium transition-colors mt-1",
                children: [
                  /* @__PURE__ */ jsx(ChevronDown, { className: `w-3.5 h-3.5 transition-transform duration-300 ${expandedIndex === i ? "rotate-180" : ""}` }),
                  expandedIndex === i ? sk.seeLess : sk.seeMore
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hidden lg:block", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground/90 leading-relaxed mb-4", children: item.description }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: item.tech.map((tech, idx) => /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium border border-border/50 bg-foreground/5 px-2 py-1 rounded-md text-foreground/80", children: tech }, idx)) })
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-8 border border-foreground/5 hover:border-foreground/10 transition-colors h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
            /* @__PURE__ */ jsx(GraduationCap, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsx("h3", { className: "font-mono text-sm font-bold uppercase tracking-wider", children: sk.education })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: education.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "relative bg-background/30 p-4 rounded-xl border border-foreground/5 hover:border-primary/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-foreground font-semibold text-sm leading-tight mb-1", children: item.degree }),
              /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-xs", children: item.institution })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-primary text-[10px] font-mono border border-primary/20 bg-primary/5 inline-flex w-fit px-2 py-1 rounded whitespace-nowrap", children: item.period })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-foreground/5 transition-colors hover:bg-primary/5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl font-black mb-1", children: "3+" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider font-medium", children: sk.yearsExp })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-foreground/5 transition-colors hover:bg-primary/5", children: [
            /* @__PURE__ */ jsx(Languages, { className: "w-6 h-6 text-primary mb-2" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground leading-tight font-medium", children: sk.languages })
          ] })
        ] })
      ] })
    ] })
  ] }) }) });
}

const projectStaticData = [
  {
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JavaScript",
      "CSS3",
      "Bootstrap",
      "Netlify",
      "Railway",
      "MercadoPago API"
    ],
    highlight: "Proyecto Estrella",
    link: "https://uncuartodemilla.com/",
    repo: "https://github.com/jackshaw32",
    gradient: "from-blue-500/20 via-indigo-500/5 to-transparent",
    accent: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    media: "/14milla-preview.mp4",
    isVideo: true
  },
  {
    tags: [
      "HTML5",
      "CSS3",
      "Vanilla JavaScript",
      "Bootstrap",
      "SEO Optimization",
      "Web Hosting",
      "Responsive UI"
    ],
    link: "https://www.expresoomega.com/",
    repo: "https://github.com/jackshaw32",
    gradient: "from-emerald-500/20 via-teal-500/5 to-transparent",
    accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    media: "/omega-preview.mp4",
    isVideo: true
  },
  {
    tags: [
      "React 18",
      "React Router",
      "JavaScript",
      "Bootstrap",
      "React Bootstrap",
      "Framer Motion",
      "AOS Animations",
      "Swiper",
      "Three.js",
      "Responsive UI"
    ],
    highlight: "Interactive Event Landing",
    link: "https://alfyvivi.com/",
    repo: "https://github.com/jackshaw32",
    gradient: "from-pink-500/20 via-purple-500/5 to-transparent",
    accent: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    media: "/alfyvivi-preview.mp4",
    isVideo: true
  }
];
function Projects() {
  const ref = useRef(null);
  useReveal(ref);
  const { lang } = useLanguage();
  const t = translations[lang];
  const pr = t.projects;
  const topProjects = pr.projects.map((proj, i) => ({
    ...projectStaticData[i],
    ...proj
  }));
  return /* @__PURE__ */ jsx("section", { ref, id: "projects", className: "py-16 md:py-32 relative", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 md:mb-24 reveal flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(1.2rem,6vw,2rem)] sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-4 md:mb-6 whitespace-nowrap", children: [
        pr.title,
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: pr.titleHighlight })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-foreground to-pink-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm", children: pr.subtitle })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-14 md:gap-24 xl:gap-32", children: topProjects.map((project, index) => {
      const isEven = index % 2 !== 0;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: `reveal flex flex-col xl:flex-row gap-10 lg:gap-16 items-center group ${["", "delay-100", "delay-200"][index] ?? ""}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: `w-full xl:w-3/5 relative rounded-[2.5rem] p-2 md:p-4 glass border border-foreground/10 overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/5 ${isEven ? "xl:order-2" : "xl:order-1"}`, children: [
              /* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30 group-hover:opacity-100 transition-opacity duration-700` }),
              /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-[16/10] rounded-[2rem] overflow-hidden bg-background border border-foreground/10", children: [
                /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-0 right-0 h-8 bg-background/80 backdrop-blur-md border-b border-foreground/10 flex items-center px-4 gap-2 z-10", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-red-500/80" }),
                  /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-yellow-500/80" }),
                  /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-green-500/80" }),
                  /* @__PURE__ */ jsxs("div", { className: "mx-auto flex items-center gap-1.5 px-3 py-1 rounded-md bg-foreground/5 text-[10px] text-muted-foreground font-mono", children: [
                    /* @__PURE__ */ jsx(Globe, { className: "w-3 h-3" }),
                    new URL(project.link).hostname
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-full h-full pt-8 relative overflow-hidden", children: project.isVideo ? /* @__PURE__ */ jsx(
                  "video",
                  {
                    src: project.media,
                    autoPlay: true,
                    loop: true,
                    muted: true,
                    playsInline: true,
                    className: "w-full h-full object-cover object-top transform group-hover:scale-[1.02] transition-transform duration-700 ease-out",
                    children: /* @__PURE__ */ jsx("track", { kind: "captions" })
                  }
                ) : /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: project.media,
                    alt: `Captura de ${project.title}`,
                    loading: "lazy",
                    className: "w-full h-full object-cover object-top transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: project.link,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 z-20",
                    children: /* @__PURE__ */ jsxs("div", { className: "bg-primary text-primary-foreground font-bold px-4 py-2.5 sm:px-8 sm:py-4 rounded-full flex items-center gap-2 text-xs sm:text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl shadow-primary/20", children: [
                      pr.visitSite,
                      " ",
                      /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" })
                    ] })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `w-full xl:w-2/5 flex flex-col justify-center ${isEven ? "xl:order-1 xl:pl-4" : "xl:order-2 xl:pr-4"}`, children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 sm:gap-4 mb-4 md:mb-6", children: [
                /* @__PURE__ */ jsx("span", { className: `text-xs uppercase tracking-widest font-black px-4 py-1.5 rounded-full border ${project.accent}`, children: project.highlight }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-muted-foreground border-b border-foreground/10 pb-0.5", children: project.role })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-4 md:mb-6 leading-tight group-hover:text-primary transition-colors duration-300", children: project.title }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed mb-5 md:mb-8 font-light", children: project.description }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:space-y-3 mb-6 md:mb-10", children: [
                /* @__PURE__ */ jsxs("h4", { className: "text-sm font-bold text-foreground mb-4 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Code2, { className: "w-4 h-4 text-primary" }),
                  " ",
                  pr.keyFeatures
                ] }),
                project.features.map((feature, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 text-muted-foreground text-sm", children: [
                  /* @__PURE__ */ jsx("div", { className: "mt-1 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { children: feature })
                ] }, i))
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-6 md:mb-10", children: project.tags.map((tag) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "text-[11px] sm:text-xs font-semibold text-foreground/80 bg-foreground/5 border border-border/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl",
                  children: tag
                },
                tag
              )) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: project.link,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "w-full sm:w-auto flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 px-5 py-3 sm:px-8 sm:py-4 rounded-2xl text-sm font-bold transition-all duration-300 shadow-xl shadow-foreground/10 group/btn",
                    children: [
                      pr.viewProject,
                      /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: project.repo,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "w-full sm:w-auto flex items-center justify-center gap-2 glass hover:bg-foreground/5 text-foreground border border-border/50 hover:border-foreground/30 px-5 py-3 sm:px-8 sm:py-4 rounded-2xl text-sm font-bold transition-all duration-300",
                    children: [
                      /* @__PURE__ */ jsx(Github, { className: "w-4 h-4" }),
                      pr.repository
                    ]
                  }
                )
              ] })
            ] })
          ]
        },
        index
      );
    }) })
  ] }) });
}

const featureIcons = [Zap, Search, CheckCircle2, Smartphone];
const allTechs = [
  { name: "TS / JS", icon: SiTypescript, color: "#3178C6", icon2: SiJavascript, color2: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", darkColor: "#ffffff" },
  { name: "Astro", icon: SiAstro, color: "#FF5D01" },
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Nest.js", icon: SiNestjs, color: "#E0234E" },
  { name: "Express", icon: SiExpress, color: "#000000", darkColor: "#ffffff" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Postgres", icon: SiPostgresql, color: "#4169E1" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "AWS", icon: SiAmazonwebservices, color: "#232F3E", darkColor: "#ffffff" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F05032" }
];
function Optimizations() {
  const ref = useRef(null);
  useReveal(ref);
  const { lang } = useLanguage();
  const t = translations[lang];
  const op = t.optimizations;
  const metrics = [
    { label: "Performance", value: 97, color: "text-green-500", stroke: "stroke-green-500", icon: Zap },
    { label: "Accessibility", value: 94, color: "text-green-500", stroke: "stroke-green-500", icon: CheckCircle2 },
    { label: "Best Practices", value: 95, color: "text-green-500", stroke: "stroke-green-500", icon: Smartphone },
    { label: "SEO", value: 98, color: "text-green-500", stroke: "stroke-green-500", icon: Search }
  ];
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const circumference = 283;
  const delayClasses = ["delay-[0ms]", "delay-[180ms]", "delay-[360ms]", "delay-[540ms]"];
  return /* @__PURE__ */ jsxs("section", { ref, id: "optimizations", className: "py-24 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] pointer-events-none flex justify-center opacity-30", children: /* @__PURE__ */ jsx("div", { className: "absolute w-[600px] h-[300px] bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 blur-3xl mix-blend-normal dark:mix-blend-screen" }) }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16 reveal flex flex-col items-center", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-[clamp(1.5rem,7vw,3rem)] md:text-5xl font-bold mb-4 md:mb-6 tracking-tight whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("span", { children: op.title }),
          /* @__PURE__ */ jsx("span", { className: "text-green-500", children: op.titleHighlight })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-foreground to-green-500 max-w-2xl mx-auto font-medium text-sm sm:text-base md:text-lg drop-shadow-sm", children: op.subtitle })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 reveal delay-150", children: [
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-5 relative overflow-hidden border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.1)]", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-red-500" }),
                /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-yellow-500" }),
                /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-green-500" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-muted-foreground bg-background/50 px-3 py-1 rounded-full", children: "lighthouse-report.json" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: metrics.map((metric, i) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative w-16 h-16 flex items-center justify-center", children: [
                /* @__PURE__ */ jsxs("svg", { className: "absolute inset-0 w-full h-full -rotate-90", viewBox: "0 0 100 100", children: [
                  /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "45", fill: "none", className: "stroke-muted/30", strokeWidth: "8" }),
                  /* @__PURE__ */ jsx(
                    "circle",
                    {
                      cx: "50",
                      cy: "50",
                      r: "45",
                      fill: "none",
                      className: `${metric.stroke} transition-[stroke-dashoffset] duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${delayClasses[i]}`,
                      strokeWidth: "8",
                      strokeDasharray: circumference,
                      strokeDashoffset: animated ? circumference * (1 - metric.value / 100) : circumference,
                      strokeLinecap: "round"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-base font-bold ${metric.color}`, children: metric.value })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx(metric.icon, { className: `w-3.5 h-3.5 mx-auto mb-1 ${metric.color}` }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium text-muted-foreground uppercase tracking-wider", children: metric.label })
              ] })
            ] }, metric.label)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl px-5 py-4 border border-green-500/10", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-mono text-white-foreground/40 uppercase tracking-widest text-center mb-3", children: op.techUsed }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-5 gap-x-2 gap-y-3", children: allTechs.map((tech) => /* @__PURE__ */ jsxs(
              "div",
              {
                title: tech.name,
                className: "flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-foreground/5 transition-colors cursor-default group",
                children: [
                  tech.icon2 ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200 group-hover:scale-110", children: [
                    /* @__PURE__ */ jsx(tech.icon, { className: "w-4 h-4", style: { color: tech.color } }),
                    /* @__PURE__ */ jsx(tech.icon2, { className: "w-4 h-4", style: { color: tech.color2 } })
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      tech.icon,
                      {
                        className: `w-6 h-6 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200 group-hover:scale-110 ${tech.darkColor ? "dark:hidden" : ""}`,
                        style: { color: tech.color }
                      }
                    ),
                    tech.darkColor && /* @__PURE__ */ jsx(
                      tech.icon,
                      {
                        className: "w-6 h-6 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200 group-hover:scale-110 hidden dark:block",
                        style: { color: tech.darkColor }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-[7px] sm:text-[9px] text-white-foreground/60 font-mono w-full text-center leading-tight break-words hyphens-auto", children: tech.name })
                ]
              },
              tech.name
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6 reveal delay-300", children: op.features.map((feature, index) => {
          const Icon = featureIcons[index];
          return /* @__PURE__ */ jsxs("div", { className: "flex gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors duration-300", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-1 text-foreground", children: feature.title }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: feature.description })
            ] })
          ] }, feature.title);
        }) })
      ] })
    ] })
  ] });
}

function useChatLogic(lang, defaultWelcomeMsg) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [jumping, setJumping] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const welcomeMsg = { id: "1", role: "assistant", content: defaultWelcomeMsg };
  const [messages, setMessages] = useState([welcomeMsg]);
  const messagesEndRef = useRef(null);
  const didLoadStorage = useRef(false);
  const currentSectionRef = useRef("top");
  const idCounterRef = useRef(0);
  const genId = () => `${Date.now()}-${++idCounterRef.current}`;
  useEffect(() => {
    if (didLoadStorage.current) return;
    didLoadStorage.current = true;
    try {
      const saved = localStorage.getItem("edubot-history");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch {
    }
    setMessages([{ id: "1", role: "assistant", content: defaultWelcomeMsg }]);
  }, []);
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [{ id: "1", role: "assistant", content: defaultWelcomeMsg }];
      }
      return prev;
    });
  }, [lang, defaultWelcomeMsg]);
  useEffect(() => {
    try {
      if (messages.length > 1) {
        localStorage.setItem("edubot-history", JSON.stringify(messages.slice(-30)));
      }
    } catch {
    }
  }, [messages]);
  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(false), 6e3);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const sectionIds = ["top", "skills", "projects", "optimizations", "about", "contact"];
    const observers = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) currentSectionRef.current = id;
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);
  useEffect(() => {
    if (open) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 150);
    }
  }, [open, messages, isLoading]);
  const handleRobotClick = () => {
    if (open) {
      setOpen(false);
      return;
    }
    if (!jumping) {
      setJumping(true);
      setShowLabel(false);
      setTimeout(() => {
        setJumping(false);
        setOpen(true);
      }, 450);
    }
  };
  const clearChat = () => {
    try {
      localStorage.removeItem("edubot-history");
    } catch {
    }
    setMessages([{ id: "1", role: "assistant", content: defaultWelcomeMsg }]);
    didLoadStorage.current = false;
  };
  const mandarMensaje = async (e, textoDirecto) => {
    if (e) e.preventDefault();
    const textoAEnviar = textoDirecto || input;
    if (!textoAEnviar.trim() || isLoading) return;
    setInput("");
    setIsLoading(true);
    const userId = genId();
    const assistantId = genId();
    const nuevoMensajeUser = {
      id: userId,
      role: "user",
      content: textoAEnviar
    };
    const nuevoHistorial = [...messages, nuevoMensajeUser];
    setMessages([
      ...nuevoHistorial,
      { id: assistantId, role: "assistant", content: "", toolInvocations: [] }
    ]);
    try {
      const historialParaEnviar = nuevoHistorial.filter((m) => m.id !== "1").map((m) => {
        if (m.role !== "assistant" || m.content.trim()) {
          return { role: m.role, content: m.content };
        }
        const invocations = m.toolInvocations ?? [];
        const summaryParts = [];
        for (const inv of invocations) {
          if (!inv.result) continue;
          if (inv.toolName === "sendContactForm") {
            const r = inv.result;
            if (r.success) {
              summaryParts.push(
                `[SYSTEM NOTE: sendContactForm was already called and succeeded for "${r.name}". The contact form has been submitted. Do NOT call sendContactForm again in this conversation.]`
              );
            } else {
              summaryParts.push(`[Contact form submission failed: ${r.reason}]`);
            }
          } else {
            summaryParts.push(`[Showed ${inv.toolName} card]`);
          }
        }
        const content = summaryParts.length > 0 ? summaryParts.join(" ") : "[Visual response shown]";
        return { role: m.role, content };
      });
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historialParaEnviar, language: lang, pageContext: currentSectionRef.current })
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `Error ${res.status}`);
      }
      if (!res.body) throw new Error("Sin respuesta del servidor");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const colonIdx = line.indexOf(":");
          if (colonIdx === -1) continue;
          const prefix = line.slice(0, colonIdx);
          const data = line.slice(colonIdx + 1);
          if (!data || data.trim() === "" || data.trim() === "undefined") continue;
          try {
            if (prefix === "0") {
              const chunk = JSON.parse(data);
              if (typeof chunk !== "string") continue;
              setMessages((prev) => {
                const idx = prev.findIndex((m) => m.id === assistantId);
                if (idx === -1) {
                  return [...prev, { id: assistantId, role: "assistant", content: chunk, toolInvocations: [] }];
                }
                const updated = [...prev];
                updated[idx] = { ...updated[idx], content: updated[idx].content + chunk };
                return updated;
              });
            } else if (prefix === "9") {
              const toolCall = JSON.parse(data);
              if (!toolCall?.toolCallId || !toolCall?.toolName) continue;
              setMessages((prev) => {
                const idx = prev.findIndex((m) => m.id === assistantId);
                if (idx === -1) return prev;
                const updated = [...prev];
                updated[idx] = {
                  ...updated[idx],
                  toolInvocations: [
                    ...updated[idx].toolInvocations || [],
                    { toolCallId: toolCall.toolCallId, toolName: toolCall.toolName, args: toolCall.args ?? {} }
                  ]
                };
                return updated;
              });
            } else if (prefix === "a") {
              const toolResult = JSON.parse(data);
              if (!toolResult?.toolCallId) continue;
              setMessages((prev) => {
                const idx = prev.findIndex((m) => m.id === assistantId);
                if (idx === -1) return prev;
                const updated = [...prev];
                updated[idx] = {
                  ...updated[idx],
                  toolInvocations: (updated[idx].toolInvocations || []).map(
                    (ti) => ti.toolCallId === toolResult.toolCallId ? { ...ti, result: toolResult.result } : ti
                  )
                };
                return updated;
              });
            }
          } catch {
            if (false) ;
          }
        }
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Error desconocido";
      setMessages((prev) => {
        const idx = prev.findIndex((m) => m.id === assistantId);
        if (idx === -1) return prev;
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          content: errorMsg.includes("limit") || errorMsg.includes("límite") ? errorMsg : lang === "en" ? "Sorry, I encountered an error. Please try again." : "Lo siento, encontré un error. Por favor intentá de nuevo."
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };
  return {
    open,
    setOpen,
    expanded,
    setExpanded,
    showLabel,
    jumping,
    input,
    setInput,
    isLoading,
    messages,
    messagesEndRef,
    handleRobotClick,
    clearChat,
    mandarMensaje
  };
}

function RobotButton({
  open,
  jumping,
  showLabel,
  openLabel,
  closeLabel,
  openChatAriaLabel,
  closeChatAriaLabel,
  onRobotClick
}) {
  return /* @__PURE__ */ jsx("div", { className: `fixed bottom-10 right-5 sm:bottom-10 sm:right-10 z-50 transition-all duration-500 origin-bottom-right ${open ? "scale-0 opacity-0 pointer-events-none sm:scale-100 sm:opacity-100 sm:pointer-events-auto" : "scale-[0.7] sm:scale-100 opacity-100"}`, children: /* @__PURE__ */ jsxs("button", { onClick: onRobotClick, "aria-label": open ? openChatAriaLabel : closeChatAriaLabel, className: `group relative flex items-end focus:outline-none ${jumping ? "animate-robot-jump" : !open ? "animate-robot-bob" : ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: `mb-3 mr-1 transition-all duration-300 self-end ${showLabel && !jumping && !open ? "opacity-100 -translate-y-2" : "opacity-0 translate-y-0 pointer-events-none"} group-hover:opacity-100 group-hover:-translate-y-2`, children: /* @__PURE__ */ jsxs("div", { className: "relative bg-foreground text-background text-[13px] sm:text-[11px] font-semibold px-4 py-3 sm:px-3 sm:py-2 rounded-2xl rounded-br-sm shadow-xl whitespace-nowrap", children: [
      open ? closeLabel : openLabel,
      /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1.5 right-3 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-foreground" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: `relative select-none drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300 w-[72px] h-[104px] ${open ? "scale-105" : ""}`, children: [
      !jumping && !open && /* @__PURE__ */ jsx("div", { className: "absolute z-10 top-[28px] -left-[12px] origin-bottom animate-robot-wave", children: /* @__PURE__ */ jsxs("svg", { width: "18", height: "32", viewBox: "0 0 18 32", fill: "none", children: [
        /* @__PURE__ */ jsx("rect", { x: "6", y: "8", width: "7", height: "18", rx: "3.5", fill: "#374151" }),
        /* @__PURE__ */ jsx("rect", { x: "6", y: "8", width: "7", height: "18", rx: "3.5", fill: "url(#arm-shine)", opacity: "0.3" }),
        /* @__PURE__ */ jsx("ellipse", { cx: "9", cy: "6", rx: "6", ry: "6", fill: "#4B5563" }),
        /* @__PURE__ */ jsx("text", { x: "9", y: "10", textAnchor: "middle", fontSize: "9", fill: "white", children: "👋" }),
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "arm-shine", x1: "0", y1: "0", x2: "1", y2: "0", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "white", stopOpacity: "0" }),
          /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "white", stopOpacity: "0.5" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "white", stopOpacity: "0" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxs("svg", { width: "72", height: "104", viewBox: "0 0 72 104", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs("linearGradient", { id: "body-grad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#374151" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#111827" })
          ] }),
          /* @__PURE__ */ jsxs("linearGradient", { id: "head-grad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#4B5563" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#1F2937" })
          ] }),
          /* @__PURE__ */ jsxs("linearGradient", { id: "shine", x1: "0", y1: "0", x2: "1", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "white", stopOpacity: "0.12" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "white", stopOpacity: "0" })
          ] }),
          /* @__PURE__ */ jsxs("filter", { id: "glow-eye", children: [
            /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "1.5", result: "blur" }),
            /* @__PURE__ */ jsxs("feMerge", { children: [
              /* @__PURE__ */ jsx("feMergeNode", { in: "blur" }),
              /* @__PURE__ */ jsx("feMergeNode", { in: "SourceGraphic" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("filter", { id: "glow-orb", children: [
            /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "2", result: "blur" }),
            /* @__PURE__ */ jsxs("feMerge", { children: [
              /* @__PURE__ */ jsx("feMergeNode", { in: "blur" }),
              /* @__PURE__ */ jsx("feMergeNode", { in: "SourceGraphic" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("line", { x1: "36", y1: "6", x2: "36", y2: "16", stroke: "#6B7280", strokeWidth: "2", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("circle", { cx: "36", cy: "4", r: "4", fill: "#8B5CF6", filter: "url(#glow-orb)", className: "animate-robot-blink-antenna" }),
        /* @__PURE__ */ jsx("circle", { cx: "36", cy: "4", r: "2.5", fill: "#C4B5FD" }),
        /* @__PURE__ */ jsx("rect", { x: "12", y: "22", width: "6", height: "10", rx: "3", fill: "#374151" }),
        /* @__PURE__ */ jsx("rect", { x: "54", y: "22", width: "6", height: "10", rx: "3", fill: "#374151" }),
        /* @__PURE__ */ jsx("rect", { x: "16", y: "14", width: "40", height: "30", rx: "10", fill: "url(#head-grad)" }),
        /* @__PURE__ */ jsx("rect", { x: "16", y: "14", width: "40", height: "30", rx: "10", fill: "url(#shine)" }),
        /* @__PURE__ */ jsx("rect", { x: "17", y: "15", width: "38", height: "14", rx: "8", fill: "white", fillOpacity: "0.04" }),
        /* @__PURE__ */ jsx("rect", { x: "20", y: "23", width: "32", height: "13", rx: "5", fill: "#0F172A", fillOpacity: "0.8" }),
        open ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("line", { x1: "25", y1: "26", x2: "31", y2: "32", stroke: "#F87171", strokeWidth: "2.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("line", { x1: "31", y1: "26", x2: "25", y2: "32", stroke: "#F87171", strokeWidth: "2.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("line", { x1: "41", y1: "26", x2: "47", y2: "32", stroke: "#F87171", strokeWidth: "2.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("line", { x1: "47", y1: "26", x2: "41", y2: "32", stroke: "#F87171", strokeWidth: "2.5", strokeLinecap: "round" })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("ellipse", { cx: "28", cy: "29.5", rx: "4", ry: "4", fill: "#06B6D4", filter: "url(#glow-eye)", className: "animate-robot-blink" }),
          /* @__PURE__ */ jsx("ellipse", { cx: "28", cy: "29.5", rx: "2.5", ry: "2.5", fill: "#A5F3FC" }),
          /* @__PURE__ */ jsx("ellipse", { cx: "44", cy: "29.5", rx: "4", ry: "4", fill: "#06B6D4", filter: "url(#glow-eye)", className: "animate-robot-blink-offset" }),
          /* @__PURE__ */ jsx("ellipse", { cx: "44", cy: "29.5", rx: "2.5", ry: "2.5", fill: "#A5F3FC" })
        ] }),
        /* @__PURE__ */ jsx("rect", { x: "26", y: "37", width: "20", height: "4", rx: "2", fill: "#374151" }),
        /* @__PURE__ */ jsx("line", { x1: "30", y1: "37", x2: "30", y2: "41", stroke: "#6B7280", strokeWidth: "1" }),
        /* @__PURE__ */ jsx("line", { x1: "34", y1: "37", x2: "34", y2: "41", stroke: "#6B7280", strokeWidth: "1" }),
        /* @__PURE__ */ jsx("line", { x1: "38", y1: "37", x2: "38", y2: "41", stroke: "#6B7280", strokeWidth: "1" }),
        /* @__PURE__ */ jsx("line", { x1: "42", y1: "37", x2: "42", y2: "41", stroke: "#6B7280", strokeWidth: "1" }),
        /* @__PURE__ */ jsx("rect", { x: "30", y: "44", width: "12", height: "6", rx: "3", fill: "#374151" }),
        /* @__PURE__ */ jsx("rect", { x: "14", y: "50", width: "44", height: "30", rx: "10", fill: "url(#body-grad)" }),
        /* @__PURE__ */ jsx("rect", { x: "14", y: "50", width: "44", height: "30", rx: "10", fill: "url(#shine)" }),
        /* @__PURE__ */ jsx("rect", { x: "20", y: "56", width: "32", height: "18", rx: "5", fill: "#0F172A", fillOpacity: "0.6" }),
        /* @__PURE__ */ jsx("circle", { cx: "27", cy: "65", r: "3", fill: "#8B5CF6", filter: "url(#glow-eye)", className: "animate-robot-blink-fast" }),
        /* @__PURE__ */ jsx("circle", { cx: "36", cy: "65", r: "3", fill: "#06B6D4", filter: "url(#glow-eye)", className: "animate-robot-blink-antenna" }),
        /* @__PURE__ */ jsx("circle", { cx: "45", cy: "65", r: "3", fill: "#10B981", filter: "url(#glow-eye)", className: "animate-robot-blink-offset" }),
        /* @__PURE__ */ jsx("rect", { x: "58", y: "52", width: "8", height: "20", rx: "4", fill: "#374151" }),
        /* @__PURE__ */ jsx("ellipse", { cx: "62", cy: "74", rx: "4.5", ry: "4", fill: "#4B5563" }),
        /* @__PURE__ */ jsx("rect", { x: "20", y: "80", width: "13", height: "18", rx: "5", fill: "#374151" }),
        /* @__PURE__ */ jsx("rect", { x: "39", y: "80", width: "13", height: "18", rx: "5", fill: "#374151" }),
        /* @__PURE__ */ jsx("rect", { x: "17", y: "94", width: "18", height: "8", rx: "4", fill: "#1F2937" }),
        /* @__PURE__ */ jsx("rect", { x: "37", y: "94", width: "18", height: "8", rx: "4", fill: "#1F2937" })
      ] })
    ] })
  ] }) });
}

function ToolResultCard({ toolInvocation, lang }) {
  if (toolInvocation.toolName === "showProject") {
    if (!toolInvocation.result) {
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg animate-pulse mt-1", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-indigo-400" }),
        /* @__PURE__ */ jsx("span", { children: lang === "en" ? "Generating project view..." : "Generando vista del proyecto..." })
      ] }, toolInvocation.toolCallId);
    }
    const project = toolInvocation.result;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "w-full sm:min-w-[280px] max-w-[320px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1",
        children: [
          project.video ? /* @__PURE__ */ jsx(
            "video",
            {
              src: project.video,
              className: "w-full h-36 object-cover object-top",
              autoPlay: true,
              muted: true,
              loop: true,
              playsInline: true,
              children: /* @__PURE__ */ jsx("track", { kind: "captions" })
            }
          ) : project.image ? /* @__PURE__ */ jsx(
            "img",
            {
              src: project.image,
              alt: project.title,
              className: "w-full h-36 object-cover object-top"
            }
          ) : null,
          /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50", children: /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-foreground", children: project.title }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: project.description }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: project.tech?.map((tech) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "text-[10px] font-medium bg-foreground/5 border border-border/50 px-2 py-0.5 rounded-md text-foreground/80",
                children: tech
              },
              tech
            )) }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: project.url,
                target: "_blank",
                rel: "noreferrer",
                className: "mt-2 w-full flex items-center justify-center gap-2 bg-foreground text-background text-xs font-bold py-2.5 rounded-xl hover:bg-foreground/90 transition-colors shadow-sm",
                children: [
                  lang === "en" ? "View live site" : "Ver web en vivo",
                  /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" })
                ]
              }
            )
          ] })
        ]
      },
      toolInvocation.toolCallId
    );
  }
  if (toolInvocation.toolName === "showContact") {
    if (!toolInvocation.result) {
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg animate-pulse mt-1", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-indigo-400" }),
        /* @__PURE__ */ jsx("span", { children: lang === "en" ? "Loading contact info..." : "Cargando datos de contacto..." })
      ] }, toolInvocation.toolCallId);
    }
    const contact = toolInvocation.result;
    const contactLinks = [
      { href: contact.linkedin, icon: /* @__PURE__ */ jsx(Linkedin, { className: "w-3.5 h-3.5" }), key: "LinkedIn", label: "LinkedIn" },
      { href: `mailto:${contact.email}`, icon: /* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5" }), key: contact.email, label: contact.email },
      { href: contact.github, icon: /* @__PURE__ */ jsx(Github, { className: "w-3.5 h-3.5" }), key: "GitHub", label: "GitHub" },
      { href: contact.cvEs, icon: /* @__PURE__ */ jsx(FileDown, { className: "w-3.5 h-3.5" }), key: "CV ES", label: /* @__PURE__ */ jsxs("span", { children: [
        "CV ",
        /* @__PURE__ */ jsx("span", { className: "text-[10px]", children: "ES" })
      ] }) },
      { href: contact.cvEn, icon: /* @__PURE__ */ jsx(FileDown, { className: "w-3.5 h-3.5" }), key: "CV EN", label: /* @__PURE__ */ jsxs("span", { children: [
        "CV ",
        /* @__PURE__ */ jsx("span", { className: "text-[10px]", children: "EN" })
      ] }) },
      { href: contact.portfolio, icon: /* @__PURE__ */ jsx(Globe, { className: "w-3.5 h-3.5" }), key: "Portfolio", label: "Portfolio" }
    ];
    return /* @__PURE__ */ jsxs("div", { className: "w-full sm:min-w-[260px] max-w-[300px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 text-indigo-400" }),
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-foreground", children: lang === "en" ? "Contact Eduardo" : "Contactar a Eduardo" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-3 space-y-2", children: [
        contactLinks.map((link) => /* @__PURE__ */ jsxs(
          "a",
          {
            href: link.href,
            target: "_blank",
            rel: "noreferrer",
            className: "flex items-center gap-2.5 w-full bg-muted/40 hover:bg-foreground hover:text-background border border-border/40 rounded-xl px-3 py-2 text-xs font-medium transition-colors",
            children: [
              link.icon,
              link.label,
              /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3 ml-auto opacity-50" })
            ]
          },
          link.key
        )),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground px-1 pt-1", children: [
          /* @__PURE__ */ jsx(Phone, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsx("span", { children: contact.phone })
        ] })
      ] })
    ] }, toolInvocation.toolCallId);
  }
  if (toolInvocation.toolName === "showSkills") {
    if (!toolInvocation.result) {
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg animate-pulse mt-1", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-indigo-400" }),
        /* @__PURE__ */ jsx("span", { children: lang === "en" ? "Loading tech stack..." : "Cargando tech stack..." })
      ] }, toolInvocation.toolCallId);
    }
    const skills = toolInvocation.result;
    const categoryColors = {
      "Frontend": "text-blue-400",
      "Backend": "text-green-400",
      "Bases de datos": "text-yellow-400",
      "Cloud & DevOps": "text-orange-400",
      "Pagos & otros": "text-pink-400"
    };
    return /* @__PURE__ */ jsxs("div", { className: "w-full sm:min-w-[280px] max-w-[340px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50", children: /* @__PURE__ */ jsxs("h4", { className: "font-bold text-sm text-foreground", children: [
        "🛠️ ",
        lang === "en" ? "Tech Stack" : "Tech Stack de Eduardo"
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "p-4 space-y-3", children: skills.categories?.map((cat) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: `text-[10px] font-bold uppercase tracking-wider mb-1.5 ${categoryColors[cat.name] ?? "text-muted-foreground"}`, children: cat.name }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: cat.skills.map((skill) => /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium bg-foreground/5 border border-border/50 px-2 py-0.5 rounded-md text-foreground/80", children: skill }, skill)) })
      ] }, cat.name)) })
    ] }, toolInvocation.toolCallId);
  }
  if (toolInvocation.toolName === "showExperience") {
    if (!toolInvocation.result) {
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg animate-pulse mt-1", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-indigo-400" }),
        /* @__PURE__ */ jsx("span", { children: lang === "en" ? "Loading experience..." : "Cargando experiencia..." })
      ] }, toolInvocation.toolCallId);
    }
    const exp = toolInvocation.result;
    return /* @__PURE__ */ jsxs("div", { className: "w-full sm:min-w-[280px] max-w-[340px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-indigo-400" }),
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-foreground", children: lang === "en" ? "Experience & Education" : "Experiencia & Educación" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx("div", { className: "relative ml-3 space-y-0", children: exp.items?.map((item, i) => {
        const isEducation = item.company.includes("Bootcamp") || item.company.includes("Academia") || item.company.includes("DevSchool") || item.company.includes("Edici") || item.company.includes("Egg") || item.company.includes("Casa") || item.role.includes("Bootcamp") || item.role.includes("Programaci");
        return /* @__PURE__ */ jsxs("div", { className: "relative pl-5 pb-5 last:pb-0", children: [
          i < (exp.items?.length ?? 0) - 1 && /* @__PURE__ */ jsx("span", { className: "absolute left-[4px] top-4 bottom-0 w-px bg-border/60" }),
          /* @__PURE__ */ jsx("span", { className: `absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 ${item.current ? "bg-green-500 border-green-400" : "bg-muted border-border"}` }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold text-indigo-400", children: item.period }),
              item.current && /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded-full", children: lang === "en" ? "Current" : "Actual" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-foreground mt-0.5", children: item.role }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
              isEducation ? /* @__PURE__ */ jsx(GraduationCap, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }) : /* @__PURE__ */ jsx(Briefcase, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] text-muted-foreground", children: item.company })
            ] }),
            item.years && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground/70", children: item.years }),
            item.description && /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground mt-1 leading-relaxed", children: item.description }),
            item.tech && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 mt-1.5", children: item.tech.split(",").map((t) => /* @__PURE__ */ jsx("span", { className: "text-[9px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded-full", children: t.trim() }, t)) })
          ] })
        ] }, i);
      }) }) })
    ] }, toolInvocation.toolCallId);
  }
  if (toolInvocation.toolName === "showAvailability") {
    if (!toolInvocation.result) {
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg animate-pulse mt-1", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-indigo-400" }),
        /* @__PURE__ */ jsx("span", { children: lang === "en" ? "Checking availability..." : "Verificando disponibilidad..." })
      ] }, toolInvocation.toolCallId);
    }
    const avail = toolInvocation.result;
    return /* @__PURE__ */ jsxs("div", { className: "w-full sm:min-w-[260px] max-w-[300px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1", children: [
      /* @__PURE__ */ jsxs("div", { className: `px-4 py-3 border-b border-border/50 flex items-center gap-2 ${avail.available ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10" : "bg-gradient-to-r from-orange-500/10 to-red-500/10"}`, children: [
        avail.available ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-green-400" }) : /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-orange-400" }),
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-foreground", children: lang === "en" ? "Availability" : "Disponibilidad" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: `w-2.5 h-2.5 rounded-full animate-pulse ${avail.available ? "bg-green-500" : "bg-orange-500"}` }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-foreground", children: avail.available ? lang === "en" ? "✅ Available for new opportunities" : "✅ Disponible para nuevas oportunidades" : lang === "en" ? "⏳ Not available right now" : "⏳ No disponible por ahora" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxs("span", { children: [
              lang === "en" ? "From:" : "Desde:",
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: avail.availableFrom })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsx("span", { children: avail.timezone })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: lang === "en" ? "Open roles" : "Roles de interés" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: avail.preferredRoles?.map((role) => /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium bg-foreground/5 border border-border/50 px-2 py-0.5 rounded-md text-foreground/80", children: role }, role)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5", children: lang === "en" ? "Work mode" : "Modalidad" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: avail.workMode?.map((mode) => /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md text-indigo-400", children: mode }, mode)) })
        ] })
      ] })
    ] }, toolInvocation.toolCallId);
  }
  if (toolInvocation.toolName === "sendContactForm") {
    if (!toolInvocation.result) {
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg animate-pulse mt-1", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-indigo-400" }),
        /* @__PURE__ */ jsx("span", { children: lang === "en" ? "Sending message..." : "Enviando mensaje..." })
      ] }, toolInvocation.toolCallId);
    }
    const form = toolInvocation.result;
    return /* @__PURE__ */ jsxs("div", { className: `w-full max-w-[300px] rounded-2xl border overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1 ${form.success ? "border-green-500/20 bg-background" : "border-red-500/20 bg-background"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `px-4 py-3 border-b border-border/50 flex items-center gap-2 ${form.success ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10" : "bg-gradient-to-r from-red-500/10 to-orange-500/10"}`, children: [
        form.success ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-green-400" }) : /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-red-400" }),
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-foreground", children: form.success ? lang === "en" ? "Message sent!" : "¡Mensaje enviado!" : lang === "en" ? "Could not send" : "No se pudo enviar" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: form.success ? lang === "en" ? `Your message was sent to Eduardo successfully, ${form.name}. He'll get back to you shortly!` : `Tu mensaje fue enviado exitosamente a Eduardo, ${form.name}. ¡Te va a responder pronto!` : lang === "en" ? "There was an error sending the message. Try contacting Eduardo directly." : "Hubo un error al enviar el mensaje. Intentá contactar a Eduardo directamente." }) })
    ] }, toolInvocation.toolCallId);
  }
  return null;
}

function ChatPanel({
  open,
  expanded,
  isLoading,
  messages,
  input,
  lang,
  ch,
  messagesEndRef,
  onClose,
  onToggleExpand,
  onClearChat,
  onInputChange,
  onSend
}) {
  const panelWidth = expanded ? "sm:w-[1000px]" : "sm:w-[400px]";
  const panelHeight = expanded ? "sm:h-[85vh]" : "sm:h-[520px]";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    open && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-40 bg-background/50 backdrop-blur-sm sm:hidden", onClick: onClose }),
    /* @__PURE__ */ jsx("div", { className: `fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bottom-4 left-3 right-3 sm:bottom-10 sm:left-auto sm:right-[110px] ${panelWidth} ${open ? "opacity-100 translate-y-0 pointer-events-auto scale-100" : "opacity-0 translate-y-8 pointer-events-none scale-95"} origin-bottom-right`, children: /* @__PURE__ */ jsxs("div", { className: `relative rounded-3xl shadow-2xl p-[1.5px] h-[85vh] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${panelHeight} w-full`, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-3xl overflow-hidden pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: `absolute modal-border-conic ${isLoading ? "animate-border-spin" : "animate-[border-spin_8s_linear_infinite]"}` }) }),
      isLoading && /* @__PURE__ */ jsx("div", { className: "absolute -inset-[3px] rounded-3xl pointer-events-none animate-siri-glow-pulse siri-glow-border" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-[1.5px] rounded-[23px] bg-background" }),
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-[23px] overflow-hidden flex flex-col relative z-10 h-full w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-border/50 bg-muted/30 flex-shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-foreground flex items-center justify-center", children: /* @__PURE__ */ jsx(Bot, { className: "w-4 h-4 sm:w-5 sm:h-5 text-background" }) }),
              /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-background" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-foreground tracking-wide", children: "EduBot AI" }),
              /* @__PURE__ */ jsxs("div", { className: "text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1 font-medium", children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "w-3 h-3 text-indigo-400" }),
                isLoading ? /* @__PURE__ */ jsx("span", { className: "font-semibold text-transparent bg-clip-text animate-metallic-shine bg-[linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899,#06b6d4)] bg-[length:200%_auto]", children: ch.typing }) : ch.online
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 border border-border/50 px-2.5 py-1 rounded-full font-medium", children: [
              /* @__PURE__ */ jsx(Lock, { className: "w-3 h-3" }),
              " Beta AI"
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: onClearChat, title: lang === "en" ? "Clear chat" : "Limpiar chat", className: "w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsx("button", { onClick: onToggleExpand, "aria-label": expanded ? lang === "en" ? "Compress chat" : "Contraer chat" : lang === "en" ? "Expand chat" : "Expandir chat", className: "hidden sm:flex w-8 h-8 rounded-full items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors", children: /* @__PURE__ */ jsx(Maximize2, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsx("button", { onClick: onClose, "aria-label": lang === "en" ? "Close chat" : "Cerrar chat", className: "w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 sm:w-4 sm:h-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin overflow-x-hidden", children: [
          messages.map((msg) => /* @__PURE__ */ jsxs("div", { className: `flex gap-2 sm:gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`, children: [
            /* @__PURE__ */ jsx("div", { className: `w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center ${msg.role === "assistant" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`, children: msg.role === "assistant" ? /* @__PURE__ */ jsx(Bot, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(User, { className: "w-3.5 h-3.5" }) }),
            /* @__PURE__ */ jsxs("div", { className: `max-w-[85%] flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`, children: [
              msg.toolInvocations?.map((toolInvocation) => /* @__PURE__ */ jsx(
                ToolResultCard,
                {
                  toolInvocation,
                  lang
                },
                toolInvocation.toolCallId
              )),
              msg.content && !msg.content.startsWith("<function(") && !msg.content.includes("<function/") && !/^\s*(sendContactForm|showProject|showContact|showSkills|showExperience|showAvailability)\s*\(/.test(msg.content) && /* @__PURE__ */ jsx("div", { className: `rounded-2xl px-4 py-3 text-[13px] sm:text-sm leading-relaxed font-light whitespace-pre-wrap ${msg.role === "assistant" ? "bg-muted/50 text-foreground rounded-tl-sm" : "bg-foreground/10 text-foreground border border-foreground/10 rounded-tr-sm break-words"}`, children: msg.content })
            ] })
          ] }, msg.id)),
          isLoading && messages.length > 0 && (() => {
            const lastMsg = messages[messages.length - 1];
            return lastMsg.role === "assistant" && lastMsg.content === "" && !lastMsg.toolInvocations?.length;
          })() && /* @__PURE__ */ jsxs("div", { className: "flex gap-2 sm:gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-xl bg-foreground flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Bot, { className: "w-3.5 h-3.5 text-background" }) }),
            /* @__PURE__ */ jsx("div", { className: "rounded-2xl rounded-tl-sm px-4 py-3.5 flex gap-1.5 items-center border border-indigo-500/25 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/5", children: [
              { delay: "anim-delay-0", bg: "bg-indigo-500" },
              { delay: "anim-delay-0-2", bg: "bg-violet-500" },
              { delay: "anim-delay-0-4", bg: "bg-pink-500" }
            ].map((dot, i) => /* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 rounded-full animate-pulse ${dot.delay} ${dot.bg}` }, i)) })
          ] }),
          /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
        ] }),
        messages.length === 1 && /* @__PURE__ */ jsx("div", { className: "px-4 pb-3 flex overflow-x-auto gap-2 flex-shrink-0 scrollbar-none snap-x", children: ch.suggestions.map((s) => /* @__PURE__ */ jsx("button", { onClick: () => onSend(void 0, s), className: "text-[11px] sm:text-xs font-medium text-muted-foreground border border-border/50 bg-muted/30 hover:bg-foreground hover:text-background rounded-full px-4 py-2 whitespace-nowrap snap-start transition-colors", children: s }, s)) }),
        /* @__PURE__ */ jsx("div", { className: "p-3 sm:p-4 border-t border-border/50 bg-muted/10 flex-shrink-0 w-full", children: /* @__PURE__ */ jsxs("form", { onSubmit: (e) => onSend(e), className: "flex gap-2 w-full", children: [
          /* @__PURE__ */ jsx("input", { type: "text", value: input, onChange: (e) => onInputChange(e.target.value), placeholder: ch.placeholder, className: "flex-1 min-w-0 bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-[13px] sm:text-sm text-foreground focus:outline-none focus:border-foreground/40 transition-all" }),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: !input.trim() || isLoading, "aria-label": lang === "en" ? "Send message" : "Enviar mensaje", className: "w-[44px] h-[44px] sm:w-[46px] sm:h-[46px] rounded-xl bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 flex items-center justify-center transition-colors", children: /* @__PURE__ */ jsx(Send, { className: "w-[16px] h-[16px]" }) })
        ] }) })
      ] })
    ] }) })
  ] });
}

function ChatAI() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const ch = t.chat;
  const {
    open,
    setOpen,
    expanded,
    setExpanded,
    showLabel,
    jumping,
    input,
    setInput,
    isLoading,
    messages,
    messagesEndRef,
    handleRobotClick,
    clearChat,
    mandarMensaje
  } = useChatLogic(lang, ch.responses.default);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      RobotButton,
      {
        open,
        jumping,
        showLabel,
        openLabel: ch.openLabel,
        closeLabel: ch.closeLabel,
        openChatAriaLabel: ch.openChat,
        closeChatAriaLabel: ch.closeChat,
        onRobotClick: handleRobotClick
      }
    ),
    /* @__PURE__ */ jsx(
      ChatPanel,
      {
        open,
        expanded,
        isLoading,
        messages,
        input,
        lang,
        ch,
        messagesEndRef,
        onClose: () => setOpen(false),
        onToggleExpand: () => setExpanded((v) => !v),
        onClearChat: clearChat,
        onInputChange: setInput,
        onSend: mandarMensaje
      }
    )
  ] });
}

function Footer() {
  const [year, setYear] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];
  const ft = t.footer;
  useEffect(() => {
    setYear((/* @__PURE__ */ new Date()).getFullYear());
  }, []);
  const links = ft.links;
  const socials = [
    { name: "GitHub", icon: Github, href: "https://github.com/jackshaw32" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/raul-eduardo-cabral/" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/EduCabral19" },
    { name: "Email", icon: Mail, href: "mailto:jackshaw32@live.com.ar" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ContactModal, { open: contactOpen, onClose: () => setContactOpen(false) }),
    /* @__PURE__ */ jsxs("footer", { className: "relative border-t border-border/10 bg-background/50 backdrop-blur-xl pt-20 pb-10 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] pointer-events-none flex justify-center opacity-20", children: /* @__PURE__ */ jsx("div", { className: "absolute -top-[150px] w-[600px] h-[300px] rounded-[100%] bg-gradient-to-b from-primary/20 to-transparent blur-3xl" }) }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Code2, { className: "w-6 h-6 text-primary" }),
              /* @__PURE__ */ jsxs("span", { className: "font-mono text-xl font-bold", children: [
                "edu",
                /* @__PURE__ */ jsx("span", { className: "text-primary", children: ".dev" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-sm leading-relaxed", children: ft.tagline }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 pt-2", children: socials.map((social) => /* @__PURE__ */ jsx(
              "a",
              {
                href: social.href,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 group",
                "aria-label": social.name,
                children: /* @__PURE__ */ jsx(social.icon, { className: "w-4 h-4 group-hover:scale-110 transition-transform duration-300" })
              },
              social.name
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground mb-6 uppercase tracking-wider text-sm", children: ft.navigation }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
              links.map((link) => /* @__PURE__ */ jsx("li", { children: link.href === "#contact" ? /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setContactOpen(true),
                  className: "text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group w-fit cursor-pointer",
                  children: [
                    link.name,
                    /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" })
                  ]
                }
              ) : /* @__PURE__ */ jsxs(
                "a",
                {
                  href: link.href,
                  className: "text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group w-fit",
                  children: [
                    link.name,
                    /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" })
                  ]
                }
              ) }, link.name)),
              /* @__PURE__ */ jsx("li", { className: "pt-2", children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
                  "aria-label": "Volver arriba",
                  className: "group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 w-fit",
                  children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      width: "12",
                      height: "10",
                      viewBox: "0 0 14 12",
                      fill: "currentColor",
                      "aria-hidden": "true",
                      className: "group-hover:scale-110 transition-transform duration-200 cursor-pointer",
                      children: /* @__PURE__ */ jsx("path", { d: "M7 0L14 12H0L7 0Z" })
                    }
                  )
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground mb-6 uppercase tracking-wider text-sm", children: ft.technologies }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: ["Astro v5", "React 19", "TypeScript", "Tailwind CSS v4", "Radix UI", "TanStack Query", "React Hook Form + Zod", "Vercel AI SDK + Groq LLM"].map((tech) => /* @__PURE__ */ jsxs("li", { className: "text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary/50" }),
              tech
            ] }, tech)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-8 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            "© ",
            year || "2026",
            " Designed & Developed by Eduardo Cabral."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-muted-foreground/40 bg-muted/30 px-2 py-1 rounded", children: "v2.0.0" })
        ] })
      ] })
    ] })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Eduardo Cabral | Full-Stack Developer", "description": "Portafolio profesional de Eduardo Cabral \u2014 Full-Stack Developer en Argentina especializado en React, Node.js y e-commerce escalable. Disponible para proyectos freelance y posiciones remotas.", "keywords": "Eduardo Cabral, Full Stack Developer Argentina, desarrollador web React, Node.js developer, e-commerce developer, portfolio desarrollador, freelance developer, JavaScript TypeScript", "type": "profile" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-background"> ${renderComponent($$result2, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Navbar", "client:component-export": "default" })} <main> ${renderComponent($$result2, "Hero", Hero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Hero", "client:component-export": "default" })} ${renderComponent($$result2, "Skills", Skills, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/Skills", "client:component-export": "default" })} ${renderComponent($$result2, "Projects", Projects, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/Projects", "client:component-export": "default" })} ${renderComponent($$result2, "Optimizations", Optimizations, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/Optimizations", "client:component-export": "default" })} ${renderComponent($$result2, "About", About, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/About", "client:component-export": "default" })} </main> ${renderComponent($$result2, "Footer", Footer, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/Footer", "client:component-export": "default" })} ${renderComponent($$result2, "ChatAI", ChatAI, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ChatAI", "client:component-export": "default" })} </div> ` })}`;
}, "C:/Users/Lenovo/Desktop/educcabral/src/pages/index.astro", void 0);

const $$file = "C:/Users/Lenovo/Desktop/educcabral/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
