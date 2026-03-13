import { useRef, useState, useEffect } from "react";
import { useReveal } from "./hooks/useReveal";
import { Briefcase, GraduationCap, Languages, Mail, FileText, Download, ChevronRight, ChevronDown, RotateCcw } from "lucide-react";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "../lib/translations";
import ContactModal from "./ContactModal";

const CHARTS = [
  {
    // Projects — irregular upward climb, more inflections
    pts: [[0,34],[10,26],[18,32],[28,20],[36,28],[46,14],[56,22],[64,12],[74,20],[84,10],[100,8]] as [number,number][],
    line: "M 0,34 L 10,26 L 18,32 L 28,20 L 36,28 L 46,14 L 56,22 L 64,12 L 74,20 L 84,10 L 100,8",
    area: "M 0,34 L 10,26 L 18,32 L 28,20 L 36,28 L 46,14 L 56,22 L 64,12 L 74,20 L 84,10 L 100,8 L 100,44 L 0,44 Z",
    color: "#a78bfa",
  },
  {
    // Performance — dense rapid spikes
    pts: [[0,36],[6,14],[11,32],[17,10],[23,30],[29,8],[35,28],[41,9],[47,28],[53,8],[60,24],[67,6],[75,18],[83,8],[100,6]] as [number,number][],
    line: "M 0,36 L 6,14 L 11,32 L 17,10 L 23,30 L 29,8 L 35,28 L 41,9 L 47,28 L 53,8 L 60,24 L 67,6 L 75,18 L 83,8 L 100,6",
    area: "M 0,36 L 6,14 L 11,32 L 17,10 L 23,30 L 29,8 L 35,28 L 41,9 L 47,28 L 53,8 L 60,24 L 67,6 L 75,18 L 83,8 L 100,6 L 100,44 L 0,44 Z",
    color: "#fbbf24",
  },
  {
    // Tech Debt — staircase with small fluctuations
    pts: [[0,38],[8,40],[16,38],[18,30],[24,28],[36,30],[40,20],[48,18],[58,20],[62,12],[68,10],[80,12],[100,6]] as [number,number][],
    line: "M 0,38 L 8,40 L 16,38 L 18,30 L 24,28 L 36,30 L 40,20 L 48,18 L 58,20 L 62,12 L 68,10 L 80,12 L 100,6",
    area: "M 0,38 L 8,40 L 16,38 L 18,30 L 24,28 L 36,30 L 40,20 L 48,18 L 58,20 L 62,12 L 68,10 L 80,12 L 100,6 L 100,44 L 0,44 Z",
    color: "#34d399",
  },
  {
    // Uptime — nearly flat with small wobbles, one incident dip, then restored
    pts: [[0,9],[12,8],[22,9],[28,38],[32,10],[40,8],[52,9],[65,8],[80,9],[100,8]] as [number,number][],
    line: "M 0,9 L 12,8 L 22,9 L 28,38 L 32,10 L 40,8 L 52,9 L 65,8 L 80,9 L 100,8",
    area: "M 0,9 L 12,8 L 22,9 L 28,38 L 32,10 L 40,8 L 52,9 L 65,8 L 80,9 L 100,8 L 100,44 L 0,44 Z",
    color: "#38bdf8",
  },
];

