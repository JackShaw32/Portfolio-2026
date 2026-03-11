import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_BisCJTvH.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_B7s6mRf9.mjs';
import { u as useLanguage, t as translations, p as projectsStaticData, r as renderBold, C as ChatAI, F as Footer, N as Navbar } from '../../chunks/ChatAI_rvBze0wF.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export { renderers } from '../../renderers.mjs';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const SLIDE_GAP = 20;
const PEEK_DESKTOP = 270;
const PEEK_MOBILE = 5;
function ImageSlider({ images, title }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const isAnimating = useRef(false);
  const [activeIdx, setActiveIdx] = useState(1);
  const idxRef = useRef(1);
  const [dotIdx, setDotIdx] = useState(0);
  const dragStartX = useRef(null);
  const canNavigate = images.length > 1;
  const [isReady, setIsReady] = useState(false);
  const n = images.length;
  const ext = useMemo(
    () => [images[n - 1], ...images, images[0]],
    [images, n]
  );
  const getSlideWidth = useCallback(() => {
    if (!containerRef.current) return 0;
    const cw = containerRef.current.offsetWidth;
    const peek = window.innerWidth < 640 ? PEEK_MOBILE : PEEK_DESKTOP;
    return Math.max(0, cw - peek * 2);
  }, []);
  const getX = useCallback((extIdx) => {
    if (!containerRef.current) return 0;
    const cw = containerRef.current.offsetWidth;
    const slideW = getSlideWidth();
    const peek = (cw - slideW) / 2;
    const stride = slideW + SLIDE_GAP;
    return peek - extIdx * stride;
  }, [getSlideWidth]);
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          const slideW = getSlideWidth();
          if (slideW > 0 && trackRef.current) {
            trackRef.current.querySelectorAll(".slide-item").forEach((el) => {
              el.style.width = `${slideW}px`;
            });
            const newX = getX(idxRef.current);
            gsap.set(trackRef.current, { x: newX });
            trackRef.current.querySelectorAll(".slide-item").forEach((slide, idx) => {
              gsap.set(slide, { opacity: idx === idxRef.current ? 1 : 0.3 });
            });
            setIsReady(true);
          }
        }
      }
    });
    resizeObserver.observe(containerRef.current);
    const initTimer = setTimeout(() => {
      if (containerRef.current) {
        const slideW = getSlideWidth();
        if (slideW > 0 && trackRef.current) {
          trackRef.current.querySelectorAll(".slide-item").forEach((el) => {
            el.style.width = `${slideW}px`;
          });
          const initialX = getX(1);
          gsap.set(trackRef.current, { x: initialX });
          trackRef.current.querySelectorAll(".slide-item").forEach((slide, idx) => {
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
  }, [getX, getSlideWidth]);
  useEffect(() => {
    const onResize = () => {
      if (!trackRef.current || !containerRef.current) return;
      const slideW = getSlideWidth();
      if (slideW > 0) {
        trackRef.current.querySelectorAll(".slide-item").forEach((el) => {
          el.style.width = `${slideW}px`;
        });
        const newX = getX(idxRef.current);
        gsap.set(trackRef.current, { x: newX });
        trackRef.current.querySelectorAll(".slide-item").forEach((slide, idx) => {
          gsap.set(slide, { opacity: idx === idxRef.current ? 1 : 0.3 });
        });
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getX, getSlideWidth]);
  const moveTo = useCallback((extIdx) => {
    if (isAnimating.current || !trackRef.current || !containerRef.current || !isReady) return;
    isAnimating.current = true;
    const realDot = extIdx === 0 ? n - 1 : extIdx === ext.length - 1 ? 0 : extIdx - 1;
    setDotIdx(realDot);
    const endX = getX(extIdx);
    getSlideWidth();
    const newCenterIdx = extIdx;
    const oldCenterIdx = idxRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        let finalIdx = extIdx;
        if (extIdx === 0) {
          finalIdx = n;
          gsap.set(trackRef.current, { x: getX(n) });
        } else if (extIdx === ext.length - 1) {
          finalIdx = 1;
          gsap.set(trackRef.current, { x: getX(1) });
        }
        idxRef.current = finalIdx;
        setActiveIdx(finalIdx);
        trackRef.current?.querySelectorAll(".slide-item").forEach((slide, idx) => {
          gsap.set(slide, { opacity: idx === finalIdx ? 1 : 0.3 });
        });
      }
    });
    tl.to(trackRef.current, {
      x: endX,
      duration: 0.4,
      ease: "sine.inOut"
    }, 0);
    trackRef.current.querySelectorAll(".slide-item").forEach((slide, idx) => {
      let endOpacity = 0.3;
      if (idx === oldCenterIdx) {
        endOpacity = 0.3;
      } else if (idx === newCenterIdx) {
        endOpacity = 1;
      }
      tl.to(slide, {
        opacity: endOpacity,
        duration: 0.4,
        ease: "sine.inOut"
      }, 0);
    });
  }, [getX, ext.length, n, getSlideWidth, isReady]);
  useEffect(() => {
    if (!canNavigate || !isReady) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") moveTo(idxRef.current - 1);
      if (e.key === "ArrowRight") moveTo(idxRef.current + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [moveTo, canNavigate, isReady]);
  const onDragDown = (e) => {
    if (!canNavigate || !isReady) return;
    dragStartX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onDragUp = (e) => {
    if (!canNavigate || !isReady || dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    const cw = containerRef.current?.offsetWidth ?? 0;
    if (Math.abs(delta) > cw * 0.05) {
      if (delta < 0) moveTo(idxRef.current + 1);
      else moveTo(idxRef.current - 1);
    }
  };
  if (n === 0) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "hidden", "aria-hidden": "true", children: images.map((src, i) => /* @__PURE__ */ jsx("img", { src, alt: "" }, i)) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: containerRef,
        className: "relative overflow-hidden select-none touch-none",
        onPointerDown: onDragDown,
        onPointerUp: onDragUp,
        children: [
          !isReady && /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] sm:aspect-video bg-gray-200 animate-pulse rounded-2xl" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: trackRef,
              className: "flex items-stretch",
              style: {
                gap: `${SLIDE_GAP}px`,
                visibility: isReady ? "visible" : "hidden",
                position: isReady ? "relative" : "absolute",
                opacity: isReady ? 1 : 0
              },
              children: ext.map((src, i) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "slide-item flex-shrink-0 aspect-[4/3] sm:aspect-video relative overflow-hidden rounded-2xl",
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src,
                      alt: `${title} - ${i}`,
                      draggable: false,
                      loading: i === activeIdx ? "eager" : "lazy",
                      className: "w-full h-full object-cover object-top"
                    }
                  )
                },
                i
              ))
            }
          ),
          canNavigate && isReady && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onPointerDown: (e) => e.stopPropagation(),
                onClick: () => moveTo(idxRef.current - 1),
                "aria-label": "Anterior",
                className: "hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 border border-white/30 backdrop-blur-sm items-center justify-center text-white hover:bg-black/90 hover:border-white/60 transition-all duration-200 cursor-pointer shadow-lg",
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onPointerDown: (e) => e.stopPropagation(),
                onClick: () => moveTo(idxRef.current + 1),
                "aria-label": "Siguiente",
                className: "hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 border border-white/30 backdrop-blur-sm items-center justify-center text-white hover:bg-black/90 hover:border-white/60 transition-all duration-200 cursor-pointer shadow-lg",
                children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20", children: images.map((_, i) => /* @__PURE__ */ jsx(
              "button",
              {
                onPointerDown: (e) => e.stopPropagation(),
                onClick: () => moveTo(i + 1),
                "aria-label": `Imagen ${i + 1}`,
                className: `rounded-full transition-all duration-300 ${dotIdx === i ? "bg-white w-5 h-1.5" : "bg-white/50 w-1.5 h-1.5 hover:bg-white/80"}`
              },
              i
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "absolute top-3 right-3 z-20 text-[10px] font-mono text-white/60 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full pointer-events-none", children: [
              dotIdx + 1,
              " / ",
              n
            ] })
          ] })
        ]
      }
    )
  ] });
}
function ProjectDetail({ slug }) {
  const ref = useRef(null);
  const { lang } = useLanguage();
  const t = translations[lang];
  const pr = t.projects;
  const index = projectsStaticData.findIndex((p) => p.slug === slug);
  const staticData = projectsStaticData[index];
  const projectT = pr.projects[index];
  const rich = projectT;
  useEffect(() => {
    if (!staticData) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".detail-image",
        { opacity: 0, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".detail-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.15 }
      );
      gsap.utils.toArray(".detail-section").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" }
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [slug, staticData]);
  if (!staticData || !projectT) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center pt-24", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black mb-4", children: "404" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: "Proyecto no encontrado." }),
      /* @__PURE__ */ jsx("a", { href: "/", className: "text-primary hover:underline", children: "Volver al portfolio" })
    ] }) });
  }
  const project = { ...staticData, ...projectT };
  const nextIndex = (index + 1) % projectsStaticData.length;
  const nextStatic = projectsStaticData[nextIndex];
  const nextT = pr.projects[nextIndex];
  return /* @__PURE__ */ jsxs("div", { ref, className: "min-h-screen", children: [
    /* @__PURE__ */ jsx("div", { className: "pt-24 pb-4 px-6 container mx-auto", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: "/",
        className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group",
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
          pr.backToPortfolio
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "w-full mb-0", children: /* @__PURE__ */ jsx("div", { className: "detail-image", children: /* @__PURE__ */ jsx(ImageSlider, { images: staticData.images, title: project.title }) }) }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 pt-5 pb-5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto grid md:grid-cols-[1fr_260px] gap-10 md:gap-14 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-7", children: [
        /* @__PURE__ */ jsxs("div", { className: "detail-header", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: `text-[11px] uppercase tracking-widest font-black px-3 py-1 rounded-full border ${staticData.accent}`, children: project.highlight }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground font-mono", children: project.role }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: staticData.year })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1] mb-4", children: project.title }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground/60 text-base md:text-lg leading-relaxed", children: renderBold(project.description) }),
          rich.intro && /* @__PURE__ */ jsx("p", { className: "text-foreground/60 text-base md:text-lg leading-relaxed mt-3", children: renderBold(rich.intro) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "detail-section", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xs uppercase tracking-widest font-black text-muted-foreground mb-5", children: pr.keyFeatures }),
          rich.sections ? /* @__PURE__ */ jsx("div", { className: "space-y-8", children: rich.sections.map((section, i) => /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-foreground", children: section.title }),
            section.description && /* @__PURE__ */ jsx("p", { className: "text-foreground/60 text-sm leading-relaxed", children: renderBold(section.description) }),
            section.items && section.items.length > 0 && /* @__PURE__ */ jsx("ul", { className: "space-y-2 ml-1", children: section.items.map((item, j) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-foreground/70 text-sm leading-relaxed", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-2 w-1 h-1 rounded-full bg-foreground/50 flex-shrink-0" }),
              renderBold(item)
            ] }, j)) }),
            section.subsections?.map((sub, k) => /* @__PURE__ */ jsxs("div", { className: "mt-4 ml-4 space-y-2 border-l border-border/30 pl-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-foreground/80 uppercase tracking-wider block", children: sub.title }),
              sub.description && /* @__PURE__ */ jsx("p", { className: "text-foreground/60 text-sm leading-relaxed", children: renderBold(sub.description) }),
              sub.items && /* @__PURE__ */ jsx("ul", { className: "space-y-1 mt-1", children: sub.items.map((item, l) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-foreground/70 text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "mt-2 w-1 h-1 rounded-full bg-foreground/40 flex-shrink-0" }),
                renderBold(item)
              ] }, l)) })
            ] }, k))
          ] }, i)) }) : /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: project.features.map((feature, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-foreground/80 text-sm leading-relaxed", children: [
            /* @__PURE__ */ jsx("span", { className: "mt-2 w-1 h-1 rounded-full bg-foreground/50 flex-shrink-0" }),
            feature
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "detail-section", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xs uppercase tracking-widest font-black text-muted-foreground mb-5", children: pr.techStack }),
          rich.techCategories ? /* @__PURE__ */ jsx("div", { className: "space-y-5", children: rich.techCategories.map((cat, i) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-2 font-semibold", children: cat.label }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: cat.items.map((tag) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "text-xs font-semibold text-foreground/80 bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-lg hover:border-foreground/20 transition-colors",
                children: tag
              },
              tag
            )) })
          ] }, i)) }) : /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: project.tags.map((tag) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "text-xs font-semibold text-foreground/80 bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-lg hover:border-foreground/20 transition-colors",
              children: tag
            },
            tag
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("aside", { className: "detail-section", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-20 border border-border/40 rounded-2xl p-5 space-y-4 bg-foreground/[0.02]", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Tipo" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1", children: /* @__PURE__ */ jsx("span", { className: `inline-block text-xs font-black px-3 py-1 rounded-full border ${staticData.accent}`, children: project.highlight }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Rol" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-foreground", children: project.role })
        ] }),
        rich.responsibilities && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Responsable de" }),
          /* @__PURE__ */ jsx("ul", { className: "mt-2 space-y-1", children: rich.responsibilities.map((r, i) => /* @__PURE__ */ jsxs("li", { className: "text-xs text-foreground/70 flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "mt-1.5 w-1 h-1 rounded-full bg-foreground/40 flex-shrink-0" }),
            r
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: pr.yearLabel }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-foreground", children: staticData.year })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-2 border-t border-border/30 space-y-2", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: project.link,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "w-full flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200",
              children: [
                /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                pr.visitSite
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: project.repo,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "w-full flex items-center justify-center gap-2 border border-border/60 hover:border-foreground/40 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200",
              children: [
                /* @__PURE__ */ jsx(Github, { className: "w-3.5 h-3.5" }),
                pr.repository
              ]
            }
          )
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "detail-section border-t border-border/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-10 max-w-5xl flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "/",
          className: "flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: pr.backToPortfolio })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/projects/${nextStatic.slug}`,
          className: "flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group text-right",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[11px] text-muted-foreground", children: pr.nextProject }),
              /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-foreground", children: nextT?.title })
            ] }),
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" })
          ]
        }
      )
    ] }) })
  ] });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://jackshaw32.vercel.app");
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) {
    return Astro2.redirect("/");
  }
  const projectIndex = projectsStaticData.findIndex((p) => p.slug === slug);
  const staticData = projectsStaticData[projectIndex];
  const projectT = translations.es.projects.projects[projectIndex];
  if (!staticData) {
    return Astro2.redirect("/");
  }
  const siteURL = "https://jackshaw32.vercel.app";
  const projectTitle = projectT?.title ?? slug;
  const projectDescription = projectT?.description ?? "Proyecto en el portfolio de Eduardo Cabral \u2014 Full-Stack JavaScript Developer.";
  const projectImage = staticData.images[0];
  const projectKeywords = `${staticData.tags.join(", ")}, Eduardo Cabral, Full Stack Developer, portfolio`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": projectTitle,
    "description": projectDescription,
    "url": staticData.link,
    "image": `${siteURL}${projectImage}`,
    "creator": {
      "@type": "Person",
      "name": "Eduardo Cabral",
      "url": siteURL
    },
    "keywords": staticData.tags.join(", "),
    "dateCreated": staticData.year,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": siteURL },
        { "@type": "ListItem", "position": 2, "name": "Proyectos", "item": `${siteURL}/#projects` },
        { "@type": "ListItem", "position": 3, "name": projectTitle, "item": `${siteURL}/projects/${slug}` }
      ]
    }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${projectTitle} \u2014 Eduardo Cabral`, "description": projectDescription, "image": projectImage, "keywords": projectKeywords, "type": "article" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> ", '<div class="min-h-screen bg-background"> ', " <main> ", " </main> ", " ", " </div> "])), unescapeHTML(JSON.stringify(jsonLd)), maybeRenderHead(), renderComponent($$result2, "Navbar", Navbar, { "subPage": true, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Navbar", "client:component-export": "default" }), renderComponent($$result2, "ProjectDetail", ProjectDetail, { "slug": slug, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ProjectDetail", "client:component-export": "default" }), renderComponent($$result2, "Footer", Footer, { "subPage": true, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/Footer", "client:component-export": "default" }), renderComponent($$result2, "ChatAI", ChatAI, { "slug": slug, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ChatAI", "client:component-export": "default" })) })}`;
}, "C:/Users/Lenovo/Desktop/educcabral/src/pages/projects/[slug].astro", void 0);

const $$file = "C:/Users/Lenovo/Desktop/educcabral/src/pages/projects/[slug].astro";
const $$url = "/projects/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
