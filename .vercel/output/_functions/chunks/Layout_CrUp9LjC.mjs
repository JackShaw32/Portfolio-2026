import { e as createAstro, f as createComponent, r as renderTemplate, l as renderSlot, n as renderHead, h as addAttribute } from './astro/server_D3sYOqQv.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://jackshaw32.vercel.app");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Full-Stack Developer especializado en soluciones e-commerce y arquitectura web moderna. Desarrollo aplicaciones web escalables con React, Node.js y tecnolog\xEDas cloud.",
    image = "/api/og",
    keywords = "Eduardo Cabral, Full Stack Developer, React, Node.js, JavaScript, TypeScript, Argentina, desarrollador web, e-commerce, portfolio",
    type = "website",
    noindex = false
  } = Astro2.props;
  const siteURL = "https://jackshaw32.vercel.app";
  const canonicalURL = new URL(Astro2.url.pathname.replace(/\/$/, "") || "/", siteURL).href;
  const ogImage = image.startsWith("http") ? image : `${siteURL}${image}`;
  const pageTitle = title.includes("Eduardo Cabral") ? title : `${title} | Eduardo Cabral`;
  return renderTemplate(_a || (_a = __template(['<html lang="es" class="scroll-smooth dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"', "><!-- Primary Meta Tags --><title>", '</title><meta name="title"', '><meta name="description"', '><meta name="keywords"', '><meta name="author" content="Eduardo Cabral"><meta name="robots"', '><meta name="theme-color" content="#0f172a"><meta name="color-scheme" content="dark light"><!-- Canonical URL (prevents duplicate content) --><link rel="canonical"', '><!-- Favicons --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="apple-touch-icon" href="/favicon.svg"><!-- Open Graph / Facebook --><meta property="og:type"', '><meta property="og:url"', '><meta property="og:site_name" content="Eduardo Cabral"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt"', '><meta property="og:locale" content="es_AR"><meta property="og:locale:alternate" content="en_US"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><meta name="twitter:image:alt"', `><meta name="twitter:creator" content="@educcabral"><meta name="twitter:site" content="@educcabral"><!-- JSON-LD Structured Data --><script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": "https://jackshaw32.vercel.app/#person",
            "name": "Eduardo Cabral",
            "url": "https://jackshaw32.vercel.app",
            "image": {
              "@type": "ImageObject",
              "url": "https://jackshaw32.vercel.app/20220924_233024.webp",
              "width": 800,
              "height": 800
            },
            "jobTitle": "Full-Stack Developer",
            "description": "Full-Stack Developer especializado en soluciones e-commerce y arquitectura web moderna con React, Node.js y tecnolog\xEDas cloud.",
            "knowsAbout": ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "Firebase", "Tailwind CSS", "E-commerce", "REST API"],
            "knowsLanguage": ["es", "en"],
            "nationality": {
              "@type": "Country",
              "name": "Argentina"
            },
            "sameAs": [
              "https://www.linkedin.com/in/educcabral",
              "https://github.com/educcabral"
            ]
          },
          {
            "@type": "WebSite",
            "@id": "https://jackshaw32.vercel.app/#website",
            "url": "https://jackshaw32.vercel.app",
            "name": "Eduardo Cabral \u2014 Full-Stack Developer",
            "description": "Portafolio profesional de Eduardo Cabral, Full-Stack Developer especializado en e-commerce y arquitectura web moderna.",
            "inLanguage": ["es", "en"],
            "author": {
              "@id": "https://jackshaw32.vercel.app/#person"
            }
          },
          {
            "@type": "WebPage",
            "@id": "https://jackshaw32.vercel.app/#webpage",
            "url": "https://jackshaw32.vercel.app",
            "name": "Eduardo Cabral | Full-Stack Developer",
            "isPartOf": { "@id": "https://jackshaw32.vercel.app/#website" },
            "about": { "@id": "https://jackshaw32.vercel.app/#person" },
            "description": "Portfolio profesional de Eduardo Cabral \u2014 Full-Stack Developer con experiencia en React, Node.js y desarrollo de e-commerce escalable.",
            "inLanguage": "es",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Inicio",
                  "item": "https://jackshaw32.vercel.app"
                }
              ]
            }
          },
          {
            "@type": "ProfilePage",
            "dateCreated": "2024-01-01T00:00:00Z",
            "dateModified": "2026-03-08T00:00:00Z",
            "mainEntity": { "@id": "https://jackshaw32.vercel.app/#person" }
          }
        ]
      }
    <\/script><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900;1,14..32,400&display=swap" rel="stylesheet"><link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet"><!-- Theme detection (before render to prevent flash) --><script>
      (function() {
        try {
          var theme = localStorage.getItem('theme');
          if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch(e) {}
      })();
    <\/script><!-- Smooth scroll with hash cleanup --><script>
      document.addEventListener('click', function(e) {
        var anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        var hash = anchor.getAttribute('href');
        if (!hash || hash === '#') return;
        var target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', window.location.pathname);
      });

      if (window.location.hash) {
        var id = window.location.hash;
        history.replaceState(null, '', window.location.pathname);
        var el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    <\/script>`, '</head> <body class="min-h-screen bg-background font-sans antialiased selection:bg-primary/30 overflow-x-hidden"> ', " </body></html>"])), addAttribute(Astro2.generator, "content"), pageTitle, addAttribute(pageTitle, "content"), addAttribute(description, "content"), addAttribute(keywords, "content"), addAttribute(noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1", "content"), addAttribute(canonicalURL, "href"), addAttribute(type, "content"), addAttribute(canonicalURL, "content"), addAttribute(pageTitle, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(`${title} \u2014 Eduardo Cabral`, "content"), addAttribute(canonicalURL, "content"), addAttribute(pageTitle, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(`${title} \u2014 Eduardo Cabral`, "content"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "C:/Users/Lenovo/Desktop/educcabral/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
