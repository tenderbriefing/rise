/**
 * Build and send internal lead notification email.
 * Recipient is server-controlled — never taken from the client.
 */
import { defineSecret } from 'firebase-functions/params'
import nodemailer from 'nodemailer'

export const INTERNAL_NOTIFY_TO = 'Calvin@riseinstitute.co.za'

export const smtpHost = defineSecret('SMTP_HOST')
export const smtpPort = defineSecret('SMTP_PORT')
export const smtpUser = defineSecret('SMTP_USER')
export const smtpPass = defineSecret('SMTP_PASS')
export const smtpFrom = defineSecret('SMTP_FROM')

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function buildNotificationSubject(enquiry) {
  const interest = String(enquiry?.interest || 'General Enquiry').trim().slice(0, 80)
  return `New Rise Institute Enquiry — ${interest}`
}

export function buildNotificationHtml(enquiry) {
  const submittedAt = enquiry?.createdAt?.toDate
    ? enquiry.createdAt.toDate().toISOString()
    : enquiry?.emailNotification?.attemptedAt || new Date().toISOString()

  const rows = [
    ['Date / time (UTC)', submittedAt],
    ['Enquiry ID', enquiry.id || '—'],
    ['Full name', enquiry.fullName || '—'],
    ['Company / organisation', enquiry.company || '—'],
    ['Email', enquiry.email || '—'],
    ['Phone', enquiry.phone || '—'],
    ['Programme / interest', enquiry.interest || '—'],
    ['Source page', enquiry.page || enquiry.route || '—'],
  ]

  const rowHtml = rows
    .map(
      ([label, value], index) => `
      <tr>
        <td style="padding:12px 16px;background:${index % 2 ? '#f8fafc' : '#f4f6fc'};font-weight:600;width:180px;">${escapeHtml(label)}</td>
        <td style="padding:12px 16px;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><title>New Rise Institute Enquiry</title></head>
<body style="margin:0;padding:0;background:#f4f6f5;font-family:Arial,sans-serif;color:#1f2933;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">
        <tr>
          <td style="background:#002395;padding:24px 32px;">
            <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#ffb612;font-weight:600;">Rise Institute</p>
            <h1 style="margin:0;font-size:22px;color:#ffffff;">New website enquiry</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;">
            <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4b5563;">
              A new enquiry was submitted on the Rise Institute website.
            </p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
              ${rowHtml}
            </table>
            <p style="margin:24px 0 8px;font-size:13px;font-weight:600;color:#002395;text-transform:uppercase;letter-spacing:0.06em;">Message</p>
            <p style="margin:0;padding:16px;background:#f8fafc;border-radius:8px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(enquiry.message || '—')}</p>
            <p style="margin:24px 0 0;font-size:13px;color:#6b7280;">
              Reply directly to the enquirer using your email client Reply-To, or open the
              <a href="https://riseinstitute.co.za/admin/leads/${escapeHtml(enquiry.id || '')}" style="color:#001a6e;font-weight:600;">admin dashboard</a>.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function smtpSecretsConfigured() {
  try {
    return Boolean(smtpHost.value() && smtpUser.value() && smtpPass.value() && smtpFrom.value())
  } catch {
    return false
  }
}

export async function sendInternalLeadNotification(enquiry) {
  if (!smtpSecretsConfigured()) {
    const error = new Error(
      'SMTP secrets not configured (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM)',
    )
    error.code = 'SMTP_NOT_CONFIGURED'
    throw error
  }

  const port = Number(smtpPort.value() || '587')
  const transporter = nodemailer.createTransport({
    host: smtpHost.value(),
    port,
    secure: port === 465,
    auth: {
      user: smtpUser.value(),
      pass: smtpPass.value(),
    },
  })

  const subject = buildNotificationSubject(enquiry)
  const html = buildNotificationHtml(enquiry)
  const replyTo = enquiry.email && String(enquiry.email).includes('@') ? enquiry.email : undefined

  const info = await transporter.sendMail({
    from: smtpFrom.value(),
    to: INTERNAL_NOTIFY_TO,
    replyTo,
    subject,
    html,
    text: [
      `New Rise Institute enquiry`,
      `ID: ${enquiry.id || ''}`,
      `Name: ${enquiry.fullName || ''}`,
      `Company: ${enquiry.company || ''}`,
      `Email: ${enquiry.email || ''}`,
      `Phone: ${enquiry.phone || ''}`,
      `Interest: ${enquiry.interest || ''}`,
      `Page: ${enquiry.page || enquiry.route || ''}`,
      '',
      enquiry.message || '',
    ].join('\n'),
  })

  return {
    messageId: info.messageId || null,
    accepted: info.accepted || [],
  }
}
