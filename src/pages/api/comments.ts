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
    const raw = data.result;
    const comments: Comment[] = Array.isArray(raw) ? raw : (typeof raw === 'string' ? JSON.parse(raw) : []);
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
  const { url, token } = getEnv();
  if (!url || !token) {
    return new Response(JSON.stringify({ success: false, error: 'db_not_configured' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }

  let name: string, stars: number, message: string;

  try {
    ({ name, stars, message } = await request.json());
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'invalid_body' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
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
    const comments: Comment[] = Array.isArray(getData.result) ? getData.result : [];

    comments.push({
      name: safeName,
      stars: safeStars,
      message: safeMessage,
      date: new Date().toISOString(),
    });

    const setRes = await fetch(`${url}/set/${COMMENTS_KEY}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(JSON.stringify(comments)),
    });
    const setText = await setRes.text();

    return new Response(JSON.stringify({ success: true, count: comments.length, setStatus: setRes.status, setResponse: setText }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};
