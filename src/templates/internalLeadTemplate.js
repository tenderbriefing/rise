/**
 * HTML email template — internal new-lead notification.
 * Server send uses functions/src/notifyLead.js (hard-coded recipient).
 * This template is used for client-side preparation / documentation only.
 */
export function buildInternalLeadEmail(enquiry) {
  const {
    id = '—',
    fullName = '—',
    company = '—',
    interest = '—',
    phone = '—',
    email = '—',
    message = '—',
    page = '',
    route = '',
  } = enquiry

  const sourcePage = page || route || '—'
  const submittedAt = new Date().toISOString()

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New Rise Institute Enquiry</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f5;font-family:Arial,sans-serif;color:#1f2933;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background:#002395;padding:28px 32px;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#ffb612;font-weight:600;">Rise Institute</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">New Website Enquiry</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5563;">A new enquiry was submitted via the Rise Institute website.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                <tr><td style="padding:12px 16px;background:#f4f6fc;font-weight:600;width:180px;">Date / time (UTC)</td><td style="padding:12px 16px;">${escapeHtml(submittedAt)}</td></tr>
                <tr><td style="padding:12px 16px;background:#f8fafc;font-weight:600;">Enquiry ID</td><td style="padding:12px 16px;">${escapeHtml(id)}</td></tr>
                <tr><td style="padding:12px 16px;background:#f4f6fc;font-weight:600;">Full name</td><td style="padding:12px 16px;">${escapeHtml(fullName)}</td></tr>
                <tr><td style="padding:12px 16px;background:#f8fafc;font-weight:600;">Company / organisation</td><td style="padding:12px 16px;">${escapeHtml(company)}</td></tr>
                <tr><td style="padding:12px 16px;background:#f4f6fc;font-weight:600;">Email</td><td style="padding:12px 16px;"><a href="mailto:${escapeHtml(email)}" style="color:#001a6e;">${escapeHtml(email)}</a></td></tr>
                <tr><td style="padding:12px 16px;background:#f8fafc;font-weight:600;">Phone</td><td style="padding:12px 16px;">${escapeHtml(phone)}</td></tr>
                <tr><td style="padding:12px 16px;background:#f4f6fc;font-weight:600;">Programme / interest</td><td style="padding:12px 16px;">${escapeHtml(interest)}</td></tr>
                <tr><td style="padding:12px 16px;background:#f8fafc;font-weight:600;">Source page</td><td style="padding:12px 16px;">${escapeHtml(sourcePage)}</td></tr>
              </table>
              <p style="margin:24px 0 8px;font-size:13px;font-weight:600;color:#002395;text-transform:uppercase;letter-spacing:0.06em;">Message</p>
              <p style="margin:0;padding:16px;background:#f8fafc;border-radius:8px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</p>
              <p style="margin:24px 0 0;font-size:13px;color:#6b7280;">Review and respond via the <a href="https://riseinstitute.co.za/admin/leads" style="color:#001a6e;font-weight:600;">admin dashboard</a>.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">
              Rise Institute · QCTO Accredited Training · Byls Bridge Office Park, Centurion
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
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function buildInternalLeadSubject(enquiry) {
  const interest = String(enquiry?.interest || 'General Enquiry').trim().slice(0, 80)
  return `New Rise Institute Enquiry — ${interest}`
}

export const INTERNAL_LEAD_SUBJECT = 'New Rise Institute Enquiry'
/** Must match functions/src/notifyLead.js — server send ignores client-supplied recipients. */
export const INTERNAL_LEAD_TO = 'Calvin@riseinstitute.co.za'
