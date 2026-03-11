import type { APIRoute } from 'astro';
import { sendEmail } from '../../lib/sendEmail';
import { checkRateLimit } from '../../security/rateLimit';

const sanitize = (s: string) =>
  s.replace(/<[^>]*>/g, '').replace(/[<>"'`]/g, '').trim();

export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
             request.headers.get('x-real-ip') || '0.0.0.0';

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return new Response(JSON.stringify({ success: false, error: 'rate_limited' }), {
      status: 429, headers: { 'Content-Type': 'application/json' },
    });
  }

  let name: string, email: string, message: string;

  try {
    ({ name, email, message } = await request.json());
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'invalid_body' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const safeName    = sanitize(name ?? '').slice(0, 100);
  const safeEmail   = (email ?? '').replace(/[<>"'`\s]/g, '').slice(0, 200);
  const safeMessage = sanitize(message ?? '').slice(0, 2000);

  if (!safeName || !safeEmail || !safeMessage) {
    return new Response(JSON.stringify({ success: false, error: 'missing_fields' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
    return new Response(JSON.stringify({ success: false, error: 'invalid_email' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = await sendEmail({
    name:    safeName,
    email:   safeEmail,
    message: safeMessage,
    source:  'Portfolio',
  });

  return new Response(JSON.stringify(result), {
    status: result.success ? 200 : 500,
    headers: { 'Content-Type': 'application/json' },
  });
};

