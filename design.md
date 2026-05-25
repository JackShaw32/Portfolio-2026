# Design Decisions

## Architecture

- **Astro SSR** (`output: 'server'`) — API routes run as Vercel Functions. Not static.
- **Islands pattern** — React 19 hydrates only interactive parts (ChatAI, Navbar, contact form). All other content is plain Astro HTML.
- **Single page** — `index.astro` contains all sections. ClientRouter handles navigation to `/projects/[slug]`.

## Tech choices

| Decision | Why |
|---|---|
| Tailwind v4 via Vite plugin | No config file needed, CSS variables for theming |
| Lenis + GSAP ScrollTrigger | Smooth scroll with synced scroll-driven animations |
| Groq (llama-3.1-8b-instant) | Near-instant inference, free tier |
| Vercel AI SDK | Abstracts streaming + tool calling + fallbacks |
| pnpm with shamefully-hoist | Flat node_modules for tooling compat |

## Chatbot (EduBot)

- In-memory rate limiting (5/min, 20/hr, 50/day per IP)
- Intent detection via regex before LLM call to force specific tools
- Rotating key pool (up to 20 GROQ_API_KEY vars) with cooldown on 429
- URL/image whitelisting in tool outputs prevents model hallucination
- 23 injection patterns blocked via regex

## Project data

`src/config/projects.ts` is the single source of truth. Translation content for each project lives in `src/lib/translations.ts`.

## Styling approach

- Dark/light theme via `class="dark"` on `<html>`, persisted in localStorage
- Flash prevention via inline `<script>` in `Layout.astro` head
- Color scheme defined in `src/styles/global.css` using CSS variables
