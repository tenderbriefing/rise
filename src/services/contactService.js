import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { ensureFirebaseInitialized, getFirestoreDb } from '../lib/firebase'
import { notifyInternalTeam, sendAutoReply } from './leadNotificationService'

export const ContactProviders = {
  MOCK: 'mock',
  FIRESTORE: 'firestore',
}

const ENQUIRIES_COLLECTION = 'enquiries'

async function resolveActiveProvider() {
  const result = await ensureFirebaseInitialized()
  return result.ok ? ContactProviders.FIRESTORE : ContactProviders.MOCK
}

/**
 * @typedef {Object} ContactFormPayload
 * @property {string} fullName
 * @property {string} company
 * @property {string} email
 * @property {string} phone
 * @property {string} interest
 * @property {string} message
 */

/**
 * @typedef {Object} SubmitMeta
 * @property {string} [page]
 */

/**
 * @param {ContactFormPayload} payload
 * @param {SubmitMeta} [meta]
 */
export async function submitContactForm(payload, meta = {}) {
  const ACTIVE_PROVIDER = await resolveActiveProvider()
  switch (ACTIVE_PROVIDER) {
    case ContactProviders.FIRESTORE:
      return submitToFirestore(payload, meta)
    case ContactProviders.MOCK:
    default:
      return submitMock(payload)
  }
}

async function submitMock(payload) {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  if (import.meta.env.DEV) {
    console.info('[contactService] mock submission (Firebase not configured)', payload)
  }
  return {
    success: true,
    id: `mock-${Date.now()}`,
    message: 'Enquiry received successfully.',
  }
}

/**
 * @param {ContactFormPayload} payload
 * @param {SubmitMeta} meta
 */
async function submitToFirestore(payload, meta) {
  await ensureFirebaseInitialized()
  const db = getFirestoreDb()
  if (!db) {
    throw new Error('Firestore is not available. Check Firebase configuration.')
  }

  const route =
    meta.page || meta.route || (typeof window !== 'undefined' ? window.location.pathname : '/contact')

  const enquiry = {
    fullName: payload.fullName.trim(),
    company: payload.company.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    interest: payload.interest,
    message: payload.message.trim(),
    source: 'website-contact-form',
    status: 'new',
    priority: 'normal',
    assignedTo: null,
    notes: '',
    tags: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastContactedAt: null,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    route,
    page: route,
    analyticsId: meta.analyticsId || null,
    activityLog: [
      {
        type: 'created',
        message: 'Enquiry submitted via website contact form',
        createdAt: new Date().toISOString(),
        createdBy: 'system',
      },
    ],
  }

  const docRef = await addDoc(collection(db, ENQUIRIES_COLLECTION), enquiry)

  const record = { id: docRef.id, ...payload, ...enquiry }
  await Promise.allSettled([notifyInternalTeam(record), sendAutoReply(record)])

  return {
    success: true,
    id: docRef.id,
    message: 'Enquiry received successfully.',
  }
}

export function validateContactForm(payload) {
  const errors = {}

  if (!payload.fullName?.trim()) errors.fullName = 'Full name is required'
  if (!payload.company?.trim()) errors.company = 'Company or organisation is required'

  if (!payload.email?.trim()) {
    errors.email = 'Email address is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!payload.phone?.trim()) errors.phone = 'Contact number is required'
  if (!payload.interest) errors.interest = 'Please select an area of interest'
  if (!payload.message?.trim()) errors.message = 'Message is required'

  return errors
}

export async function getActiveContactProvider() {
  return resolveActiveProvider()
}
