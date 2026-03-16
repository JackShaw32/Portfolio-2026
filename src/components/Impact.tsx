import { useRef, useState, useEffect } from "react";
import { useReveal } from "./hooks/useReveal";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "../lib/translations";
import ContactModal from "./ContactModal";

const RING_COLORS = [
  { stroke: "stroke-indigo-500",  text: "text-indigo-400",  bg: "bg-indigo-500/10",  border: "border-indigo-500/20"  },
  { stroke: "stroke-blue-500",    text: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20"    },
  { stroke: "stroke-green-500",   text: "text-green-400",   bg: "bg-green-500/10",   border: "border-green-500/20"   },
  { stroke: "stroke-amber-500",   text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20"   },
];

const DELAY_CLASSES = ["delay-[0ms]", "delay-[150ms]", "delay-[300ms]", "delay-[450ms]"];

const CIRCUMFERENCE = 283;

export default function Impact() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const { lang } = useLanguage();
  const t = translations[lang];
  const im = t.impact;

  const [animated, setAnimated] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animated) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  useEffect(() => {
    if (!animated) return;
    const targets = im.metrics.map((m) => m.value);
    const duration = 1800;
    const start = performance.now();
    let rafId: number;

    const frame = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCounts(targets.map((v) => Math.round(v * eased)));
      if (progress < 1) rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [animated]);

  return (
    <>
      <section ref={ref} id="impact" className="py-24 relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[700px] h-[400px] bg-gradient-to-r from-indigo-500/8 via-blue-500/8 to-green-500/8 blur-3xl mix-blend-normal dark:mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 relative z-10">

          <div className="text-center mb-16 reveal flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
              <span>{im.title}</span>
              <span className="text-indigo-400">{im.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base md:text-lg">
              {im.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 reveal delay-150">
            {im.metrics.map((metric, i) => {
              const color = RING_COLORS[i];
              const offset = animated
                ? CIRCUMFERENCE * (1 - metric.ring / 100)
                : CIRCUMFERENCE;
              return (
                <div
                  key={i}
                  className={`rounded-3xl p-5 md:p-7 flex flex-col items-center text-center border ${color.border} hover:scale-[1.03] hover:shadow-lg hover:bg-foreground/5 transition-all duration-300 cursor-default bg-background dark:bg-white/[0.04] dark:backdrop-blur-xl`}
                >
                  <div className="relative w-24 h-24 mb-5">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50" cy="50" r="45"
                        fill="none"
                        className="stroke-muted/20"
                        strokeWidth="7"
                      />
                      <circle
                        cx="50" cy="50" r="45"
                        fill="none"
                        className={`${color.stroke} transition-[stroke-dashoffset] duration-[1400ms] ease-out ${DELAY_CLASSES[i]}`}
                        strokeWidth="7"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-xl md:text-2xl font-black ${color.text}`}>
                        {counts[i]}{metric.suffix}
                      </span>
                    </div>
                  </div>

                  <div className="font-bold text-foreground text-sm md:text-base leading-tight mb-1.5">
                    {metric.label}
                  </div>

                  <div className="text-[11px] md:text-xs text-muted-foreground leading-relaxed">
                    {metric.description}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-12 reveal delay-300">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="group inline-flex items-center gap-3 bg-foreground text-background hover:bg-foreground/90 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span>{im.cta}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

        </div>
      </section>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
