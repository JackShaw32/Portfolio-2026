import { describe, it, expect } from 'vitest';
import { serializeHistory } from './streamReader';

describe('serializeHistory', () => {
  it('filters out welcome message (id === "1")', () => {
    const messages = [
      { id: '1', role: 'assistant' as const, content: 'Welcome!' },
      { id: '2', role: 'user' as const, content: 'Hi' },
    ];
    const result = serializeHistory(messages as any);
    expect(result).toHaveLength(1);
    expect(result[0].role).toBe('user');
  });

  it('serializes assistant content normally when present', () => {
    const messages = [
      { id: '2', role: 'assistant' as const, content: 'Hello there' },
    ];
    const result = serializeHistory(messages as any);
    expect(result[0].content).toBe('Hello there');
  });

  it('serializes tool invocations for empty assistant messages', () => {
    const messages = [
      {
        id: '2', role: 'assistant' as const, content: '',
        toolInvocations: [
          { toolName: 'showProject', result: { title: 'Test' } },
        ],
      },
    ];
    const result = serializeHistory(messages as any);
    expect(result[0].content).toContain('[Showed showProject card]');
  });

  it('serializes sendContactForm success', () => {
    const messages = [
      {
        id: '2', role: 'assistant' as const, content: '',
        toolInvocations: [
          { toolName: 'sendContactForm', result: { success: true, name: 'Juan' } },
        ],
      },
    ];
    const result = serializeHistory(messages as any);
    expect(result[0].content).toContain('sendContactForm was already called and succeeded');
    expect(result[0].content).toContain('Juan');
  });
});
