import { Sparkles, ExternalLink, Mail, Linkedin, FileDown, Globe, Phone, Github, Briefcase, GraduationCap, CheckCircle2, XCircle, Clock, MapPin, TrendingUp, Play, Star, Send, X } from "lucide-react";
import React, { useState } from "react";
import type { ToolInvocation } from "./types";

interface ToolResultCardProps {
  toolInvocation: ToolInvocation;
  lang: 'es' | 'en';
  onSubmitComment?: (data: { name: string; stars: number; message: string }) => void;
}

function ToolSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="w-full sm:min-w-[260px] max-w-[320px] rounded-2xl border border-border bg-background overflow-hidden mt-1">
      <div className="bg-muted/30 px-4 py-3 border-b border-border/50">
        <div className="h-4 bg-muted rounded w-32 animate-pulse" />
      </div>
      <div className="p-4 space-y-3">
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className={`h-3 bg-muted rounded animate-pulse ${i === lines - 1 ? 'w-3/5' : 'w-full'}`} />
        ))}
        <div className="flex gap-1.5 pt-1">
          <div className="h-5 w-14 bg-muted rounded-md animate-pulse" />
          <div className="h-5 w-16 bg-muted rounded-md animate-pulse" />
          <div className="h-5 w-12 bg-muted rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function ToolResultCard({ toolInvocation, lang, onSubmitComment }: ToolResultCardProps) {
  // showProject
  if (toolInvocation.toolName === 'showProject') {
    if (!toolInvocation.result) {
      return <ToolSkeleton lines={4} />;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const project = toolInvocation.result as any;
    const projectDescs: Record<string, { es: string; en: string }> = {
      '/projects/14milla.webp': {
        es: 'E-commerce B2C completo de indumentaria automotriz. Frontend: React 18 + Vite 6 + Tailwind CSS 3 + Framer Motion. Backend: Express 4 + MongoDB + JWT httpOnly + Google OAuth. Pagos: MercadoPago (Bricks + webhooks + transferencias + gift cards + cupones). Tracking: Meta Pixel + Conversions API (browser + server). Testing: 119 unitarios (Vitest) + 11 E2E (Playwright). Deploy: Netlify + Render.',
        en: 'Full B2C e-commerce for automotive apparel. Frontend: React 18 + Vite 6 + Tailwind CSS 3 + Framer Motion. Backend: Express 4 + MongoDB + JWT httpOnly + Google OAuth. Payments: MercadoPago (Bricks + webhooks + transfers + gift cards + coupons). Tracking: Meta Pixel + Conversions API (browser + server). Testing: 119 unit (Vitest) + 11 E2E (Playwright). Deploy: Netlify + Render.',
      },
      '/projects/omega.webp': {
        es: 'Sitio corporativo B2B desarrollado con HTML5, CSS3 y JavaScript Vanilla para una empresa de logística y transporte. Sin frameworks pesados, enfocado en velocidad de carga, SEO técnico y generación de leads.',
        en: 'B2B corporate website built with HTML5, CSS3 and Vanilla JavaScript for a logistics and transportation company. No heavy frameworks, focused on load speed, technical SEO and lead generation.',
      },
    };
    const safeDesc = projectDescs[project.image]?.[lang] ?? project.description;
    return (
      <div
        key={toolInvocation.toolCallId}
        className="w-full sm:min-w-[280px] max-w-[320px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1"
      >
        {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-36 object-cover object-top"
            />
        ) : null}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50">
          <h4 className="font-bold text-sm text-foreground">{project.title}</h4>
        </div>
        <div className="p-4 space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {safeDesc}
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
      return <ToolSkeleton lines={3} />;
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
      return <ToolSkeleton lines={4} />;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const skills = toolInvocation.result as any;
    const categoryColors: Record<string, string> = {
      'Frontend':              'text-blue-400',
      'Backend':               'text-green-400',
      'Bases de datos':        'text-yellow-400',
      'Databases':             'text-yellow-400',
      'Cloud & DevOps':        'text-orange-400',
      'Pagos & otros':         'text-pink-400',
      'Payments & Other':      'text-pink-400',
    };
    return (
      <div key={toolInvocation.toolCallId} className="w-full sm:min-w-[280px] max-w-[340px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1">
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50">
          <h4 className="font-bold text-sm text-foreground">🛠️ {lang === 'en' ? 'Tech Stack' : 'Stack Tecnológico'}</h4>
        </div>
        <div className="p-4 space-y-3">
          {skills.categories?.map((cat: { name: string; nameEn?: string; skills: string[] }) => {
            const displayName = lang === 'en' && cat.nameEn ? cat.nameEn : cat.name;
            return (
              <div key={cat.name}>
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${categoryColors[cat.name] ?? categoryColors[displayName] ?? 'text-muted-foreground'}`}>{displayName}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill: string) => (
                    <span key={skill} className="text-[10px] font-medium bg-foreground/5 border border-border/50 px-2 py-0.5 rounded-md text-foreground/80">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // showExperience
  if (toolInvocation.toolName === 'showExperience') {
    if (!toolInvocation.result) {
      return <ToolSkeleton lines={5} />;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exp = toolInvocation.result as any;
    return (
      <div key={toolInvocation.toolCallId} className="w-full sm:min-w-[300px] max-w-[380px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1">
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-indigo-400" />
          <h4 className="font-bold text-sm text-foreground">{lang === 'en' ? 'Experience' : 'Experiencia'}</h4>
        </div>
        <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
          {exp.items?.map((item: {
            period: string; periodEn?: string; role: string; roleEn?: string;
            company: string; companyEn?: string; years?: string; yearsEn?: string;
            current?: boolean; description?: string; descriptionEn?: string; tech?: string;
          }, i: number) => (
            <div key={i} className="relative pl-5 border-l-2 border-border/50">
              {item.current && (
                <span className="absolute -left-[9px] top-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-background rounded-full" />
                </span>
              )}
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <p className="text-[11px] font-bold text-foreground leading-tight">
                  {lang === 'en' && item.roleEn ? item.roleEn : item.role}
                  {item.current && (
                    <span className="ml-1.5 text-[9px] font-medium text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded-full">
                      {lang === 'en' ? 'Current' : 'Actual'}
                    </span>
                  )}
                </p>
                <span className="text-[9px] text-muted-foreground whitespace-nowrap flex-shrink-0">
                  {lang === 'en' && item.periodEn ? item.periodEn : item.period}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium">
                {lang === 'en' && item.companyEn ? item.companyEn : item.company}
              </p>
              {item.description && (
                <p className="text-[10px] text-foreground/70 mt-1 leading-relaxed">
                  {lang === 'en' && item.descriptionEn ? item.descriptionEn : item.description}
                </p>
              )}
              {item.tech && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {item.tech.split(',').map((t: string) => (
                    <span key={t.trim()} className="text-[9px] font-medium bg-foreground/5 border border-border/50 px-1.5 py-0.5 rounded-md text-foreground/70">
                      {t.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // showAvailability
  if (toolInvocation.toolName === 'showAvailability') {
    if (!toolInvocation.result) {
      return <ToolSkeleton lines={3} />;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const avail = toolInvocation.result as any;
    const displayAvailFrom = lang === 'en' && avail.availableFromEn ? avail.availableFromEn : avail.availableFrom;
    const displayWorkMode = lang === 'en' && avail.workModeEn ? avail.workModeEn : avail.workMode;
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
              <span>{lang === 'en' ? 'From:' : 'Desde:'} <span className="font-medium text-foreground">{displayAvailFrom}</span></span>
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
              {displayWorkMode?.map((mode: string) => (
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
      return <ToolSkeleton lines={2} />;
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
      return <ToolSkeleton lines={4} />;
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

  // showRecommendation
  if (toolInvocation.toolName === 'showRecommendation') {
    if (!toolInvocation.result) {
      return <ToolSkeleton lines={5} />;
    }
    const rec = toolInvocation.result as any;
    const displayStrengths = lang === 'en' && rec.strengthsEn ? rec.strengthsEn : rec.strengths;
    const displayIdealFor = lang === 'en' && rec.idealForEn ? rec.idealForEn : rec.idealFor;
    const displayDifferentiators = lang === 'en' && rec.differentiatorsEn ? rec.differentiatorsEn : rec.differentiators;
    return (
      <div key={toolInvocation.toolCallId} className="w-full sm:min-w-[300px] max-w-[350px] rounded-2xl border border-emerald-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1">
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-4 py-3 border-b border-border/50 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <h4 className="font-bold text-sm text-foreground">{lang === 'en' ? 'Why Hire Eduardo' : 'Por qué contratar a Eduardo'}</h4>
          <span className="ml-auto text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{rec.recommendationScore}/100</span>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1.5">{lang === 'en' ? 'Key Strengths' : 'Fortalezas'}</p>
            <div className="space-y-1">
              {displayStrengths?.map((s: string, i: number) => (
                <p key={i} className="text-[11px] text-foreground/80">• {s}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1.5">{lang === 'en' ? 'Ideal For' : 'Ideal para'}</p>
            <div className="flex flex-wrap gap-1.5">
              {displayIdealFor?.map((item: string) => (
                <span key={item} className="text-[10px] font-medium bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md text-blue-400">{item}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1.5">{lang === 'en' ? 'What Sets Him Apart' : 'Lo que lo diferencia'}</p>
            <div className="space-y-1">
              {displayDifferentiators?.map((d: string, i: number) => (
                <p key={i} className="text-[11px] text-foreground/80">• {d}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // showProfile
  if (toolInvocation.toolName === 'showProfile') {
    if (!toolInvocation.result) {
      return <ToolSkeleton lines={4} />;
    }
    const profile = toolInvocation.result as any;
    const displayFocus = lang === 'en' && profile.focusEn ? profile.focusEn : profile.focus;
    const displayExperience = lang === 'en' && profile.experienceEn ? profile.experienceEn : profile.experience;
    const displayAvailableFrom = lang === 'en' && profile.availableFromEn ? profile.availableFromEn : profile.availableFrom;
    const displayWorkMode = lang === 'en' && profile.workModeEn ? profile.workModeEn : profile.workMode;
    return (
      <div key={toolInvocation.toolCallId} className="w-full sm:min-w-[280px] max-w-[320px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1">
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50">
          <h4 className="font-bold text-sm text-foreground">{profile.name}</h4>
          <p className="text-[10px] text-muted-foreground font-mono">{profile.role}</p>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{profile.location}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{displayFocus}</p>
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{lang === 'en' ? 'Stack' : 'Stack'}</p>
            {profile.stack?.map((s: string, i: number) => (
              <p key={i} className="text-[10px] text-foreground/80 font-mono">• {s}</p>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className={`w-2 h-2 rounded-full ${profile.available ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span className="text-foreground font-medium">{profile.available
              ? (lang === 'en' ? 'Available' : 'Disponible')
              : (lang === 'en' ? 'Not available' : 'No disponible')}
            </span>
            <span className="text-muted-foreground">— {displayAvailableFrom}</span>
          </div>
          <p className="text-[10px] text-muted-foreground">{displayExperience}</p>
          <div className="flex flex-wrap gap-1.5">
            {displayWorkMode?.map((mode: string) => (
              <span key={mode} className="text-[10px] font-medium bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md text-indigo-400">{mode}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // showArchitecture
  if (toolInvocation.toolName === 'showArchitecture') {
    if (!toolInvocation.result) {
      return <ToolSkeleton lines={4} />;
    }
    const arch = toolInvocation.result as any;
    const layerColors: Record<string, string> = {
      blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
      cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
      purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
      emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
      red: 'bg-red-500/10 border-red-500/20 text-red-400',
      amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
      green: 'bg-green-500/10 border-green-500/20 text-green-400',
      slate: 'bg-slate-500/10 border-slate-500/20 text-slate-400',
    };
    return (
      <div key={toolInvocation.toolCallId} className="w-full sm:min-w-[300px] max-w-[380px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1">
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          <h4 className="font-bold text-sm text-foreground">{lang === 'en' ? 'Architecture' : 'Arquitectura'}</h4>
        </div>
        <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
          {[arch.portfolio, ...(arch.projects ?? [])].map((section: any, si: number) => (
            <div key={si}>
              <p className="text-[11px] font-bold text-foreground mb-2">{section.title}</p>
              <div className="space-y-1">
                {section.layers?.map((layer: any, li: number) => {
                  const displayLayerName = lang === 'en' && layer.nameEn ? layer.nameEn : layer.name;
                  const displayTech = lang === 'en' && layer.techEn ? layer.techEn : layer.tech;
                  return (
                    <div key={li} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-medium border ${layerColors[layer.color] ?? 'bg-foreground/5 text-foreground/80 border-border/50'}`}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-current opacity-70" />
                      <span className="font-semibold flex-shrink-0">{displayLayerName}:</span>
                      <span className="opacity-80">{displayTech}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className="font-medium text-foreground/70">{lang === 'en' ? 'Flow' : 'Flujo'}:</span>
                {section.flow?.map((f: string, fi: number) => (
                  <span key={fi} className="flex items-center gap-0.5">
                    {fi > 0 && <span className="text-[8px] opacity-50">→</span>}
                    <span className="bg-foreground/5 px-1.5 py-0.5 rounded font-mono">{f}</span>
                  </span>
                ))}
              </div>
              {section.integrations?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {section.integrations?.map((i: string) => (
                    <span key={i} className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded-full">{i}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // showCommentForm
  if (toolInvocation.toolName === 'showCommentForm') {
    return <CommentForm lang={lang} onSubmit={onSubmitComment} />;
  }

  // submitComment
  if (toolInvocation.toolName === 'submitComment') {
    if (!toolInvocation.result) {
      return <ToolSkeleton lines={2} />;
    }
    const res = toolInvocation.result as any;
    return (
      <div key={toolInvocation.toolCallId} className={`w-full max-w-[300px] rounded-2xl border overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1 ${res.success ? 'border-green-500/20' : 'border-red-500/20'} bg-background`}>
        <div className={`px-4 py-3 border-b border-border/50 flex items-center gap-2 ${res.success ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10' : 'bg-gradient-to-r from-red-500/10 to-orange-500/10'}`}>
          {res.success ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
          <h4 className="font-bold text-sm text-foreground">
            {res.success
              ? (lang === 'en' ? 'Review submitted!' : '¡Reseña enviada!')
              : (lang === 'en' ? 'Could not submit' : 'No se pudo enviar')}
          </h4>
        </div>
        <div className="p-4">
          <p className="text-xs text-muted-foreground">
            {res.success
              ? (lang === 'en' ? `Thanks, ${res.name}! Your review has been saved.` : `¡Gracias, ${res.name}! Tu reseña fue guardada.`)
              : (lang === 'en' ? 'There was an error. Please try again.' : 'Hubo un error. Intentá de nuevo.')}
          </p>
        </div>
      </div>
    );
  }

  // showGame
  if (toolInvocation.toolName === 'showGame') {
    return <SimonGame lang={lang} />;
  }

  return null;
}

function CommentForm({ lang, onSubmit }: { lang: string; onSubmit?: (data: { name: string; stars: number; message: string }) => void }) {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !message.trim() || stars === 0) return;
    onSubmit?.({ name: name.trim(), stars, message: message.trim() });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full sm:min-w-[280px] max-w-[320px] rounded-2xl border border-green-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1">
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-4 py-3 border-b border-border/50 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <h4 className="font-bold text-sm text-foreground">{lang === 'en' ? 'Review submitted!' : '¡Reseña enviada!'}</h4>
        </div>
        <div className="p-4">
          <p className="text-xs text-muted-foreground">
            {lang === 'en' ? `Thanks, ${name}!` : `¡Gracias, ${name}!`}
          </p>
        </div>
      </div>
    );
  }

  const canSubmit = name.trim() && message.trim() && stars > 0;

  return (
    <div className="w-full sm:min-w-[280px] max-w-[320px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1">
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50 flex items-center gap-2">
        <Star className="w-4 h-4 text-indigo-400" />
        <h4 className="font-bold text-sm text-foreground">{lang === 'en' ? 'Leave a Review' : 'Dejar una Reseña'}</h4>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            {lang === 'en' ? 'Stars' : 'Estrellas'}
          </label>
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <button
                key={i}
                type="button"
                title={`${i + 1} ${lang === 'en' ? 'star' : 'estrella'}${i > 0 ? 's' : ''}`}
                aria-label={`${i + 1} ${lang === 'en' ? 'star' : 'estrella'}${i > 0 ? 's' : ''}`}
                onMouseEnter={() => setHoverStars(i + 1)}
                onMouseLeave={() => setHoverStars(0)}
                onClick={() => setStars(i + 1)}
                className="p-0.5 transition-transform hover:scale-110"
              >
                <Star
                  size={20}
                  className={`transition-colors ${
                    i < (hoverStars || stars)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground/30'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            {lang === 'en' ? 'Name' : 'Nombre'}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={lang === 'en' ? 'Your name' : 'Tu nombre'}
            maxLength={100}
            className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-foreground/40 transition-all"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
            {lang === 'en' ? 'Comment' : 'Comentario'}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={lang === 'en' ? 'Write your review...' : 'Escribí tu reseña...'}
            maxLength={1000}
            rows={3}
            className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-foreground/40 transition-all resize-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl transition-all ${
              canSubmit
                ? 'bg-foreground text-background hover:bg-foreground/90 cursor-pointer'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            <Send className="w-3 h-3" />
            {lang === 'en' ? 'Submit' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  );
}

function SimonGame({ lang }: { lang: string }) {
  const { useState, useEffect, useCallback, useRef } = React;
  const COLORS = ['#ef4444', '#22c55e', '#3b82f6', '#eab308'];
  const NAMES = lang === 'en' ? ['Red', 'Green', 'Blue', 'Yellow'] : ['Rojo', 'Verde', 'Azul', 'Amarillo'];
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [showSeq, setShowSeq] = useState(false);
  const playerIdx = useRef(0);

  const playSequence = useCallback(async (seq: number[]) => {
    setShowSeq(true);
    setPlayerTurn(false);
    for (let i = 0; i < seq.length; i++) {
      await new Promise(r => setTimeout(r, 400));
      setActiveIdx(seq[i]);
      await new Promise(r => setTimeout(r, 300));
      setActiveIdx(-1);
    }
    await new Promise(r => setTimeout(r, 200));
    setShowSeq(false);
    setPlayerTurn(true);
    playerIdx.current = 0;
  }, []);

  const startGame = () => {
    const first = Math.floor(Math.random() * 4);
    const newSeq = [first];
    setSequence(newSeq);
    setScore(0);
    setStatus('playing');
    playSequence(newSeq);
  };

  const handleClick = (idx: number) => {
    if (!playerTurn || showSeq) return;
    setActiveIdx(idx);
    setTimeout(() => setActiveIdx(-1), 200);
    if (idx !== sequence[playerIdx.current]) {
      setStatus('gameover');
      setPlayerTurn(false);
      return;
    }
    playerIdx.current++;
    if (playerIdx.current === sequence.length) {
      setScore(sequence.length);
      const nextSeq = [...sequence, Math.floor(Math.random() * 4)];
      setSequence(nextSeq);
      playSequence(nextSeq);
    }
  };

  return (
    <div className="w-full max-w-[260px] rounded-2xl border border-indigo-500/20 bg-background overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 mt-1">
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-border/50 flex items-center gap-2">
        <Play className="w-4 h-4 text-indigo-400" />
        <h4 className="font-bold text-sm text-foreground">{lang === 'en' ? 'Simon Says' : 'Simón Dice'}</h4>
        {score > 0 && (
          <span className="ml-auto text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
            {score} {lang === 'en' ? 'pts' : 'pts'}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col items-center gap-3">
        <div className="grid grid-cols-2 gap-2 w-fit">
          {COLORS.map((color, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={!playerTurn}
              className="w-16 h-16 rounded-2xl border-2 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed"
              style={{
                backgroundColor: activeIdx === i ? color : `${color}55`,
                borderColor: activeIdx === i ? color : `${color}33`,
                transform: activeIdx === i ? 'scale(0.92)' : 'scale(1)',
                opacity: !playerTurn && activeIdx !== i ? 0.6 : 1,
              }}
              aria-label={NAMES[i]}
            />
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground text-center leading-relaxed min-h-[32px]">
          {status === 'idle' && (lang === 'en' ? 'Repeat the sequence!' : '¡Repetí la secuencia!')}
          {status === 'playing' && (showSeq ? (lang === 'en' ? 'Watch... 👀' : 'Mirá... 👀') : (lang === 'en' ? 'Your turn!' : 'Tu turno!'))}
          {status === 'gameover' && (lang === 'en' ? 'Game over! Score: ' : 'Perdiste! Puntaje: ') + score}
        </p>
        {status !== 'playing' && (
          <button
            onClick={startGame}
            className="flex items-center gap-1.5 bg-foreground text-background text-xs font-bold px-4 py-2 rounded-xl hover:opacity-85 transition-opacity"
          >
            <Star className="w-3 h-3" />
            {status === 'gameover' ? (lang === 'en' ? 'Retry' : 'Reintentar') : (lang === 'en' ? 'Start Game' : 'Empezar')}
          </button>
        )}
      </div>
    </div>
  );
}