function pathThresholds(pts: [number, number][]): number[] {
  const cum: number[] = [0];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i-1][0];
    const dy = pts[i][1] - pts[i-1][1];
    cum.push(cum[i-1] + Math.sqrt(dx*dx + dy*dy));
  }
  const total = cum[cum.length - 1];
  return cum.map(d => d / total);
}
const THRESHOLDS = CHARTS.map(c => pathThresholds(c.pts));

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const toggleExpand = (i: number) => setExpandedIndex(expandedIndex === i ? null : i);
  const { lang } = useLanguage();
  const t = translations[lang];
  const sk = t.skills;
  const experience = sk.experience;
  const education = sk.educationItems;

  const [ecgOn,        setEcgOn]        = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [spinning,     setSpinning]     = useState(false);
  const [contactOpen,  setContactOpen]  = useState(false);
  const countRefs    = useRef<(HTMLSpanElement | null)[]>([null, null, null, null]);
  const lineRefs     = useRef<(SVGPathElement | null)[]>([null, null, null, null]);
  const dotRefs      = useRef<(SVGCircleElement | null)[][]>([[], [], [], []]);
  const animating    = useRef(false);
  const rafRef       = useRef<number>(0);
  const timeout1Ref  = useRef<number>(0);
  const timeout2Ref  = useRef<number>(0);

  const runAnimation = () => {
    cancelAnimationFrame(rafRef.current);
    setEcgOn(true);
    const suffixes  = ['+', '%', '%', '%'];
    const targets   = [10, 45, 30, 100];
    const durations = [2800, 3400, 3200, 2400];
    const delays    = [0, 150, 300, 450];
    countRefs.current.forEach((el, i) => { if (el) el.textContent = `0${suffixes[i]}`; });
    lineRefs.current.forEach(el => { if (el) el.style.strokeDashoffset = '1000'; });
    dotRefs.current.forEach(dots => dots.forEach(el => { if (el) el.style.opacity = '0'; }));
    const t0 = performance.now();
    const tick = (now: number) => {
      const elapsed = now - t0;
      let running = false;
      targets.forEach((target, i) => {
        const started = elapsed - delays[i];
        if (started < 0) { running = true; return; }
        const p    = Math.min(started / durations[i], 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const elCount = countRefs.current[i];
        if (elCount) elCount.textContent = `${Math.round(target * ease)}${suffixes[i]}`;
        const elLine = lineRefs.current[i];
        if (elLine) elLine.style.strokeDashoffset = String(1000 * (1 - ease));
        dotRefs.current[i].forEach((el, idx) => {
          if (!el) return;
          const threshold = THRESHOLDS[i][idx];
          el.style.opacity = ease >= threshold ? '1' : '0';
        });
        if (p < 1) running = true;
      });
      if (running) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const replayAnimation = () => {
    if (animating.current) return;          // synchronous guard — blocks before React re-renders
    animating.current = true;
    setSpinning(true);
    setEcgOn(false);
    clearTimeout(timeout1Ref.current);
    clearTimeout(timeout2Ref.current);
    timeout1Ref.current = window.setTimeout(() => {
      runAnimation();
      timeout2Ref.current = window.setTimeout(() => {
        setSpinning(false);
        animating.current = false;
      }, 3800);
    }, 350);
  };

  useEffect(() => {
    if (!ref.current || hasTriggered) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasTriggered(true);
        obs.disconnect();
        runAnimation();
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [hasTriggered]);

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(timeout1Ref.current);
    clearTimeout(timeout2Ref.current);
  }, []);
  
  return (
    <>
    <section ref={ref} id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 gap-8">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 reveal">
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="glass flex items-center gap-4 px-6 py-5 rounded-3xl border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <span className="font-medium text-sm text-foreground flex-1">{sk.contactMe}</span>
            <ChevronRight className="w-4 h-4 text-foreground/40 group-hover:text-foreground/80 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
          </button>

          <a
            href="https://api.whatsapp.com/send/?phone=5493518588034&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex items-center gap-4 px-6 py-5 rounded-3xl border border-foreground/10 hover:border-green-500/40 hover:bg-green-500/5 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors flex-shrink-0">
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <span className="font-medium text-sm text-foreground flex-1">{sk.whatsappContact}</span>
            <ChevronRight className="w-4 h-4 text-foreground/40 group-hover:text-green-500/80 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
          </a>

          <div className="glass flex items-center gap-4 px-6 py-5 rounded-3xl border border-foreground/10 hover:border-foreground/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col flex-1">
              <span className="font-bold text-sm text-foreground leading-tight">Download CV – Full Stack Developer</span>
              <span className="text-[10px] text-muted-foreground font-mono">PDF · Updated 2026</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-bold text-red-500 leading-none">ES</span>
              <a
                href="/Eduardo-Cabral-Full-Stack-Developer-ES.pdf"
                download
                className="w-8 h-8 rounded-xl flex items-center justify-center bg-foreground/5 hover:bg-foreground/15 border border-foreground/10 hover:border-foreground/30 transition-all duration-300"
                title={sk.downloadCVSpanish}
                aria-label={sk.downloadCVSpanish}
              >
                <Download className="w-3.5 h-3.5 text-foreground/70" />
              </a>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-bold text-blue-500 leading-none">EN</span>
              <a
                href="/Eduardo-Cabral-Full-Stack-Developer-EN.pdf"
                download
                className="w-8 h-8 rounded-xl flex items-center justify-center bg-foreground/5 hover:bg-foreground/15 border border-foreground/10 hover:border-foreground/30 transition-all duration-300"
                title={sk.downloadCVEnglish}
                aria-label={sk.downloadCVEnglish}
              >
                <Download className="w-3.5 h-3.5 text-foreground/70" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 reveal">
            <div className="bg-background hover:bg-foreground/5 dark:bg-white/[0.04] dark:backdrop-blur-xl rounded-3xl p-8 border border-foreground/5 hover:border-foreground/10 transition-all duration-300 h-full">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="font-mono text-sm font-bold uppercase tracking-wider">{sk.workExperience}</h2>
              </div>
              <div className="space-y-8 border-l border-foreground/10 pl-6 ml-2 relative">
                {experience.map((item, i) => (
                  <div key={i} className="relative pb-2">
                    <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-background border-2 border-primary" />
                    <h3 className="text-foreground font-semibold">{item.role}</h3>
                    <div className="text-primary text-sm font-medium mb-1">{item.company}</div>
                    <div className="text-muted-foreground text-xs font-mono mb-3">{item.period}</div>

                    <div className="lg:hidden">
                      <div className={`overflow-hidden transition-all duration-300 ${
                        expandedIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-sm text-muted-foreground/90 leading-relaxed mb-3">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.tech.map((tech, idx) => (
                            <span key={idx} className="text-[10px] font-medium border border-border/50 bg-foreground/5 px-2 py-1 rounded-md text-foreground/80">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleExpand(i)}
                        className="flex items-center gap-1 text-xs text-primary/80 hover:text-primary font-medium transition-colors mt-1"
                      >
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expandedIndex === i ? 'rotate-180' : ''}`} />
                  {expandedIndex === i ? sk.seeLess : sk.seeMore}
                      </button>
                    </div>

                    <div className="hidden lg:block">
                      <p className="text-sm text-muted-foreground/90 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tech.map((tech, idx) => (
                          <span key={idx} className="text-[10px] font-medium border border-border/50 bg-foreground/5 px-2 py-1 rounded-md text-foreground/80">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-background hover:bg-foreground/5 dark:bg-white/[0.04] dark:backdrop-blur-xl rounded-3xl p-8 border border-foreground/5 hover:border-foreground/10 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <h2 className="font-mono text-sm font-bold uppercase tracking-wider">{sk.education}</h2>
                </div>

                <div className="flex flex-col gap-4">
                  {education.map((item, i) => (
                    <div key={i} className="relative bg-background/30 p-4 rounded-xl border border-foreground/5 hover:border-primary/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-foreground font-semibold text-sm leading-tight mb-1">{item.degree}</h3>
                        <div className="text-muted-foreground text-xs">{item.institution}</div>
                      </div>
                      <div className="text-primary text-[10px] font-mono border border-primary/20 bg-primary/5 inline-flex w-fit px-2 py-1 rounded whitespace-nowrap">
                        {item.period}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background hover:bg-foreground/5 dark:bg-white/[0.04] dark:backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-foreground/5 transition-all duration-300 hover:bg-primary/5">
                  <span className="text-4xl font-black mb-1">3+</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{sk.yearsExp}</span>
                </div>
                <div className="bg-background hover:bg-foreground/5 dark:bg-white/[0.04] dark:backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-foreground/5 transition-all duration-300 hover:bg-primary/5">
                  <Languages className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground leading-tight font-medium">{sk.languages}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── KPI Sparkline Cards ───────────────────────────── */}
        <div id="impact" className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 reveal mt-8">
          {([
            { suffix: "+", label: lang === "es" ? "Proyectos" : "Projects",              text: "text-[#a78bfa]", i: 0 },
            { suffix: "%", label: lang === "es" ? "Performance" : "Performance",          text: "text-[#fbbf24]", i: 1 },
            { suffix: "%", label: lang === "es" ? "Reducción deuda tec." : "Tech Debt Reduction", text: "text-[#34d399]", i: 2 },
            { suffix: "%", label: lang === "es" ? "Sistemas en Prod." : "Production Sys.", text: "text-[#38bdf8]", i: 3 },
          ] as const).map((m) => {
            const delay = m.i * 150;
            return (
            <div
              key={m.i}
              className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-background dark:bg-foreground/[0.04] border border-foreground/[0.06] select-none"
            >
              {m.i === 3 && (
                <button
                  type="button"
                  onClick={replayAnimation}
                  disabled={spinning}
                  title={lang === "es" ? "Reproducir animación" : "Replay animation"}
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-lg flex items-center justify-center bg-foreground/[0.06] hover:bg-foreground/[0.14] border border-foreground/[0.08] hover:border-foreground/[0.18] transition-colors duration-200 cursor-pointer group disabled:pointer-events-none"
                >
                  <RotateCcw className={`w-3 h-3 text-muted-foreground/40 group-hover:text-muted-foreground/80 transition-colors duration-200 ${spinning ? "animate-spin" : ""}`} />
                </button>
              )}
              <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-2 sm:pb-3">
                <p className="text-[9px] sm:text-[10px] text-muted-foreground/50 font-semibold uppercase tracking-widest mb-1.5 sm:mb-2">
                  {m.label}
                </p>
                <span
                  ref={el => { countRefs.current[m.i] = el; }}
                  className={`text-xl sm:text-2xl md:text-3xl font-black tabular-nums leading-none ${m.text}`}
                >
                  0{m.suffix}
                </span>
              </div>
              <svg
                viewBox="0 0 100 44"
                preserveAspectRatio="none"
                className="w-full block"
                style={{ height: 70, transform: "translateZ(0)" }}
                aria-hidden="true"
              >
                {[11, 22, 33].map(y => (
                  <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" strokeOpacity="0.07" strokeWidth="0.5" />
                ))}
                <defs>
                  <linearGradient id={`kpi-grad-${m.i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={CHARTS[m.i].color} stopOpacity="0.08" />
                    <stop offset="100%" stopColor={CHARTS[m.i].color} stopOpacity="0"    />
                  </linearGradient>
                </defs>
                <path
                  d={CHARTS[m.i].area}
                  fill={`url(#kpi-grad-${m.i})`}
                  style={{ opacity: ecgOn ? 1 : 0, transition: ecgOn ? `opacity 1200ms ease-out ${delay + 80}ms` : 'none' }}
                />
                <path
                  ref={el => { lineRefs.current[m.i] = el; }}
                  d={CHARTS[m.i].line}
                  fill="none"
                  pathLength="1000"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    stroke: CHARTS[m.i].color,
                    strokeDasharray: 1000,
                    strokeDashoffset: 1000,
                  }}
                />
                {CHARTS[m.i].pts.map(([x, y], idx) => (
                  <circle
                    key={idx}
                    ref={el => { dotRefs.current[m.i][idx] = el; }}
                    cx={x} cy={y} r="1"
                    fill={CHARTS[m.i].color}
                    style={{ opacity: 0 }}
                  />
                ))}
              </svg>
            </div>
            );
          })}
        </div>
      </div>
    </section>
    <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}