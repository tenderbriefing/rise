/**
 * Lead notification service — placeholder for future Firebase Functions integration.
 *
 * TODO: Implement server-side notifications when ready. Options:
 * - Firebase Functions + SMTP (e.g. Nodemailer with institutional mail server)
 * - Firebase Functions + Gmail API (Google Workspace)
 * - Firebase Extensions: "Trigger Email from Firestore" (configure with your SMTP provider)
 * - Firebase Functions + transactional email API of your choice (not SendGrid-specific)
 *
 * Recommended pattern:
 * 1. Firestore onCreate trigger on `enquiries/{id}`
 * 2. Function sends internal alert to info@riseinstitute.co.za
 * 3. Optional auto-reply to enquiry.email with POPIA-compliant copy
 */

/**
 * Notify internal team of a new enquiry.
 * @param {object} enquiry
 * @returns {Promise<{ sent: boolean }>}
 */
export async function notifyInternalTeam(enquiry) {
  // TODO: Firebase Function — send internal email/Slack webhook when enquiry is created
  if (import.meta.env.DEV) {
    console.info('[leadNotification] notifyInternalTeam (placeholder)', enquiry?.id || enquiry?.email)
  }
  return { sent: false }
}

/**
 * Send automated acknowledgement to the enquirer.
 * @param {object} enquiry
 * @returns {Promise<{ sent: boolean }>}
 */
export async function sendAutoReply(enquiry) {
  // TODO: Firebase Function — send POPIA-compliant auto-reply to enquiry.email
  if (import.meta.env.DEV) {
    console.info('[leadNotification] sendAutoReply (placeholder)', enquiry?.email)
  }
  return { sent: false }
}
