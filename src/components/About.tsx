import { useState, useRef } from "react";
import { MapPin, Coffee, Mail, Linkedin, Github, FileDown } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import ContactModal from "./ContactModal";

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

          <div className="max-w-6xl mx-auto mb-8 md:mb-6 reveal">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center md:text-left">
              {ab.title} <span className="text-primary">{ab.titleHighlight}</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

            <div className="md:col-span-2 order-last md:order-first reveal delay-150 space-y-5 text-muted-foreground leading-relaxed">
              {lang === 'es' ? (
                <>
                  <p>
                    Me dedico a construir{" "}
                    aplicaciones web, e-commerce y productos digitales que{" "}
                    <span className="text-foreground font-semibold">realmente funcionen bien y escalen</span>.{" "}
                    Mi ecosistema principal es JavaScript y TypeScript, usando herramientas como{" "}
                    <span className="text-foreground font-medium">React</span>,{" "}
                    <span className="text-foreground font-medium">Next.js</span> y{" "}
                    <span className="text-foreground font-medium">Node.js</span>.
                  </p>
                  <p>
                    Lo que más me atrapa es meterme en{" "}
                    <span className="text-foreground font-semibold">todo el ciclo de un producto</span>:{" "}
                    desde maquetar una interfaz fluida hasta armar APIs robustas, integrar pasarelas de pago,
                    autenticación o bases de datos. Me gusta que las cosas pasen del{" "}
                    <span className="text-foreground font-medium">diseño a producción</span>{" "}
                    aportando <span className="text-foreground font-semibold">valor real</span>.
                  </p>
                  <p>
                    Ya vengo sumando experiencia en e-commerce complejos con paneles de administración
                    y tracking optimizado, y últimamente ando metido explorando la integración de{" "}
                    <span className="text-foreground font-medium">IA</span> y{" "}
                    <span className="text-foreground font-medium">soluciones cloud</span>{" "}
                    para que el software sea cada vez más inteligente y eficiente.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    I build{" "}
                    web applications, e-commerce and digital products that{" "}
                    <span className="text-foreground font-semibold">actually work well and scale</span>.{" "}
                    My main ecosystem is JavaScript and TypeScript, using tools like{" "}
                    <span className="text-foreground font-medium">React</span>,{" "}
                    <span className="text-foreground font-medium">Next.js</span> and{" "}
                    <span className="text-foreground font-medium">Node.js</span>.
                  </p>
                  <p>
                    What I enjoy most is being involved in{" "}
                    <span className="text-foreground font-semibold">the full product cycle</span>:{" "}
                    from crafting a smooth interface to building robust APIs, integrating payment gateways,
                    authentication and databases. I like taking things from{" "}
                    <span className="text-foreground font-medium">design to production</span>{" "}
                    delivering <span className="text-foreground font-semibold">real value</span>.
                  </p>
                  <p>
                    I've been gaining experience building complex e-commerce platforms with admin panels
                    and optimized tracking, and lately I've been exploring{" "}
                    <span className="text-foreground font-medium">AI</span> and{" "}
                    <span className="text-foreground font-medium">cloud solutions</span>{" "}
                    to make software smarter and more efficient.
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-col items-center gap-6 order-first md:order-last reveal">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl scale-[3] pointer-events-none" />
                <div className="absolute inset-0 rounded-full bg-indigo-400/8 blur-[80px] scale-[4] pointer-events-none" />
                <div className="group relative w-56 h-56 rounded-full flex items-center justify-center overflow-hidden ring-1 ring-indigo-400/20 ring-offset-4 ring-offset-background shadow-[0_0_80px_20px_rgba(99,102,241,0.06)]">
                  <img
                    src="/20220924_233025.webp"
                    alt="Eduardo Cabral"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
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
                    <span className="text-foreground font-medium">Full Stack Software Engineer</span>
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
                  href="/Eduardo-Cabral-Full-Stack-Developer-ES.pdf"
                  download
                  title="Descargar CV en Español"
                  className="flex-1 glass hover:bg-foreground/5 text-muted-foreground hover:text-foreground h-12 rounded-2xl flex items-center justify-center gap-1 transition-all duration-300 border border-border/50 hover:border-foreground/30 cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span className="text-[10px] font-semibold">ES</span>
                </a>
                <a
                  href="/Eduardo-Cabral-Full-Stack-Developer-EN.pdf"
                  download
                  title="Download CV in English"
                  className="flex-1 glass hover:bg-foreground/5 text-muted-foreground hover:text-foreground h-12 rounded-2xl flex items-center justify-center gap-1 transition-all duration-300 border border-border/50 hover:border-foreground/30 cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span className="text-[10px] font-semibold">EN</span>
                </a>
                <a href="https://linkedin.com/in/raul-eduardo-cabral" target="_blank" rel="noopener noreferrer"
                  title="LinkedIn" aria-label="LinkedIn"
                  className="flex-1 glass hover:bg-foreground/5 text-muted-foreground hover:text-foreground h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border border-border/50 hover:border-foreground/30 cursor-pointer">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com/JackShaw32" target="_blank" rel="noopener noreferrer"
                  title="GitHub" aria-label="GitHub"
                  className="flex-1 glass hover:bg-foreground/5 text-muted-foreground hover:text-foreground h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border border-border/50 hover:border-foreground/30 cursor-pointer">
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
