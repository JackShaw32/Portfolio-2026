import { Terminal, Github, Linkedin, Mail, Twitter, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "../lib/translations";
import ContactModal from "./ContactModal";

export default function Footer({ subPage = false }: { subPage?: boolean }) {
  const [year, setYear] = useState<number | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];
  const ft = t.footer;

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const base = subPage ? "/" : "";
  const links = ft.links.map((l) => ({
    ...l,
    href: l.href.startsWith("#") ? `${base}${l.href}` : l.href,
  }));

  const socials = [
    { name: "GitHub", icon: Github, href: "https://github.com/jackshaw32" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/raul-eduardo-cabral/" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/EduCabral19" },
    { name: "Email", icon: Mail, href: "mailto:jackshaw@live.com.ar" },
  ];

  return (
    <>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <footer className="relative border-t border-border/10 bg-background/95 backdrop-blur-xl pt-20 pb-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] pointer-events-none flex justify-center opacity-20">
        <div className="absolute -top-[150px] w-[600px] h-[300px] rounded-[100%] bg-gradient-to-b from-primary/20 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-6 h-6 text-primary" />
              <span className="font-mono text-xl font-bold">
                Eduardo<span className="text-primary"> Cabral</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              {ft.tagline}
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-foreground mb-6 uppercase tracking-wider text-sm">{ft.navigation}</h2>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.name}>
                  {link.href === '#contact' ? (
                    <button
                      onClick={() => setContactOpen(true)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group w-fit cursor-pointer"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group w-fit"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => {
                    const lenis = (window as any).lenis;
                    if (lenis) { lenis.scrollTo(0, { duration: 1.2 }); } else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
                  }}
                  aria-label="Volver arriba"
                  className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 w-fit"
                >
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 14 12"
                    fill="currentColor"
                    aria-hidden="true"
                    className="group-hover:scale-110 transition-transform duration-200 cursor-pointer"
                  >
                    <path d="M7 0L14 12H0L7 0Z" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-foreground mb-6 uppercase tracking-wider text-sm">{ft.technologies}</h2>
            <ul className="space-y-4">
              {["Astro v5", "React 19", "TypeScript", "Tailwind CSS v4", "Lenis", "GSAP", "View Transitions API", "Vercel AI SDK + Groq LLM"].map((tech) => (
                <li key={tech} className="text-muted-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            © {year || "2026"} Designed & Developed by Eduardo Cabral.
          </div>
          <div className="font-mono text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
            v2.0.0
          </div>
        </div>
      </div>
      </footer>
    </>
  );
}
