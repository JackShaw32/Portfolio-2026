import { Linkedin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden w-full hero-tablet-short">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="hero-aurora absolute inset-0" />

        {/* Genie-style flowing gradient field: organic blobs + iridescent sheen */}
        <div className="hero-flow-sheen" />
        <div className="hero-flow hero-flow-1" />
        <div className="hero-flow hero-flow-2" />
        <div className="hero-flow hero-flow-3" />
        <div className="hero-flow hero-flow-4" />
        <div className="hero-flow hero-flow-5" />
      </div>

      <div
        className="hero-noise-light dark:hidden absolute inset-0 pointer-events-none opacity-[0.7]"
        aria-hidden="true"
      />
      <div
        className="hero-noise-dark hidden dark:block absolute inset-0 pointer-events-none opacity-[0.5]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6 pt-20 relative z-30">
        <div className="max-w-5xl mx-auto hero-frame relative p-10 md:p-14 lg:p-16 text-center">
          <div className="hero-frame-corners absolute inset-2 rounded-[1.6rem] md:rounded-[2.1rem] pointer-events-none" aria-hidden="true" />

          <div className="mb-1 relative">
            <h1 className="scroll-m-20 text-5xl font-heading font-semibold lg:text-7xl text-balance max-w-screen-lg text-metallic inline-block leading-[1.05] tracking-wide">
              {t.hero.heading}
            </h1>
          </div>

          <div className="mb-8 relative flex items-center justify-center py-2">
            <div className="text-lg md:text-xl font-mono leading-relaxed tracking-wide">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-pink-400 font-semibold">
                {t.hero.subtitle}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 relative">
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

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/35 to-transparent pointer-events-none z-20" />
    </section>
  );
}