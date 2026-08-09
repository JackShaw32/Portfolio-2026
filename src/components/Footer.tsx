import { Terminal, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import ContactModal from "./ContactModal";

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

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
    href: subPage && l.href === '#top' ? '/' : l.href.startsWith("#") ? `${base}${l.href}` : l.href,
    isContact: l.href === '#contact',
  }));

  const socials = [
    { name: "GitHub", icon: Github, href: "https://github.com/jackshaw32" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/raul-eduardo-cabral/" },
    { name: "X", icon: XLogo, href: "https://x.com/EduCabral19" },
    { name: "Email", icon: Mail, action: 'contact' as const },
  ];

  return (
    <>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <footer className="relative border-t border-border/10 bg-background/95 backdrop-blur-xl pt-10 md:pt-14 pb-8 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] pointer-events-none flex justify-center opacity-20">
        <div className="absolute -top-[150px] w-[600px] h-[300px] rounded-[100%] bg-gradient-to-b from-primary/20 to-transparent blur-3xl" />
      </div>

      <div className="px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-10 md:gap-y-8 mb-8 md:mb-10 xl:grid-cols-4 xl:gap-x-10">
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Terminal className="w-6 h-6 text-primary" />
              <span className="font-mono text-xl font-bold whitespace-nowrap">
                Eduardo<span className="text-primary"> Cabral</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              {ft.tagline}
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socials.map((social) =>
                social.action === 'contact' ? (
                  <button
                    key={social.name}
                    onClick={() => setContactOpen(true)}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </button>
                ) : (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                )
              )}
            </div>
          </div>

          <nav aria-label={ft.navigation} className="w-full lg:w-fit lg:mx-auto xl:col-start-2 xl:col-span-2">
            <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm mb-3">{ft.navigation}</h3>
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-2 list-none m-0 p-0">
              {links.map((link) => (
                <li key={link.name}>
                  {link.isContact ? (
                    <button
                      onClick={() => setContactOpen(true)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group w-fit cursor-pointer"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </button>
                  ) : link.href.startsWith("mailto:") || link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group w-fit cursor-pointer"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  ) : subPage && link.href !== '/' ? (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group w-fit cursor-pointer"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        const rawSectionId = link.href.split("#").pop() || "";
                        const sectionId = rawSectionId === "/" ? "top" : rawSectionId;
                        if (subPage) {
                          sessionStorage.setItem("skip-scroll-restore", "1");
                          sessionStorage.setItem("scroll-to-section", sectionId);
                          const a = document.createElement("a");
                          a.href = sectionId === "top" ? "/" : "/#" + sectionId;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                        } else {
                          const lenis = (window as any).lenis;
                          if (lenis) {
                            lenis.scrollTo(`#${sectionId}`, sectionId === "top" ? { immediate: true } : { duration: 1.2 });
                          } else {
                            const el = document.getElementById(sectionId);
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }
                        }
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group w-fit cursor-pointer"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </button>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => {
                    const lenis = (window as any).lenis;
                    if (lenis) { lenis.scrollTo(0, { immediate: true }); } else { window.scrollTo({ top: 0, behavior: 'auto' }); }
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
          </nav>

          <div className="md:col-span-2 lg:col-span-1 xl:col-start-4">
            <h3 className="font-semibold text-foreground mb-3 uppercase tracking-wider text-sm">{ft.technologies}</h3>
            <ul className="flex flex-wrap gap-x-3 gap-y-2 max-w-sm list-none m-0 p-0">
              {["Astro v5", "React 19", "TypeScript", "Tailwind CSS v4", "Redis", "Lenis", "GSAP", "View Transitions", "Vercel AI + Groq"].map((tech) => (
                <li key={tech} className="text-xs font-mono text-muted-foreground">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            © {year || "2026"} Designed & Developed by Eduardo Cabral.
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            v3.0.0
          </div>
        </div>
      </div>
      </footer>
    </>
  );
}
