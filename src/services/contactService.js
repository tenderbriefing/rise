import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getFirestoreDb, isFirebaseConfigured } from '../lib/firebase'
import { notifyInternalTeam, sendAutoReply } from './leadNotificationService'

export const ContactProviders = {
  MOCK: 'mock',
  FIRESTORE: 'firestore',
}

const ACTIVE_PROVIDER = isFirebaseConfigured
  ? ContactProviders.FIRESTORE
  : ContactProviders.MOCK

const ENQUIRIES_COLLECTION = 'enquiries'

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
  const db = getFirestoreDb()
  if (!db) {
    throw new Error('Firestore is not available. Check Firebase configuration.')
  }

  const enquiry = {
    fullName: payload.fullName.trim(),
    company: payload.company.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    interest: payload.interest,
    message: payload.message.trim(),
    source: 'website-contact-form',
    status: 'new',
    createdAt: serverTimestamp(),
    page: meta.page || (typeof window !== 'undefined' ? window.location.pathname : '/contact'),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
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

export function getActiveContactProvider() {
  return ACTIVE_PROVIDER
}
