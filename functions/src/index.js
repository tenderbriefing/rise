/**
 * Firebase Functions — Rise Institute lead email notifications
 *
 * Secrets (never commit):
 *   firebase functions:secrets:set SMTP_HOST
 *   firebase functions:secrets:set SMTP_PORT
 *   firebase functions:secrets:set SMTP_USER
 *   firebase functions:secrets:set SMTP_PASS
 *   firebase functions:secrets:set SMTP_FROM
 *
 * Recipient is hard-coded server-side to Calvin@riseinstitute.co.za
 */
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore'
import {
  INTERNAL_NOTIFY_TO,
  sendInternalLeadNotification,
  smtpFrom,
  smtpHost,
  smtpPass,
  smtpPort,
  smtpUser,
} from './notifyLead.js'

initializeApp()

const CLAIM_TTL_MS = 5 * 60 * 1000

export const onEnquiryCreated = onDocumentCreated(
  {
    document: 'enquiries/{enquiryId}',
    region: 'europe-west1',
    secrets: [smtpHost, smtpPort, smtpUser, smtpPass, smtpFrom],
    retry: true,
  },
  async (event) => {
    const snap = event.data
    if (!snap) return

    const enquiryId = event.params.enquiryId
    const db = getFirestore()
    const ref = db.collection('enquiries').doc(enquiryId)

    // Idempotency: claim the send once across retries / double delivery.
    // Stale "processing" claims older than CLAIM_TTL_MS may be reclaimed.
    const claimed = await db.runTransaction(async (tx) => {
      const fresh = await tx.get(ref)
      if (!fresh.exists) return false
      const data = fresh.data() || {}
      const status = data.emailNotification?.status
      if (status === 'sent' || status === 'blocked_config') return false
      if (status === 'processing') {
        const attemptedAt = data.emailNotification?.attemptedAt
        const attemptedMs = attemptedAt?.toMillis?.() ?? 0
        if (attemptedMs && Date.now() - attemptedMs < CLAIM_TTL_MS) return false
      }
      tx.update(ref, {
        emailNotification: {
          status: 'processing',
          to: INTERNAL_NOTIFY_TO,
          attemptedAt: Timestamp.now(),
          provider: 'smtp',
        },
        updatedAt: FieldValue.serverTimestamp(),
      })
      return true
    })

    if (!claimed) {
      console.info('[onEnquiryCreated] skip — already processed', enquiryId)
      return
    }

    const enquiry = { id: enquiryId, ...snap.data() }

    try {
      const result = await sendInternalLeadNotification(enquiry)
      await ref.update({
        emailNotification: {
          status: 'sent',
          to: INTERNAL_NOTIFY_TO,
          sentAt: FieldValue.serverTimestamp(),
          attemptedAt: Timestamp.now(),
          provider: 'smtp',
          messageId: result.messageId || null,
        },
        updatedAt: FieldValue.serverTimestamp(),
      })
      console.info('[onEnquiryCreated] notification sent', enquiryId)
    } catch (error) {
      const code = error?.code || 'SEND_FAILED'
      const message = String(error?.message || 'Email send failed').slice(0, 300)
      await ref.update({
        emailNotification: {
          status: code === 'SMTP_NOT_CONFIGURED' ? 'blocked_config' : 'failed',
          to: INTERNAL_NOTIFY_TO,
          attemptedAt: Timestamp.now(),
          provider: 'smtp',
          errorCode: code,
          errorMessage: message,
        },
        updatedAt: FieldValue.serverTimestamp(),
      })
      console.error('[onEnquiryCreated] notification failed', enquiryId, code, message)
      // Do not rethrow for config gaps — lead is already persisted.
      // Rethrow transient failures so Cloud Functions retry can recover.
      if (code !== 'SMTP_NOT_CONFIGURED') {
        throw error
      }
    }
  },
)
