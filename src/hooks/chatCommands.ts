import type { ChatMessage } from "@/components/chat/types";

type Setter<T> = (fn: T | ((prev: T) => T)) => void;

const COMMANDS: Record<string, { trigger: string }> = {
  '/skills':    { trigger: 'show me your skills' },
  '/stack':     { trigger: 'show me your skills' },
  '/projects':  { trigger: 'show me all projects' },
  '/contact':   { trigger: 'show me contact info' },
  '/experience':{ trigger: 'show me your experience' },
  '/cv':        { trigger: 'show me your experience' },
  '/availability': { trigger: 'is he available' },
  '/impact':    { trigger: 'show me impact metrics' },
  '/arch':      { trigger: 'show me the architecture' },
  '/profile':   { trigger: 'tell me about yourself' },
  '/hire':      { trigger: 'why hire eduardo' },
  '/comment':   { trigger: 'I want to leave a comment' },
  '/review':    { trigger: 'I want to leave a review' },
};

const NAV_SECTIONS: Record<string, string> = {
  'top': 'top', 'inicio': 'top', 'home': 'top', 'hero': 'top',
  'skills': 'skills', 'stack': 'skills', 'tecnologías': 'skills',
  'projects': 'projects', 'proyectos': 'projects',
  'optimizations': 'optimizations', 'optimizaciones': 'optimizations', 'performance': 'optimizations',
  'about': 'about', 'sobre': 'about', 'sobre mí': 'about',
  'contact': 'contact', 'contacto': 'contact',
};

function getHelpText(lang: string): string {
  const lines = lang === 'en'
    ? [
        'Available commands:',
        '',
        '  /skills                — Show tech stack',
        '  /projects              — Show projects',
        '  /contact               — Show contact info',
        '  /experience            — Show experience & CV',
        '  /availability          — Check availability',
        '  /impact                — Show metrics & scores',
        '  /arch                  — Show architecture diagram',
        '  /profile               — About Eduardo',
        '  /hire                  — Why hire Eduardo',
        '  /comment               — Leave a comment/review',
        '  /clear                 — Clear chat',
        '  /help                  — Show this message',
        '  /go [section]          — Scroll to section (top, skills, projects, about, contact)',
        '  /goto [project]        — Open project page (milla, omega)',
        '  /dark /light           — Switch theme',
        '  /lang                  — Switch language',
        '  /menu                  — Toggle navigation menu',
        '  /contactform           — Open contact form',
        '  /game                  — Play Simon Says!',
        '',
        'You can also just ask naturally in Spanish or English!',
      ]
    : [
        'Comandos disponibles:',
        '',
        '  /skills                — Ver tecnologías',
        '  /projects              — Ver proyectos',
        '  /contact               — Ver contacto',
        '  /experience            — Ver experiencia y CV',
        '  /availability          — Ver disponibilidad',
        '  /impact                — Ver métricas y scores',
        '  /arch                  — Ver diagrama de arquitectura',
        '  /profile               — Sobre Eduardo',
        '  /hire                  — Por qué contratarlo',
        '  /comment               — Dejar un comentario/reseña',
        '  /clear                 — Limpiar chat',
        '  /help                  — Mostrar esto',
        '  /go [sección]          — Ir a sección (top, skills, projects, about, contact)',
        '  /goto [proyecto]       — Abrir proyecto (milla, omega)',
        '  /dark /light           — Cambiar tema',
        '  /lang                  — Cambiar idioma',
        '  /menu                  — Menú de navegación',
        '  /contactform           — Abrir formulario de contacto',
        '  /game                  — Jugar Simón Dice!',
        '',
        'También podés preguntar en lenguaje natural en español o inglés.',
      ];
  return lines.join('\n');
}

const SLUGS = ['uncuartodemilla', 'expresoomega', '14milla', 'omega'];

function makeMsg(role: 'user' | 'assistant', content: string, id: string, toolInvocations?: ChatMessage['toolInvocations']): ChatMessage {
  return { id, role, content, toolInvocations };
}

