import type { APIRoute } from 'astro';

const sanitize = (s: string) =>
  s.replace(/<[^>]*>/g, '').replace(/[<>"'`]/g, '').trim();

const COMMENTS_KEY = 'portfolio:comments';

interface Comment {
  name: string;
  stars: number;
  message: string;
  date: string;
}

const commentRateLimit = new Map<string, { count: number; reset: number }>();

function checkCommentRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const record = commentRateLimit.get(ip);

  if (!record || now > record.reset) {
    commentRateLimit.set(ip, { count: 1, reset: now + 3_600_000 });
    return { allowed: true };
  }

  if (record.count >= 1) return { allowed: false };
  record.count++;
  return { allowed: true };
}

function getEnv() {
  return {
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  };
}

export const GET: APIRoute = async () => {
  const { url, token } = getEnv();
  if (!url || !token) {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  try {
    const res = await fetch(`${url}/get/${COMMENTS_KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    let comments: Comment[] = [];
    if (Array.isArray(data.result)) {
      comments = data.result;
    } else if (typeof data.result === 'string') {
      try { comments = JSON.parse(data.result); } catch { /* ignore */ }
    }
    return new Response(JSON.stringify(comments), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
             request.headers.get('x-real-ip') || '0.0.0.0';

  if (!checkCommentRateLimit(ip)) {
    return new Response(JSON.stringify({ success: false, error: 'rate_limited' }), {
      status: 429, headers: { 'Content-Type': 'application/json' },
    });
  }

  const { url, token } = getEnv();
  if (!url || !token) {
    return new Response(JSON.stringify({ success: false, error: 'db_not_configured' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }

  let name: string, stars: number, message: string, honeypot: string;

  try {
    ({ name, stars, message, honeypot } = await request.json());
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'invalid_body' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  if (honeypot) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const safeName = sanitize(name ?? '').slice(0, 100);
  const safeStars = Math.min(5, Math.max(1, Number(stars) || 5));
  const safeMessage = sanitize(message ?? '').slice(0, 1000);

  if (!safeName || !safeMessage) {
    return new Response(JSON.stringify({ success: false, error: 'missing_fields' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const getRes = await fetch(`${url}/get/${COMMENTS_KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const getData = await getRes.json();
    let comments: Comment[] = [];
    if (Array.isArray(getData.result)) {
      comments = getData.result;
    } else if (typeof getData.result === 'string') {
      try { comments = JSON.parse(getData.result); } catch { /* ignore */ }
    }

    const isDuplicate = comments.some(
      c => c.name === safeName && c.message === safeMessage
    );
    if (isDuplicate) {
      return new Response(JSON.stringify({ success: false, error: 'duplicate' }), {
        status: 409, headers: { 'Content-Type': 'application/json' },
      });
    }

    comments.push({
      name: safeName,
      stars: safeStars,
      message: safeMessage,
      date: new Date().toISOString(),
    });

    await fetch(`${url}/set/${COMMENTS_KEY}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(comments),
    });

    return new Response(JSON.stringify({ success: true, count: comments.length }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  const adminToken = process.env.COMMENTS_ADMIN_TOKEN;
  if (!adminToken) {
    return new Response(JSON.stringify({ success: false, error: 'not_configured' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${adminToken}`) {
    return new Response(JSON.stringify({ success: false, error: 'unauthorized' }), {
      status: 401, headers: { 'Content-Type': 'application/json' },
    });
  }

  let index: number;
  try {
    ({ index } = await request.json());
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'invalid_body' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const { url, token } = getEnv();
  if (!url || !token) {
    return new Response(JSON.stringify({ success: false, error: 'db_not_configured' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const getRes = await fetch(`${url}/get/${COMMENTS_KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const getData = await getRes.json();
    let comments: Comment[] = [];
    if (Array.isArray(getData.result)) {
      comments = getData.result;
    } else if (typeof getData.result === 'string') {
      try { comments = JSON.parse(getData.result); } catch { /* ignore */ }
    }

    if (index < 0 || index >= comments.length) {
      return new Response(JSON.stringify({ success: false, error: 'invalid_index' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    comments.splice(index, 1);

    await fetch(`${url}/set/${COMMENTS_KEY}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(comments),
    });

    return new Response(JSON.stringify({ success: true, count: comments.length }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};
