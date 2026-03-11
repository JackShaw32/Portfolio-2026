import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BisCJTvH.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_B7s6mRf9.mjs';
import { u as useLanguage, t as translations, a as ContactModal, p as projectsStaticData, r as renderBold, N as Navbar, F as Footer, C as ChatAI } from '../chunks/ChatAI_rvBze0wF.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { ExternalLink, Linkedin, MapPin, Coffee, Mail, FileDown, Github, ChevronRight, FileText, Download, Briefcase, ChevronDown, GraduationCap, Languages, ArrowRight, Zap, CheckCircle2, Smartphone, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiAstro, SiAngular, SiTailwindcss, SiNodedotjs, SiNestjs, SiExpress, SiMongodb, SiPostgresql, SiFirebase, SiAmazonwebservices, SiDocker, SiGit } from 'react-icons/si';
export { renderers } from '../renderers.mjs';

function useReveal(containerRef) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  useEffect(() => {
    if (!hasMounted) return;
    if (sessionStorage.getItem("skip-reveal")) {
      const container2 = containerRef?.current ?? document;
      container2.querySelectorAll(".reveal").forEach((el) => el.classList.add("active"));
      return;
    }
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
          /* @__PURE__ */ jsxs("radialGradient", { id: "grid-fade", cx: "50%", cy: "30%", r: "70%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "white", stopOpacity: "1" }),
            /* @__PURE__ */ jsx("stop", { offset: "40%", stopColor: "white", stopOpacity: "0.5" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "white", stopOpacity: "0" })
          ] }),
          /* @__PURE__ */ jsx("mask", { id: "grid-mask", children: /* @__PURE__ */ jsx("rect", { width: "100%", height: "100%", fill: "url(#grid-fade)" }) })
        ] }),
        /* @__PURE__ */ jsxs("g", { mask: "url(#grid-mask)", stroke: "currentColor", strokeWidth: "0.5", opacity: "0.15", children: [
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
      /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] -right-[10%] w-[550px] h-[450px] rounded-full bg-orange-500/[0.15] blur-[120px]" })
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
function Projects() {
  const sectionRef = useRef(null);
  const { lang } = useLanguage();
  const t = translations[lang];
  const pr = t.projects;
  const projects = pr.projects.map((proj, i) => ({
    ...projectsStaticData[i],
    ...proj
  }));
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sessionStorage.getItem("skip-reveal")) {
        gsap.set(".projects-heading", { opacity: 1, y: 0 });
        gsap.utils.toArray(".project-row").forEach((row) => {
          const imgWrap = row.querySelector(".project-img-wrap");
          const content = row.querySelector(".project-content");
          if (imgWrap) gsap.set(imgWrap, { opacity: 1, x: 0 });
          if (content) gsap.set(content, { opacity: 1, x: 0 });
        });
        return;
      }
      gsap.fromTo(
        ".projects-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".projects-heading", start: "top 88%" }
        }
      );
      gsap.utils.toArray(".project-row").forEach((row, i) => {
        const isEven = i % 2 !== 0;
        const imgWrap = row.querySelector(".project-img-wrap");
        const content = row.querySelector(".project-content");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 82%" }
        });
        tl.fromTo(
          imgWrap,
          { opacity: 0, x: isEven ? 70 : -70 },
          { opacity: 1, x: 0, duration: 1.1, ease: "power3.out" }
        ).fromTo(
          content,
          { opacity: 0, x: isEven ? -70 : 70 },
          { opacity: 1, x: 0, duration: 1.1, ease: "power3.out" },
          "-=0.85"
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsx("section", { ref: sectionRef, id: "projects", className: "py-16 md:py-32 relative", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "projects-heading text-center mb-16 md:mb-28 flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-[clamp(1.2rem,6vw,2rem)] sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-4 md:mb-6 whitespace-nowrap", children: [
        pr.title,
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: pr.titleHighlight })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-foreground to-pink-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed", children: pr.subtitle })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-20 md:gap-32 xl:gap-40", children: projects.map((project, index) => {
      const isEven = index % 2 !== 0;
      return /* @__PURE__ */ jsxs("div", { "data-project-slug": project.slug, className: "project-row flex flex-col xl:flex-row gap-10 lg:gap-16 items-center group", children: [
        /* @__PURE__ */ jsx("div", { className: `project-img-wrap w-full xl:w-3/5 ${isEven ? "xl:order-2" : "xl:order-1"}`, children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/projects/${project.slug}`,
            className: "group/img block relative rounded-3xl overflow-hidden border border-foreground/10 group-hover/img:border-primary/30 transition-all duration-500 shadow-2xl shadow-black/20",
            children: [
              /* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 group-hover/img:opacity-80 transition-opacity duration-700 z-10` }),
              /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-0 right-0 h-9 bg-background/90 backdrop-blur-md border-b border-foreground/10 flex items-center px-4 gap-2 z-20", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-red-500/80" }),
                /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-yellow-500/80" }),
                /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-green-500/80" }),
                /* @__PURE__ */ jsx("div", { className: "mx-auto text-[10px] font-mono text-muted-foreground px-3 py-1 rounded-md bg-foreground/5", children: new URL(project.link).hostname })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full aspect-[16/10] pt-9 bg-foreground/5 relative overflow-hidden", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: project.images[0],
                  alt: `Preview de ${project.title}`,
                  width: 800,
                  height: 500,
                  loading: "lazy",
                  decoding: "async",
                  className: "w-full h-full object-cover object-top transform group-hover/img:scale-[1.03] transition-transform duration-700 ease-out"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-background/25 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-all duration-300 z-30", children: /* @__PURE__ */ jsxs("span", { className: "bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full flex items-center gap-2 text-sm transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-300 shadow-xl shadow-primary/20", children: [
                pr.viewDetails,
                " ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ] }) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: `project-content w-full xl:w-2/5 flex flex-col justify-center ${isEven ? "xl:order-1 xl:pl-4" : "xl:order-2 xl:pr-4"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-4 md:mb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-5xl font-black text-foreground/8 select-none leading-none", children: project.number }),
            /* @__PURE__ */ jsx("span", { className: `text-xs uppercase tracking-widest font-black px-4 py-1.5 rounded-full border ${project.accent}`, children: project.highlight })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-2 leading-tight group-hover:text-primary transition-colors duration-300", children: project.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-mono text-muted-foreground mb-5 md:mb-6", children: project.role }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm sm:text-base leading-relaxed mb-7 font-light", children: renderBold(project.description) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mb-8", children: [
            project.tags.slice(0, 6).map((tag) => /* @__PURE__ */ jsx("span", { className: "text-[11px] sm:text-xs font-semibold text-foreground/80 bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-xl", children: tag }, tag)),
            project.tags.length > 6 && /* @__PURE__ */ jsxs("span", { className: "text-[11px] sm:text-xs font-semibold text-muted-foreground bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-xl", children: [
              "+",
              project.tags.length - 6
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: `/projects/${project.slug}`,
                className: "w-full sm:w-auto flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 shadow-xl shadow-foreground/10 group/btn",
                children: [
                  pr.viewDetails,
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover/btn:translate-x-1 transition-transform" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: project.link,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "w-full sm:w-auto flex items-center justify-center gap-2 glass hover:bg-foreground/5 text-foreground border border-border/50 hover:border-foreground/30 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300",
                children: [
                  /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" }),
                  pr.visitSite
                ]
              }
            )
          ] })
        ] })
      ] }, project.slug);
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

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Eduardo Cabral | Full-Stack JavaScript Developer", "description": "Portafolio profesional de Eduardo Cabral \u2014 Full-Stack JavaScript Developer en Argentina especializado en React, Node.js y e-commerce escalable. Disponible para proyectos freelance y posiciones remotas.", "keywords": "Eduardo Cabral, Full Stack JavaScript Developer Argentina, desarrollador web React, Node.js developer, e-commerce developer, portfolio desarrollador, freelance developer, JavaScript TypeScript", "type": "profile" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-background"> ${renderComponent($$result2, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Navbar", "client:component-export": "default" })} <main> ${renderComponent($$result2, "Hero", Hero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Hero", "client:component-export": "default" })} ${renderComponent($$result2, "Skills", Skills, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/Skills", "client:component-export": "default" })} ${renderComponent($$result2, "Projects", Projects, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/Projects", "client:component-export": "default" })} ${renderComponent($$result2, "Optimizations", Optimizations, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/Optimizations", "client:component-export": "default" })} ${renderComponent($$result2, "About", About, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/About", "client:component-export": "default" })} </main> ${renderComponent($$result2, "Footer", Footer, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/Footer", "client:component-export": "default" })} ${renderComponent($$result2, "ChatAI", ChatAI, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ChatAI", "client:component-export": "default" })} </div> ` })}`;
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
