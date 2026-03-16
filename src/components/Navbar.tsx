import { useState, useEffect } from "react";
import { Download, Moon, Sun, Menu, X, Github, Linkedin, Mail, MapPin, Terminal } from "lucide-react";
import ContactModal from "./ContactModal";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "../lib/translations";

export default function Navbar({ subPage = false }: { subPage?: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const [contactOpen, setContactOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang];

  const navLinks = [
    { href: "#top", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.skills },
    { href: "#optimizations", label: t.nav.projects },
    { href: "#chat", label: t.nav.chat },
    { href: "#contact", label: t.nav.contact },
  ];

  const mobileNavLinks = [
    { href: subPage ? "/" : "#top",           sectionId: "top",           label: t.nav.home },
    { href: subPage ? "/" : "#skills",        sectionId: "skills",        label: t.nav.trajectory },
    { href: subPage ? "/" : "#projects",      sectionId: "projects",      label: t.nav.projects },
    { href: subPage ? "/" : "#optimizations", sectionId: "optimizations", label: t.nav.skills },
    { href: subPage ? "/" : "#about",         sectionId: "about",         label: t.nav.about },
    { href: subPage ? "/" : "#contact",       sectionId: "contact",       label: t.nav.contact },
  ];

  const saveSectionAndClose = (sectionId: string) => {
    if (subPage) sessionStorage.setItem('scroll-to-section', sectionId);
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;

    root.classList.add("theme-transitioning");

    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove("theme-transitioning");
      });
    });

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (menuOpen) return;

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled || menuOpen
            ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-4 lg:px-6 py-4 flex flex-row items-center justify-between">

          <a className="flex items-center gap-3 group" href={subPage ? "/" : "#top"} onClick={() => saveSectionAndClose('top')}>
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full block md:hidden bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/20 transition-colors">
              <img
                src="/20220924_233024.webp"
                alt="Eduardo Cabral"
                fetchPriority="high"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </span>
            <span className="hidden md:flex relative h-10 w-10 shrink-0 rounded-xl bg-foreground/10 items-center justify-center group-hover:bg-foreground/15 transition-colors border border-foreground/[0.08] group-hover:border-foreground/20">
              <Terminal className="w-4 h-4 text-foreground" />
            </span>
            <div className="flex flex-col gap-0">
              <div className="font-semibold text-base lg:text-xl text-foreground tracking-tight">Eduardo Cabral</div>
              <p className="text-xs text-muted-foreground font-medium">Full-Stack JavaScript Dev</p>
            </div>
          </a>

          <a
            className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 group"
            href={subPage ? "/" : "#top"}
            aria-label="Ir al inicio"
            onClick={() => saveSectionAndClose('top')}
            title="Go to top"
          >
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-foreground/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-foreground/20 transition-all duration-300">
              <img
                src="/20220924_233024.webp"
                alt="Eduardo Cabral"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </span>
          </a>

          <div className="inline-flex gap-2 items-center">
            <a
              href="/Eduardo-Cabral-Full-Stack-Developer-EN.pdf"
              download
              className="hidden md:flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border border-border/50 bg-transparent hover:bg-foreground/5 text-foreground h-9 rounded-md px-4"
            >
              <Download className="mr-2 w-4 h-4" />
              {t.nav.downloadCV}
            </a>
            <button
              type="button"
              onClick={() => { setMenuOpen(false); setContactOpen(true); }}
              className="hidden sm:inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out bg-foreground text-background hover:opacity-85 h-9 rounded-md px-4 cursor-pointer"
            >
              {t.nav.contactBtn}
            </button>
            <button
              onClick={toggleLang}
              className="inline-flex items-center justify-center whitespace-nowrap text-xs font-bold transition-all duration-300 ease-out border border-border/50 bg-transparent hover:bg-foreground/10 text-foreground h-9 w-9 rounded-full cursor-pointer"
              type="button"
              aria-label="Toggle language"
              title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
            >
              {t.nav.switchLang}
            </button>

            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out border border-border/50 bg-transparent hover:bg-foreground/10 text-foreground h-9 w-9 rounded-full cursor-pointer group"
              type="button"
              aria-label="Toggle theme"
            >
              {theme === "dark"
                ? <Sun className="w-4 h-4 transition-transform duration-500 ease-out group-hover:rotate-45" />
                : <Moon className="w-4 h-4 transition-transform duration-500 ease-out group-hover:-rotate-12" />
              }
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out border border-border/50 bg-foreground/5 hover:bg-foreground/10 text-foreground h-9 w-9 rounded-md ml-1 relative z-50 cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-border/50 z-40 flex flex-col overflow-y-auto transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex-1 px-8 pt-28 pb-12 flex flex-col">

          <nav className="flex flex-col gap-6 mb-12">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
              {t.nav.navigation}
            </span>
            {mobileNavLinks.map((link, i) =>
              link.sectionId === "contact" ? (
                <button
                  key={link.sectionId}
                  onClick={() => { setMenuOpen(false); setContactOpen(true); }}
                  className={`text-3xl font-semibold w-fit transition-all duration-300 text-left cursor-pointer ${
                    menuOpen ? `opacity-100 translate-x-0 nav-delay-${i}` : "opacity-0 translate-x-8 nav-delay-none"
                  }`}
                >
                  <span className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                    {link.label}
                  </span>
                </button>
              ) : (
                <a
                  key={link.sectionId}
                  href={link.href}
                  onClick={() => saveSectionAndClose(link.sectionId)}
                  className={`text-3xl font-semibold w-fit transition-all duration-300 ${
                    menuOpen ? `opacity-100 translate-x-0 nav-delay-${i}` : "opacity-0 translate-x-8 nav-delay-none"
                  }`}
                >
                  <span className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                    {link.label}
                  </span>
                </a>
              )
            )}
          </nav>

          <div className="mt-auto">
            <div className="h-px w-full bg-border/50 mb-8" />

            <div className="flex flex-col gap-4 mb-8">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {t.nav.contactSection}
              </span>
              <a
                href="mailto:jackshaw@live.com.ar"
                className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>jackshaw@live.com.ar</span>
              </a>
              <div className="flex items-center gap-3 text-foreground/70">
                <MapPin className="w-5 h-5" />
                <span>Córdoba, Argentina</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/educcabral"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/eduardo-cabral-211199201/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}