import { useLanguage } from "./hooks/useLanguage";
import { translations } from "../lib/translations";
import { useChatLogic } from "./chat/useChatLogic";
import RobotButton from "./chat/RobotButton";
import ChatPanel from "./chat/ChatPanel";

export default function ChatAI({ slug }: { slug?: string }) {
  const { lang } = useLanguage();
  const t = translations[lang];
  const ch = t.chat;

  const {
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
  } = useChatLogic(lang, ch.responses.default, slug);

  return (
    <>
      <RobotButton
        open={open}
        jumping={jumping}
        showLabel={showLabel}
        openLabel={ch.openLabel}
        closeLabel={ch.closeLabel}
        openChatAriaLabel={ch.openChat}
        closeChatAriaLabel={ch.closeChat}
        onRobotClick={handleRobotClick}
      />
      <ChatPanel
        open={open}
        expanded={expanded}
        isLoading={isLoading}
        messages={messages}
        input={input}
        lang={lang}
        ch={ch}
        messagesEndRef={messagesEndRef}
        onClose={() => setOpen(false)}
        onToggleExpand={() => setExpanded((v) => !v)}
        onClearChat={clearChat}
        onInputChange={setInput}
        onSend={mandarMensaje}
      />
    </>
  );
}