import { s as sendEmail } from '../../chunks/sendEmail_t5E3o4V2.mjs';
export { renderers } from '../../renderers.mjs';

const sanitize = (s) => s.replace(/<[^>]*>/g, "").replace(/[<>"'`]/g, "").trim();
const POST = async ({ request }) => {
  let name, email, message;
  try {
    ({ name, email, message } = await request.json());
  } catch {
    return new Response(JSON.stringify({ success: false, error: "invalid_body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const safeName = sanitize(name ?? "").slice(0, 100);
  const safeEmail = (email ?? "").replace(/[<>"'`\s]/g, "").slice(0, 200);
  const safeMessage = sanitize(message ?? "").slice(0, 2e3);
  if (!safeName || !safeEmail || !safeMessage) {
    return new Response(JSON.stringify({ success: false, error: "missing_fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
    return new Response(JSON.stringify({ success: false, error: "invalid_email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const result = await sendEmail({
    name: safeName,
    email: safeEmail,
    message: safeMessage,
    source: "Portfolio"
  });
  return new Response(JSON.stringify(result), {
    status: result.success ? 200 : 500,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
