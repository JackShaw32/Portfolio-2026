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
                    Soy desarrollador <span className="text-foreground font-semibold">Full Stack</span> especializado en{" "}
                    <span className="text-foreground font-semibold">aplicaciones web escalables</span> y{" "}
                    <span className="text-foreground font-semibold">plataformas e-commerce</span>.
                    {" "}Trabajo con el ecosistema moderno de <span className="text-foreground font-semibold">JavaScript</span>{" "}
                    (<span className="text-foreground font-medium">React</span>,{" "}
                    <span className="text-foreground font-medium">Next.js</span>,{" "}
                    <span className="text-foreground font-medium">Node.js</span>) para construir productos digitales completos,
                    {" "}desde la interfaz hasta la infraestructura en la nube.
                  </p>
                  <p>
                    He desarrollado múltiples aplicaciones full-stack y sistemas en producción, incluyendo{" "}
                    <span className="text-foreground font-semibold">plataformas de comercio electrónico</span> con{" "}
                    <span className="text-foreground font-medium">autenticación segura</span>,{" "}
                    <span className="text-foreground font-medium">pagos online</span> y{" "}
                    <span className="text-foreground font-medium">analítica integrada</span>.
                  </p>
                  <p>
                    Me interesa crear software que genere{" "}
                    <span className="text-foreground font-semibold">impacto real</span>, explorando tecnologías como{" "}
                    <span className="text-foreground font-semibold">IA</span>,{" "}
                    <span className="text-foreground font-medium">cloud infrastructure</span> y arquitecturas modernas de aplicaciones web.
                  </p>
                  <p className="text-foreground/80">
                    Actualmente estoy{" "}
                    <span className="text-foreground font-semibold">disponible</span> para{" "}
                    <span className="text-foreground font-semibold">proyectos freelance</span> y{" "}
                    <span className="text-foreground font-semibold">oportunidades remotas</span>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    I'm a <span className="text-foreground font-semibold">Full Stack</span> developer specialized in{" "}
                    <span className="text-foreground font-semibold">scalable web applications</span> and{" "}
                    <span className="text-foreground font-semibold">e-commerce platforms</span>.
                    {" "}I work with the modern <span className="text-foreground font-semibold">JavaScript</span> ecosystem{" "}
                    (<span className="text-foreground font-medium">React</span>,{" "}
                    <span className="text-foreground font-medium">Next.js</span>,{" "}
                    <span className="text-foreground font-medium">Node.js</span>) to build complete digital products,
                    {" "}from the interface to cloud infrastructure.
                  </p>
                  <p>
                    I've developed multiple full-stack applications and production systems, including{" "}
                    <span className="text-foreground font-semibold">e-commerce platforms</span> with{" "}
                    <span className="text-foreground font-medium">secure authentication</span>,{" "}
                    <span className="text-foreground font-medium">online payments</span> and{" "}
                    <span className="text-foreground font-medium">integrated analytics</span>.
                  </p>
                  <p>
                    I'm interested in building software that generates{" "}
                    <span className="text-foreground font-semibold">real impact</span>, exploring technologies like{" "}
                    <span className="text-foreground font-semibold">AI</span>,{" "}
                    <span className="text-foreground font-medium">cloud infrastructure</span> and modern web application architectures.
                  </p>
                  <p className="text-foreground/80">
                    I'm currently{" "}
                    <span className="text-foreground font-semibold">available</span> for{" "}
                    <span className="text-foreground font-semibold">freelance projects</span> and{" "}
                    <span className="text-foreground font-semibold">remote opportunities</span>.
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
