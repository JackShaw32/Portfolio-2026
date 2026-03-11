import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D3sYOqQv.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_CrUp9LjC.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 \u2014 P\xE1gina no encontrada", "description": "La p\xE1gina que buscas no existe. Vuelve al portfolio de Eduardo Cabral.", "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-screen items-center justify-center bg-muted"> <div class="text-center"> <h1 class="mb-4 text-4xl font-bold">404</h1> <p class="mb-4 text-xl text-muted-foreground">¡Ups! Página no encontrada</p> <a href="/" class="text-primary underline hover:text-primary/90 transition-colors">
Volver al inicio
</a> </div> </div> ` })}`;
}, "C:/Users/Lenovo/Desktop/educcabral/src/pages/404.astro", void 0);

const $$file = "C:/Users/Lenovo/Desktop/educcabral/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
