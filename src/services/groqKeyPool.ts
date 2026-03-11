import { createGroq } from '@ai-sdk/groq';

// GROQ KEY POOL
// Multiple free-tier keys rotate automatically on 429.
function buildKeyPool(): string[] {
  const keys: string[] = [];
  const single = import.meta.env.GROQ_API_KEY as string | undefined;
  if (single) keys.push(single);
  for (let i = 1; i <= 19; i++) {
    const k = (import.meta.env as any)[`GROQ_API_KEY_${i}`] as string | undefined;
    if (k && !keys.includes(k)) keys.push(k);
  }
  return keys;
}

export const groqKeyPool:      string[] = buildKeyPool();
export const keyCooldownUntil: number[] = groqKeyPool.map(() => 0);
let   keyPoolPointer = 0;

export function getAvailableGroq(): { groq: ReturnType<typeof createGroq>; index: number } | null {
  const now = Date.now();
  for (let i = 0; i < groqKeyPool.length; i++) {
    const idx = (keyPoolPointer + i) % groqKeyPool.length;
    if (now >= keyCooldownUntil[idx]) {
      keyPoolPointer = (idx + 1) % groqKeyPool.length;
      return { groq: createGroq({ apiKey: groqKeyPool[idx] }), index: idx };
    }
  }
  return null;
}

export function markKeyCooldown(index: number, err: any): void {
  const seconds = err?.responseHeaders?.['retry-after']
    ? Math.ceil(parseFloat(err.responseHeaders['retry-after']))
    : 60;
  keyCooldownUntil[index] = Date.now() + seconds * 1_000;
  console.warn(`[EduBot] Key #${index + 1} rate-limited → cooldown ${seconds}s`);
}

export function isRateLimitErr(err: any): boolean {
  return err?.statusCode === 429 ||
    String(err?.message).includes('Rate limit') ||
    String(err?.message).includes('rate_limit');
}
