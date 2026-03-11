import { useState, useRef } from "react";
import { MapPin, Coffee, Mail, Linkedin, Github, FileDown } from "lucide-react";
import { useReveal } from "./hooks/useReveal";
import ContactModal from "./ContactModal";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "../lib/translations";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [contactOpen, setContactOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];
  const ab = t.about;

  return (
    <>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      <section ref={ref} id="about" className="py-24 relative">
        <div className="container mx-auto px-6">

          <div className="max-w-6xl mx-auto mb-14 reveal">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {ab.title} <span className="text-primary">{ab.titleHighlight}</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

            <div className="md:col-span-2 order-last md:order-first reveal delay-150 space-y-5 text-muted-foreground leading-relaxed">
              {lang === 'es' ? (
                <>
                  <p>
                    Me llamo <span className="text-foreground font-semibold">Eduardo Cabral</span> y soy{" "}
                    <span className="text-foreground font-semibold">desarrollador de software en Argentina</span>.
                    {" "}Empecé en programación por curiosidad: quería entender{" "}
                    <span className="text-foreground font-medium">cómo funcionan las aplicaciones por dentro</span>{" "}
                    y cómo se construyen los sistemas que usamos todos los días en internet.
                  </p>
                  <p>
                    Hoy trabajo principalmente con{" "}
                    <span className="text-foreground font-semibold">JavaScript, React y Node.js</span>,
                    {" "}desarrollando aplicaciones web completas y productos digitales. Entre mis proyectos destaca un{" "}
                    <span className="text-foreground font-medium">e-commerce creado desde cero</span>{" "}
                    con <span className="text-foreground font-medium">arquitectura full-stack, autenticación segura y pagos online</span>.
                  </p>
                  <p>
                    Cuando no estoy programando, suelo estar{" "}
                    <span className="text-foreground font-medium">aprendiendo nuevas tecnologías</span>{" "}
                    o construyendo proyectos propios. Mi objetivo es seguir creciendo como desarrollador y contribuir a proyectos que{" "}
                    <span className="text-foreground font-medium">resuelvan problemas reales con tecnología</span>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    My name is <span className="text-foreground font-semibold">Eduardo Cabral</span> and I'm a{" "}
                    <span className="text-foreground font-semibold">software developer based in Argentina</span>.
                    {" "}I got into programming out of curiosity: I wanted to understand{" "}
                    <span className="text-foreground font-medium">how applications work under the hood</span>{" "}
                    and how the systems we use every day on the internet are built.
                  </p>
                  <p>
                    Today I work mainly with{" "}
                    <span className="text-foreground font-semibold">JavaScript, React and Node.js</span>,
                    {" "}building full-stack web applications and digital products. One of my standout projects is an{" "}
                    <span className="text-foreground font-medium">e-commerce platform built from scratch</span>{" "}
                    with <span className="text-foreground font-medium">full-stack architecture, secure authentication and online payments</span>.
                  </p>
                  <p>
                    When I'm not coding, I'm usually{" "}
                    <span className="text-foreground font-medium">learning new technologies</span>{" "}
                    or working on personal projects. My goal is to keep growing as a developer and contribute to projects that{" "}
                    <span className="text-foreground font-medium">solve real problems with technology</span>.
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-col items-center gap-6 order-first md:order-last reveal">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl scale-[3] pointer-events-none" />
                <div className="absolute inset-0 rounded-full bg-indigo-400/8 blur-[80px] scale-[4] pointer-events-none" />
                <div className="relative w-56 h-56 rounded-full flex items-center justify-center overflow-hidden ring-1 ring-indigo-400/20 ring-offset-4 ring-offset-background shadow-[0_0_80px_20px_rgba(99,102,241,0.06)]">
                  <img
                    src="/20220924_233025.webp"
                    alt="Eduardo Cabral"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-3 left-3 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-background" />
                </span>
                <div className="absolute -bottom-2 -right-2 glass rounded-2xl p-3 border-border/50 shadow-xl animate-float">
                  <div className="flex items-center gap-2 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-foreground/70" />
                    <span className="text-foreground font-medium">Córdoba 🇦🇷</span>
                  </div>
                </div>
                <div className="absolute -top-2 -right-4 glass rounded-2xl p-3 border-border/50 shadow-xl animate-float anim-delay-1">
                  <div className="flex items-center gap-2 text-xs">
                    <Coffee className="w-3.5 h-3.5 text-foreground/70" />
                    <span className="text-foreground font-medium">Full-Stack JavaScript Dev</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setContactOpen(true)}
                  title="Contactar"
                  className="flex-1 glass hover:bg-foreground/5 text-muted-foreground hover:text-foreground h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border border-border/50 hover:border-foreground/30 cursor-pointer"
                >
                  <Mail className="w-5 h-5" />
                </button>
                <a
                  href="https://drive.google.com/file/d/1rowPwlyhJPDIUqs-4N_WmLW_LS1Y7Noz/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Descargar CV en Español"
                  className="flex-1 glass hover:bg-foreground/5 text-muted-foreground hover:text-foreground h-12 rounded-2xl flex items-center justify-center gap-1 transition-all duration-300 border border-border/50 hover:border-foreground/30"
                >
                  <FileDown className="w-4 h-4" />
                  <span className="text-[10px] font-semibold">ES</span>
                </a>
                <a
                  href="https://drive.google.com/file/d/1dPo1RNqasoNxXUjwk6nGuDBWIPoD2_mY/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download CV in English"
                  className="flex-1 glass hover:bg-foreground/5 text-muted-foreground hover:text-foreground h-12 rounded-2xl flex items-center justify-center gap-1 transition-all duration-300 border border-border/50 hover:border-foreground/30"
                >
                  <FileDown className="w-4 h-4" />
                  <span className="text-[10px] font-semibold">EN</span>
                </a>
                <a href="https://linkedin.com/in/raul-eduardo-cabral" target="_blank" rel="noopener noreferrer"
                  title="LinkedIn" aria-label="LinkedIn"
                  className="flex-1 glass hover:bg-foreground/5 text-muted-foreground hover:text-foreground h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border border-border/50 hover:border-foreground/30">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com/JackShaw32" target="_blank" rel="noopener noreferrer"
                  title="GitHub" aria-label="GitHub"
                  className="flex-1 glass hover:bg-foreground/5 text-muted-foreground hover:text-foreground h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border border-border/50 hover:border-foreground/30">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
