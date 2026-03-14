import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "../lib/translations";
import { projectsStaticData } from "../config/projects";
import { renderBold } from "../lib/renderBold";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = translations[lang];
  const pr = t.projects;

  const projects = pr.projects.map((proj, i) => ({
    ...projectsStaticData[i],
    ...proj,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // When returning from a project detail page, skip animations (show final state instantly)
      if (sessionStorage.getItem('skip-reveal')) {
        gsap.set(".projects-heading", { opacity: 1, y: 0 });
        gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
          const imgWrap = row.querySelector<HTMLElement>(".project-img-wrap");
          const content = row.querySelector<HTMLElement>(".project-content");
          if (imgWrap) gsap.set(imgWrap, { opacity: 1, x: 0 });
          if (content) gsap.set(content, { opacity: 1, x: 0 });
        });
        return;
      }

      gsap.fromTo(
        ".projects-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".projects-heading", start: "top 88%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row, i) => {
        const isEven = i % 2 !== 0;
        const imgWrap = row.querySelector<HTMLElement>(".project-img-wrap");
        const content = row.querySelector<HTMLElement>(".project-content");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 82%" },
        });

        tl.fromTo(imgWrap,
          { opacity: 0, x: isEven ? 70 : -70 },
          { opacity: 1, x: 0, duration: 1.1, ease: "power3.out" }
        ).fromTo(content,
          { opacity: 0, x: isEven ? -70 : 70 },
          { opacity: 1, x: 0, duration: 1.1, ease: "power3.out" },
          "-=0.85"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-16 md:py-32 relative">
      <div className="container mx-auto px-6 relative z-10">

        <div className="projects-heading opacity-0 text-center mb-16 md:mb-28 flex flex-col items-center">
          <h2 className="text-[clamp(1.2rem,6vw,2rem)] sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-4 md:mb-6 whitespace-nowrap">
            {pr.title}<span className="text-primary">{pr.titleHighlight}</span>
          </h2>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-foreground to-pink-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            {pr.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-20 md:gap-32 xl:gap-40">
          {projects.map((project, index) => {
            const isEven = index % 2 !== 0;
            return (
              <div key={project.slug} data-project-slug={project.slug} className="project-row flex flex-col xl:flex-row gap-10 lg:gap-16 items-center group">

                {/* Image mockup */}
                <div className={`project-img-wrap opacity-0 w-full xl:w-3/5 ${isEven ? "xl:order-2" : "xl:order-1"}`}>
                  <a
                    href={`/projects/${project.slug}`}
                    ref={(el) => { if (el) el.style.setProperty('view-transition-name', `project-card-${project.slug}`); }}
                    className="group/img block relative rounded-3xl overflow-hidden border border-foreground/10 group-hover/img:border-primary/30 transition-all duration-500 shadow-2xl shadow-black/20"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 group-hover/img:opacity-80 transition-opacity duration-700 z-10`} />

                    <div className="absolute top-0 left-0 right-0 h-9 bg-background/90 backdrop-blur-md border-b border-foreground/10 flex items-center px-4 gap-2 z-20">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      <div className="mx-auto text-[10px] font-mono text-muted-foreground px-3 py-1 rounded-md bg-foreground/5">
                        {new URL(project.link).hostname}
                      </div>
                    </div>

                    <div className="w-full aspect-[4/3] sm:aspect-[16/10] pt-9 bg-foreground/5 relative overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={`Preview de ${project.title}`}
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain sm:object-cover sm:object-top transform group-hover/img:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-background/25 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-all duration-300 z-30">
                      <span className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full flex items-center gap-2 text-sm transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-300 shadow-xl shadow-primary/20">
                        {pr.viewDetails} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </a>
                </div>

                {/* Content */}
                <div className={`project-content opacity-0 w-full xl:w-2/5 flex flex-col justify-center ${isEven ? "xl:order-1 xl:pl-4" : "xl:order-2 xl:pr-4"}`}>
                  <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
                    <span className="font-mono text-5xl font-black text-foreground/8 select-none leading-none">{project.number}</span>
                    <span className={`text-xs uppercase tracking-widest font-black px-4 py-1.5 rounded-full border ${project.accent}`}>
                      {project.highlight}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm font-mono text-muted-foreground mb-5 md:mb-6">{project.role}</p>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-7 font-light">
                    {renderBold(project.description)}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.slice(0, 6).map((tag) => (
                      <span key={tag} className="text-[11px] sm:text-xs font-semibold text-foreground/80 bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-xl">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 6 && (
                      <span className="text-[11px] sm:text-xs font-semibold text-muted-foreground bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-xl">
                        +{project.tags.length - 6}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a
                      href={`/projects/${project.slug}`}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 shadow-xl shadow-foreground/10 group/btn"
                    >
                      {pr.viewDetails}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 glass hover:bg-foreground/5 text-foreground border border-border/50 hover:border-foreground/30 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {pr.visitSite}
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}