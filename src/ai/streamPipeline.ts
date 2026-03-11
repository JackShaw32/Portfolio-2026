import { streamText } from 'ai';
import { toolsDefinition } from './tools';
import { TEXT_TOOL_CALL_RE, parseAndExecuteTextToolCalls } from './textToolParser';
import { TOOL_LEAK_RE } from './leakPatterns';

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

  const flushBuffer = (buf: string[]) => {
    for (const chunk of buf) {
      controller.enqueue(encoder.encode(`0:${JSON.stringify(chunk)}\n`));
    }
  };

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
      controller.enqueue(encoder.encode(`9:${JSON.stringify({
        toolCallId: part.toolCallId,
        toolName:   part.toolName,
        args,
      })}\n`));

    } else if (part.type === 'tool-result') {
      const p = part as any;
      controller.enqueue(encoder.encode(`a:${JSON.stringify({
        toolCallId: p.toolCallId,
        result:     p.output ?? p.result,
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
    if (tools && TEXT_TOOL_CALL_RE.test(full)) {
      await parseAndExecuteTextToolCalls(full, tools, controller, encoder);
    } else {
      flushBuffer(textBuffer);
    }
  }

  // Flush post-tool text only if it doesn't look like a leaked tool-call description
  if (hadToolCall && postToolBuffer.length > 0) {
    const full = postToolBuffer.join('').trim();
    if (full && !TOOL_LEAK_RE.test(full)) {
      flushBuffer(postToolBuffer);
    }
    // else: silently discard — it's the model narrating its own tool calls
  }
}
