import type { APIRoute } from 'astro';
import { ImageResponse } from '@vercel/og';
import { createElement } from 'react';
import { OGImage } from '@/components/OGImage';

export const GET: APIRoute = async () => {
  return new ImageResponse(
    createElement(OGImage),
    { width: 1200, height: 630 },
  );
};
