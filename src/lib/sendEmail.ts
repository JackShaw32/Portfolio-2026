export interface SendEmailArgs {
  name: string;
  email: string;
  message: string;
  source?: string;
}

export interface SendEmailResult {
  success: boolean;
  reason?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendEmail({
  name,
  email,
  message,
  source = 'Portfolio',
}: SendEmailArgs): Promise<SendEmailResult> {
  const resendKey = import.meta.env.RESEND_API_KEY;

  if (!resendKey) {
    console.log(`[${source} Contact]`, { name, email, message });
    return { success: true };
  }

  const safeName    = escapeHtml(name);
  const safeEmail   = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:     `${source} <onboarding@resend.dev>`,
        to:       'jackshaw@live.com.ar',
        reply_to: email,
        subject:  `📬 Nuevo mensaje desde ${source}: ${name}`,
        html: `
          <h2 style="font-family:sans-serif;color:#111">Nuevo mensaje desde ${escapeHtml(source)}</h2>
          <table style="font-family:sans-serif;font-size:14px;color:#333;border-collapse:collapse">
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;white-space:nowrap">Nombre:</td><td>${safeName}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;white-space:nowrap">Email:</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          </table>
          <h3 style="font-family:sans-serif;color:#111;margin-top:20px">Mensaje:</h3>
          <p style="font-family:sans-serif;font-size:14px;color:#333;white-space:pre-wrap">${safeMessage}</p>
        `,
      }),
    });

    if (!res.ok) {
      console.error(`[${source} Contact] Resend error:`, res.status, await res.text());
      return { success: false, reason: 'send_error' };
    }

    return { success: true };
  } catch (err) {
    console.error(`[${source} Contact] Network error:`, err);
    return { success: false, reason: 'network_error' };
  }
}
