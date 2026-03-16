import { toolsDefinition } from './tools';
import { TOOL_LEAK_RE } from './leakPatterns';

export const TEXT_TOOL_CALL_RE = /<?function[=/](\w+)>([\s\S]*?)(?:<\/function>|<?function(?![=/\w])|$)/g;

export async function parseAndExecuteTextToolCalls(
  text: string,
  tools: typeof toolsDefinition,
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
): Promise<void> {
  let lastIndex = 0;
  TEXT_TOOL_CALL_RE.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TEXT_TOOL_CALL_RE.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index).replace(/<\/?function[^>]*>/g, '').trim();
    if (before && !TOOL_LEAK_RE.test(before)) {
      const filtered = before.replace(/^(Puedes ver|You can see|Aqu[ií]|Claro|Aqu\u00ED)[\s\S]*/i, '').trim();
      if (filtered) controller.enqueue(encoder.encode(`0:${JSON.stringify(filtered)}\n`));
    }

    const toolName = match[1] as keyof typeof tools;
    if (toolName in tools) {
      let args: Record<string, unknown> = {};
      try { args = JSON.parse(match[2]); } catch { /* malformed json — use empty */ }

      if (toolName === 'sendContactForm') {
        const n = String(args.name ?? '').trim();
        const e = String(args.email ?? '').trim();
        const m = String(args.message ?? '').trim();
        const fakeEmails = ['user@email.com', 'user@example.com', 'email@example.com'];
        const hasName    = n.length >= 2 && n.toLowerCase() !== 'user';
        const hasEmail   = e.includes('@') && e.length >= 5 && !fakeEmails.includes(e.toLowerCase());
        const hasMessage = m.length >= 10 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m);
        if (!hasName || !hasEmail || !hasMessage) {
          lastIndex = match.index + match[0].length;
          continue;
        }
      }

      const toolCallId = `txt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

      controller.enqueue(encoder.encode(`9:${JSON.stringify({ toolCallId, toolName, args })}\n`));

      try {
        const tool = tools[toolName];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (tool.execute as any)(args);
        controller.enqueue(encoder.encode(`a:${JSON.stringify({ toolCallId, result })}\n`));
      } catch {
        controller.enqueue(encoder.encode(`a:${JSON.stringify({ toolCallId, result: null })}\n`));
      }
    }

    lastIndex = match.index + match[0].length;
  }

  const after = text.slice(lastIndex).replace(/<\/?function[^>]*>/g, '').trim();
  if (after && !TOOL_LEAK_RE.test(after)) {
    controller.enqueue(encoder.encode(`0:${JSON.stringify(after)}\n`));
  }
}
