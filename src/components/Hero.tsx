import { Linkedin, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "../lib/translations";

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
      {/* Aurora color blobs — light mode only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden dark:hidden">
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-violet-500/[0.10] dark:bg-violet-500/[0.13] blur-[160px]" />
        <div className="absolute top-[5%] -right-[12%] w-[550px] h-[450px] rounded-full bg-pink-500/[0.07] dark:bg-pink-500/[0.09] blur-[140px]" />
        <div className="absolute top-[15%] -left-[8%] w-[480px] h-[380px] rounded-full bg-indigo-500/[0.06] dark:bg-indigo-500/[0.08] blur-[130px]" />
      </div>

      {/* Noise light mode — sparse dark speckles on white */}
      <div
        className="dark:hidden absolute inset-0 pointer-events-none opacity-[0.6]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Cfilter id='n' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 0 0 0 -7'/%3E%3C/filter%3E%3Crect width='500' height='500' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
        }}
      />
      {/* Noise dark mode — sparse white speckles on black */}
      <div
        className="hidden dark:block absolute inset-0 pointer-events-none opacity-[0.4]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Cfilter id='n' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 9 0 0 0 -7'/%3E%3C/filter%3E%3Crect width='500' height='500' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
        }}
      />

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