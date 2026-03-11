import { useRef, useState, useEffect } from "react";
import { useReveal } from "./hooks/useReveal";
import { CheckCircle2, Zap, Search, Smartphone } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiAngular, SiTailwindcss,
  SiNodedotjs, SiNestjs, SiExpress, SiMongodb, SiPostgresql,
  SiAmazonwebservices, SiDocker, SiFirebase, SiGit, SiAstro
} from "react-icons/si";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "../lib/translations";

const featureIcons = [Zap, Search, CheckCircle2, Smartphone];

type TechItem = {
  name: string;
  icon: IconType;
  color: string;
  icon2?: IconType;
  color2?: string;
  darkColor?: string;
};

const allTechs: TechItem[] = [
  { name: "TS / JS", icon: SiTypescript, color: "#3178C6", icon2: SiJavascript, color2: "#F7DF1E" },
  { name: "React",      icon: SiReact,              color: "#61DAFB" },
  { name: "Next.js",    icon: SiNextdotjs,           color: "#000000", darkColor: "#ffffff" },
  { name: "Astro",      icon: SiAstro,               color: "#FF5D01" },
  { name: "Angular",    icon: SiAngular,             color: "#DD0031" },
  { name: "Tailwind",   icon: SiTailwindcss,         color: "#06B6D4" },
  { name: "Node.js",    icon: SiNodedotjs,           color: "#339933" },
  { name: "Nest.js",    icon: SiNestjs,              color: "#E0234E" },
  { name: "Express",    icon: SiExpress,             color: "#000000", darkColor: "#ffffff" },
  { name: "MongoDB",    icon: SiMongodb,             color: "#47A248" },
  { name: "Postgres",   icon: SiPostgresql,          color: "#4169E1" },
  { name: "Firebase",   icon: SiFirebase,            color: "#FFCA28" },
  { name: "AWS",        icon: SiAmazonwebservices,   color: "#232F3E", darkColor: "#ffffff" },
  { name: "Docker",     icon: SiDocker,              color: "#2496ED" },
  { name: "Git",        icon: SiGit,                 color: "#F05032" },
];

export default function Optimizations() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const { lang } = useLanguage();
  const t = translations[lang];
  const op = t.optimizations;

  const metrics = [
    { label: "Performance",    value: 97,  color: "text-green-500",  stroke: "stroke-green-500",  icon: Zap },
    { label: "Accessibility",  value: 94, color: "text-green-500",  stroke: "stroke-green-500",  icon: CheckCircle2 },
    { label: "Best Practices", value: 95,  color: "text-green-500", stroke: "stroke-green-500", icon: Smartphone },
    { label: "SEO",            value: 98, color: "text-green-500",  stroke: "stroke-green-500",  icon: Search },
  ];

  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const circumference = 283;
  const delayClasses = ['delay-[0ms]', 'delay-[180ms]', 'delay-[360ms]', 'delay-[540ms]'];

  return (
    <section ref={ref} id="optimizations" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] pointer-events-none flex justify-center opacity-30">
        <div className="absolute w-[600px] h-[300px] bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 blur-3xl mix-blend-normal dark:mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal flex flex-col items-center">

          <h2 className="text-[clamp(1.5rem,7vw,3rem)] md:text-5xl font-bold mb-4 md:mb-6 tracking-tight whitespace-nowrap">
            <span>{op.title}</span><span className="text-green-500">{op.titleHighlight}</span>
          </h2>

          <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-foreground to-green-500 max-w-2xl mx-auto font-medium text-sm sm:text-base md:text-lg drop-shadow-sm">
            {op.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="flex flex-col gap-4 reveal delay-150">
            <div className="glass rounded-3xl p-5 relative overflow-hidden border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.1)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />
              
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="font-mono text-xs text-muted-foreground bg-background/50 px-3 py-1 rounded-full">
                  lighthouse-report.json
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {metrics.map((metric, i) => (
                  <div key={metric.label} className="flex flex-col items-center gap-2">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" className="stroke-muted/30" strokeWidth="8" />
                        <circle
                          cx="50" cy="50" r="45" fill="none"
                          className={`${metric.stroke} transition-[stroke-dashoffset] duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${delayClasses[i]}`}
                          strokeWidth="8"
                          strokeDasharray={circumference}
                          strokeDashoffset={animated ? circumference * (1 - metric.value / 100) : circumference}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className={`text-base font-bold ${metric.color}`}>{metric.value}</span>
                    </div>
                    <div className="text-center">
                      <metric.icon className={`w-3.5 h-3.5 mx-auto mb-1 ${metric.color}`} />
                      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{metric.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl px-5 py-4 border border-green-500/10">
              <p className="text-[10px] font-mono text-white-foreground/40 uppercase tracking-widest text-center mb-3">{op.techUsed}</p>
              <div className="grid grid-cols-5 gap-x-2 gap-y-3">
                {allTechs.map((tech) => (
                  <div
                    key={tech.name}
                    title={tech.name}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-foreground/5 transition-colors cursor-default group"
                  >

                    {tech.icon2 ? (
                      <div className="flex items-center gap-0.5 [@media(hover:hover)]:opacity-40 [@media(hover:hover)]:grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200 group-hover:scale-110">
                        <tech.icon className="w-4 h-4" style={{ color: tech.color }} />
                        <tech.icon2 className="w-4 h-4" style={{ color: tech.color2 }} />
                      </div>
                    ) : (
                      <>
                        <tech.icon
                          className={`w-6 h-6 [@media(hover:hover)]:opacity-40 [@media(hover:hover)]:grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200 group-hover:scale-110 ${tech.darkColor ? 'dark:hidden' : ''}`}
                          style={{ color: tech.color }}
                        />
                        {tech.darkColor && (
                          <tech.icon
                            className="w-6 h-6 [@media(hover:hover)]:opacity-40 [@media(hover:hover)]:grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200 group-hover:scale-110 hidden dark:block"
                            style={{ color: tech.darkColor }}
                          />
                        )}
                      </>
                    )}
                    <span className="text-[7px] sm:text-[9px] text-white-foreground/60 font-mono w-full text-center leading-tight break-words hyphens-auto">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 reveal delay-300">
            {op.features.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
              <div key={feature.title} className="flex gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}