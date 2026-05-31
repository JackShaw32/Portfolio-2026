type ToolInvocation = { toolCallId: string; toolName: string; args: Record<string, unknown>; result?: unknown };
type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string; toolInvocations?: ToolInvocation[] };

export async function readStream(
  res: Response,
  assistantId: string,
  onDelta: (chunk: string) => void,
  onToolCall: (call: { toolCallId: string; toolName: string; args: Record<string, unknown> }) => void,
  onToolResult: (result: { toolCallId: string; result: unknown }) => void,
): Promise<void> {
  if (!res.body) throw new Error('Sin respuesta del servidor');

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

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
      const data = line.slice(colonIdx + 1);

      if (!data || data.trim() === '' || data.trim() === 'undefined') continue;

      try {
        if (prefix === '0') {
          const chunk = JSON.parse(data) as string;
          if (typeof chunk === 'string') onDelta(chunk);
        } else if (prefix === '9') {
          const toolCall = JSON.parse(data);
          if (toolCall?.toolCallId && toolCall?.toolName) {
            onToolCall({ toolCallId: toolCall.toolCallId, toolName: toolCall.toolName, args: toolCall.args ?? {} });
          }
        } else if (prefix === 'a') {
          const toolResult = JSON.parse(data);
          if (toolResult?.toolCallId) {
            onToolResult({ toolCallId: toolResult.toolCallId, result: toolResult.result });
          }
        }
      } catch {
        if (import.meta.env.DEV) {
          console.warn(`[ChatAI] Skipping (prefix="${prefix}"):`, data.slice(0, 60));
        }
      }
    }
  }
}

export function serializeHistory(messages: ChatMessage[]): { role: string; content: string }[] {
  return messages
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
          const r = inv.result as { success?: boolean; name?: string; reason?: string };
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
      return { role: m.role, content: summaryParts.length > 0 ? summaryParts.join(' ') : '[Visual response shown]' };
    });
}
