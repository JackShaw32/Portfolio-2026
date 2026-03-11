# Portfolio de Eduardo Cabral

Sitio web de portfolio profesional con chatbot de inteligencia artificial, diseñado para mostrar proyectos, experiencia laboral y habilidades técnicas. Construido con Astro en modo SSR completo y desplegado en Vercel.

---

## Por qué se hizo este proyecto

El objetivo fue reemplazar un CV estático por una experiencia interactiva donde cualquier visitante pueda explorar los proyectos, conocer la experiencia laboral y contactar directamente sin salir del sitio. Se integró un chatbot con IA real (EduBot) para que los reclutadores y clientes puedan hacer preguntas en lenguaje natural y obtener respuestas personalizadas sobre disponibilidad, stack técnico y proyectos, con soporte bilingüe (español e inglés).

---

## Tabla de contenidos

- [Arquitectura general](#arquitectura-general)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Frontend](#frontend)
- [Backend y API](#backend-y-api)
- [Sistema de IA (EduBot)](#sistema-de-ia-edubot)
- [Seguridad](#seguridad)
- [Tecnologías usadas y por qué](#tecnologías-usadas-y-por-qué)
- [Variables de entorno](#variables-de-entorno)
- [Comandos](#comandos)

---

## Arquitectura general

```
                        ┌─────────────────────────────────────────────┐
                        │                   VERCEL                     │
                        │              (Edge Functions + CDN)          │
                        └──────────────────┬──────────────────────────┘
                                           │
              ┌────────────────────────────┼────────────────────────────┐
              │                            │                            │
    ┌─────────▼──────────┐      ┌──────────▼──────────┐     ┌──────────▼──────────┐
    │   Astro SSR Shell  │      │    API Routes        │     │   Edge OG Images    │
    │  (Layout + Pages)  │      │  /api/chat           │     │   /api/og           │
    │                    │      │  /api/contact        │     │   (@vercel/og)      │
    └─────────┬──────────┘      │  /api/prompt         │     └─────────────────────┘
              │                 └──────────┬───────────┘
              │                            │
    ┌─────────▼──────────┐      ┌──────────▼───────────┐
    │  React Islands     │      │   Servicios externos  │
    │  (hydration        │      │                       │
    │   selectiva)       │      │  Groq LLM API         │
    │                    │      │  Resend Email API     │
    │  Hero / Navbar     │      │                       │
    │  Skills / Projects │      └───────────────────────┘
    │  About / Contact   │
    │  ChatAI / Footer   │
    └────────────────────┘
```

### Patrón de Islas (Islands Architecture)

Astro renderiza el HTML en el servidor. Solo los componentes React que necesitan interactividad se hidratan en el cliente, con estrategias específicas por componente:

| Directiva | Cuándo hidrata | Usado en |
|---|---|---|
| `client:load` | Inmediatamente | Navbar, Hero, ChatAI |
| `client:visible` | Al hacer scroll | Skills, Projects, About, Contact |
| `client:idle` | Cuando el browser está libre | Footer |

Esto resulta en un sitio con carga inicial muy rápida, ya que la mayoría del contenido llega como HTML puro sin JS.

---

## Estructura de carpetas

```
educcabral/
├── public/                          # Archivos estáticos
│   ├── fonts/                       # General Sans (woff2, self-hosted)
│   ├── projects/                    # Imágenes de proyectos (.webp)
│   ├── favicon.svg / favicon.ico
│   ├── site.webmanifest             # PWA manifest
│   └── robots.txt
│
├── src/
│   ├── ai/                          # Lógica del chatbot IA
│   │   ├── model.ts                 # Definición de modelos LLM
│   │   ├── tools.ts                 # 6 herramientas del chatbot
│   │   ├── intentDetection.ts       # Detección de intenciones por regex
│   │   ├── streamPipeline.ts        # Consumidor del stream de IA
│   │   └── textToolParser.ts        # Parser fallback para tool calls en texto
│   │
│   ├── analytics/
│   │   └── interactionLogger.ts     # Log en memoria de interacciones del chat
│   │
│   ├── components/
│   │   ├── Hero.tsx                 # Sección principal con typewriter
│   │   ├── Navbar.tsx               # Barra de navegación fija
│   │   ├── Skills.tsx               # Experiencia laboral y educación
│   │   ├── Projects.tsx             # Grid de proyectos con GSAP
│   │   ├── Optimizations.tsx        # Scores de Lighthouse + tech stack visual
│   │   ├── About.tsx                # Biografía y foto
│   │   ├── Contact.tsx              # Formulario y datos de contacto
│   │   ├── Footer.tsx               # Pie de página
│   │   ├── ContactModal.tsx         # Modal de contacto reutilizable
│   │   ├── ProjectDetail.tsx        # Página de detalle de proyecto
│   │   ├── OGImage.tsx              # Imagen Open Graph generada en el servidor
│   │   ├── ChatAI.tsx               # Orquestador del chat
│   │   ├── chat/                    # Sub-componentes del chat
│   │   │   ├── ChatPanel.tsx        # UI del panel de chat
│   │   │   ├── RobotButton.tsx      # Botón robot SVG animado
│   │   │   ├── ToolResultCard.tsx   # Tarjetas de respuesta de herramientas
│   │   │   ├── useChatLogic.ts      # Estado y lógica del chat
│   │   │   └── types.ts             # Tipos TypeScript del chat
│   │   ├── hooks/
│   │   │   ├── useLanguage.ts       # Estado de idioma ES/EN global
│   │   │   ├── useReveal.ts         # Animaciones al hacer scroll
│   │   │   ├── use-mobile.tsx       # Detección de dispositivo móvil
│   │   │   └── use-toast.ts         # Notificaciones toast
│   │   └── ui/                      # 40+ componentes shadcn/ui
│   │
│   ├── config/
│   │   ├── projects.ts              # Datos estáticos de los 3 proyectos
│   │   └── pageContext.ts           # Secciones válidas para el chatbot
│   │
│   ├── layouts/
│   │   └── Layout.astro             # Shell HTML universal (SEO, metadatos, scripts)
│   │
│   ├── lib/
│   │   ├── translations.ts          # Diccionario bilingüe completo ES/EN
│   │   ├── sendEmail.ts             # Integración con Resend API
│   │   ├── renderBold.tsx           # Convierte **texto** en <strong>
│   │   └── utils.ts                 # cn() para clases condicionales
│   │
│   ├── pages/
│   │   ├── index.astro              # Página principal del portfolio
│   │   ├── 404.astro                # Página 404 personalizada
│   │   ├── projects/
│   │   │   └── [slug].astro         # Página dinámica de detalle de proyecto
│   │   └── api/
│   │       ├── chat.ts              # Endpoint del chatbot con IA
│   │       ├── contact.ts           # Endpoint del formulario de contacto
│   │       ├── og.ts                # Endpoint de imagen Open Graph
│   │       └── prompt.ts            # System prompt y constantes del chatbot
│   │
│   ├── security/
│   │   ├── rateLimit.ts             # Rate limiting por IP (min/hora/día)
│   │   ├── sanitize.ts              # Validación y sanitización de mensajes
│   │   └── injectionPatterns.ts     # 23 patrones de inyección de prompts
│   │
│   ├── services/
│   │   ├── emailService.ts          # Capa de servicio para emails
│   │   └── groqKeyPool.ts           # Pool rotativo de hasta 20 API keys de Groq
│   │
│   └── styles/
│       └── global.css               # Fuentes, tema, clases CSS personalizadas
│
├── astro.config.mjs                 # Configuración de Astro
├── tsconfig.json                    # Configuración de TypeScript
└── package.json
```

---

## Frontend

### Secciones del portfolio

El sitio se compone de una sola página (`/`) con secciones continuas, más páginas de detalle por proyecto (`/projects/[slug]`).

**Hero** — Primera impresión del sitio. Tiene un efecto typewriter que cicla entre 4 roles profesionales, un fondo con grilla SVG animada y orbes de blur, y botones de llamada a la acción (ver proyectos y LinkedIn). Incluye un badge de disponibilidad laboral.

**Navbar** — Barra fija con auto-ocultamiento al scrollear. Implementa toggle de tema oscuro/claro (guardado en `localStorage`), toggle de idioma ES/EN (sincronizado por `CustomEvent` entre todos los componentes), menú hamburguesa para mobile con panel deslizable, enlace de descarga de CV y botón que abre el `ContactModal`.

**Skills** — Línea de tiempo de experiencia laboral (Gearthlogic LLC, Freelance) con educación, stats (años de experiencia, idiomas) y botones de contacto rápido (LinkedIn, WhatsApp, CV).

**Projects** — Grid de tarjetas de proyectos con animaciones de entrada usando GSAP ScrollTrigger. Cada tarjeta tiene un mockup de browser con imagen interactiva al hover. Los botones llevan al detalle del proyecto o al sitio en producción.

**Optimizations** — Muestra los scores de Lighthouse del sitio (97 Performance, 98 SEO) con círculos SVG animados. Incluye un grid visual de todas las tecnologías usadas con iconos de `react-icons`.

**About** — Biografía bilingüe, foto de perfil con badges flotantes de ubicación y rol, y links a redes sociales.

**Contact** — Cards con datos de contacto (email, LinkedIn, GitHub, ubicación) y formulario completo que envía al endpoint `/api/contact`.

**Footer** — Logo, descripción, iconos sociales, links de navegación, lista de tecnologías.

**EduBot (ChatAI)** — Botón robot SVG animado en la esquina inferior derecha que abre un panel de chat completo con streaming de IA en tiempo real.

### Sistema de idiomas

El hook `useLanguage` actúa como estado global sin necesitar un store externo. Cuando el usuario cambia el idioma en la Navbar, se dispara un `CustomEvent('langchange')` en el DOM. Todos los componentes escuchan este evento y actualizan su estado local. El idioma persiste en `localStorage`.

### Sistema de temas

El tema se detecta al inicio con un script inline en el `<head>` (antes de que el DOM se pinte) para evitar el flash de tema incorrecto. El toggle guarda el valor en `localStorage` y coordina con las `ViewTransitions` de Astro para que el tema no se pierda al navegar.

### Animaciones de scroll (Reveal)

El hook `useReveal` usa `IntersectionObserver` para agregar la clase `.active` a elementos con clase `.reveal` cuando entran al 15% del viewport. Cuando el usuario vuelve desde una página de detalle de proyecto, se omiten las animaciones (se lee `sessionStorage.skip-reveal`) para que el usuario regrese al estado visual que tenía en la página.

### Restauración del scroll

Cuando el usuario navega a un proyecto y regresa, el sitio:
1. Lee `sessionStorage['return-to-project']` para saber a qué tarjeta de proyecto hacer scroll
2. Lee `sessionStorage['scroll-to-section']` para navegación desde sub-páginas
3. Usa `data-project-slug` en las tarjetas para encontrar el elemento exacto al que scrollear

### Página de detalle de proyecto (`/projects/[slug]`)

Generada dinámicamente desde el array estático en `src/config/projects.ts`. Incluye:
- Slider de imágenes con GSAP (drag táctil, arrastre con mouse, teclado, dots de navegación)
- Secciones ricas desde las traducciones (intro, features, stack técnico por capa, responsabilidades)
- Sidebar sticky con metadata del proyecto
- Datos estructurados JSON-LD de tipo `CreativeWork` para SEO
- Navegación al siguiente proyecto

---

## Backend y API

Todas las rutas son endpoints Astro en `src/pages/api/`, ejecutadas como Vercel Functions.

### `POST /api/chat` — Chatbot con IA

El endpoint más complejo del sitio. Flujo completo:

```
Request (IP + messages[] + pageSection)
        │
        ▼
1. Extraer IP del request
        │
        ▼
2. Rate Limit check (5/min · 20/hora · 50/día por IP)
        │       └─ Si supera → 429
        ▼
3. Key Pool check (hay Groq keys disponibles?)
        │       └─ Si no → 503
        ▼
4. JSON parse + validar body
        │
        ▼
5. Validar idioma (es/en)
        │
        ▼
6. sanitizeInput() + validateMessages()
        │       └─ Si falla → bloquear con mensaje de error
        ▼
7. Inyectar contexto de sección (pageContext)
        │
        ▼
8. interactionLogger (analytics en memoria)
        │
        ▼
9. intentDetection() (regex → forzar tool específica)
        │
        ▼
10. streamText() con Groq (llama-3.1-8b-instant)
    + tools: showProject, showContact, showSkills,
             showExperience, showAvailability, sendContactForm
        │
        ├─ Si 429 / fallo → fallback a llama-3.3-70b-versatile
        │
        ▼
11. streamPipeline() → emitir eventos en formato Vercel AI
        │    (prefijo 0: texto · 9: tool-call · a: tool-result)
        ▼
Response: text/plain streaming
```

`maxDuration: 30` configurado para evitar timeouts de Vercel en streams largos.

### `POST /api/contact` — Formulario de contacto

1. Rate limit por IP
2. Sanitización de nombre, email y mensaje (strip de HTML y caracteres especiales)
3. Validación de formato de email con regex
4. Llamada a `sendEmail()` → Resend API → email a `jackshaw@live.com.ar`

### `GET /api/og` — Open Graph dinámico

Genera una imagen PNG de 1200×630px en el servidor usando `@vercel/og` (Edge Function). Renderiza el componente React `OGImage` con degradado metálico y badges de tecnología. Cacheable por CDN.

### `src/pages/api/prompt.ts`

No es un endpoint HTTP, sino un módulo que exporta:
- `BASE_PROMPT` — System prompt completo de EduBot con el perfil de Eduardo, proyectos, stack y reglas de comportamiento
- `ERROR_ES` / `ERROR_EN` — Mensajes de error por idioma
- `LANG_INSTRUCTION_ES` / `LANG_INSTRUCTION_EN` — Instrucciones de herramientas según idioma, agregadas al prompt en runtime

### Envío de emails (`src/lib/sendEmail.ts`)

Integración directa con la API REST de Resend (sin SDK). Escapa HTML en todos los inputs antes de construir el cuerpo del email. Si `RESEND_API_KEY` no está configurado (entorno de desarrollo), loguea en consola y retorna éxito.

### Pool de API Keys de Groq (`src/services/groqKeyPool.ts`)

Permite configurar hasta 20 API keys de Groq (`GROQ_API_KEY`, `GROQ_API_KEY_1` ... `GROQ_API_KEY_19`). La función `getAvailableGroq()` hace round-robin entre las keys, saltando las que están en cooldown. Cuando una key recibe un error 429, `markKeyCooldown()` la marca con un cooldown que respeta el header `retry-after` de la respuesta (por defecto 60 segundos).

---

## Sistema de IA (EduBot)

### Modelos LLM

| Modelo | Uso | Velocidad |
|---|---|---|
| `llama-3.1-8b-instant` | Primario (la mayoría de respuestas) | ~80-200ms |
| `llama-3.3-70b-versatile` | Fallback ante fallos o 429 | Más lento, más capaz |

### Herramientas del chatbot (Tool Calling)

EduBot tiene 6 herramientas que el LLM puede invocar. Los resultados se muestran como tarjetas visuales en el chat, no como texto plano.

| Herramienta | Qué hace |
|---|---|
| `showProject` | Muestra una tarjeta de proyecto con imagen, descripción y links (URLs validadas contra whitelist) |
| `showContact` | Muestra tarjeta con LinkedIn, email, GitHub, CV en ES/EN, teléfono |
| `showSkills` | Muestra stack técnico categorizado (Frontend, Backend, DBs, Cloud, Pagos) |
| `showExperience` | Muestra línea de tiempo de carrera (Freelance, Gearthlogic LLC, educación) |
| `showAvailability` | Lee las env vars `EDUARDO_AVAILABLE` y `AVAILABLE_FROM` para mostrar estado en tiempo real |
| `sendContactForm` | Recopila nombre/email/mensaje del usuario dentro del chat y envía el email |

### Detección de intenciones (`src/ai/intentDetection.ts`)

Antes de llamar al LLM, se analiza el mensaje con regex para detectar intenciones claras y forzar la herramienta correcta sin esperar que el modelo la seleccione. Ejemplos:

- "mostrame tus skills" → fuerza `showSkills` en el primer step
- "querés ver el proyecto omega?" → fuerza `showProject` con el slug correcto
- "mandarte un mensaje" → no fuerza herramienta (flujo de recopilación de datos)
- "todos los proyectos" → detecta que se quieren múltiples proyectos

### Pipeline de streaming (`src/ai/streamPipeline.ts`)

El cliente consume el stream línea a línea. Cada línea tiene un prefijo:

```
0:"Hola, soy EduBot"   → fragmento de texto, se concatena al mensaje
9:{"toolCallId":"..."}  → inicio de tool call, se guarda
a:{"toolCallId":"..."}  → resultado de tool call, se renderiza como tarjeta
```

El pipeline descarta texto previo a un tool call (preamble) y filtra texto posterior que parece una descripción del tool call filtrada (`TOOL_LEAK_RE`). Si el modelo emite tool calls como texto plano en lugar de JSON estructurado (comportamiento de algunos modelos pequeños de Groq), el `textToolParser.ts` los intercepta y convierte al formato correcto.

### Client-side del chat (`src/components/chat/useChatLogic.ts`)

- Persiste los últimos 30 mensajes en `localStorage` por sección de página
- Rastrea la sección visible con `IntersectionObserver` para enviar contexto al chatbot
- Serializa el historial de tool invocations como texto antes de enviarlo a la API (el LLM no recibe objetos de herramientas, solo resúmenes textuales)
- Muestra un efecto "Siri glow" en el borde del panel mientras el stream está activo

---

## Seguridad

Se implementaron 4 capas independientes de protección en el endpoint del chatbot:

### 1. Rate Limiting (`src/security/rateLimit.ts`)

Rate limiting en memoria por dirección IP con tres ventanas:

| Ventana | Límite |
|---|---|
| Por minuto | 5 requests |
| Por hora | 20 requests |
| Por día | 50 requests |

Parámetros adicionales:
- Longitud máxima de mensaje: 500 caracteres
- Historial máximo de conversación: 8 mensajes
- En modo `DEV` el rate limiting está deshabilitado
- Limpieza automática de registros expirados cada 1 hora con `setInterval`

### 2. Sanitización y validación (`src/security/sanitize.ts`)

- `sanitizeInput()`: verifica patrones de inyección y detecta flooding por repetición (ratio de palabras únicas < 0.2)
- `validateMessages()`: valida estructura del array, nombres de roles válidos (solo `user`/`assistant`), sanitiza todos los mensajes de usuario y verifica longitud del último mensaje

### 3. Patrones de inyección de prompts (`src/security/injectionPatterns.ts`)

23 expresiones regulares que bloquean mensajes que intentan:
- `ignore/forget previous instructions`
- `you are now` / `act as` / `pretend to be`
- `jailbreak` / `DAN` / `developer mode`
- `system:` / `[INST]` / `<<SYS>>`
- `base64 decode`
- Solicitar revelar el system prompt o instrucciones

### 4. Whitelists en herramientas (`src/ai/tools.ts`)

- Las URLs e imágenes que `showProject` puede retornar están validadas contra un conjunto de valores conocidos, impidiendo que el modelo retorne URLs arbitrarias al cliente
- Los slugs de proyectos son validados contra `VALID_SECTIONS`

---

## Tecnologías usadas y por qué

### Astro — Framework principal

Elegido por su modelo de "islas": el servidor genera HTML puro y solo los componentes interactivos reciben JavaScript en el cliente. Resultado directo: Lighthouse Performance 97. Además soporta SSR completo (necesario para las API routes y la generación dinámica de OG images), tiene integración nativa con React, y el sistema de ViewTransitions da navegación fluida entre páginas sin recargar.

### React 19 — Componentes interactivos

Usado únicamente donde se necesita interactividad real (chat, formularios, animaciones de estado). Al correrse como islands dentro de Astro, no penaliza la carga inicial del sitio.

### TypeScript — Todo el codebase

Modo estricto en todo el proyecto. Los tipos permiten validar los schemas de las herramientas del chatbot, el contrato entre frontend y API, y los datos de proyectos (inferidos como `const` tuple para máxima precisión de tipos).

### Tailwind CSS v4 — Estilos

La nueva versión v4 (via plugin de Vite, sin `tailwind.config.js`) reduce la fricción de configuración. Combinado con shadcn/ui y Radix UI, permite construir componentes accesibles y consistentes rápidamente sin gestionar variables CSS manualmente.

### Groq + Vercel AI SDK — IA

Groq provee inferencia de LLMs de código abierto (Llama) con latencia extremadamente baja (~80ms para el modelo pequeño), lo que hace que el chat se sienta instantáneo. El Vercel AI SDK abstrae el streaming, el tool calling y el manejo de fallbacks. Se eligió sobre OpenAI por costo cero en el tier gratuito de Groq y por la velocidad superior para casos de uso conversacionales simples.

### GSAP + ScrollTrigger — Animaciones

Usado para las animaciones de entrada de las tarjetas de proyectos y para el slider de imágenes en el detalle de proyecto. Se eligió GSAP sobre CSS animations puras porque permite control preciso del timeline (reverse, pausa, drag con momentum) y un slider custom sin dependencias de carrusel que no se podían personalizar completamente.

### Resend — Emails transaccionales

API de emails moderna con buena deliverability y SDK/REST sencillo. Integrado directamente via `fetch` sin SDK para mantener el bundle pequeño. Permite tener un reply-to configurado para que los emails del formulario lleguen con el email del remitente.

### @vercel/og — Imágenes Open Graph

Genera imágenes PNG en el servidor (Edge Function) desde componentes React. Elimina la necesidad de pre-generar imágenes estáticas o mantener assets de OG separados. El resultado es una imagen de preview actualizable dinámicamente en redes sociales.

### shadcn/ui + Radix UI — Componentes base

Radix UI provee primitivos accesibles (gestión de foco, aria labels, portals para modales) sin imponer estilos. shadcn/ui agrega una capa de estilo sobre estos primitivos que vive en el propio proyecto, haciéndolos completamente personalizables sin depender de una librería externa que podría cambiar de API.

### pnpm — Gestor de paquetes

Más rápido que npm/yarn en instalaciones gracias al store global con hard links. El flag `shamefully-hoist=true` en `.npmrc` garantiza compatibilidad con herramientas que esperan la estructura `node_modules` flat tradicional (como algunas dependencias de Radix y GSAP).

### Vercel — Despliegue

Plataforma elegida por su integración nativa con Astro (adaptador oficial), experiencia de deploy zero-config, Edge Functions para el endpoint de OG, y CDN global para todos los assets estáticos. La variable `maxDuration: 30` en el endpoint de chat evita que el timeout por defecto de Vercel (10s) corte el stream de la IA.

---

## Variables de entorno

```env
# IA - Groq (hasta 20 keys para rotación automática)
GROQ_API_KEY=gsk_...
GROQ_API_KEY_1=gsk_...       # Opcional
GROQ_API_KEY_2=gsk_...       # Opcional
# ... hasta GROQ_API_KEY_19

# Email - Resend
RESEND_API_KEY=re_...

# Disponibilidad laboral (leído en tiempo real por el chatbot)
EDUARDO_AVAILABLE=true        # "true" o "false"
AVAILABLE_FROM=               # Fecha si no está disponible aún

# Entorno
NODE_ENV=development          # Desactiva rate limiting en dev
```

---

## Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando | Acción |
|---|---|
| `pnpm install` | Instala las dependencias |
| `pnpm dev` | Inicia el servidor de desarrollo en `localhost:4321` |
| `pnpm build` | Genera el build de producción en `./dist/` |
| `pnpm preview` | Previsualiza el build de producción localmente |
| `pnpm astro check` | Verifica tipos en archivos `.astro` |

---

## SEO y Performance

- **Sitemap** automático generado por `@astrojs/sitemap` con `changefreq: monthly` y `priority: 1.0`
- **robots.txt** que permite todo el sitio y bloquea `/api/`
- **JSON-LD** estructurado en cada página: `Person`, `WebSite`, `WebPage`, `ProfilePage` en el index; `CreativeWork` con breadcrumbs en páginas de proyecto
- **Open Graph** y **Twitter Card** en todas las páginas
- **Fuentes self-hosted** (General Sans + Inter variable) con `font-display: swap` para evitar layout shifts
- **Imágenes WebP** para todas las fotos del portfolio
- **ViewTransitions** de Astro para navegación sin recarga completa (efecto SPA)
- **PWA-ready**: `site.webmanifest`, iconos en múltiples tamaños, `apple-touch-icon`
