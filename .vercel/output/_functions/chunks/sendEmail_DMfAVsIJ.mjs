const LIMITS = {
  PER_MINUTE: 5,
  PER_HOUR: 20,
  PER_DAY: 50,
  MAX_MSG_LENGTH: 400};
const ipStore = /* @__PURE__ */ new Map();
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipStore.entries()) {
    if (now > record.day.reset) ipStore.delete(ip);
  }
}, 60 * 60 * 1e3);
function checkRateLimit(ip) {
  const now = Date.now();
  const record = ipStore.get(ip) ?? {
    minute: { count: 0, reset: now + 6e4 },
    hour: { count: 0, reset: now + 36e5 },
    day: { count: 0, reset: now + 864e5 }
  };
  if (now > record.minute.reset) record.minute = { count: 0, reset: now + 6e4 };
  if (now > record.hour.reset) record.hour = { count: 0, reset: now + 36e5 };
  if (now > record.day.reset) record.day = { count: 0, reset: now + 864e5 };
  if (record.minute.count >= LIMITS.PER_MINUTE)
    return { allowed: false, reason: "Mandaste demasiados mensajes seguidos. Esperá un minuto 🙏" };
  if (record.hour.count >= LIMITS.PER_HOUR)
    return { allowed: false, reason: "Alcanzaste el límite por hora. Volvé en unos minutos 😅" };
  if (record.day.count >= LIMITS.PER_DAY)
    return { allowed: false, reason: "Alcanzaste el límite diario. Volvé mañana 😅" };
  record.minute.count++;
  record.hour.count++;
  record.day.count++;
  ipStore.set(ip, record);
  return { allowed: true };
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function sendEmail({
  name,
  email,
  message,
  source = "Portfolio"
}) {
  const resendKey = "re_9oZMggPs_JKtA1ncJeaUycY5qYRCdx2RK";
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: `${source} <onboarding@resend.dev>`,
        to: "jackshaw@live.com.ar",
        reply_to: email,
        subject: `📬 Nuevo mensaje desde ${source}: ${name}`,
        html: `
          <h2 style="font-family:sans-serif;color:#111">Nuevo mensaje desde ${escapeHtml(source)}</h2>
          <table style="font-family:sans-serif;font-size:14px;color:#333;border-collapse:collapse">
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;white-space:nowrap">Nombre:</td><td>${safeName}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;white-space:nowrap">Email:</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          </table>
          <h3 style="font-family:sans-serif;color:#111;margin-top:20px">Mensaje:</h3>
          <p style="font-family:sans-serif;font-size:14px;color:#333;white-space:pre-wrap">${safeMessage}</p>
        `
      })
    });
    if (!res.ok) {
      console.error(`[${source} Contact] Resend error:`, res.status, await res.text());
      return { success: false, reason: "send_error" };
    }
    return { success: true };
  } catch (err) {
    console.error(`[${source} Contact] Network error:`, err);
    return { success: false, reason: "network_error" };
  }
}

export { LIMITS as L, checkRateLimit as c, sendEmail as s };
