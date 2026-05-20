/**
 * HTML email template — auto-reply to enquirer.
 */
export const AUTO_REPLY_SUBJECT = 'Thank You for Contacting Rise Institute'

export function buildAutoReplyEmail(enquiry) {
  const firstName = (enquiry?.fullName || 'there').trim().split(/\s+/)[0]

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${AUTO_REPLY_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f5;font-family:Inter,Arial,sans-serif;color:#1f2933;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 30px rgba(6,61,42,0.12);">
          <tr>
            <td style="background:linear-gradient(135deg,#063d2a 0%,#0b5d3b 55%,#007a4d 100%);padding:32px;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#ffb612;font-weight:600;">Rise Institute</p>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;font-family:Poppins,Arial,sans-serif;">Thank you for your enquiry</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Dear ${escapeHtml(firstName)},</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4b5563;">Thank you for contacting <strong style="color:#063d2a;">Rise Institute</strong>. We have received your enquiry and a member of our team will respond within <strong>one to two business days</strong>.</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4b5563;">Rise Institute is a fully QCTO-accredited occupational training institution delivering workplace-integrated qualifications designed to strengthen skills development, compliance, and economic participation across South Africa.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:24px 0;background:#eaf7f0;border-radius:8px;border-left:4px solid #007a4d;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#063d2a;text-transform:uppercase;letter-spacing:0.05em;">Contact details</p>
                    <p style="margin:0;font-size:14px;line-height:1.8;color:#1f2933;">
                      <strong>Email:</strong> <a href="mailto:info@riseinstitute.co.za" style="color:#0b5d3b;">info@riseinstitute.co.za</a><br />
                      <strong>Website:</strong> <a href="https://riseinstitute.co.za" style="color:#0b5d3b;">riseinstitute.co.za</a><br />
                      <strong>Location:</strong> Midrand, Gauteng
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:14px;line-height:1.6;color:#6b7280;">If your matter is urgent, please reply to this email or contact us directly.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#063d2a;color:rgba(255,255,255,0.85);font-size:12px;line-height:1.6;">
              Rise Institute · QCTO Accredited Occupational Training<br />
              Developing high-impact skills for a transforming economy.
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