export function processChatCommand(
  cmdBase: string,
  fullCmd: string,
  rawText: string,
  lang: string,
  genId: () => string,
  setMessages: Setter<ChatMessage[]>,
  setIsLoading: Setter<boolean>,
  defaultWelcomeMsg: string,
  didLoadStorage?: { current: boolean },
): boolean {
  const userMsg = () => makeMsg('user', rawText, genId());

  if (cmdBase === '/clear') {
    try { localStorage.removeItem('edubot-history'); } catch { /* ignore */ }
    setMessages([{ id: '1', role: 'assistant', content: defaultWelcomeMsg }]);
    if (didLoadStorage) didLoadStorage.current = false;
    setIsLoading(false);
    return true;
  }

  if (cmdBase === '/lang' || cmdBase === '/language' || cmdBase === '/idioma') {
    const parts = fullCmd.split(/\s+/);
    const targetLang = parts[1];
    const currentLang = localStorage.getItem('lang') || 'es';
    const newLang = targetLang === 'en' || targetLang === 'es' ? targetLang : (currentLang === 'es' ? 'en' : 'es');
    localStorage.setItem('lang', newLang);
    window.dispatchEvent(new CustomEvent('langchange', { detail: newLang }));
    setMessages(prev => [
      ...prev,
      userMsg(),
      makeMsg('assistant', newLang === 'en' ? 'Switched to English 🇬🇧' : 'Cambiado a Español 🇦🇷', genId()),
    ]);
    setIsLoading(false);
    return true;
  }

  if (cmdBase === '/menu' || cmdBase === '/hamburger') {
    const btn = document.querySelector<HTMLButtonElement>('button[aria-label="Toggle menu"]');
    btn?.click();
    setMessages(prev => [
      ...prev,
      userMsg(),
      makeMsg('assistant', lang === 'en' ? 'Menu toggled' : 'Menú alternado', genId()),
    ]);
    setIsLoading(false);
    return true;
  }

  if (cmdBase === '/contactform' || cmdBase === '/opencontact' || cmdBase === '/contacto') {
    setMessages(prev => [
      ...prev,
      userMsg(),
      makeMsg('assistant', lang === 'en' ? 'Opening contact form...' : 'Abriendo formulario de contacto...', genId()),
    ]);
    setTimeout(() => {
      const btns = document.querySelectorAll('button');
      for (const b of btns) {
        if (b.textContent?.toLowerCase().includes('contactar') || b.textContent?.toLowerCase().includes('contact')) {
          b.click(); break;
        }
      }
    }, 100);
    setIsLoading(false);
    return true;
  }

  if (cmdBase === '/cv') {
    const link = document.createElement('a');
    link.href = lang === 'en' ? '/Eduardo-Cabral-Full-Stack-Developer-EN.pdf' : '/Eduardo-Cabral-Full-Stack-Developer-ES.pdf';
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMessages(prev => [
      ...prev,
      userMsg(),
      makeMsg('assistant', lang === 'en' ? 'Downloading CV... \uD83D\uDCC4' : 'Descargando CV... \uD83D\uDCC4', genId()),
    ]);
    setIsLoading(false);
    return true;
  }

  if (cmdBase === '/game' || cmdBase === '/simon' || cmdBase === '/juego') {
    const gameId = genId();
    setMessages(prev => [
      ...prev,
      userMsg(),
      makeMsg('assistant', '', gameId, [{ toolCallId: gameId, toolName: 'showGame', args: {}, result: {} }]),
    ]);
    setIsLoading(false);
    return true;
  }

  const themeMsgs: Record<string, string> = {
    '/dark':  lang === 'en' ? 'Switched to dark mode 🌙' : 'Cambiado a modo oscuro 🌙',
    '/light': lang === 'en' ? 'Switched to light mode ☀️' : 'Cambiado a modo claro ☀️',
  };

  if (cmdBase === '/theme' || cmdBase === '/dark' || cmdBase === '/light') {
    const isDark = cmdBase === '/dark' || (cmdBase === '/theme' && !document.documentElement.classList.contains('dark'));
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setMessages(prev => [
      ...prev,
      userMsg(),
      makeMsg('assistant', themeMsgs[cmdBase] || (lang === 'en' ? `Switched to ${isDark ? 'dark' : 'light'} mode` : `Cambiado a modo ${isDark ? 'oscuro' : 'claro'}`), genId()),
    ]);
    setIsLoading(false);
    return true;
  }

  const goMatch = fullCmd.match(/^\/go\s+(.+)/);
  if (goMatch) {
    const section = NAV_SECTIONS[goMatch[1].trim().toLowerCase()];
    if (section) {
      const el = document.getElementById(section);
      if (el) {
        const lenis = (window as any).lenis;
        if (lenis) lenis.scrollTo(el, { duration: 1.2 });
        else el.scrollIntoView({ behavior: 'smooth' });
      }
      setMessages(prev => [
        ...prev,
        userMsg(),
        makeMsg('assistant', lang === 'en' ? `Navigated to ${section} section` : `Navegando a la sección ${section}`, genId()),
      ]);
      setIsLoading(false);
      return true;
    }
  }

  const gotoMatch = fullCmd.match(/^\/goto\s+(.+)/);
  if (gotoMatch) {
    const slug = gotoMatch[1].trim().toLowerCase();
    const matched = SLUGS.find(s => slug.includes(s.replace('uncuartodemilla', 'milla').replace('expresoomega', 'omega')) || s.includes(slug));
    if (matched) {
      window.location.href = `/projects/${matched}`;
      setIsLoading(false);
      return true;
    }
  }

  if (fullCmd === '/help') {
    const helpText = getHelpText(lang);
    setMessages(prev => [
      ...prev,
      userMsg(),
      makeMsg('assistant', helpText, genId()),
    ]);
    setIsLoading(false);
    return true;
  }

  return false;
}

export function getMappedText(cmdBase: string, rawText: string): string {
  return COMMANDS[cmdBase]?.trigger ?? rawText;
}

export async function submitComment(
  data: { name: string; stars: number; message: string },
  lang: string,
  genId: () => string,
  setMessages: Setter<ChatMessage[]>,
): Promise<void> {
  try {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, honeypot: '' }),
    });
    const result = await res.json();
    if (result.success) {
      window.dispatchEvent(new CustomEvent('comment-submitted'));
    }
    const msg = result.success
      ? (lang === 'en' ? `Thanks, ${data.name}! Your review has been saved.` : `¡Gracias, ${data.name}! Tu reseña fue guardada.`)
      : result.error === 'rate_limited'
        ? (lang === 'en' ? 'Too many comments. Please wait an hour.' : 'Demasiados comentarios. Esperá una hora.')
        : result.error === 'duplicate'
          ? (lang === 'en' ? 'This comment already exists.' : 'Este comentario ya existe.')
          : (lang === 'en' ? 'There was an error saving your review.' : 'Hubo un error al guardar tu reseña.');
    setMessages(prev => [...prev, { id: genId(), role: 'assistant', content: msg }]);
  } catch {
    setMessages(prev => [...prev, { id: genId(), role: 'assistant', content: lang === 'en' ? 'Error saving review.' : 'Error al guardar la reseña.' }]);
  }
}
