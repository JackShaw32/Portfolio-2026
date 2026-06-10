import { Linkedin, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

const roles = [
  "Full Stack Software Engineer",
  "Building Web Products"
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden dark:hidden" aria-hidden="true">
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-violet-500/[0.10] dark:bg-violet-500/[0.13] blur-[160px]" />
        <div className="absolute top-[5%] -right-[12%] w-[550px] h-[450px] rounded-full bg-pink-500/[0.07] dark:bg-pink-500/[0.09] blur-[140px]" />
        <div className="absolute top-[15%] -left-[8%] w-[480px] h-[380px] rounded-full bg-indigo-500/[0.06] dark:bg-indigo-500/[0.08] blur-[130px]" />
      </div>

      <div
        className="hero-noise-light dark:hidden absolute inset-0 pointer-events-none opacity-[0.7]"
        aria-hidden="true"
      />
      <div
        className="hero-noise-dark hidden dark:block absolute inset-0 pointer-events-none opacity-[0.5]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 pt-20 relative z-30">
          <div className="max-w-4xl mx-auto text-center">
          
          <div className="mb-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
              <span className="scroll-m-20 text-5xl font-heading font-semibold lg:text-7xl text-balance max-w-screen-lg text-metallic inline-block leading-tight lg:leading-[1]">
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



          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#projects"
              className="group/btn bg-foreground text-background hover:opacity-85 font-bold px-6 py-3 rounded-2xl text-sm inline-flex items-center justify-center gap-2 transition-all duration-300 ease-out cursor-pointer"
            >
              {t.hero.viewProjects}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1" />
            </a>
            <a
              href="https://www.linkedin.com/in/raul-eduardo-cabral/"
              target="_blank"
              rel="noopener noreferrer"
              className="group/linkedin glass hover:bg-foreground/5 text-foreground font-bold px-6 py-3 rounded-2xl text-sm inline-flex items-center justify-center transition-all duration-300 ease-out gap-2 border border-border/50 hover:border-foreground/30 cursor-pointer"
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