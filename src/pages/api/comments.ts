import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';

const sanitize = (s: string) =>
  s.replace(/<[^>]*>/g, '').replace(/[<>"'`]/g, '').trim();

const COMMENTS_KEY = 'portfolio:comments';

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

interface Comment {
  name: string;
  stars: number;
  message: string;
  date: string;
}

export const GET: APIRoute = async () => {
  const redis = getRedis();
  if (!redis) {
    return new Response(JSON.stringify({ error: 'db_not_configured', comments: [] }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const comments = await redis.get<Comment[]>(COMMENTS_KEY);
    return new Response(JSON.stringify(comments ?? []), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'read_error', comments: [] }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  const redis = getRedis();
  if (!redis) {
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
    const comments = (await redis.get<Comment[]>(COMMENTS_KEY)) ?? [];
    comments.push({
      name: safeName,
      stars: safeStars,
      message: safeMessage,
      date: new Date().toISOString(),
    });
    await redis.set(COMMENTS_KEY, comments);

    return new Response(JSON.stringify({ success: true, count: comments.length }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: 'save_error' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};
