import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_BisCJTvH.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Cpz6quGY.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Lenovo/Desktop/educcabral/","cacheDir":"file:///C:/Users/Lenovo/Desktop/educcabral/node_modules/.astro/","outDir":"file:///C:/Users/Lenovo/Desktop/educcabral/dist/","srcDir":"file:///C:/Users/Lenovo/Desktop/educcabral/src/","publicDir":"file:///C:/Users/Lenovo/Desktop/educcabral/public/","buildClientDir":"file:///C:/Users/Lenovo/Desktop/educcabral/dist/client/","buildServerDir":"file:///C:/Users/Lenovo/Desktop/educcabral/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CjNRGCDt.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/chat","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/chat\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"chat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/chat.ts","pathname":"/api/chat","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/og","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/og\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"og","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/og.ts","pathname":"/api/og","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/prompt","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/prompt\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"prompt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/prompt.ts","pathname":"/api/prompt","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CjNRGCDt.css"}],"routeData":{"route":"/projects/[slug]","isIndex":false,"type":"page","pattern":"^\\/projects\\/([^/]+?)\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/projects/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CjNRGCDt.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://jackshaw32.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Lenovo/Desktop/educcabral/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/Lenovo/Desktop/educcabral/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Lenovo/Desktop/educcabral/src/pages/projects/[slug].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/chat@_@ts":"pages/api/chat.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/api/og@_@ts":"pages/api/og.astro.mjs","\u0000@astro-page:src/pages/api/prompt@_@ts":"pages/api/prompt.astro.mjs","\u0000@astro-page:src/pages/projects/[slug]@_@astro":"pages/projects/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DoxUVqnD.mjs","C:/Users/Lenovo/Desktop/educcabral/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Cd2v03We.mjs","@/components/Navbar":"_astro/Navbar.mXAOfP4u.js","@/components/ProjectDetail":"_astro/ProjectDetail.ByN239qB.js","@/components/Footer":"_astro/Footer.C6gVi9fz.js","@/components/ChatAI":"_astro/ChatAI.BzaAKNrA.js","@/components/Hero":"_astro/Hero.6_1UWwSP.js","@/components/Skills":"_astro/Skills.CnP-e_N1.js","@/components/Projects":"_astro/Projects.DBJLCX-5.js","@/components/Optimizations":"_astro/Optimizations.ivBpnOUj.js","@/components/About":"_astro/About.5-gFV5El.js","@astrojs/react/client.js":"_astro/client.dXHaCmHv.js","C:/Users/Lenovo/Desktop/educcabral/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.CUFyFZ_L.js","C:/Users/Lenovo/Desktop/educcabral/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CDGfc0hd.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Lenovo/Desktop/educcabral/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","function t(){try{const e=localStorage.getItem(\"theme\");e===\"dark\"||!e&&window.matchMedia(\"(prefers-color-scheme: dark)\").matches?document.documentElement.classList.add(\"dark\"):document.documentElement.classList.remove(\"dark\")}catch{}}t();window.addEventListener(\"storage\",function(e){e.key===\"theme\"&&t()});document.addEventListener(\"astro:after-swap\",t);"]],"assets":["/_astro/inter-cyrillic-wght-normal.DqGufNeO.woff2","/_astro/inter-cyrillic-ext-wght-normal.BOeWTOD4.woff2","/_astro/inter-greek-ext-wght-normal.DlzME5K_.woff2","/_astro/inter-greek-wght-normal.CkhJZR-_.woff2","/_astro/inter-latin-ext-wght-normal.DO1Apj_S.woff2","/_astro/inter-latin-wght-normal.Dx4kXJAl.woff2","/_astro/inter-cyrillic-ext-wght-italic.B5xAaiFk.woff2","/_astro/inter-vietnamese-wght-normal.CBcvBZtf.woff2","/_astro/inter-greek-ext-wght-italic.DcOpz6Lw.woff2","/_astro/inter-greek-wght-italic.CILZdfAp.woff2","/_astro/inter-cyrillic-wght-italic.DzZdc28x.woff2","/_astro/inter-vietnamese-wght-italic.K3WlGtc8.woff2","/_astro/inter-latin-ext-wght-italic.0pjOp8NU.woff2","/_astro/jetbrains-mono-cyrillic-wght-normal.D73BlboJ.woff2","/_astro/inter-latin-wght-italic.DpCbqKDY.woff2","/_astro/jetbrains-mono-latin-ext-wght-normal.DBQx-q_a.woff2","/_astro/jetbrains-mono-latin-wght-normal.B9CIFXIH.woff2","/_astro/jetbrains-mono-vietnamese-wght-normal.Bt-aOZkq.woff2","/_astro/jetbrains-mono-greek-wght-normal.Bw9x6K1M.woff2","/_astro/index.CjNRGCDt.css","/20220924_233024.webp","/apple-touch-icon.png","/favicon-96x96.png","/favicon.ico","/favicon.svg","/robots.txt","/site.webmanifest","/web-app-manifest-192x192.png","/web-app-manifest-512x512.png","/fonts/general-sans-400.woff2","/fonts/general-sans-500.woff2","/fonts/general-sans-600.woff2","/fonts/general-sans-700.woff2","/projects/14milla-2.webp","/projects/14milla-3.webp","/projects/14milla-4.webp","/projects/14milla.webp","/projects/alfyvivi-2.webp","/projects/alfyvivi.webp","/projects/omega-2.webp","/projects/omega-3.webp","/projects/omega.webp","/_astro/About.5-gFV5El.js","/_astro/ChatAI.BzaAKNrA.js","/_astro/chevron-right.TR0uobKc.js","/_astro/circle-check.DVEqkDkX.js","/_astro/client.dXHaCmHv.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CDGfc0hd.js","/_astro/ContactModal.-rJ5_ZwJ.js","/_astro/download.BH7SBjRu.js","/_astro/external-link.C4bwSBAk.js","/_astro/file-down.FK6pdPva.js","/_astro/Footer.C6gVi9fz.js","/_astro/github.UDVhIEk0.js","/_astro/graduation-cap.CMkx5JbA.js","/_astro/Hero.6_1UWwSP.js","/_astro/index.DYrVU9rO.js","/_astro/linkedin.DLQopQ7s.js","/_astro/map-pin.D0-aFjwU.js","/_astro/Navbar.mXAOfP4u.js","/_astro/Optimizations.ivBpnOUj.js","/_astro/ProjectDetail.ByN239qB.js","/_astro/Projects.DBJLCX-5.js","/_astro/ScrollTrigger.B8Rjdjzq.js","/_astro/Skills.CnP-e_N1.js","/_astro/translations.BnPLLmxL.js","/_astro/useReveal.BLUGUght.js","/_astro/x.JiAxxVC0.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"TNm35bdzEkhJVFLUfp+MN6EuHLqR5vKBjyTW6yRe5E4="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
