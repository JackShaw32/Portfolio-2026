import { Linkedin, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "../lib/translations";

function LineGrid() {
  const cell = 72;
  const cols = 24;
  const rows = 16;
  const vw = cols * cell;
  const vh = rows * cell;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${vw} ${vh}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="grid-fade" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="40%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="grid-mask">
          <rect width="100%" height="100%" fill="url(#grid-fade)" />
        </mask>
      </defs>
      <g mask="url(#grid-mask)" stroke="currentColor" strokeWidth="0.5" opacity="0.15">
        {Array.from({ length: cols + 1 }, (_, i) => (
          <line key={`v${i}`} x1={i * cell} y1={0} x2={i * cell} y2={vh} />
        ))}
        {Array.from({ length: rows + 1 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * cell} x2={vw} y2={i * cell} />
        ))}
      </g>
    </svg>
  );
}

const roles = [
  "Full-Stack Developer",
  "React & Next.js Specialist",
  "Node.js & Nest.js Backend",
  "E-commerce Developer"
];

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
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

  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      <LineGrid />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[600px] h-[500px] rounded-full bg-blue-600/[0.18] blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[550px] h-[450px] rounded-full bg-orange-500/[0.15] blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 pt-20 relative z-30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 glass px-5 py-2.5 rounded-full text-sm border-primary/10 hover:border-primary/30 transition-colors duration-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-white-foreground tracking-wide">{t.hero.available}</span>
            </div>
          </div>

          <div className="mb-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
              <span className="scroll-m-20 text-5xl font-heading font-bold lg:text-7xl text-balance max-w-screen-lg text-metallic inline-block leading-tight">
                {t.hero.heading}
              </span>
            </h1>
          </div>

          <div className="mb-6 h-12 flex items-center justify-center">
            <div className="text-xl md:text-2xl font-mono text-muted-foreground">
              <span className="text-primary">{">"}</span>{" "}
              <span className="text-foreground/90">{displayText}</span>
              <span className="animate-typing-cursor text-primary ml-0.5">|</span>
            </div>
          </div>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light text-balance">
            {lang === 'es' ? <>
              Full-Stack Developer construyendo{" "}
              <span className="text-foreground/80 font-medium">aplicaciones web escalables</span>,{" "}
              <span className="text-foreground/80 font-medium">plataformas e-commerce</span> y{" "}
              <span className="text-foreground/80 font-medium">productos con IA</span>.
            </> : <>
              Full-Stack Developer building{" "}
              <span className="text-foreground/80 font-medium">scalable web applications</span>,{" "}
              <span className="text-foreground/80 font-medium">e-commerce platforms</span> and{" "}
              <span className="text-foreground/80 font-medium">AI-powered products</span>.
            </>}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#projects"
              className="group/btn bg-foreground text-background hover:opacity-85 font-bold px-8 py-4 rounded-2xl text-sm inline-flex items-center justify-center gap-2 transition-all duration-300 ease-out cursor-pointer"
            >
              {t.hero.viewProjects}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1" />
            </a>
            <a
              href="https://www.linkedin.com/in/raul-eduardo-cabral/"
              target="_blank"
              rel="noopener noreferrer"
              className="group/linkedin glass hover:bg-foreground/5 text-foreground font-bold px-8 py-4 rounded-2xl text-sm inline-flex items-center justify-center transition-all duration-300 ease-out gap-2 border border-border/50 hover:border-foreground/30 cursor-pointer"
            >
              <Linkedin className="w-4 h-4 transition-transform duration-300 ease-out group-hover/linkedin:scale-110" />
              {t.hero.connectLinkedIn}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-20" />
    </section>
  );
}