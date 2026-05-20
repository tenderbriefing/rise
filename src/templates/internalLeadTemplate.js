/**
 * HTML email template — internal new-lead notification.
 * Used by emailService / Firebase Functions (server-side send recommended).
 */
export function buildInternalLeadEmail(enquiry) {
  const {
    fullName = '—',
    company = '—',
    interest = '—',
    phone = '—',
    email = '—',
    message = '—',
  } = enquiry

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New Website Enquiry — Rise Institute</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f5;font-family:Inter,Arial,sans-serif;color:#1f2933;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 30px rgba(6,61,42,0.12);">
          <tr>
            <td style="background:linear-gradient(135deg,#063d2a 0%,#0b5d3b 100%);padding:28px 32px;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#ffb612;font-weight:600;">Rise Institute</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;font-family:Poppins,Arial,sans-serif;">New Website Enquiry</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5563;">A new enquiry was submitted via the Rise Institute website contact form.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                <tr><td style="padding:12px 16px;background:#eaf7f0;font-weight:600;width:140px;">Name</td><td style="padding:12px 16px;">${escapeHtml(fullName)}</td></tr>
                <tr><td style="padding:12px 16px;background:#f8fafc;font-weight:600;">Company</td><td style="padding:12px 16px;">${escapeHtml(company)}</td></tr>
                <tr><td style="padding:12px 16px;background:#eaf7f0;font-weight:600;">Interest</td><td style="padding:12px 16px;">${escapeHtml(interest)}</td></tr>
                <tr><td style="padding:12px 16px;background:#f8fafc;font-weight:600;">Phone</td><td style="padding:12px 16px;">${escapeHtml(phone)}</td></tr>
                <tr><td style="padding:12px 16px;background:#eaf7f0;font-weight:600;">Email</td><td style="padding:12px 16px;"><a href="mailto:${escapeHtml(email)}" style="color:#0b5d3b;">${escapeHtml(email)}</a></td></tr>
              </table>
              <p style="margin:24px 0 8px;font-size:13px;font-weight:600;color:#063d2a;text-transform:uppercase;letter-spacing:0.06em;">Message</p>
              <p style="margin:0;padding:16px;background:#f8fafc;border-radius:8px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</p>
              <p style="margin:24px 0 0;font-size:13px;color:#6b7280;">Review and respond via the <a href="https://riseinstitute.co.za/admin/leads" style="color:#0b5d3b;font-weight:600;">admin dashboard</a>.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">
              Rise Institute · QCTO Accredited Training · Midrand, Gauteng
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export const INTERNAL_LEAD_SUBJECT = 'New Website Enquiry — Rise Institute'
export const INTERNAL_LEAD_TO = 'info@riseinstitute.co.za'
