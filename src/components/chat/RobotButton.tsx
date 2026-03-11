interface RobotButtonProps {
  open: boolean;
  jumping: boolean;
  showLabel: boolean;
  openLabel: string;
  closeLabel: string;
  openChatAriaLabel: string;
  closeChatAriaLabel: string;
  onRobotClick: () => void;
}

export default function RobotButton({
  open,
  jumping,
  showLabel,
  openLabel,
  closeLabel,
  openChatAriaLabel,
  closeChatAriaLabel,
  onRobotClick,
}: RobotButtonProps) {
  return (
    <div className={`fixed bottom-10 right-5 sm:bottom-10 sm:right-10 z-50 transition-all duration-500 origin-bottom-right ${open ? "scale-0 opacity-0 pointer-events-none sm:scale-100 sm:opacity-100 sm:pointer-events-auto" : "scale-[0.7] sm:scale-100 opacity-100"}`}>
      <button onClick={onRobotClick} aria-label={open ? openChatAriaLabel : closeChatAriaLabel} className={`group relative flex items-end focus:outline-none ${jumping ? "animate-robot-jump" : (!open ? "animate-robot-bob" : "")}`}>
        <div className={`mb-3 mr-1 transition-all duration-300 self-end ${(showLabel && !jumping && !open) ? "opacity-100 -translate-y-2" : "opacity-0 translate-y-0 pointer-events-none"} group-hover:opacity-100 group-hover:-translate-y-2`}>
          <div className="relative bg-foreground text-background text-[13px] sm:text-[11px] font-semibold px-4 py-3 sm:px-3 sm:py-2 rounded-2xl rounded-br-sm shadow-xl whitespace-nowrap">
            {open ? closeLabel : openLabel}
            <span className="absolute -bottom-1.5 right-3 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-foreground" />
          </div>
        </div>
        <div className={`relative select-none drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300 w-[72px] h-[104px] ${open ? "scale-105" : ""}`}>
          {!jumping && !open && (
            <div className="absolute z-10 top-[28px] -left-[12px] origin-bottom animate-robot-wave">
              <svg width="18" height="32" viewBox="0 0 18 32" fill="none"><rect x="6" y="8" width="7" height="18" rx="3.5" fill="#374151"/><rect x="6" y="8" width="7" height="18" rx="3.5" fill="url(#arm-shine)" opacity="0.3"/><ellipse cx="9" cy="6" rx="6" ry="6" fill="#4B5563"/><text x="9" y="10" textAnchor="middle" fontSize="9" fill="white">👋</text><defs><linearGradient id="arm-shine" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="white" stopOpacity="0"/><stop offset="50%" stopColor="white" stopOpacity="0.5"/><stop offset="100%" stopColor="white" stopOpacity="0"/></linearGradient></defs></svg>
            </div>
          )}
          <svg width="72" height="104" viewBox="0 0 72 104" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="body-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#374151"/><stop offset="100%" stopColor="#111827"/></linearGradient>
              <linearGradient id="head-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4B5563"/><stop offset="100%" stopColor="#1F2937"/></linearGradient>
              <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="white" stopOpacity="0.12"/><stop offset="100%" stopColor="white" stopOpacity="0"/></linearGradient>
              <filter id="glow-eye"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="glow-orb"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <line x1="36" y1="6" x2="36" y2="16" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="36" cy="4" r="4" fill="#8B5CF6" filter="url(#glow-orb)" className="animate-robot-blink-antenna"/><circle cx="36" cy="4" r="2.5" fill="#C4B5FD"/>
            <rect x="12" y="22" width="6" height="10" rx="3" fill="#374151"/><rect x="54" y="22" width="6" height="10" rx="3" fill="#374151"/>
            <rect x="16" y="14" width="40" height="30" rx="10" fill="url(#head-grad)"/><rect x="16" y="14" width="40" height="30" rx="10" fill="url(#shine)"/><rect x="17" y="15" width="38" height="14" rx="8" fill="white" fillOpacity="0.04"/><rect x="20" y="23" width="32" height="13" rx="5" fill="#0F172A" fillOpacity="0.8"/>
            {open ? (
              <><line x1="25" y1="26" x2="31" y2="32" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round"/><line x1="31" y1="26" x2="25" y2="32" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round"/><line x1="41" y1="26" x2="47" y2="32" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round"/><line x1="47" y1="26" x2="41" y2="32" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round"/></>
            ) : (
              <><ellipse cx="28" cy="29.5" rx="4" ry="4" fill="#06B6D4" filter="url(#glow-eye)" className="animate-robot-blink"/><ellipse cx="28" cy="29.5" rx="2.5" ry="2.5" fill="#A5F3FC"/><ellipse cx="44" cy="29.5" rx="4" ry="4" fill="#06B6D4" filter="url(#glow-eye)" className="animate-robot-blink-offset"/><ellipse cx="44" cy="29.5" rx="2.5" ry="2.5" fill="#A5F3FC"/></>
            )}
            <rect x="26" y="37" width="20" height="4" rx="2" fill="#374151"/>
            <line x1="30" y1="37" x2="30" y2="41" stroke="#6B7280" strokeWidth="1"/><line x1="34" y1="37" x2="34" y2="41" stroke="#6B7280" strokeWidth="1"/><line x1="38" y1="37" x2="38" y2="41" stroke="#6B7280" strokeWidth="1"/><line x1="42" y1="37" x2="42" y2="41" stroke="#6B7280" strokeWidth="1"/>
            <rect x="30" y="44" width="12" height="6" rx="3" fill="#374151"/>
            <rect x="14" y="50" width="44" height="30" rx="10" fill="url(#body-grad)"/><rect x="14" y="50" width="44" height="30" rx="10" fill="url(#shine)"/><rect x="20" y="56" width="32" height="18" rx="5" fill="#0F172A" fillOpacity="0.6"/>
            <circle cx="27" cy="65" r="3" fill="#8B5CF6" filter="url(#glow-eye)" className="animate-robot-blink-fast"/><circle cx="36" cy="65" r="3" fill="#06B6D4" filter="url(#glow-eye)" className="animate-robot-blink-antenna"/><circle cx="45" cy="65" r="3" fill="#10B981" filter="url(#glow-eye)" className="animate-robot-blink-offset"/>
            <rect x="58" y="52" width="8" height="20" rx="4" fill="#374151"/><ellipse cx="62" cy="74" rx="4.5" ry="4" fill="#4B5563"/><rect x="20" y="80" width="13" height="18" rx="5" fill="#374151"/><rect x="39" y="80" width="13" height="18" rx="5" fill="#374151"/><rect x="17" y="94" width="18" height="8" rx="4" fill="#1F2937"/><rect x="37" y="94" width="18" height="8" rx="4" fill="#1F2937"/>
          </svg>
        </div>
      </button>
    </div>
  );
}
