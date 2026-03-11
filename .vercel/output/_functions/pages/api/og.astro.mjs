import { ImageResponse } from '@vercel/og';
import { createElement } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';
export { renderers } from '../../renderers.mjs';

const techStack = ["React", "Node.js", "TypeScript", "MongoDB", "Next.js"];
function OGImage() {
  return /* @__PURE__ */ jsxs("div", { tw: "flex w-full h-full bg-black overflow-hidden relative", children: [
    /* @__PURE__ */ jsx("div", { tw: "absolute inset-0 flex [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px]" }),
    /* @__PURE__ */ jsx("div", { tw: "absolute rounded-full flex top-[-100px] left-[-150px] w-[680px] h-[560px] bg-[rgba(37,99,235,0.22)] blur-[120px]" }),
    /* @__PURE__ */ jsx("div", { tw: "absolute rounded-full flex top-[40px] right-[-120px] w-[580px] h-[460px] bg-[rgba(249,115,22,0.18)] blur-[100px]" }),
    /* @__PURE__ */ jsx("div", { tw: "absolute rounded-full flex top-[200px] left-[400px] w-[400px] h-[320px] bg-[rgba(16,185,129,0.10)] blur-[90px]" }),
    /* @__PURE__ */ jsxs("div", { tw: "relative z-10 flex flex-col justify-center w-full px-24 py-16 gap-5", children: [
      /* @__PURE__ */ jsxs("div", { tw: "flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 bg-white/5 w-fit", children: [
        /* @__PURE__ */ jsx("div", { tw: "w-2.5 h-2.5 rounded-full bg-green-500 flex" }),
        /* @__PURE__ */ jsx("span", { tw: "text-white/75 text-base", children: "Disponible para nuevos desafíos" })
      ] }),
      /* @__PURE__ */ jsx("div", { tw: "flex font-black leading-none text-[90px] tracking-[-2px] bg-clip-text text-transparent [background-image:linear-gradient(90deg,#909090_0%,#cccccc_18%,#f0f0f0_32%,#ffffff_44%,#d8d8d8_54%,#969696_68%,#c8c8c8_80%,#f4f4f4_92%,#909090_100%)]", children: "Eduardo Cabral" }),
      /* @__PURE__ */ jsxs("div", { tw: "flex items-center gap-2.5 text-[28px]", children: [
        /* @__PURE__ */ jsx("span", { tw: "text-white font-mono", children: ">" }),
        /* @__PURE__ */ jsx("span", { tw: "text-white/70", children: "Full-Stack Developer" })
      ] }),
      /* @__PURE__ */ jsx("div", { tw: "flex text-3xl text-white/50 leading-relaxed max-w-[760px]", children: "Soluciones Web Escalables con Impacto" }),
      /* @__PURE__ */ jsx("div", { tw: "flex gap-2.5 mt-2", children: techStack.map((tech) => /* @__PURE__ */ jsx("div", { tw: "flex px-4 py-1.5 border border-white/10 rounded-lg text-white/65 bg-white/5 text-[15px]", children: tech }, tech)) })
    ] }),
    /* @__PURE__ */ jsx("div", { tw: "absolute bottom-10 right-20 text-white/30 text-[17px] flex", children: "jackshaw32.vercel.app" })
  ] });
}

const GET = async () => {
  return new ImageResponse(
    createElement(OGImage),
    { width: 1200, height: 630 }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
