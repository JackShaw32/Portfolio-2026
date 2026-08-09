import { useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { Mail, ChevronRight, FileText, Download, Briefcase, ChevronDown, GraduationCap, Languages } from "lucide-react";
import ContactModal from "./ContactModal";

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

  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
    <section ref={ref} id="skills" className="pt-2 pb-16 md:pt-4 md:pb-20 relative overflow-x-clip">
      <div className="w-full mx-auto px-0 xl:px-10 xl:max-w-[1420px] 2xl:max-w-[1720px]">

        <div className="grid grid-cols-1 gap-8">

        <h2 className="sr-only">{sk.title}</h2>

        <div className="relative">
        <span
          aria-hidden
          className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-foreground/10 z-10"
        />
        <span
          aria-hidden
          className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-foreground/10 z-10"
        />
        <div className="border border-foreground/[0.1] overflow-hidden reveal lg:rounded-none rounded-sm lg:border-b-0 lg:border-t-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-foreground/10">
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="flex items-center gap-4 px-6 py-4 md:py-3.5 lg:py-5 bg-background transition-colors duration-150 group text-left cursor-pointer bottom-glow"
          >
            <div className="w-10 h-10 md:w-9 md:h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors flex-shrink-0">
              <Mail className="w-4 h-4 md:w-3.5 md:h-3.5 text-primary" />
            </div>
            <span className="font-medium text-sm text-foreground flex-1">{sk.contactMe}</span>
            <ChevronRight className="w-4 h-4 text-foreground/40 group-hover:text-foreground/80 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
          </button>

          <a
            href="https://api.whatsapp.com/send/?phone=5493518588034&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-6 py-4 md:py-3.5 lg:py-5 bg-background transition-colors duration-150 group cursor-pointer bottom-glow"
          >
            <div className="w-10 h-10 md:w-9 md:h-9 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/15 transition-colors flex-shrink-0">
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <span className="font-medium text-sm text-foreground flex-1">{sk.whatsappContact}</span>
            <ChevronRight className="w-4 h-4 text-foreground/40 group-hover:text-green-500/80 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
          </a>

          <div className="flex items-center gap-4 px-6 py-4 md:py-3.5 lg:py-5 bg-background transition-colors duration-300 bottom-glow">
            <div className="w-10 h-10 md:w-9 md:h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 md:w-3.5 md:h-3.5 text-primary" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-bold text-sm md:text-[13px] text-foreground leading-tight truncate">Download CV – Full Stack Developer</span>
              <span className="md:hidden lg:block text-[10px] text-muted-foreground font-mono whitespace-nowrap">PDF · Updated 2026</span>
            </div>
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <span className="text-[9px] font-bold text-red-500 leading-none">ES</span>
              <a
                href="/Eduardo-Cabral-Full-Stack-Developer-ES.pdf"
                download
                className="w-8 h-8 md:w-7 md:h-7 rounded-xl flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 hover:border-foreground/20 transition-all duration-300"
                title={sk.downloadCVSpanish}
                aria-label={sk.downloadCVSpanish}
              >
                <Download className="w-3.5 h-3.5 text-foreground/70" />
              </a>
            </div>
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <span className="text-[9px] font-bold text-blue-500 leading-none">EN</span>
              <a
                href="/Eduardo-Cabral-Full-Stack-Developer-EN.pdf"
                download
                className="w-8 h-8 md:w-7 md:h-7 rounded-xl flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 hover:border-foreground/20 transition-all duration-300"
                title={sk.downloadCVEnglish}
                aria-label={sk.downloadCVEnglish}
              >
                <Download className="w-3.5 h-3.5 text-foreground/70" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-foreground/[0.1]">
            <div className="grid lg:grid-cols-2 gap-px bg-foreground/10">
            <div className="bg-background p-8 h-full">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="font-mono text-sm font-bold uppercase tracking-wider">{sk.workExperience}</h2>
              </div>
              <div className="space-y-8 border-l border-foreground/10 pl-8 relative">
                {experience.map((item, i) => (
                  <div key={i} className="relative pb-2">
                    <div className="absolute -left-[39px] top-1.5 w-3 h-3 rounded-full bg-background border-2 border-primary" />
                    <h3 className="text-foreground font-semibold">{item.role}</h3>
                    <div className="text-primary text-sm font-medium mb-1">{item.company}</div>
                    <div className="text-muted-foreground text-xs font-mono mb-1.5">{item.period}</div>

                    <div className="lg:hidden">
                      <div className={`overflow-hidden transition-all duration-300 ${
                        expandedIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-[13px] text-muted-foreground/90 leading-relaxed mb-3">
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
                      <p className="text-[13px] text-muted-foreground/90 leading-relaxed mb-4">
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

            <div className="bg-background p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <h2 className="font-mono text-sm font-bold uppercase tracking-wider">{sk.education}</h2>
                </div>

                <div className="flex flex-col divide-y divide-foreground/[0.08]">
                  {education.map((item, i) => (
                    <div key={i} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-foreground font-semibold text-sm leading-tight mb-1">{item.degree}</h3>
                        <div className="text-muted-foreground text-xs">{item.institution}</div>
                      </div>
                      <div className="text-primary text-[10px] font-mono whitespace-nowrap">
                        {item.period}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-foreground/[0.08] -mx-8 px-8 pt-8">
                  <div className="grid grid-cols-2 gap-px bg-foreground/[0.06] border border-foreground/[0.06] rounded-sm overflow-hidden">
                    <div className="bg-background p-6 flex flex-col justify-center items-center text-center">
                      <span className="text-4xl font-black mb-1">3+</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{sk.yearsExp}</span>
                    </div>
                    <div className="bg-background p-6 flex flex-col justify-center items-center text-center">
                      <Languages className="w-6 h-6 text-primary mb-2" />
                      <span className="text-xs text-muted-foreground leading-tight font-medium">{sk.languages}</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    </section>
    <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}