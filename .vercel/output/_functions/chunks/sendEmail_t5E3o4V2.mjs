async function sendEmail({
  name,
  email,
  message,
  source = "Portfolio"
}) {
  const resendKey = "re_U5jbdoMs_3EcEV1e6NfpNGMgCo37X8M36";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: `${source} <onboarding@resend.dev>`,
        to: "jackshaw32@live.com.ar",
        reply_to: email,
        subject: `📬 Nuevo mensaje desde ${source}: ${name}`,
        html: `
          <h2 style="font-family:sans-serif;color:#111">Nuevo mensaje desde ${source}</h2>
          <table style="font-family:sans-serif;font-size:14px;color:#333;border-collapse:collapse">
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;white-space:nowrap">Nombre:</td><td>${name}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;white-space:nowrap">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
          </table>
          <h3 style="font-family:sans-serif;color:#111;margin-top:20px">Mensaje:</h3>
          <p style="font-family:sans-serif;font-size:14px;color:#333;white-space:pre-wrap">${message.replace(/\n/g, "<br>")}</p>
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

export { sendEmail as s };
