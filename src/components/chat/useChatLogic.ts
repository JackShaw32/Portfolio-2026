import { useRef, useState, useEffect } from "react";
import type { ChatMessage } from "./types";
import { readStream, serializeHistory } from "@/ai/streamReader";
import { processChatCommand, getMappedText, submitComment as submitCommentCmd } from "@/hooks/chatCommands";

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

    const cmd = textoAEnviar.trim().toLowerCase();
    const cmdBase = cmd.split(/\s+/)[0];

    const handled = processChatCommand(cmdBase, cmd, textoAEnviar, lang, genId, setMessages, setIsLoading, defaultWelcomeMsg, didLoadStorage);
    if (handled) return;

    const mappedText = getMappedText(cmdBase, textoAEnviar);
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

  const submitComment = async (data: { name: string; stars: number; message: string }) => {
    await submitCommentCmd(data, lang, genId, setMessages);
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
    submitComment,
  };
}
