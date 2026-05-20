/**
 * Lead notifications — delegates to emailService.
 * Firebase Functions should send mail on `enquiries` onCreate (see functions/).
 */
import { prepareLeadEmails } from './emailService'

export async function notifyInternalTeam(enquiry) {
  const { internal } = await prepareLeadEmails(enquiry)
  return { sent: false, prepared: true, payload: internal }
}

export async function sendAutoReply(enquiry) {
  const { autoReply } = await prepareLeadEmails(enquiry)
  return { sent: false, prepared: true, payload: autoReply }
}
