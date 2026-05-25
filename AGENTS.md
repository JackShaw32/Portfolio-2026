# AGENTS.md

## Project

Astro 5 SSR portfolio (single-pager + `/projects/[slug]` detail pages). Deployed on Vercel via `@astrojs/vercel`.

## Commands

- `pnpm dev` — dev server on `localhost:4321`
- `pnpm build` — production build to `./dist/`
- `pnpm preview` — preview prod build locally
- `pnpm astro check` — type check Astro files (this is the only type-checker; no `tsc`)
- `pnpm test` — run AI/security unit tests (Vitest)
- `pnpm test:watch` — watch mode
- No lint or format tooling is configured.

## Package manager

pnpm. `.npmrc` sets `shamefully-hoist=true` and `node-linker=hoisted` so tooling that expects flat `node_modules` works.

## Framework quirks

- **Astro SSR** (`output: 'server'`), not static. API routes in `src/pages/api/` run as Vercel Functions.
- **React 19 islands** — most content is plain Astro HTML; only interactive components (ChatAI, Navbar, contact form, etc.) hydrate via `client:load`, `client:visible`, or `client:idle`.
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin — no `tailwind.config.js`, no `@tailwind base/components/utilities`.
- **Path alias**: `@/` → `src/` (configured in both `tsconfig.json` and `vite.resolve.alias`).
- **`vitest`**: not present. No test runner.

## Architecture

- **Single page app illusion**: `src/pages/index.astro` contains all sections. Astro `ClientRouter` handles client-side navigation to `src/pages/projects/[slug].astro`.
- **Chatbot API** (`/api/chat`): streams from Groq (primary: `llama-3.1-8b-instant`, fallback: `llama-3.3-70b-versatile`). Has in-memory rate limiting (5/min, 20/hr, 50/day per IP), input sanitization, 23 injection patterns, and a rotating key pool (up to 20 `GROQ_API_KEY` vars). `maxDuration: 30` on the endpoint Vercel function.
- **Language switching** uses `CustomEvent('langchange')` on DOM (not React context). All React components listen via `useEffect`.
- **Theme**: inline script in `<head>` prevents flash. Persisted in `localStorage`.
- **Smooth scroll**: Lenis with `data-lenis-prevent` on chat panel. GSAP ScrollTrigger synced to Lenis ticker.
- **View Transitions**: Shared Element Transition (image flies from project card to detail page). On navigate back, `astro:before-swap` removes `view-transition-name` to prevent morph.
- **Security**: rate limiting + sanitization + injection patterns + URL whitelisting in tool outputs — all in-memory, no external store.

## Key entrypoints

| Purpose | File |
|---|---|
| Main page | `src/pages/index.astro` |
| Chat API | `src/pages/api/chat.ts` |
| Contact API | `src/pages/api/contact.ts` |
| OG image | `src/pages/api/og.ts` |
| System prompt | `src/pages/api/prompt.ts` |
| Layout shell | `src/layouts/Layout.astro` |
| Tool definitions | `src/ai/tools.ts` |
| Intent detection | `src/ai/intentDetection.ts` |
| Stream pipeline | `src/ai/streamPipeline.ts` |
| Project data | `src/config/projects.ts` |
| Translations | `src/lib/translations.ts` |

## Environment

`.env` at root contains live secrets (not tracked by git). Required vars:

- `GROQ_API_KEY` (plus `_1`…`_19` for rotation)
- `RESEND_API_KEY`
- `EDUARDO_AVAILABLE` / `AVAILABLE_FROM`

Set `NODE_ENV=development` to disable rate limiting.

## Static data

All project content is in `src/config/projects.ts`. The chatbot's knowledge comes from `src/pages/api/prompt.ts` (`BASE_PROMPT`). Translations are in `src/lib/translations.ts`.
