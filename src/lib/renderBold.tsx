import type { ReactNode } from "react";

/** Renders **text** as <strong className="text-foreground font-semibold"> */
export function renderBold(text: string): ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="text-foreground font-semibold">{part}</strong>
      : part
  );
}
