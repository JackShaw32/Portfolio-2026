import { INJECTION_PATTERNS } from './injectionPatterns';
import { LIMITS } from './rateLimit';

// INPUT SANITIZATION
export function sanitizeInput(text: string): { safe: boolean; reason?: string } {
  // Longitud mínima de 1 char
  if (!text || text.trim().length === 0) {
    return { safe: false, reason: 'Mensaje vacío' };
  }

  // Detectar patrones de injection
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(text)) {
      return { safe: false, reason: 'INJECTION_ATTEMPT' };
    }
  }

  // Detectar texto repetido anómalo (flood)
  const words = text.split(/\s+/);
  if (words.length > 10) {
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    const ratio = uniqueWords.size / words.length;
    if (ratio < 0.2) {
      return { safe: false, reason: 'FLOOD_DETECTED' };
    }
  }

  return { safe: true };
}

export function validateMessages(messages: any[]): { valid: boolean; reason?: string } {
  if (!Array.isArray(messages) || messages.length === 0)
    return { valid: false, reason: 'Mensaje inválido' };

  const validRoles = new Set(['user', 'assistant']);
  for (const msg of messages) {
    if (!validRoles.has(msg?.role)) {
      return { valid: false, reason: 'Rol de mensaje inválido' };
    }
    // Solo sanitizar mensajes de usuario — los de assistant pueden tener tool results
    if (msg.role === 'user') {
      const content = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content);
      const check = sanitizeInput(content);
      if (!check.safe) {
        return { valid: false, reason: check.reason ?? 'INVALID_CONTENT' };
      }
    }
  }

  const last = messages[messages.length - 1];
  if (!last?.content) return { valid: false, reason: 'Mensaje vacío' };

  const content = typeof last.content === 'string' ? last.content : JSON.stringify(last.content);

  if (content.length > LIMITS.MAX_MSG_LENGTH)
    return { valid: false, reason: `Mensaje demasiado largo (máx ${LIMITS.MAX_MSG_LENGTH} caracteres)` };

  return { valid: true };
}
