import { useRef, useState, useEffect } from "react";
import type { ChatMessage } from "./types";

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

    const userId      = genId();
    const assistantId = genId();

    const nuevoMensajeUser: ChatMessage = {
      id: userId,
      role: 'user',
      content: textoAEnviar
    };

    const nuevoHistorial = [...messages, nuevoMensajeUser];

    setMessages([
      ...nuevoHistorial,
      { id: assistantId, role: 'assistant', content: '', toolInvocations: [] }
    ]);

    try {
      const historialParaEnviar = nuevoHistorial
        .filter(m => m.id !== '1')
        .map(m => {
          if (m.role !== 'assistant' || m.content.trim()) {
            return { role: m.role, content: m.content };
          }
          const invocations = m.toolInvocations ?? [];
          const summaryParts: string[] = [];
          for (const inv of invocations) {
            if (!inv.result) continue;
            if (inv.toolName === 'sendContactForm') {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const r = inv.result as any;
              if (r.success) {
                summaryParts.push(
                  `[SYSTEM NOTE: sendContactForm was already called and succeeded for "${r.name}". ` +
                  `The contact form has been submitted. Do NOT call sendContactForm again in this conversation.]`
                );
              } else {
                summaryParts.push(`[Contact form submission failed: ${r.reason}]`);
              }
            } else {
              summaryParts.push(`[Showed ${inv.toolName} card]`);
            }
          }
          const content = summaryParts.length > 0 ? summaryParts.join(' ') : '[Visual response shown]';
          return { role: m.role, content };
        });

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historialParaEnviar, language: lang, pageContext: currentSectionRef.current }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Error ${res.status}`);
      }

      if (!res.body) throw new Error('Sin respuesta del servidor');

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer    = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.trim()) continue;

          const colonIdx = line.indexOf(':');
          if (colonIdx === -1) continue;

          const prefix = line.slice(0, colonIdx);
          const data   = line.slice(colonIdx + 1);

          if (!data || data.trim() === '' || data.trim() === 'undefined') continue;

          try {
            if (prefix === '0') {
              const chunk = JSON.parse(data) as string;
              if (typeof chunk !== 'string') continue;

              setMessages(prev => {
                const idx = prev.findIndex(m => m.id === assistantId);
                if (idx === -1) {
                  return [...prev, { id: assistantId, role: 'assistant', content: chunk, toolInvocations: [] }];
                }
                const updated = [...prev];
                updated[idx] = { ...updated[idx], content: updated[idx].content + chunk };
                return updated;
              });

            } else if (prefix === '9') {
              const toolCall = JSON.parse(data);
              if (!toolCall?.toolCallId || !toolCall?.toolName) continue;

              setMessages(prev => {
                const idx = prev.findIndex(m => m.id === assistantId);
                if (idx === -1) return prev;
                const updated = [...prev];
                updated[idx] = {
                  ...updated[idx],
                  toolInvocations: [
                    ...(updated[idx].toolInvocations || []),
                    { toolCallId: toolCall.toolCallId, toolName: toolCall.toolName, args: toolCall.args ?? {} }
                  ]
                };
                return updated;
              });

            } else if (prefix === 'a') {
              const toolResult = JSON.parse(data);
              if (!toolResult?.toolCallId) continue;

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
            // prefijos '2', 'd', 'e', 'f', '8', '3' → ignorados

          } catch {
            if (import.meta.env.DEV) {
              console.warn(`[ChatAI] Skipping (prefix="${prefix}"):`, data.slice(0, 60));
            }
          }
        }
      }
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
