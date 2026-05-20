/**
 * Email service — client-safe orchestration layer.
 * Actual delivery must run in Firebase Functions (no SMTP secrets in the browser).
 *
 * @see functions/src/index.js
 */
import { buildAutoReplyEmail, AUTO_REPLY_SUBJECT } from '../templates/autoReplyTemplate'
import {
  buildInternalLeadEmail,
  INTERNAL_LEAD_SUBJECT,
  INTERNAL_LEAD_TO,
} from '../templates/internalLeadTemplate'

export const EMAIL_QUEUE_COLLECTION = 'mail'

/**
 * Payload written to Firestore for a Cloud Function to process (optional pattern).
 * Alternatively, use a direct onCreate trigger on `enquiries` without a queue.
 */
export function buildInternalNotificationPayload(enquiry) {
  return {
    type: 'internal_lead_alert',
    to: INTERNAL_LEAD_TO,
    subject: INTERNAL_LEAD_SUBJECT,
    html: buildInternalLeadEmail(enquiry),
    enquiryId: enquiry.id || null,
    createdAt: new Date().toISOString(),
  }
}

export function buildAutoReplyPayload(enquiry) {
  return {
    type: 'lead_auto_reply',
    to: enquiry.email,
    subject: AUTO_REPLY_SUBJECT,
    html: buildAutoReplyEmail(enquiry),
    enquiryId: enquiry.id || null,
    createdAt: new Date().toISOString(),
  }
}

/**
 * Prepare email payloads for server-side sending.
 * V1: logs in dev; production uses Firebase Functions trigger on enquiry create.
 */
export async function prepareLeadEmails(enquiry) {
  const internal = buildInternalNotificationPayload(enquiry)
  const autoReply = buildAutoReplyPayload(enquiry)

  if (import.meta.env.DEV) {
    console.info('[emailService] prepared internal notification', {
      to: internal.to,
      subject: internal.subject,
    })
    console.info('[emailService] prepared auto-reply', {
      to: autoReply.to,
      subject: autoReply.subject,
    })
  }

  return { internal, autoReply }
}
