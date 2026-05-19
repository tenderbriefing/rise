/**
 * Contact form service — prepared for future backend integrations.
 *
 * Supported providers (implement when ready):
 * - Firebase Firestore (`submitToFirestore`)
 * - EmailJS (`submitViaEmailJS`)
 * - Firebase Cloud Functions (`submitViaCloudFunction`)
 * - SMTP / custom API (`submitViaApi`)
 */

export const ContactProviders = {
  MOCK: 'mock',
  FIRESTORE: 'firestore',
  EMAILJS: 'emailjs',
  CLOUD_FUNCTION: 'cloud_function',
  API: 'api',
}

const ACTIVE_PROVIDER = ContactProviders.MOCK

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
 * Submit contact enquiry through configured provider.
 * @param {ContactFormPayload} payload
 * @returns {Promise<{ success: boolean, id?: string, message?: string }>}
 */
export async function submitContactForm(payload) {
  switch (ACTIVE_PROVIDER) {
    case ContactProviders.FIRESTORE:
      return submitToFirestore(payload)
    case ContactProviders.EMAILJS:
      return submitViaEmailJS(payload)
    case ContactProviders.CLOUD_FUNCTION:
      return submitViaCloudFunction(payload)
    case ContactProviders.API:
      return submitViaApi(payload)
    case ContactProviders.MOCK:
    default:
      return submitMock(payload)
  }
}

async function submitMock(payload) {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  if (import.meta.env.DEV) {
    console.info('[contactService] mock submission', payload)
  }
  return {
    success: true,
    id: `mock-${Date.now()}`,
    message: 'Enquiry received successfully.',
  }
}

/** @param {ContactFormPayload} payload */
async function submitToFirestore(/* payload */) {
  // Future: import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
  // const db = getFirestore(getFirebaseApp())
  // const docRef = await addDoc(collection(db, 'contact_enquiries'), {
  //   ...payload,
  //   createdAt: serverTimestamp(),
  //   status: 'new',
  // })
  // return { success: true, id: docRef.id }
  throw new Error('Firestore provider not configured. Set ACTIVE_PROVIDER to MOCK or implement submitToFirestore.')
}

/** @param {ContactFormPayload} payload */
async function submitViaEmailJS(/* payload */) {
  // Future: emailjs.send(serviceId, templateId, payload, publicKey)
  throw new Error('EmailJS provider not configured.')
}

/** @param {ContactFormPayload} payload */
async function submitViaCloudFunction(/* payload */) {
  // Future: httpsCallable(functions, 'submitContactEnquiry')(payload)
  throw new Error('Cloud Function provider not configured.')
}

/** @param {ContactFormPayload} payload */
async function submitViaApi(/* payload */) {
  // Future: fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })
  throw new Error('API provider not configured.')
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
