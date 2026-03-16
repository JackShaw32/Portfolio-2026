import {
  Sparkles, ExternalLink,
  Mail, Linkedin, FileDown, Globe, Phone, Github,
  Briefcase, GraduationCap, CheckCircle2, XCircle, Clock, MapPin, TrendingUp,
} from "lucide-react";
import type { ToolInvocation } from "./types";

interface ToolResultCardProps {
  toolInvocation: ToolInvocation;
  lang: string;
}

export default function ToolResultCard({ toolInvocation, lang }: ToolResultCardProps) {
  // showProject
  if (toolInvocation.toolName === 'showProject') {
    if (!toolInvocation.result) {
      return (
        <div key={toolInvocation.toolCallId} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg animate-pulse mt-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{lang === 'en' ? 'Generating project view...' : 'Generando vista del proyecto...'}</span>
        </div>
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const project = toolInvocation.result as any;
    return (
      <div
        key={toolInvocation.toolCallId}
        className="w-full sm:min-w-[280px] max-w-[320px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-36 object-cover object-top"
          />
        ) : null}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50">
          <h4 className="font-bold text-sm text-foreground">{project.title}</h4>
        </div>
        <div className="p-4 space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech?.map((tech: string) => (
              <span
                key={tech}
                className="text-[10px] font-medium bg-foreground/5 border border-border/50 px-2 py-0.5 rounded-md text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 w-full flex items-center justify-center gap-2 bg-foreground text-background text-xs font-bold py-2.5 rounded-xl hover:bg-foreground/90 transition-colors shadow-sm"
          >
            {lang === 'en' ? 'View live site' : 'Ver web en vivo'}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // showContact
  if (toolInvocation.toolName === 'showContact') {
    if (!toolInvocation.result) {
      return (
        <div key={toolInvocation.toolCallId} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg animate-pulse mt-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{lang === 'en' ? 'Loading contact info...' : 'Cargando datos de contacto...'}</span>
        </div>
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contact = toolInvocation.result as any;
    const contactLinks = [
      { href: contact.linkedin, icon: <Linkedin className="w-3.5 h-3.5" />, key: 'LinkedIn', label: 'LinkedIn', download: false },
      { href: `mailto:${contact.email}`, icon: <Mail className="w-3.5 h-3.5" />, key: contact.email, label: contact.email, download: false },
      { href: contact.github, icon: <Github className="w-3.5 h-3.5" />, key: 'GitHub', label: 'GitHub', download: false },
      { href: contact.cvEs, icon: <FileDown className="w-3.5 h-3.5" />, key: 'CV ES', label: <span>CV <span className="text-[10px]">ES</span></span>, download: true },
      { href: contact.cvEn, icon: <FileDown className="w-3.5 h-3.5" />, key: 'CV EN', label: <span>CV <span className="text-[10px]">EN</span></span>, download: true },
      { href: contact.portfolio, icon: <Globe className="w-3.5 h-3.5" />, key: 'Portfolio', label: 'Portfolio', download: false },
    ];
    return (
      <div key={toolInvocation.toolCallId} className="w-full sm:min-w-[260px] max-w-[300px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1">
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50 flex items-center gap-2">
          <Mail className="w-4 h-4 text-indigo-400" />
          <h4 className="font-bold text-sm text-foreground">{lang === 'en' ? 'Contact Eduardo' : 'Contactar a Eduardo'}</h4>
        </div>
        <div className="p-3 space-y-2">
          {contactLinks.map((link) => (
            <a key={link.key} href={link.href} target="_blank" rel="noreferrer" {...(link.download ? { download: true } : {})}
              className="flex items-center gap-2.5 w-full bg-muted/40 hover:bg-foreground hover:text-background border border-border/40 rounded-xl px-3 py-2 text-xs font-medium transition-colors">
              {link.icon}
              {link.label}
              <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
            </a>
          ))}
          <div className="flex items-center gap-2 text-xs text-muted-foreground px-1 pt-1">
            <Phone className="w-3 h-3" />
            <span>{contact.phone}</span>
          </div>
        </div>
      </div>
    );
  }

  // showSkills
  if (toolInvocation.toolName === 'showSkills') {
    if (!toolInvocation.result) {
      return (
        <div key={toolInvocation.toolCallId} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg animate-pulse mt-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{lang === 'en' ? 'Loading tech stack...' : 'Cargando tech stack...'}</span>
        </div>
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const skills = toolInvocation.result as any;
    const categoryColors: Record<string, string> = {
      'Frontend':        'text-blue-400',
      'Backend':         'text-green-400',
      'Bases de datos':  'text-yellow-400',
      'Cloud & DevOps':  'text-orange-400',
      'Pagos & otros':   'text-pink-400',
    };
    return (
      <div key={toolInvocation.toolCallId} className="w-full sm:min-w-[280px] max-w-[340px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1">
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50">
          <h4 className="font-bold text-sm text-foreground">🛠️ {lang === 'en' ? 'Tech Stack' : 'Tech Stack de Eduardo'}</h4>
        </div>
        <div className="p-4 space-y-3">
          {skills.categories?.map((cat: { name: string; skills: string[] }) => (
            <div key={cat.name}>
              <p className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${categoryColors[cat.name] ?? 'text-muted-foreground'}`}>{cat.name}</p>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill: string) => (
                  <span key={skill} className="text-[10px] font-medium bg-foreground/5 border border-border/50 px-2 py-0.5 rounded-md text-foreground/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // showExperience
  if (toolInvocation.toolName === 'showExperience') {
    if (!toolInvocation.result) {
      return (
        <div key={toolInvocation.toolCallId} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg animate-pulse mt-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{lang === 'en' ? 'Loading experience...' : 'Cargando experiencia...'}</span>
        </div>
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exp = toolInvocation.result as any;
    return (
      <div key={toolInvocation.toolCallId} className="w-full sm:min-w-[280px] max-w-[340px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1">
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-indigo-400" />
          <h4 className="font-bold text-sm text-foreground">
            {lang === 'en' ? 'Experience & Education' : 'Experiencia & Educación'}
          </h4>
        </div>
        <div className="p-4">
          <div className="relative ml-3 space-y-0">
            {exp.items?.map((item: {
              period: string; role: string; company: string;
              years: string; current: boolean;
              description?: string; tech?: string;
            }, i: number) => {
              const isEducation = item.company.includes('Bootcamp') ||
                item.company.includes('Academia') ||
                item.company.includes('DevSchool') ||
                item.company.includes('Edici') ||
                item.company.includes('Egg') ||
                item.company.includes('Casa') ||
                item.role.includes('Bootcamp') ||
                item.role.includes('Programaci');
              return (
                <div key={i} className="relative pl-5 pb-5 last:pb-0">
                  {i < (exp.items?.length ?? 0) - 1 && (
                    <span className="absolute left-[4px] top-4 bottom-0 w-px bg-border/60" />
                  )}
                  <span className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 ${
                    item.current
                      ? 'bg-green-500 border-green-400'
                      : 'bg-muted border-border'
                  }`} />
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-semibold text-indigo-400">{item.period}</span>
                      {item.current && (
                        <span className="text-[9px] font-bold bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded-full">
                          {lang === 'en' ? 'Current' : 'Actual'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-foreground mt-0.5">{item.role}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {isEducation
                        ? <GraduationCap className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        : <Briefcase className="w-3 h-3 text-muted-foreground flex-shrink-0" />}
                      <span className="text-[11px] text-muted-foreground">{item.company}</span>
                    </div>
                    {item.years && (
                      <span className="text-[10px] text-muted-foreground/70">{item.years}</span>
                    )}
                    {item.description && (
                      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                    )}
                    {item.tech && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {item.tech.split(',').map((t: string) => (
                          <span key={t} className="text-[9px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded-full">{t.trim()}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // showAvailability
  if (toolInvocation.toolName === 'showAvailability') {
    if (!toolInvocation.result) {
      return (
        <div key={toolInvocation.toolCallId} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg animate-pulse mt-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{lang === 'en' ? 'Checking availability...' : 'Verificando disponibilidad...'}</span>
        </div>
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const avail = toolInvocation.result as any;
    return (
      <div key={toolInvocation.toolCallId} className="w-full sm:min-w-[260px] max-w-[300px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1">
        <div className={`px-4 py-3 border-b border-border/50 flex items-center gap-2 ${avail.available ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10' : 'bg-gradient-to-r from-orange-500/10 to-red-500/10'}`}>
          {avail.available
            ? <CheckCircle2 className="w-4 h-4 text-green-400" />
            : <Clock className="w-4 h-4 text-orange-400" />}
          <h4 className="font-bold text-sm text-foreground">{lang === 'en' ? 'Availability' : 'Disponibilidad'}</h4>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${avail.available ? 'bg-green-500' : 'bg-orange-500'}`} />
            <span className="text-sm font-semibold text-foreground">
              {avail.available
                ? (lang === 'en' ? '✅ Available for new opportunities' : '✅ Disponible para nuevas oportunidades')
                : (lang === 'en' ? '⏳ Not available right now' : '⏳ No disponible por ahora')}
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span>{lang === 'en' ? 'From:' : 'Desde:'} <span className="font-medium text-foreground">{avail.availableFrom}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span>{avail.timezone}</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">{lang === 'en' ? 'Open roles' : 'Roles de interés'}</p>
            <div className="flex flex-wrap gap-1.5">
              {avail.preferredRoles?.map((role: string) => (
                <span key={role} className="text-[10px] font-medium bg-foreground/5 border border-border/50 px-2 py-0.5 rounded-md text-foreground/80">{role}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">{lang === 'en' ? 'Work mode' : 'Modalidad'}</p>
            <div className="flex flex-wrap gap-1.5">
              {avail.workMode?.map((mode: string) => (
                <span key={mode} className="text-[10px] font-medium bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md text-indigo-400">{mode}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // sendContactForm
  if (toolInvocation.toolName === 'sendContactForm') {
    if (!toolInvocation.result) {
      return (
        <div key={toolInvocation.toolCallId} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg animate-pulse mt-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{lang === 'en' ? 'Sending message...' : 'Enviando mensaje...'}</span>
        </div>
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form = toolInvocation.result as any;
    return (
      <div key={toolInvocation.toolCallId} className={`w-full max-w-[300px] rounded-2xl border overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1 ${form.success ? 'border-green-500/20 bg-background' : 'border-red-500/20 bg-background'}`}>
        <div className={`px-4 py-3 border-b border-border/50 flex items-center gap-2 ${form.success ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10' : 'bg-gradient-to-r from-red-500/10 to-orange-500/10'}`}>
          {form.success ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
          <h4 className="font-bold text-sm text-foreground">
            {form.success
              ? (lang === 'en' ? 'Message sent!' : '¡Mensaje enviado!')
              : (lang === 'en' ? 'Could not send' : 'No se pudo enviar')}
          </h4>
        </div>
        <div className="p-4">
          <p className="text-xs text-muted-foreground">
            {form.success
              ? (lang === 'en'
                ? `Your message was sent to Eduardo successfully, ${form.name}. He'll get back to you shortly!`
                : `Tu mensaje fue enviado exitosamente a Eduardo, ${form.name}. ¡Te va a responder pronto!`)
              : (lang === 'en'
                ? 'There was an error sending the message. Try contacting Eduardo directly.'
                : 'Hubo un error al enviar el mensaje. Intentá contactar a Eduardo directamente.')}
          </p>
        </div>
      </div>
    );
  }

  // showImpact
  if (toolInvocation.toolName === 'showImpact') {
    if (!toolInvocation.result) {
      return (
        <div key={toolInvocation.toolCallId} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg animate-pulse mt-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{lang === 'en' ? 'Loading metrics...' : 'Cargando métricas...'}</span>
        </div>
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const impact = toolInvocation.result as any;
    const metricColors = ['text-violet-400', 'text-blue-400', 'text-amber-400', 'text-emerald-400', 'text-sky-400'];
    const lhItems = [
      { label: lang === 'en' ? 'Perf.' : 'Perf.',     value: impact.lighthouse?.performance },
      { label: lang === 'en' ? 'Access.' : 'Access.',  value: impact.lighthouse?.accessibility },
      { label: lang === 'en' ? 'Pract.' : 'Pract.',    value: impact.lighthouse?.bestPractices },
      { label: 'SEO',                                   value: impact.lighthouse?.seo },
    ];
    return (
      <div key={toolInvocation.toolCallId} className="w-full sm:min-w-[280px] max-w-[340px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1">
        <div className="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 px-4 py-3 border-b border-border/50 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-violet-400" />
          <h4 className="font-bold text-sm text-foreground">{lang === 'en' ? 'Real Impact' : 'Impacto Real'}</h4>
        </div>
        <div className="p-4 space-y-3">
          <div className="space-y-1.5">
            {impact.metrics?.map((m: { value: string; labelEs: string; labelEn: string; description: string }, i: number) => (
              <div key={i} className="flex items-center gap-3 bg-foreground/[0.03] rounded-xl px-3 py-2 border border-border/30">
                <span className={`text-lg font-black tabular-nums leading-none w-12 flex-shrink-0 ${metricColors[i] ?? 'text-foreground'}`}>{m.value}</span>
                <div>
                  <p className="text-[11px] font-semibold text-foreground leading-tight">{lang === 'en' ? m.labelEn : m.labelEs}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Lighthouse Portfolio</p>
            <div className="grid grid-cols-4 gap-1.5">
              {lhItems.map(({ label, value }) => (
                <div key={label} className="bg-green-500/10 border border-green-500/20 rounded-lg px-2 py-1.5 text-center">
                  <p className="text-sm font-black text-green-400">{value}</p>
                  <p className="text-[8px] text-muted-foreground font-medium uppercase tracking-wide leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
