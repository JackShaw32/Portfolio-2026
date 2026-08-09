# Portfolio de Eduardo Cabral

Sitio web de portfolio profesional con chatbot de inteligencia artificial, diseñado para mostrar proyectos, experiencia laboral y habilidades técnicas. Construido con **Astro v5 SSR** + **React 19 islands** + **Tailwind CSS v4**. Desplegado en **Vercel** con pre-renderizado ISR.

---

## Por qué se hizo este proyecto

El objetivo fue reemplazar un CV estático por una experiencia interactiva donde cualquier visitante pueda explorar los proyectos, conocer la experiencia laboral y contactar directamente sin salir del sitio. Se integró un chatbot con IA real (EduBot) para que los reclutadores y clientes puedan hacer preguntas en lenguaje natural y obtener respuestas personalizadas sobre disponibilidad, stack técnico y proyectos, con soporte bilingüe (español e inglés).

---

## Tabla de contenidos

- [Arquitectura general](#arquitectura-general)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Frontend](#frontend)
  - [Smooth Scroll (Lenis)](#smooth-scroll-lenis)
  - [Animaciones de scroll (Reveal)](#animaciones-de-scroll-reveal)
  - [View Transitions y Shared Element Transitions](#view-transitions-y-shared-element-transitions)
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
    │  About             │
    │  ChatAI / Footer   │
    └────────────────────┘
```

### Patrón de Islas (Islands Architecture)

Astro renderiza el HTML en el servidor. Solo los componentes React que necesitan interactividad se hidratan en el cliente, con estrategias específicas por componente:

| Directiva | Cuándo hidrata | Usado en |
|---|---|---|
| `client:load` | Inmediatamente | Navbar, Hero |
| `client:visible` | Al hacer scroll | Skills, Projects, Optimizations, CommentsSection |
| `client:idle` | Cuando el browser está libre | About, Footer, ChatAI |

Esto resulta en un sitio con carga inicial muy rápida, ya que la mayoría del contenido llega como HTML puro sin JS.

---

## Estructura de carpetas

```
educcabral/
├── public/                          # Archivos estáticos
│   ├── fonts/                       # General Sans (woff2, self-hosted)
│   ├── projects/                    # Imágenes de proyectos (.webp)
│   ├── favicon.svg / favicon.ico    # Ícono Terminal con fondo negro circular
│   ├── site.webmanifest             # PWA manifest
│   └── robots.txt
│
├── src/
│   ├── ai/                          # Lógica del chatbot IA
│   │   ├── model.ts                 # Definición de modelos LLM
│   │   ├── tools.ts                 # 10 herramientas del chatbot
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
│   │   ├── ContactModal.tsx         # Modal de contacto reutilizable
│   │   ├── CommentsSection.tsx      # Sección de reseñas con estrellas
│   │   ├── Footer.tsx               # Pie de página
│   │   ├── ProjectDetail.tsx        # Página de detalle de proyecto
│   │   ├── OGImage.tsx              # Imagen Open Graph generada en el servidor
│   │   ├── ChatAI.tsx               # Orquestador del chat
│   │   ├── chat/                    # Sub-componentes del chat
│   │   │   ├── ChatPanel.tsx        # UI del panel de chat
│   │   │   ├── RobotButton.tsx      # Botón robot SVG animado
│   │   │   ├── ToolResultCard.tsx   # Tarjetas de respuesta de herramientas
│   │   │   ├── useChatLogic.ts      # Estado y lógica del chat
│   │   │   └── types.ts             # Tipos TypeScript del chat
│   │   └── hooks/
│   │       ├── useLanguage.ts       # Estado de idioma ES/EN global
│   │       └── useReveal.ts         # Animaciones al hacer scroll con soporte de navegación
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
│   │   ├── admin/
│   │   │   └── comments.astro       # Panel de admin para reseñas
│   │   ├── projects/
│   │   │   └── [slug].astro         # Página dinámica de detalle de proyecto
│   │   └── api/
│   │       ├── chat.ts              # Endpoint del chatbot con IA
│   │       ├── comments.ts          # Endpoint CRUD de reseñas (Redis)
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

**Hero** — Primera impresión del sitio. Tiene un efecto typewriter que cicla entre 4 roles profesionales y botones de llamada a la acción (ver proyectos y LinkedIn). El fondo combina orbes aurora (violeta/rosa/índigo) con una textura de ruido/grano generada por SVG `feTurbulence + feColorMatrix` que simula partículas difuminadas. El heading usa "Construyendo productos web modernos y escalables" / "Building modern and scalable web products" con fuente semibold. En modo oscuro los orbes se ocultan y las partículas se vuelven blancas sobre fondo negro puro, al estilo bun.com. Incluye un badge de disponibilidad laboral.

**Navbar** — Barra fija con auto-ocultamiento al scrollear. Implementa toggle de tema oscuro/claro (guardado en `localStorage`), toggle de idioma ES/EN (sincronizado por `CustomEvent` entre todos los componentes), menú hamburguesa para mobile con panel deslizable, enlace de descarga de CV y botón que abre el `ContactModal`. En desktop muestra un ícono `Terminal` de Lucide como logo personal en la izquierda (en mobile muestra la foto de perfil circular). Los links de navegación en mobile usan `<button>` con JS scroll para ocultar `#` de la barra de estado. En sub-páginas (`/projects/[slug]`), los links navegan a `/#seccion` usando View Transitions de Astro. Incluye un manejador global de mousemove que actualiza `--glow-x`/`--glow-y` en elementos `.glass` y `.glow-card` para el efecto de glow que sigue al cursor.

**Skills** — Línea de tiempo de experiencia laboral (Gearthlogic LLC, Freelance) con educación, stats (años de experiencia, idiomas) y botones de contacto rápido (WhatsApp, CV, LinkedIn, GitHub). Incluye tarjetas KPI con sparklines animados (RAF + ease-out cúbico): la línea SVG, los puntos y el contador numérico se sincronizan en el mismo loop de animación usando `pathLength="1000"` y distancias euclidianas acumuladas para el timing de cada punto. El botón "Contactame" abre el `ContactModal` directamente desde la sección. Las tarjetas de experiencia, educación y stats tienen la clase `glow-card` con el mismo efecto de glow que sigue al cursor.

**Projects** — Grid de tarjetas de proyectos con animaciones de entrada usando GSAP ScrollTrigger. Cada tarjeta tiene un mockup de browser con imagen interactiva al hover. Los botones llevan al detalle del proyecto o al sitio en producción.

**Optimizations** — Muestra los scores de Lighthouse del sitio (97 Performance, 98 SEO) con círculos SVG animados vía RAF. Los arcos, los números y los iconos arrancan en rojo y transicionan a naranja y luego a verde siguiendo la escala de colores oficial de Lighthouse (0–49 rojo, 50–89 naranja, 90+ verde), todo interpolado con `lerp()` RGB en sync con los contadores. Incluye un botón de replay junto al filename `lighthouse-report.json` que reinicia la animación completa. También contiene un grid visual de todas las tecnologías usadas con iconos de `react-icons`.

**About** — Biografía bilingüe, foto de perfil circular con zoom sutil al hover (`scale-[1.08]` interno, clippeado al círculo), badges flotantes de ubicación y rol, y links a redes sociales.

**CommentsSection** — Sección de reseñas con sistema de estrellas (1-5). Los comentarios se almacenan en Upstash Redis y se muestran con paginación (3 por desktop, 1 por mobile). Cada tarjeta muestra iniciales del autor con avatar de color aleatorio, fecha formateada, badge de "Verified review" y botón de traducción automática ES/EN via MyMemory API. Al enviar un nuevo comentario desde el chat, la sección se actualiza automáticamente sin recargar la página.

**Footer** — Logo, descripción, iconos sociales, links de navegación, lista de tecnologías (incluye Redis).

**EduBot (ChatAI)** — Botón robot SVG animado en la esquina inferior derecha que abre un panel de chat completo con streaming de IA en tiempo real.

### Sistema de idiomas

El hook `useLanguage` actúa como estado global sin necesitar un store externo. Cuando el usuario cambia el idioma en la Navbar, se dispara un `CustomEvent('langchange')` en el DOM. Todos los componentes escuchan este evento y actualizan su estado local. El idioma persiste en `localStorage`.

### Sistema de temas

El tema se detecta al inicio con un script inline en el `<head>` (antes de que el DOM se pinte) para evitar el flash de tema incorrecto. El toggle guarda el valor en `localStorage` y coordina con el `ClientRouter` de Astro para que el tema no se pierda al navegar.

### Efecto de glow que sigue al cursor

Las tarjetas con clase `.glass` (y las targetas con clase `.glow-card`) tienen un pseudo-elemento `::before` con un `radial-gradient` de 350px que sigue al cursor. Un único manejador global de `mousemove` en la Navbar actualiza las propiedades CSS `--glow-x` y `--glow-y` en el elemento `.glass` o `.glow-card` más cercano al cursor. El glow solo es visible al hacer hover (`opacity: 1` en `:hover::before`), manteniendo la interfaz limpia en reposo. El chat AI usa una clase `glass-no-glow` que desactiva tanto el glow como el `cursor: crosshair`.

### Smooth Scroll (Lenis)

Integrado con `lenis` para reemplazar el scroll nativo del browser con un scroll suave con inercia controlada. Configurado con `duration: 1.2` y una curva de ease-out exponencial. Se conecta al ticker de GSAP (`gsap.ticker`) para sincronizarse perfectamente con las animaciones de `ScrollTrigger`. Se inicializa en el `<head>` de `Layout.astro` y se destruye/reinicializa en cada `ViewTransition` de Astro para evitar instancias huérfanas.

El panel de mensajes del chatbot tiene `data-lenis-prevent` para que Lenis no intercepte el scroll interno del chat, y `overscroll-contain` como CSS de respaldo para que el scroll no se propague a la página al llegar al límite del panel.

### Animaciones de scroll (Reveal)

El hook `useReveal` usa `IntersectionObserver` para agregar la clase `.active` a elementos con clase `.reveal` cuando entran al 15% del viewport, disparando la transición CSS `opacity 0→1 + translateY 30px→0` en `0.8s`.

Cuando el usuario navega a una sección via menú o footer, se activan dos flags globales en `window`:
- `__navScrolling` — indica que hay una navegación programática en curso
- `__navTarget` — referencia al elemento destino de la navegación

Mientras `__navScrolling` está activo, el observer ignora todas las intersecciones excepto las de elementos dentro de `__navTarget`. Así las secciones intermedias no disparan animaciones durante el scroll (evitando el lag), pero la sección destino sí anima normalmente mientras entra al viewport. Al completarse el scroll, ambas flags se limpian y el observer vuelve a su comportamiento normal.

Cuando el usuario vuelve desde una página de detalle de proyecto, se omiten todas las animaciones leyendo `sessionStorage['skip-reveal']` para que regrese al estado visual que tenía.

### Restauración del scroll

Cuando el usuario navega a un proyecto y regresa, el sitio:
1. Lee `sessionStorage['return-to-project']` para saber a qué tarjeta de proyecto hacer scroll
2. Lee `sessionStorage['scroll-to-section']` para navegación desde sub-páginas (legacy)
3. Usa `data-project-slug` en las tarjetas para encontrar el elemento exacto al que scrollear

Desde sub-páginas, los links de navegación usan `<a href="/#seccion">` para que Astro intercepte el click con View Transitions. En el evento `astro:after-swap` y en la carga inicial, se lee `location.hash` para scrollear suavemente a la sección correspondiente usando Lenis.

### Página de detalle de proyecto (`/projects/[slug]`)

Generada dinámicamente desde el array estático en `src/config/projects.ts`. Incluye:
- Slider de imágenes con GSAP (drag táctil, arrastre con mouse, teclado, dots de navegación)
- Secciones ricas desde las traducciones (intro, features, stack técnico por capa, responsabilidades)
- Sidebar sticky con metadata del proyecto
- Datos estructurados JSON-LD de tipo `CreativeWork` para SEO
- Navegación al siguiente proyecto

### View Transitions y Shared Element Transitions

El sitio usa `<ClientRouter />` de Astro (antes llamado `<ViewTransitions />`, renombrado en v5) combinado con la **View Transitions API** del browser para transitions fluidas entre páginas.

**Shared Element Transition (portfolio → proyecto):**

Al hacer click en el card de un proyecto, la imagen del card "vuela" y se expande hasta convertirse en el slider de imágenes del detalle. Se implementa asignando un `view-transition-name` único (usando el slug del proyecto) al `<a>` que contiene la imagen del card en `Projects.tsx` y al wrapper del `ImageSlider` en `ProjectDetail.tsx`. El browser interpola automáticamente posición, dimensiones y `border-radius` entre los dos elementos durante 400ms con easing material (`cubic-bezier(0.2, 0, 0, 1)`).

**Navegación de vuelta (proyecto → portfolio):**

Al volver al portfolio (desde cualquier vía: botón superior, botón inferior, o back del browser), la transición shared element se cancela completamente para evitar que la imagen "vuele" desde una posición fuera del viewport. Esto se resuelve en `astro:before-swap`: cuando se detecta que se sale de `/projects/...` hacia `/` (o que la dirección es `back`), se recorre el DOM de ambos documentos (saliente y entrante) y se elimina la propiedad `view-transition-name` de todos los elementos que la tienen, antes de que el browser capture los snapshots. El resultado es una transición limpia sin morph, con el card ya en su posición correcta tras la restauración de scroll.

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

### `GET/POST/DELETE /api/comments` — Reseñas

Gestiona las reseñas de usuarios usando **Upstash Redis** (Vercel KV):

- **GET**: Devuelve el array de comentarios almacenado en la key `portfolio:comments`
- **POST**: Guarda un nuevo comentario. Incluye rate limiting (1/hora por IP), honeypot anti-bot, sanitización de HTML, detección de duplicados, y validación de campos (nombre ≤100, mensaje ≤1000, estrellas 1-5)
- **DELETE** (admin): Requiere token `COMMENTS_ADMIN_TOKEN` en header `Authorization`

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

EduBot tiene 10 herramientas que el LLM puede invocar. Los resultados se muestran como tarjetas visuales en el chat, no como texto plano.

| Herramienta | Qué hace |
|---|---|
| `showProject` | Tarjeta de proyecto con imagen, descripción y links (URLs validadas contra whitelist) |
| `showContact` | Tarjeta con LinkedIn, email, GitHub, CV en ES/EN, teléfono |
| `showSkills` | Stack técnico categorizado (Frontend, Backend, DBs, Cloud, Pagos) |
| `showExperience` | Línea de tiempo de carrera (Freelance, Gearthlogic LLC, educación) |
| `showProfile` | Resumen completo del perfil profesional |
| `showAvailability` | Lee env vars `EDUARDO_AVAILABLE` y `AVAILABLE_FROM` para mostrar estado en tiempo real |
| `showImpact` | Métricas de impacto y 4 Lighthouse scores del portfolio |
| `showRecommendation` | "Por qué contratarlo" con score y secciones (Strengths, Ideal For, Differentiators) |
| `showArchitecture` | Diagrama de arquitectura por capas del portfolio y proyectos |
| `sendContactForm` | Recopila nombre/email/mensaje del usuario y envía el email |
| `showCommentForm` | Renderiza formulario de reseña con estrellas |
| `submitComment` | Guarda la reseña en Redis |

### Modelo dual (8b + 70b)

- **`llama-3.1-8b-instant`** — respuestas de texto (rápido, 560 t/s, $0.05/1M tokens)
- **`llama-3.3-70b-versatile`** — tool calls forzadas (280 t/s, $0.59/1M tokens, soporta function calling nativo)
- `prepareStep` en `streamText` cambia de modelo automáticamente por step: cuando se detecta un tool forzado (forcedTool, multiProject), usa 70b para ese step y vuelve a 8b para texto.
- `sendContactForm` se ejecuta del lado del servidor (bypassea el LLM) cuando `isContactMessageStep` detecta que el usuario completó nombre + email + mensaje.

### Slash commands

Escribí `/help` en el chat o presioná `/` para ver el menú de comandos disponibles:

| Comando | Qué hace | Tipo |
|---|---|---|
| `/skills` / `/stack` | Tech stack | API tool |
| `/projects` | Proyectos | API tool |
| `/contact` | Contacto | API tool |
| `/experience` | Experiencia | API tool |
| `/availability` | Disponibilidad | API tool |
| `/impact` | Métricas y Lighthouse | API tool |
| `/arch` | Diagrama de arquitectura | API tool |
| `/profile` | Perfil completo | API tool |
| `/hire` | Por qué contratarlo | API tool |
| `/comment` | Dejar reseña | API tool |
| `/clear` | Limpiar chat | Cliente |
| `/help` | Mostrar comandos | Cliente |
| `/go [sección]` | Scroll a sección | Cliente |
| `/goto [proyecto]` | Abrir proyecto | Cliente |
| `/dark` / `/light` | Cambiar tema | Cliente |
| `/lang` | Cambiar idioma | Cliente |
| `/menu` | Menú navegación | Cliente |
| `/contactform` | Formulario contacto | Cliente |
| `/cv` | Descargar CV | Cliente |
| `/game` | Jugar Simón Dice! | Cliente |

### Detección de intenciones (`src/ai/intentDetection.ts`)

Antes de llamar al LLM, se analiza el mensaje con regex para detectar intenciones claras y forzar la herramienta correcta sin esperar que el modelo la seleccione. Ejemplos:

- "mostrame tus skills" → fuerza `showSkills` en el primer step
- "querés ver el proyecto omega?" → fuerza `showProject` con el slug correcto
- "mostrame el impacto de edu" → fuerza `showImpact` (previene que el modelo invente tarjetas de proyecto)
- "mandarte un mensaje" → no fuerza herramienta (flujo de recopilación de datos)
- "todos los proyectos" → detecta que se quieren múltiples proyectos

### Pipeline de streaming (`src/ai/streamPipeline.ts`)

El cliente consume el stream línea a línea. Cada línea tiene un prefijo:

```
0:"Hola, soy EduBot"   → fragmento de texto, se concatena al mensaje
9:{"toolCallId":"..."}  → inicio de tool call, se guarda
a:{"toolCallId":"..."}  → resultado de tool call, se renderiza como tarjeta
```

El pipeline descarta texto previo a un tool call (preamble) y filtra texto posterior con `TOOL_LEAK_RE` (atrapa nombres de tool sueltos como texto, tool calls escritas como `<function=...>`, y etiquetas como "Título:" o "Descripción:"). Si el modelo emite tool calls como texto plano en lugar de JSON estructurado, el `textToolParser.ts` los intercepta mediante `XML_TOOL_RE` (formato `<function=toolName>...`) y `NATURAL_TOOL_RE` (formato `toolName({...})`) y los convierte al formato correcto.

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

## Testing del portfolio

57 tests unitarios con **Vitest** ubicados junto al código fuente:

| Archivo | Tests | Coverage |
|---|---|---|
| `src/ai/intentDetection.test.ts` | 17 | Patrones de detección de las 10 tools |
| `src/ai/tools.test.ts` | 12 | Ejecución, sanitización y whitelist de todas las tools |
| `src/security/sanitize.test.ts` | 14 | 23 patrones de inyección, flooding, validación |
| `src/ai/streamReader.test.ts` | 4 | Serialización del historial del chat |
| `src/ai/textToolParser.test.ts` | 3 | XML y text tool calls parsing |

```bash
pnpm test        # Ejecución única
pnpm test:watch  # Modo watch
```

---

## Tecnologías usadas y por qué

### Astro — Framework principal

Elegido por su modelo de "islas": el servidor genera HTML puro y solo los componentes interactivos reciben JavaScript en el cliente. Resultado directo: Lighthouse Performance 97. Además soporta SSR completo (necesario para las API routes y la generación dinámica de OG images), tiene integración nativa con React, y el sistema de ViewTransitions da navegación fluida entre páginas sin recargar.

### React 19 — Componentes interactivos

Usado únicamente donde se necesita interactividad real (chat, formularios, animaciones de estado). Al correrse como islands dentro de Astro, no penaliza la carga inicial del sitio.

### TypeScript — Todo el codebase

Modo estricto en todo el proyecto. Los tipos permiten validar los schemas de las herramientas del chatbot, el contrato entre frontend y API, y los datos de proyectos (inferidos como `const` tuple para máxima precisión de tipos).

### Tailwind CSS v4 — Estilos

La nueva versión v4 (via plugin de Vite, sin `tailwind.config.js`) reduce la fricción de configuración. El sistema de variables CSS nativas de v4 permite gestionar el tema oscuro/claro sin configuración extra.

### Lenis — Smooth Scroll

Librería ligera para reemplazar el scroll nativo con scroll suave controlado por inercia. Se eligió sobre alternativas (locomotive-scroll, custom wheel listeners) por su integración directa con GSAP ticker, su API simple, y la propiedad `data-lenis-prevent` que permite excluir elementos específicos (como el panel del chat) sin configuración adicional.

### GSAP + ScrollTrigger — Animaciones

Usado para las animaciones de entrada de las tarjetas de proyectos y para el slider de imágenes en el detalle de proyecto. Se eligió GSAP sobre CSS animations puras porque permite control preciso del timeline (reverse, pausa, drag con momentum) y un slider custom sin dependencias de carrusel que no se podían personalizar completamente.

### Groq + Vercel AI SDK — IA

Groq provee inferencia de LLMs de código abierto (Llama) con latencia extremadamente baja (~80ms para el modelo pequeño), lo que hace que el chat se sienta instantáneo. El Vercel AI SDK abstrae el streaming, el tool calling y el manejo de fallbacks. Se eligió sobre OpenAI por costo cero en el tier gratuito de Groq y por la velocidad superior para casos de uso conversacionales simples.

### Resend — Emails transaccionales

API de emails moderna con buena deliverability y SDK/REST sencillo. Integrado directamente via `fetch` sin SDK para mantener el bundle pequeño. Permite tener un reply-to configurado para que los emails del formulario lleguen con el email del remitente.

### @vercel/og — Imágenes Open Graph

Genera imágenes PNG en el servidor (Edge Function) desde componentes React. Elimina la necesidad de pre-generar imágenes estáticas o mantener assets de OG separados. El resultado es una imagen de preview actualizable dinámicamente en redes sociales.

### pnpm — Gestor de paquetes

Más rápido que npm/yarn en instalaciones gracias al store global con hard links. El flag `shamefully-hoist=true` en `.npmrc` garantiza compatibilidad con herramientas que esperan la estructura `node_modules` flat tradicional.

### Upstash Redis — Almacenamiento de reseñas

Base de datos Redis serverless integrada via Vercel KV. Almacena los comentarios de usuarios como un array JSON en una sola key (`portfolio:comments`). Sin conexiones persistentes, sin servidor que mantener, con latencia <5ms.

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

# Upstash Redis (Vercel KV) — Reseñas
KV_REST_API_URL=https://...   # URL de la API REST de KV
KV_REST_API_TOKEN=...         # Token de acceso

# Admin — Reseñas
COMMENTS_ADMIN_TOKEN=...      # Token para eliminar reseñas

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
| `pnpm build` | Genera el build de producción en `./dist/` + pre-renderizado ISR |
| `pnpm preview` | Previsualiza el build de producción localmente |
| `pnpm test` | Tests unitarios (57 tests con Vitest) |
| `pnpm test:watch` | Tests en modo watch |
| `pnpm astro check` | Verifica tipos en archivos `.astro` |

---

## SEO y Performance

- **Sitemap** automático generado por `@astrojs/sitemap` con `changefreq: monthly` y `priority: 1.0`
- **robots.txt** que permite todo el sitio y bloquea `/api/`
- **JSON-LD** estructurado en cada página: `Person`, `WebSite`, `WebPage`, `ProfilePage` en el index; `CreativeWork` con breadcrumbs en páginas de proyecto
- **Open Graph** y **Twitter Card** en todas las páginas
- **Fuentes self-hosted** (General Sans + Inter variable) con `font-display: swap` para evitar layout shifts
- **Imágenes WebP** para todas las fotos del portfolio
- **`ClientRouter`** de Astro (View Transitions API) para navegación sin recarga y Shared Element Transitions en cards de proyectos
- **PWA-ready**: `site.webmanifest`, iconos en múltiples tamaños, `apple-touch-icon`

---