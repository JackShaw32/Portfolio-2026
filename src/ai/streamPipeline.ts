import { streamText } from 'ai';
import { toolsDefinition } from './tools';
import { TEXT_TOOL_CALL_RE, parseAndExecuteTextToolCalls } from './textToolParser';
import { TOOL_LEAK_RE } from './leakPatterns';

// Strip HTML tags the model sometimes generates (e.g. <form>, <input>, <div>)
const HTML_TAG_RE = /<\/?[a-z][a-z0-9-]*(\s[^>]*)?\/?>/gi;
// Strip any leaked text-based function call patterns (with or without leading <)
const FUNC_CALL_STRIP_RE = /<?function[=/](?:sendContactForm|showProject|showContact|showSkills|showExperience|showAvailability)>[\s\S]*/g;
const stripHtml = (s: string) =>
  s.replace(HTML_TAG_RE, '').replace(FUNC_CALL_STRIP_RE, '').replace(/\s+/g, ' ').trim();

// STREAM PIPELINE
export async function pipeStreamToController(
  result: Awaited<ReturnType<typeof streamText>>,
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
  tools?: typeof toolsDefinition,
  onToolCallEmitted?: () => void,
): Promise<void> {
  // Buffer ALL text-deltas — both pre-tool preambles and post-tool leakage.
  // Pre-tool text: discarded when a tool-call arrives.
  // Post-tool text: buffered and filtered at end of stream to strip raw
  //   tool-call descriptions the model sometimes emits as plain text.
  let textBuffer: string[] = [];
  let postToolBuffer: string[] = [];
  let hadToolCall = false;
  let contactFormSucceeded = false;
  // Track sendContactForm toolCallIds so we can match them in tool-result
  const contactFormCallIds = new Set<string>();

  for await (const part of result.fullStream) {

    if (part.type === 'text-delta') {
      const chunk = (part as any).text ?? (part as any).textDelta ?? (part as any).delta ?? '';
      if (!chunk) continue;
      if (hadToolCall) {
        // Buffer post-tool text for filtering before sending
        postToolBuffer.push(chunk);
      } else {
        textBuffer.push(chunk);
      }

    } else if (part.type === 'tool-call') {
      // Discard pre-tool preamble text and mark that a tool was called
      textBuffer = [];
      hadToolCall = true;
      onToolCallEmitted?.();
      const args = (part as any).input ?? (part as any).args ?? {};
      if (part.toolName === 'sendContactForm') {
        contactFormCallIds.add(part.toolCallId);
      }
      controller.enqueue(encoder.encode(`9:${JSON.stringify({
        toolCallId: part.toolCallId,
        toolName:   part.toolName,
        args,
      })}\n`));

    } else if (part.type === 'tool-result') {
      const p = part as any;
      const result = p.output ?? p.result;
      if (contactFormCallIds.has(p.toolCallId) && result?.success === true) {
        contactFormSucceeded = true;
      }
      controller.enqueue(encoder.encode(`a:${JSON.stringify({
        toolCallId: p.toolCallId,
        result,
      })}\n`));

    } else if (part.type === 'tool-error') {
      const p = part as any;
      controller.enqueue(encoder.encode(`a:${JSON.stringify({
        toolCallId: p.toolCallId,
        result: null,
      })}\n`));

    } else if (part.type === 'error') {
      throw part.error;
    }
  }

  // Flush pre-tool text (no tool call happened at all — pure text response)
  if (!hadToolCall && textBuffer.length > 0) {
    const full = textBuffer.join('');
    if (tools && (TEXT_TOOL_CALL_RE.lastIndex = 0, TEXT_TOOL_CALL_RE.test(full))) {
      await parseAndExecuteTextToolCalls(full, tools, controller, encoder);
    } else {
      const clean = stripHtml(full);
      if (clean) controller.enqueue(encoder.encode(`0:${JSON.stringify(clean)}\n`));
    }
  }

  // Flush post-tool text only if it doesn't look like a leaked tool-call description
  if (hadToolCall && postToolBuffer.length > 0) {
    let full = postToolBuffer.join('').trim();
    // When sendContactForm succeeded the model sometimes appends a confused follow-up
    // paragraph after the confirmation. Keep only the first paragraph to prevent it.
    if (contactFormSucceeded) {
      full = full.split(/\n\n+/)[0].trim();
    }
    if (full && !TOOL_LEAK_RE.test(full)) {
      const clean = stripHtml(full);
      if (clean) controller.enqueue(encoder.encode(`0:${JSON.stringify(clean)}\n`));
    }
    // else: silently discard — it's the model narrating its own tool calls
  }
}
