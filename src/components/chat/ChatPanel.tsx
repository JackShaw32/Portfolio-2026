import { Bot, Send, User, Sparkles, Lock, X, Maximize2, Trash2 } from "lucide-react";
import type { ChatMessage } from "./types";
import ToolResultCard from "./ToolResultCard";

interface ChatPanelProps {
  open: boolean;
  expanded: boolean;
  isLoading: boolean;
  messages: ChatMessage[];
  input: string;
  lang: 'es' | 'en';
  ch: {
    typing: string;
    online: string;
    placeholder: string;
    suggestions: readonly string[];
  };
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onToggleExpand: () => void;
  onClearChat: () => void;
  onInputChange: (v: string) => void;
  onSend: (e?: React.FormEvent, directText?: string) => void;
  onSubmitComment?: (data: { name: string; stars: number; message: string }) => void;
}

export default function ChatPanel({
  open,
  expanded,
  isLoading,
  messages,
  input,
  lang,
  ch,
  messagesEndRef,
  onClose,
  onToggleExpand,
  onClearChat,
  onInputChange,
  onSend,
  onSubmitComment,
}: ChatPanelProps) {
  const panelWidth  = expanded ? "sm:w-[1000px]" : "sm:w-[400px]";
  const panelHeight = expanded ? "sm:h-[85vh]"   : "sm:h-[520px]";

  const allCommands = [
    { cmd: '/skills',    descEs: 'Ver tecnologías',    descEn: 'View tech stack' },
    { cmd: '/projects',  descEs: 'Ver proyectos',     descEn: 'View projects' },
    { cmd: '/contact',   descEs: 'Ver contacto',      descEn: 'View contact' },
    { cmd: '/experience',descEs: 'Ver experiencia',   descEn: 'View experience' },
    { cmd: '/availability', descEs: 'Disponibilidad',    descEn: 'Availability' },
    { cmd: '/impact',     descEs: 'Ver métricas',      descEn: 'View metrics' },
    { cmd: '/arch',       descEs: 'Arquitectura',      descEn: 'Architecture' },
    { cmd: '/profile',   descEs: 'Sobre Eduardo',     descEn: 'About Eduardo' },
    { cmd: '/hire',      descEs: 'Por qué contratar', descEn: 'Why hire' },
    { cmd: '/comment',   descEs: 'Dejar comentario',  descEn: 'Leave comment' },
    { cmd: '/game',      descEs: 'Simón Dice',        descEn: 'Simon Says' },
    { cmd: '/go',        descEs: 'Ir a sección',      descEn: 'Go to section' },
    { cmd: '/goto',      descEs: 'Abrir proyecto',    descEn: 'Open project' },
    { cmd: '/dark',      descEs: 'Modo oscuro',       descEn: 'Dark mode' },
    { cmd: '/lang',      descEs: 'Cambiar idioma',    descEn: 'Switch language' },
    { cmd: '/menu',      descEs: 'Menú navegación',   descEn: 'Navigation menu' },
    { cmd: '/contactform', descEs: 'Formulario contacto', descEn: 'Contact form' },
    { cmd: '/clear',     descEs: 'Limpiar chat',      descEn: 'Clear chat' },
    { cmd: '/help',      descEs: 'Ver comandos',      descEn: 'Help' },
  ];
  const showCmdHint = input.startsWith('/');

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-background/50 backdrop-blur-sm sm:hidden" onClick={onClose} />}

      <div className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bottom-4 left-3 right-3 sm:bottom-10 sm:left-auto sm:right-[110px] ${panelWidth} ${open ? "opacity-100 translate-y-0 pointer-events-auto scale-100" : "opacity-0 translate-y-8 pointer-events-none scale-95"} origin-bottom-right`}>
        <div className={`relative rounded-3xl shadow-2xl p-[1.5px] h-[85vh] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${panelHeight} w-full`}>
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className={`absolute modal-border-conic ${isLoading ? "animate-border-spin" : "animate-[border-spin_8s_linear_infinite]"}`} />
          </div>
          {isLoading && <div className="absolute -inset-[3px] rounded-3xl pointer-events-none animate-siri-glow-pulse siri-glow-border" />}
          <div className="absolute inset-[1.5px] rounded-[23px] bg-background" />

          <div className="glass glass-no-glow rounded-[23px] overflow-hidden flex flex-col relative z-10 h-full w-full">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-border/50 bg-muted/30 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-foreground flex items-center justify-center"><Bot className="w-4 h-4 sm:w-5 sm:h-5 text-background" /></div>
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground tracking-wide">EduBot AI</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1 font-medium">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    {isLoading
                      ? <span className="font-semibold text-transparent bg-clip-text animate-metallic-shine bg-[linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899,#06b6d4)] bg-[length:200%_auto]">{ch.typing}</span>
                      : ch.online}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 border border-border/50 px-2.5 py-1 rounded-full font-medium"><Lock className="w-3 h-3" /> Beta AI</div>
                <button onClick={onClearChat} title={lang === 'en' ? 'Clear chat' : 'Limpiar chat'} className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                <button onClick={onToggleExpand} aria-label={expanded ? (lang === 'en' ? 'Compress chat' : 'Contraer chat') : (lang === 'en' ? 'Expand chat' : 'Expandir chat')} className="hidden sm:flex w-8 h-8 rounded-full items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"><Maximize2 className="w-4 h-4" /></button>
                <button onClick={onClose} aria-label={lang === 'en' ? 'Close chat' : 'Cerrar chat'} className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"><X className="w-5 h-5 sm:w-4 sm:h-4" /></button>
              </div>
            </div>

            <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 scrollbar-thin overflow-x-hidden" style={{ overscrollBehavior: 'contain' }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 sm:gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center ${msg.role === "assistant" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
                    {msg.role === "assistant" ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`max-w-[85%] flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    {msg.toolInvocations?.map((toolInvocation) => (
                      <ToolResultCard
                        key={toolInvocation.toolCallId}
                        toolInvocation={toolInvocation}
                        lang={lang}
                        onSubmitComment={onSubmitComment}
                      />
                    ))}
                    {msg.content
                      && !/<?function[=(\/]/.test(msg.content)
                      && !/^\s*(sendContactForm|showProject|showContact|showSkills|showExperience|showAvailability|submitComment)\b/.test(msg.content)
                      && (
                        <div className={`rounded-2xl px-4 py-3 text-[13px] sm:text-sm leading-relaxed font-light whitespace-pre-wrap ${msg.role === "assistant" ? "bg-muted/50 text-foreground rounded-tl-sm font-mono" : "bg-foreground/10 text-foreground border border-foreground/10 rounded-tr-sm break-words"}`}>
                          {msg.content}
                        </div>
                      )}
                  </div>
                </div>
              ))}

              {isLoading && messages.length > 0 && (() => {
                const lastMsg = messages[messages.length - 1];
                return lastMsg.role === 'assistant' && lastMsg.content === '' && !lastMsg.toolInvocations?.length;
              })() && (
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-7 h-7 rounded-xl bg-foreground flex items-center justify-center flex-shrink-0"><Bot className="w-3.5 h-3.5 text-background" /></div>
                  <div className="rounded-2xl rounded-tl-sm px-4 py-3.5 flex gap-1.5 items-center border border-indigo-500/25 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/5">
                    {[
                      { delay: 'anim-delay-0',   bg: 'bg-indigo-500' },
                      { delay: 'anim-delay-0-2', bg: 'bg-violet-500' },
                      { delay: 'anim-delay-0-4', bg: 'bg-pink-500'   },
                    ].map((dot, i) => (
                      <span key={i} className={`w-1.5 h-1.5 rounded-full animate-pulse ${dot.delay} ${dot.bg}`} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="px-4 pb-3 flex overflow-x-auto gap-2 flex-shrink-0 scrollbar-none snap-x">
                {ch.suggestions.map((s) => (
                  <button key={s} onClick={() => onSend(undefined, s)} className="text-[11px] sm:text-xs font-medium text-muted-foreground border border-border/50 bg-muted/30 hover:bg-foreground hover:text-background rounded-full px-4 py-2 whitespace-nowrap snap-start transition-colors">{s}</button>
                ))}
              </div>
            )}

            <div className="p-3 sm:p-4 border-t border-border/50 bg-muted/10 flex-shrink-0 w-full relative">
              {showCmdHint && (
                <div data-lenis-prevent className="absolute bottom-full left-0 right-0 mb-1 mx-3 p-2 rounded-xl bg-muted/95 border border-border/50 backdrop-blur-md shadow-xl z-50 grid grid-cols-1 sm:grid-cols-2 gap-0.5 max-h-48 overflow-y-auto">
                  {allCommands.map((c) => (
                    <button key={c.cmd} type="button" onClick={() => { onInputChange(c.cmd + ' '); (document.activeElement as HTMLInputElement)?.focus(); }}
                      className="text-left px-3 py-2 rounded-lg hover:bg-foreground/10 transition-colors text-xs">
                      <span className="font-mono font-bold text-foreground">{c.cmd}</span>
                      <span className="text-muted-foreground ml-2">{lang === 'en' ? c.descEn : c.descEs}</span>
                    </button>
                  ))}
                </div>
              )}
              <form onSubmit={(e) => onSend(e)} className="flex gap-2 w-full">
                <input type="text" value={input} onChange={(e) => onInputChange(e.target.value)} placeholder={ch.placeholder} className="flex-1 min-w-0 bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-[13px] sm:text-sm text-foreground focus:outline-none focus:border-foreground/40 transition-all" />
                <button type="submit" disabled={!input.trim() || isLoading} aria-label={lang === 'en' ? 'Send message' : 'Enviar mensaje'} className={`w-[44px] h-[44px] sm:w-[46px] sm:h-[46px] rounded-xl flex items-center justify-center transition-all duration-200 ${!input.trim() && !isLoading ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-foreground text-background hover:bg-foreground/90 cursor-pointer'}`}>
                  <Send className="w-[16px] h-[16px]" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
