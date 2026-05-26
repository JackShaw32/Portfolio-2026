import type { APIRoute } from 'astro';
import { ImageResponse } from '@vercel/og';
import { createElement } from 'react';
import { OGImage } from '@/components/OGImage';

export const GET: APIRoute = async ({ url }) => {
  const lang = url.searchParams.get('lang') === 'en' ? 'en' : 'es';
  return new ImageResponse(
    createElement(OGImage, { lang }),
    { width: 1200, height: 630 },
  );
};
