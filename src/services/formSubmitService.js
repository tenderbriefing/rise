import { siteConfig } from '../data/navigation'

/** Public FormSubmit endpoint — recipient is server-side at FormSubmit; no API keys. */
export const FORMSUBMIT_RECIPIENT = siteConfig.enquiryEmail

export const FORMSUBMIT_THANK_YOU_PATH = '/contact/thank-you'

export class FormSubmitActivationRequiredError extends Error {
  constructor(message) {
    super(
      message ||
        'FormSubmit requires activation of Calvin@riseinstitute.co.za. Check that inbox for a confirmation link.',
    )
    this.name = 'FormSubmitActivationRequiredError'
    this.code = 'FORMSUBMIT_ACTIVATION_REQUIRED'
  }
}

/**
 * Client-side validation for the public contact enquiry (FormSubmit).
 * Required: fullName, email, phone, interest, message.
 */
export function validateFormSubmitContact(payload) {
  const errors = {}
  const fullName = payload.fullName?.trim() || ''
  const email = payload.email?.trim() || ''
  const phone = payload.phone?.trim() || ''
  const interest = payload.interest || ''
  const message = payload.message?.trim() || ''

  if (!fullName) errors.fullName = 'Full name is required'
  else if (fullName.length < 2) errors.fullName = 'Full name must be at least 2 characters'
  else if (fullName.length > 120) errors.fullName = 'Full name must be under 120 characters'

  if (!email) errors.email = 'Email address is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address'
  else if (email.length > 160) errors.email = 'Email address must be under 160 characters'

  if (!phone) errors.phone = 'Phone number is required'
  else if (phone.length < 6) errors.phone = 'Phone number must be at least 6 characters'
  else if (phone.length > 40) errors.phone = 'Phone number must be under 40 characters'

  if (!interest) errors.interest = 'Please select a programme or service of interest'
  else if (interest.length > 120) errors.interest = 'Please select a valid option'

  if (!message) errors.message = 'Message is required'
  else if (message.length < 6) errors.message = 'Message must be at least 6 characters'
  else if (message.length > 3000) errors.message = 'Message must be under 3000 characters'

  const company = payload.company?.trim() || ''
  if (company && company.length > 160) errors.company = 'Company name must be under 160 characters'

  return errors
}

function looksLikeActivationResponse(payload) {
  const blob = JSON.stringify(payload || {}).toLowerCase()
  return (
    blob.includes('confirm your email') ||
    blob.includes('activate') ||
    blob.includes('activation') ||
    blob.includes('check your email') ||
    (blob.includes('confirm') && blob.includes('formsubmit'))
  )
}

/**
 * Submit enquiry via FormSubmit AJAX API.
 * Success only when FormSubmit acknowledges acceptance.
 */
export async function submitViaFormSubmit(payload, { page } = {}) {
  // Honeypot filled → treat as bot; pretend success-path stop without notifying.
  if (payload._honey) {
    return { success: false, blocked: true, message: 'Submission rejected.' }
  }

  const interest = String(payload.interest || 'General Enquiry').trim()
  const body = {
    name: payload.fullName.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    company: (payload.company || '').trim() || '—',
    interest,
    message: payload.message.trim(),
    sourcePage: page || '/contact',
    _replyto: payload.email.trim().toLowerCase(),
    _subject: `New Rise Institute Enquiry — ${interest}`.slice(0, 120),
    _template: 'table',
    // SPA-friendly; spam mitigation via honeypot field + FormSubmit filtering.
    _captcha: 'false',
    _honey: '',
  }

  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(FORMSUBMIT_RECIPIENT)}`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  const rawText = await response.text()
  let data
  try {
    data = rawText ? JSON.parse(rawText) : null
  } catch {
    data = { message: rawText }
  }

  if (looksLikeActivationResponse(data) || looksLikeActivationResponse({ message: rawText })) {
    throw new FormSubmitActivationRequiredError(data?.message || data?.error || rawText)
  }

  if (!response.ok) {
    const message =
      data?.message || data?.error || `FormSubmit rejected the enquiry (${response.status}).`
    if (looksLikeActivationResponse({ message })) {
      throw new FormSubmitActivationRequiredError(message)
    }
    throw new Error(message)
  }

  // FormSubmit returns { success: "true" } or success: true on acceptance.
  const successFlag = data?.success === true || data?.success === 'true'
  if (!successFlag) {
    if (looksLikeActivationResponse(data) || looksLikeActivationResponse({ message: rawText })) {
      throw new FormSubmitActivationRequiredError(data?.message || rawText)
    }
    throw new Error(data?.message || 'FormSubmit did not confirm acceptance of this enquiry.')
  }

  return { success: true, provider: 'formsubmit', data }
}
