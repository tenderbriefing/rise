/**
 * Firebase Functions — lead email notifications (V1 scaffold)
 *
 * Deploy when SMTP / email provider credentials are configured in Firebase:
 *   firebase functions:secrets:set SMTP_HOST
 *   firebase functions:secrets:set SMTP_USER
 *   firebase functions:secrets:set SMTP_PASS
 *
 * Do NOT commit credentials. Use Firebase Secret Manager or environment config.
 */
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

initializeApp()

const INTERNAL_TO = 'info@riseinstitute.co.za'

/**
 * Triggered when a new enquiry is created.
 * TODO: Wire Nodemailer / Gmail API / SendGrid using secrets (no hardcoded SMTP).
 */
export const onEnquiryCreated = onDocumentCreated('enquiries/{enquiryId}', async (event) => {
  const snap = event.data
  if (!snap) return

  const enquiry = { id: event.params.enquiryId, ...snap.data() }
  const db = getFirestore()

  // Queue mail documents for a mailer extension or custom sender (optional pattern)
  const mailBatch = db.batch()

  mailBatch.set(db.collection('mail').doc(), {
    type: 'internal_lead_alert',
    to: INTERNAL_TO,
    subject: 'New Website Enquiry — Rise Institute',
    enquiryId: enquiry.id,
    payload: {
      fullName: enquiry.fullName,
      company: enquiry.company,
      interest: enquiry.interest,
      phone: enquiry.phone,
      email: enquiry.email,
      message: enquiry.message,
    },
    status: 'pending',
    createdAt: new Date(),
  })

  if (enquiry.email) {
    mailBatch.set(db.collection('mail').doc(), {
      type: 'lead_auto_reply',
      to: enquiry.email,
      subject: 'Thank You for Contacting Rise Institute',
      enquiryId: enquiry.id,
      status: 'pending',
      createdAt: new Date(),
    })
  }

  // V1: queue only — implement send in a follow-up function or Extension
  await mailBatch.commit()

  console.info('[onEnquiryCreated] mail queued for enquiry', enquiry.id)
})
