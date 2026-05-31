import { useRef, useState, useEffect } from "react";
import type { ChatMessage } from "./types";
import { readStream, serializeHistory } from "@/ai/streamReader";

export function useChatLogic(lang: string, defaultWelcomeMsg: string, pageSlug?: string) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [jumping, setJumping] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const welcomeMsg: ChatMessage = { id: '1', role: 'assistant', content: defaultWelcomeMsg };
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMsg]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const didLoadStorage = useRef(false);

  const currentSectionRef = useRef<string>(pageSlug ?? 'top');
  const idCounterRef = useRef(0);
  const genId = () => `${Date.now()}-${++idCounterRef.current}`;

  useEffect(() => {
    if (didLoadStorage.current) return;
    didLoadStorage.current = true;
    try {
      const saved = localStorage.getItem('edubot-history');
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch { /* ignore */ }
    setMessages([{ id: '1', role: 'assistant', content: defaultWelcomeMsg }]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [{ id: '1', role: "assistant", content: defaultWelcomeMsg }];
      }
      return prev;
    });
  }, [lang, defaultWelcomeMsg]);

  useEffect(() => {
    try {
      if (messages.length > 1) {
        localStorage.setItem('edubot-history', JSON.stringify(messages.slice(-30)));
      }
    } catch { /* storage full or private mode */ }
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sectionIds = ['top', 'skills', 'projects', 'optimizations', 'about', 'contact'];
    const observers: IntersectionObserver[] = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) currentSectionRef.current = id; },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => { observers.forEach(obs => obs.disconnect()); };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 150);
    }
  }, [open, messages, isLoading]);

  const handleRobotClick = () => {
    if (open) { setOpen(false); return; }
    if (!jumping) {
      setJumping(true); setShowLabel(false);
      setTimeout(() => { setJumping(false); setOpen(true); }, 450);
    }
  };

  const clearChat = () => {
    try { localStorage.removeItem('edubot-history'); } catch { /* ignore */ }
    setMessages([{ id: '1', role: 'assistant', content: defaultWelcomeMsg }]);
    didLoadStorage.current = false;
  };

  const mandarMensaje = async (e?: React.FormEvent, textoDirecto?: string) => {
    if (e) e.preventDefault();

    const textoAEnviar = textoDirecto || input;
    if (!textoAEnviar.trim() || isLoading) return;

    setInput("");
    setIsLoading(true);

    // Slash commands
    const cmd = textoAEnviar.trim().toLowerCase();
    const cmdBase = cmd.split(/\s+/)[0];
    const isEn = lang === 'en';
    const commands: Record<string, { trigger: string; label: string }> = {
      '/skills':    { trigger: isEn ? 'show me your skills' : 'mostrame tus skills',         label: 'Skills' },
      '/stack':     { trigger: isEn ? 'show me your skills' : 'mostrame tus skills',         label: 'Stack' },
      '/projects':  { trigger: isEn ? 'show me all projects' : 'mostrame todos los proyectos', label: 'Projects' },
      '/contact':   { trigger: isEn ? 'show me contact info' : 'mostrame el contacto',        label: 'Contact' },
      '/experience':{ trigger: isEn ? 'show me your experience' : 'mostrame tu experiencia',     label: 'Experience' },
      '/cv':        { trigger: isEn ? 'show me your experience' : 'mostrame tu experiencia',     label: 'CV' },
      '/availability': { trigger: isEn ? 'is he available' : 'está disponible',          label: 'Availability' },
      '/impact':    { trigger: isEn ? 'show me impact metrics' : 'mostrame las métricas de impacto', label: 'Impact' },
      '/arch':      { trigger: isEn ? 'show me the architecture' : 'mostrame la arquitectura',       label: 'Architecture' },
      '/profile':   { trigger: isEn ? 'tell me about yourself' : 'contame sobre vos',           label: 'Profile' },
      '/hire':      { trigger: isEn ? 'why hire eduardo' : 'por qué contratar a eduardo', label: 'Hire' },
      '/comment':   { trigger: isEn ? 'I want to leave a comment' : 'quiero dejar un comentario', label: 'Comment' },
      '/review':    { trigger: isEn ? 'I want to leave a review' : 'quiero dejar una reseña', label: 'Review' },
    };

    if (cmdBase === '/clear') {
      try { localStorage.removeItem('edubot-history'); } catch { /* ignore */ }
      setMessages([{ id: '1', role: 'assistant', content: defaultWelcomeMsg }]);
      didLoadStorage.current = false;
      setIsLoading(false);
      return;
    }

    if (cmdBase === '/lang' || cmdBase === '/language' || cmdBase === '/idioma') {
      const parts = cmd.split(/\s+/);
      const targetLang = parts[1];
      const currentLang = localStorage.getItem('lang') || 'es';
      const newLang = targetLang === 'en' || targetLang === 'es' ? targetLang : (currentLang === 'es' ? 'en' : 'es');
      localStorage.setItem('lang', newLang);
      window.dispatchEvent(new CustomEvent('langchange', { detail: newLang }));
      setMessages(prev => [
        ...prev,
        { id: genId(), role: 'user', content: textoAEnviar },
        { id: genId(), role: 'assistant', content: newLang === 'en' ? 'Switched to English 🇬🇧' : 'Cambiado a Español 🇦🇷' },
      ]);
      setIsLoading(false);
      return;
    }

    if (cmdBase === '/menu' || cmdBase === '/hamburger') {
      const btn = document.querySelector<HTMLButtonElement>('button[aria-label="Toggle menu"]');
      btn?.click();
      setMessages(prev => [
        ...prev,
        { id: genId(), role: 'user', content: textoAEnviar },
        { id: genId(), role: 'assistant', content: lang === 'en' ? 'Menu toggled' : 'Menú alternado' },
      ]);
      setIsLoading(false);
      return;
    }

    if (cmdBase === '/contactform' || cmdBase === '/opencontact' || cmdBase === '/contacto') {
      setMessages(prev => [
        ...prev,
        { id: genId(), role: 'user', content: textoAEnviar },
        { id: genId(), role: 'assistant', content: lang === 'en' ? 'Opening contact form...' : 'Abriendo formulario de contacto...' },
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
      return;
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
        { id: genId(), role: 'user', content: textoAEnviar },
        { id: genId(), role: 'assistant', content: lang === 'en' ? 'Downloading CV... \uD83D\uDCC4' : 'Descargando CV... \uD83D\uDCC4' },
      ]);
      setIsLoading(false);
      return;
    }

    if (cmdBase === '/game' || cmdBase === '/simon' || cmdBase === '/juego') {
      const gameId = genId();
      setMessages(prev => [
        ...prev,
        { id: genId(), role: 'user', content: textoAEnviar },
        {
          id: gameId, role: 'assistant',
          content: '',
          toolInvocations: [{ toolCallId: gameId, toolName: 'showGame', args: {}, result: {} }],
        },
      ]);
      setIsLoading(false);
      return;
    }

    const mappedText = commands[cmdBase]?.trigger ?? textoAEnviar;
    const navSections: Record<string, string> = {
      'top': 'top', 'inicio': 'top', 'home': 'top', 'hero': 'top',
      'skills': 'skills', 'stack': 'skills', 'tecnologías': 'skills',
      'projects': 'projects', 'proyectos': 'projects',
      'optimizations': 'optimizations', 'optimizaciones': 'optimizations', 'performance': 'optimizations',
      'about': 'about', 'sobre': 'about', 'sobre mí': 'about',
      'contact': 'contact', 'contacto': 'contact',
    };

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
        { id: genId(), role: 'user', content: textoAEnviar },
        { id: genId(), role: 'assistant', content: themeMsgs[cmdBase] || (lang === 'en' ? `Switched to ${isDark ? 'dark' : 'light'} mode` : `Cambiado a modo ${isDark ? 'oscuro' : 'claro'}`) },
      ]);
      setIsLoading(false);
      return;
    }

    const goMatch = cmd.match(/^\/go\s+(.+)/);
    if (goMatch) {
      const section = navSections[goMatch[1].trim().toLowerCase()];
      if (section) {
        const el = document.getElementById(section);
        if (el) {
          const lenis = (window as any).lenis;
          if (lenis) lenis.scrollTo(el, { duration: 1.2 });
          else el.scrollIntoView({ behavior: 'smooth' });
        }
        setMessages(prev => [
          ...prev,
          { id: genId(), role: 'user', content: textoAEnviar },
          { id: genId(), role: 'assistant', content: lang === 'en' ? `Navigated to ${section} section` : `Navegando a la sección ${section}` },
        ]);
        setIsLoading(false);
        return;
      }
    }

    const gotoMatch = cmd.match(/^\/goto\s+(.+)/);
    if (gotoMatch) {
      const slug = gotoMatch[1].trim().toLowerCase();
      const slugs = ['uncuartodemilla', 'expresoomega', '14milla', 'omega'];
      const matched = slugs.find(s => slug.includes(s.replace('uncuartodemilla', 'milla').replace('expresoomega', 'omega')) || s.includes(slug));
      if (matched) {
        window.location.href = `/projects/${matched}`;
        setIsLoading(false);
        return;
      }
    }

    if (cmd === '/help') {
      const helpLines = lang === 'en'
        ? [
            'Available commands:',
            '',
            '  /skills       — Show tech stack',
            '  /projects     — Show projects',
            '  /contact      — Show contact info',
            '  /experience   — Show experience & CV',
            '  /availability — Check availability',
            '  /impact       — Show metrics & scores',
            '  /arch         — Show architecture diagram',
            '  /profile      — About Eduardo',
            '  /hire         — Why hire Eduardo',
            '  /comment      — Leave a comment/review',
            '  /clear        — Clear chat',
            '  /help         — Show this message',
            '  /go [section] — Scroll to section (top, skills, projects, about, contact)',
            '  /goto [project] — Open project page (milla, omega)',
            '  /dark /light   — Switch theme',
            '  /lang          — Switch language',
            '  /menu          — Toggle navigation menu',
            '  /contactform   — Open contact form',
            '  /game          — Play Simon Says!',
            '',
            'You can also just ask naturally in Spanish or English!',
          ]
        : [
            'Comandos disponibles:',
            '',
            '  /skills       — Ver tecnologías',
            '  /projects     — Ver proyectos',
            '  /contact      — Ver contacto',
            '  /experience   — Ver experiencia y CV',
            '  /availability — Ver disponibilidad',
            '  /impact       — Ver métricas y scores',
            '  /arch         — Ver diagrama de arquitectura',
            '  /profile      — Sobre Eduardo',
            '  /hire         — Por qué contratarlo',
            '  /comment      — Dejar un comentario/reseña',
            '  /clear        — Limpiar chat',
            '  /help         — Mostrar esto',
            '  /go [sección] — Ir a sección (top, skills, projects, about, contact)',
            '  /goto [proyecto] — Abrir proyecto (milla, omega)',
            '  /dark /light   — Cambiar tema',
            '  /lang          — Cambiar idioma',
            '  /menu          — Menú de navegación',
            '  /contactform   — Abrir formulario de contacto',
            '  /game          — Jugar Simón Dice!',
            '',
            'También podés preguntar en lenguaje natural en español o inglés.',
          ];
      setMessages(prev => [
        ...prev,
        { id: genId(), role: 'user', content: textoAEnviar },
        { id: genId(), role: 'assistant', content: helpLines.join('\n') },
      ]);
      setIsLoading(false);
      return;
    }

    const userId = genId();
    const assistantId = genId();

    const nuevoMensajeUser: ChatMessage = {
      id: userId,
      role: 'user',
      content: mappedText
    };

    const nuevoHistorial = [...messages, nuevoMensajeUser];

    setMessages([
      ...nuevoHistorial,
      { id: assistantId, role: 'assistant', content: '', toolInvocations: [] }
    ]);

    try {
      const historialParaEnviar = serializeHistory(nuevoHistorial);

      const res = await fetch(`/api/chat?_=${Date.now()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
        body: JSON.stringify({ messages: historialParaEnviar, language: lang, pageContext: currentSectionRef.current }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Error ${res.status}`);
      }

      await readStream(
        res,
        assistantId,
        (chunk) => {
          setMessages(prev => {
            const idx = prev.findIndex(m => m.id === assistantId);
            if (idx === -1) {
              return [...prev, { id: assistantId, role: 'assistant', content: chunk, toolInvocations: [] }];
            }
            const updated = [...prev];
            updated[idx] = { ...updated[idx], content: updated[idx].content + chunk };
            return updated;
          });
        },
        (toolCall) => {
          setMessages(prev => {
            const idx = prev.findIndex(m => m.id === assistantId);
            if (idx === -1) return prev;
            const updated = [...prev];
            updated[idx] = {
              ...updated[idx],
              toolInvocations: [
                ...(updated[idx].toolInvocations || []),
                { toolCallId: toolCall.toolCallId, toolName: toolCall.toolName, args: toolCall.args }
              ]
            };
            return updated;
          });
        },
        (toolResult) => {
          setMessages(prev => {
            const idx = prev.findIndex(m => m.id === assistantId);
            if (idx === -1) return prev;
            const updated = [...prev];
            updated[idx] = {
              ...updated[idx],
              toolInvocations: (updated[idx].toolInvocations || []).map(ti =>
                ti.toolCallId === toolResult.toolCallId
                  ? { ...ti, result: toolResult.result }
                  : ti
              )
            };
            return updated;
          });
        }
      );
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("[ChatAI] Error:", error);
      }
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      setMessages(prev => {
        const idx = prev.findIndex(m => m.id === assistantId);
        if (idx === -1) return prev;
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          content: errorMsg.includes('limit') || errorMsg.includes('límite')
            ? errorMsg
            : lang === 'en'
              ? 'Sorry, I encountered an error. Please try again.'
              : 'Lo siento, encontré un error. Por favor intentá de nuevo.'
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    open, setOpen,
    expanded, setExpanded,
    showLabel,
    jumping,
    input, setInput,
    isLoading,
    messages,
    messagesEndRef,
    handleRobotClick,
    clearChat,
    mandarMensaje,
  };
}
