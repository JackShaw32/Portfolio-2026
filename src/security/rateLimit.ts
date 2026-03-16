export const LIMITS = {
  PER_MINUTE:     5,
  PER_HOUR:       20,
  PER_DAY:        50,
  MAX_MSG_LENGTH: 400,
  MAX_HISTORY:    6,
};

export interface IPRecord {
  minute: { count: number; reset: number };
  hour:   { count: number; reset: number };
  day:    { count: number; reset: number };
}

const ipStore = new Map<string, IPRecord>();
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipStore.entries()) {
    if (now > record.day.reset) ipStore.delete(ip);
  }
}, 60 * 60 * 1000);

export function checkRateLimit(ip: string): { allowed: boolean; reason?: string } {
  if (import.meta.env.DEV) return { allowed: true };

  const now = Date.now();
  const record: IPRecord = ipStore.get(ip) ?? {
    minute: { count: 0, reset: now + 60_000 },
    hour:   { count: 0, reset: now + 3_600_000 },
    day:    { count: 0, reset: now + 86_400_000 },
  };
  if (now > record.minute.reset) record.minute = { count: 0, reset: now + 60_000 };
  if (now > record.hour.reset)   record.hour   = { count: 0, reset: now + 3_600_000 };
  if (now > record.day.reset)    record.day    = { count: 0, reset: now + 86_400_000 };
  if (record.minute.count >= LIMITS.PER_MINUTE)
    return { allowed: false, reason: 'Mandaste demasiados mensajes seguidos. Esperá un minuto 🙏' };
  if (record.hour.count >= LIMITS.PER_HOUR)
    return { allowed: false, reason: 'Alcanzaste el límite por hora. Volvé en unos minutos 😅' };
  if (record.day.count >= LIMITS.PER_DAY)
    return { allowed: false, reason: 'Alcanzaste el límite diario. Volvé mañana 😅' };
  record.minute.count++;
  record.hour.count++;
  record.day.count++;
  ipStore.set(ip, record);
  return { allowed: true };
}
