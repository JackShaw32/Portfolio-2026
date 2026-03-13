import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { ExternalLink, Github, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "../lib/translations";
import { projectsStaticData } from "../config/projects";
import { renderBold } from "../lib/renderBold";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Peek image slider ──────────────────────────────────────────── */
const SLIDE_GAP = 20;
const PEEK_DESKTOP = 270;
const PEEK_MOBILE  = 5;

function ImageSlider({ images, title }: { images: readonly string[]; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const isAnimating  = useRef(false);
  const [activeIdx, setActiveIdx] = useState(1);
  const idxRef       = useRef(1);
  const [dotIdx, setDotIdx] = useState(0);
  const dragStartX   = useRef<number | null>(null);
  const canNavigate  = images.length > 1;
  const [isReady, setIsReady] = useState(false);

  const n = images.length;
  const ext = useMemo(
    () => [images[n - 1], ...images, images[0]] as readonly string[],
    [images, n]
  );

  const getSlideWidth = useCallback((): number => {
    if (!containerRef.current) return 0;
    const cw = containerRef.current.offsetWidth;
    const peek = window.innerWidth < 640 ? PEEK_MOBILE : PEEK_DESKTOP;
    return Math.max(0, cw - peek * 2);
  }, []);

  const getSlideHeight = useCallback((slideW: number): number => {
    // 4:3 on mobile, 16:9 on sm+  (matches aspect-[4/3] sm:aspect-video)
    return window.innerWidth < 640
      ? Math.round(slideW * 3 / 4)
      : Math.round(slideW * 9 / 16);
  }, []);

  const getX = useCallback((extIdx: number): number => {
    if (!containerRef.current) return 0;
    const cw = containerRef.current.offsetWidth;
    const slideW = getSlideWidth();
    const peek = (cw - slideW) / 2;
    const stride = slideW + SLIDE_GAP;
    return peek - extIdx * stride;
  }, [getSlideWidth]);

  // Observar cambios en el tamaño del contenedor
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          // Actualizar tamaños cuando el contenedor tenga dimensiones reales
          const slideW = getSlideWidth();
          if (slideW > 0 && trackRef.current) {
            const slideH = getSlideHeight(slideW);
            trackRef.current.querySelectorAll<HTMLElement>(".slide-item").forEach(el => {
              el.style.width = `${slideW}px`;
              el.style.height = `${slideH}px`;
            });
            
            const newX = getX(idxRef.current);
            gsap.set(trackRef.current, { x: newX });
            
            trackRef.current.querySelectorAll<HTMLElement>(".slide-item").forEach((slide, idx) => {
              gsap.set(slide, { opacity: idx === idxRef.current ? 1 : 0.3 });
            });
            
            setIsReady(true);
          }
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    
    // Forzar una medición inicial después de un pequeño delay
    const initTimer = setTimeout(() => {
      if (containerRef.current) {
        const slideW = getSlideWidth();
        if (slideW > 0 && trackRef.current) {
          const slideH = getSlideHeight(slideW);
          trackRef.current.querySelectorAll<HTMLElement>(".slide-item").forEach(el => {
            el.style.width = `${slideW}px`;
            el.style.height = `${slideH}px`;
          });

          const initialX = getX(1);
          gsap.set(trackRef.current, { x: initialX });

          trackRef.current.querySelectorAll<HTMLElement>(".slide-item").forEach((slide, idx) => {
            gsap.set(slide, { opacity: idx === 1 ? 1 : 0.3 });
          });

          setIsReady(true);
        }
      }
    }, 100);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(initTimer);
    };
  }, [getX, getSlideWidth, getSlideHeight]);

  // Recalcular en resize de ventana
  useEffect(() => {
    const onResize = () => {
      if (!trackRef.current || !containerRef.current) return;
      
      const slideW = getSlideWidth();
      if (slideW > 0) {
        const slideH = getSlideHeight(slideW);
        trackRef.current.querySelectorAll<HTMLElement>(".slide-item").forEach(el => {
          el.style.width = `${slideW}px`;
          el.style.height = `${slideH}px`;
        });
        
        const newX = getX(idxRef.current);
        gsap.set(trackRef.current, { x: newX });
        
        trackRef.current.querySelectorAll<HTMLElement>(".slide-item").forEach((slide, idx) => {
          gsap.set(slide, { opacity: idx === idxRef.current ? 1 : 0.3 });
        });
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getX, getSlideWidth, getSlideHeight]);

  const moveTo = useCallback((extIdx: number) => {
    if (isAnimating.current || !trackRef.current || !containerRef.current || !isReady) return;
    isAnimating.current = true;

    const realDot = extIdx === 0 ? n - 1 : extIdx === ext.length - 1 ? 0 : extIdx - 1;
    setDotIdx(realDot);

    const endX = getX(extIdx);
    const slideWidth = getSlideWidth();
    const gap = SLIDE_GAP;
    
    const newCenterIdx = extIdx;
    const oldCenterIdx = idxRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        let finalIdx = extIdx;
        
        if (extIdx === 0) {
          finalIdx = n;
          gsap.set(trackRef.current!, { x: getX(n) });
        } else if (extIdx === ext.length - 1) {
          finalIdx = 1;
          gsap.set(trackRef.current!, { x: getX(1) });
        }
        
        idxRef.current = finalIdx;
        setActiveIdx(finalIdx);
        
        trackRef.current?.querySelectorAll<HTMLElement>(".slide-item").forEach((slide, idx) => {
          gsap.set(slide, { opacity: idx === finalIdx ? 1 : 0.3 });
        });
      }
    });

    tl.to(trackRef.current, {
      x: endX,
      duration: 0.4,
      ease: "sine.inOut",
    }, 0);

    trackRef.current.querySelectorAll<HTMLElement>(".slide-item").forEach((slide, idx) => {
      let endOpacity = 0.3;
      
      if (idx === oldCenterIdx) {
        endOpacity = 0.3;
      } else if (idx === newCenterIdx) {
        endOpacity = 1;
      }
      
      tl.to(slide, {
        opacity: endOpacity,
        duration: 0.4,
        ease: "sine.inOut",
      }, 0);
    });

  }, [getX, ext.length, n, getSlideWidth, isReady]);

  useEffect(() => {
    if (!canNavigate || !isReady) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") moveTo(idxRef.current - 1);
      if (e.key === "ArrowRight") moveTo(idxRef.current + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [moveTo, canNavigate, isReady]);

  const onDragDown = (e: React.PointerEvent) => {
    if (!canNavigate || !isReady || isAnimating.current) return;
    dragStartX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onDragMove = (e: React.PointerEvent) => {
    if (!canNavigate || !isReady || dragStartX.current === null || isAnimating.current) return;
    const delta = e.clientX - dragStartX.current;
    gsap.set(trackRef.current, { x: getX(idxRef.current) + delta });
  };

  const onDragUp = (e: React.PointerEvent) => {
    if (!canNavigate || !isReady || dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    const cw = containerRef.current?.offsetWidth ?? 0;
    if (Math.abs(delta) > cw * 0.05) {
      if (delta < 0) moveTo(idxRef.current + 1);
      else moveTo(idxRef.current - 1);
    } else {
      // snap back si el swipe fue muy corto
      gsap.to(trackRef.current, { x: getX(idxRef.current), duration: 0.25, ease: "power2.out" });
    }
  };

  if (n === 0) return null;

  return (
    <>
      <div className="hidden" aria-hidden="true">
        {images.map((src, i) => <img key={i} src={src} alt="" />)}
      </div>

      <div
        ref={containerRef}
        className="relative overflow-hidden select-none touch-none"
        onPointerDown={onDragDown}
        onPointerMove={onDragMove}
        onPointerUp={onDragUp}
      >
        {/* Mostrar un placeholder mientras no está listo */}
        {!isReady && (
          <div className="aspect-[4/3] sm:aspect-video bg-muted animate-pulse rounded-2xl" />
        )}

        {/* Track: gap entre slides = SLIDE_GAP */}
        <div
          ref={trackRef}
          className="flex items-stretch"
          style={{ 
            gap: `${SLIDE_GAP}px`,
            visibility: isReady ? 'visible' : 'hidden',
            position: isReady ? 'relative' : 'absolute',
            opacity: isReady ? 1 : 0
          }}
        >
          {ext.map((src, i) => (
            <div
              key={i}
              className="slide-item flex-shrink-0 aspect-[4/3] sm:aspect-video relative overflow-hidden rounded-2xl"
            >
              <img
                src={src}
                alt={`${title} - ${i}`}
                draggable={false}
                loading={i === activeIdx ? "eager" : "lazy"}
                className="w-full h-full object-cover object-top"
              />
            </div>
          ))}
        </div>

        {canNavigate && isReady && (
          <>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => moveTo(idxRef.current - 1)}
              aria-label="Anterior"
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 border border-white/30 backdrop-blur-sm items-center justify-center text-white hover:bg-black/90 hover:border-white/60 transition-all duration-200 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => moveTo(idxRef.current + 1)}
              aria-label="Siguiente"
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 border border-white/30 backdrop-blur-sm items-center justify-center text-white hover:bg-black/90 hover:border-white/60 transition-all duration-200 cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {images.map((_, i) => (
                <button
                  key={i}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => moveTo(i + 1)}
                  aria-label={`Imagen ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    dotIdx === i
                      ? "bg-white w-5 h-1.5"
                      : "bg-white/50 w-1.5 h-1.5 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            <div className="absolute top-3 right-3 z-20 text-[10px] font-mono text-white/60 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full pointer-events-none">
              {dotIdx + 1} / {n}
            </div>
          </>
        )}
      </div>
    </>
  );
}

type ProjectSection = {
  title: string;
  description?: string;
  items?: string[];
  subsections?: Array<{ title: string; description?: string; items?: string[] }>;
};

type RichProjectT = {
  intro?: string;
  sections?: ProjectSection[];
  techCategories?: Array<{ label: string; items: string[] }>;
  responsibilities?: string[];
  architectureOverview?: Array<{ layer: string; tech: string }>;
  systemDiagram?: { flow: string[]; integrations: string[] };
};

interface Props {
  slug: string;
}

export default function ProjectDetail({ slug }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = translations[lang];
  const pr = t.projects;

  const index = projectsStaticData.findIndex((p) => p.slug === slug);
  const staticData = projectsStaticData[index];
  const projectT = pr.projects[index];
  const rich = projectT as typeof projectT & RichProjectT;

  useEffect(() => {
    if (!staticData) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".detail-image",
        { opacity: 0, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(".detail-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.15 }
      );
      gsap.utils.toArray<HTMLElement>(".detail-section").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [slug, staticData]);

  if (!staticData || !projectT) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">404</h1>
          <p className="text-muted-foreground mb-6">Proyecto no encontrado.</p>
          <a href="/" className="text-primary hover:underline">Volver al portfolio</a>
        </div>
      </div>
    );
  }

  const project    = { ...staticData, ...projectT };
  const nextIndex  = (index + 1) % projectsStaticData.length;
  const nextStatic = projectsStaticData[nextIndex];
  const nextT      = pr.projects[nextIndex];

  return (
    <div ref={ref} className="min-h-screen">

      {/* Back button */}
      <div className="pt-24 pb-4 px-6 container mx-auto">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {pr.backToPortfolio}
        </a>
      </div>

      {/* Image slider — full viewport width */}
      <div className="w-full mb-0" ref={(el) => { if (el) el.style.setProperty('view-transition-name', `project-card-${slug}`); }}>
        <div className="detail-image">
          <ImageSlider images={staticData.images} title={project.title} />
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 pt-5 pb-5">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_260px] gap-10 lg:gap-14 items-start">

          <div className="space-y-7">
            <div className="detail-header">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`text-[11px] uppercase tracking-widest font-black px-3 py-1 rounded-full border ${staticData.accent}`}>
                  {project.highlight}
                </span>
                <span className="text-sm text-muted-foreground font-mono">{project.role}</span>
                <span className="text-sm text-muted-foreground">{staticData.year}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground leading-[1] mb-4">
                {project.title}
              </h1>
              <p className="text-foreground/60 text-base md:text-lg leading-relaxed">
                {renderBold(project.description)}
              </p>
              {rich.intro && (
                <p className="text-foreground/60 text-base md:text-lg leading-relaxed mt-3">
                  {renderBold(rich.intro)}
                </p>
              )}
            </div>

            {(rich.architectureOverview || rich.systemDiagram) && (
              <div className="detail-section grid sm:grid-cols-2 gap-4">

                {rich.architectureOverview && (
                  <div className="bg-background dark:bg-foreground/[0.04] rounded-2xl p-5 border border-border/40">
                    <h2 className="text-xs uppercase tracking-widest font-black text-muted-foreground mb-4">
                      {pr.archOverview}
                    </h2>
                    <div className="space-y-2.5">
                      {rich.architectureOverview.map((row, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground w-24 flex-shrink-0 pt-0.5 leading-tight">
                            {row.layer}
                          </span>
                          <span className="text-foreground/25 flex-shrink-0 pt-0.5">→</span>
                          <span className="text-foreground/70 font-medium text-xs leading-relaxed">{row.tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {rich.systemDiagram && (
                  <div className="bg-background dark:bg-foreground/[0.04] rounded-2xl p-5 border border-border/40">
                    <h2 className="text-xs uppercase tracking-widest font-black text-muted-foreground mb-4">
                      {pr.systemDiagramLabel}
                    </h2>
                    <div className="flex flex-col items-center gap-1">
                      {rich.systemDiagram.flow.map((node, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 w-full">
                          <div className={`text-[11px] font-semibold px-3 py-2 rounded-xl text-center w-full border ${
                            i === 0
                              ? "bg-foreground/5 border-border/40 text-foreground/50"
                              : i === rich.systemDiagram!.flow.length - 1
                              ? `${staticData.accent} bg-foreground/5`
                              : "bg-foreground/5 border-border/40 text-foreground/70"
                          }`}>
                            {node}
                          </div>
                          {i < rich.systemDiagram!.flow.length - 1 && (
                            <span className="text-foreground/25 text-xs">↓</span>
                          )}
                        </div>
                      ))}
                    </div>
                    {rich.systemDiagram.integrations.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border/30">
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                          {pr.externalIntegrations}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {rich.systemDiagram.integrations.map((item, i) => (
                            <span key={i} className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-border/50 bg-foreground/5 text-foreground/60">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

            <div className="detail-section">
              <h2 className="text-xs uppercase tracking-widest font-black text-muted-foreground mb-5">
                {pr.keyFeatures}
              </h2>
              {rich.sections ? (
                <div className="space-y-8">
                  {rich.sections.map((section, i) => (
                    <div key={i} className="space-y-3">
                      <h3 className="text-sm font-bold text-foreground">{section.title}</h3>
                      {section.description && (
                        <p className="text-foreground/60 text-sm leading-relaxed">{renderBold(section.description)}</p>
                      )}
                      {section.items && section.items.length > 0 && (
                        <ul className="space-y-2 ml-1">
                          {section.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-3 text-foreground/70 text-sm leading-relaxed">
                              <span className="mt-2 w-1 h-1 rounded-full bg-foreground/50 flex-shrink-0" />
                              {renderBold(item)}
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.subsections?.map((sub, k) => (
                        <div key={k} className="mt-4 ml-4 space-y-2 border-l border-border/30 pl-4">
                          <span className="text-xs font-bold text-foreground/80 uppercase tracking-wider block">{sub.title}</span>
                          {sub.description && (
                            <p className="text-foreground/60 text-sm leading-relaxed">{renderBold(sub.description)}</p>
                          )}
                          {sub.items && (
                            <ul className="space-y-1 mt-1">
                              {sub.items.map((item, l) => (
                                <li key={l} className="flex items-start gap-2 text-foreground/70 text-sm">
                                  <span className="mt-2 w-1 h-1 rounded-full bg-foreground/40 flex-shrink-0" />
                                  {renderBold(item)}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-3">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-foreground/50 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="detail-section">
              <h2 className="text-xs uppercase tracking-widest font-black text-muted-foreground mb-5">
                {pr.techStack}
              </h2>
              {rich.techCategories ? (
                <div className="space-y-5">
                  {rich.techCategories.map((cat, i) => (
                    <div key={i}>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 font-semibold">{cat.label}</div>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-semibold text-foreground/80 bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-lg hover:border-foreground/20 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold text-foreground/80 bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-lg hover:border-foreground/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="detail-section">
            <div className="sticky top-20 border border-border/40 rounded-2xl p-5 space-y-4 bg-foreground/[0.02]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Tipo</span>
                <p className="mt-1">
                  <span className={`inline-block text-xs font-black px-3 py-1 rounded-full border ${staticData.accent}`}>
                    {project.highlight}
                  </span>
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Rol</span>
                <p className="mt-1 text-sm font-semibold text-foreground">{project.role}</p>
              </div>
              {rich.responsibilities && (
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Responsable de</span>
                  <ul className="mt-2 space-y-1">
                    {rich.responsibilities.map((r, i) => (
                      <li key={i} className="text-xs text-foreground/70 flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-foreground/40 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{pr.yearLabel}</span>
                <p className="mt-1 text-sm font-semibold text-foreground">{staticData.year}</p>
              </div>
              <div className="pt-2 border-t border-border/30 space-y-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {pr.visitSite}
                </a>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-border/60 hover:border-foreground/40 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
                >
                  <Github className="w-3.5 h-3.5" />
                  {pr.repository}
                </a>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Project navigation */}
      <div className="detail-section border-t border-border/30">
        <div className="container mx-auto px-6 py-10 max-w-5xl flex items-center justify-between gap-4">
          <a
            href="/"
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">{pr.backToPortfolio}</span>
          </a>
          <a
            href={`/projects/${nextStatic.slug}`}
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group text-right"
          >
            <div>
              <div className="text-[11px] text-muted-foreground">{pr.nextProject}</div>
              <div className="text-sm font-semibold text-foreground">{nextT?.title}</div>
            </div>
            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

    </div>
  );
}