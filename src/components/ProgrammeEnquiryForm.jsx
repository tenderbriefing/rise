import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import Button from './Button'
import FormField from './FormField'
import { submitContactForm, validateProgrammeEnquiry } from '../services/contactService'
import { SA_PROVINCES, getAllQualifications } from '../data/qualifications'
import {
  trackLeadFormError,
  trackLeadFormStart,
  trackLeadFormSubmit,
  trackLeadFormSuccess,
} from '../utils/analytics'
import { recordAnalyticsEvent } from '../services/analyticsEventService'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  province: '',
  companyName: '',
  numberOfLearners: '',
  qualification: '',
  message: '',
}

export default function ProgrammeEnquiryForm({
  defaultQualification = '',
  qualificationTitle = '',
  saqaId = '',
  showCorporateFields = false,
  onSuccess,
}) {
  const location = useLocation()
  const qualifications = getAllQualifications()
  const [form, setForm] = useState({
    ...initialForm,
    qualification: defaultQualification || '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorToast, setErrorToast] = useState(null)
  const formStartedRef = useRef(false)
  const submittingRef = useRef(false)

  const handleFormStart = () => {
    if (formStartedRef.current) return
    formStartedRef.current = true
    trackLeadFormStart()
    recordAnalyticsEvent({ eventName: 'form_start', eventType: 'form_start' })
  }

  const handleChange = (e) => {
    handleFormStart()
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submittingRef.current || loading) return

    const validationErrors = validateProgrammeEnquiry(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    submittingRef.current = true
    setLoading(true)
    setErrorToast(null)

    const selected =
      qualifications.find((q) => q.slug === form.qualification) ||
      (qualificationTitle ? { title: qualificationTitle, saqaId } : null)

    const interestLabel = selected
      ? `${selected.saqaId} — ${selected.shortTitle || selected.title}`.slice(0, 120)
      : 'Programme Enquiry'

    const companyLabel = form.companyName?.trim() || 'Individual Learner'

    const payload = {
      fullName: form.fullName,
      company: companyLabel,
      email: form.email,
      phone: form.phone,
      interest: interestLabel,
      message: [
        `Province: ${form.province}`,
        `Company / Organisation: ${companyLabel}`,
        form.numberOfLearners?.trim()
          ? `Number of Learners: ${form.numberOfLearners.trim()}`
          : null,
        `Qualification: ${selected?.title || form.qualification}`,
        selected?.saqaId ? `QCTO Code: ${selected.saqaId}` : null,
        form.message?.trim() ? `\nAdditional notes:\n${form.message.trim()}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    }

    trackLeadFormSubmit({ interest: interestLabel })
    recordAnalyticsEvent({
      eventName: 'form_submit',
      eventType: 'form_submit',
      qualificationInterest: selected
        ? { title: selected.title, saqaId: selected.saqaId, nqf: selected.nqf, faculty: selected.facultyTitle }
        : null,
    })

    try {
      const result = await submitContactForm(payload, { page: location.pathname })
      if (result.success) {
        await trackLeadFormSuccess({ interest: interestLabel, enquiryId: result.id })
        setSubmitted(true)
        setForm({ ...initialForm, qualification: defaultQualification || '' })
        formStartedRef.current = false
        onSuccess?.()
      } else {
        throw new Error(result.message || 'Submission failed')
      }
    } catch (err) {
      const message =
        err?.message || 'Unable to submit your enquiry. Please try again or email us directly.'
      setErrors({ form: message })
      setErrorToast(message)
      trackLeadFormError(message)
    } finally {
      setLoading(false)
      submittingRef.current = false
    }
  }

  const qualificationOptions = (
    <>
      <option value="">Select a qualification</option>
      {qualifications.map((q) => (
        <option key={q.slug} value={q.slug}>
          {q.shortTitle || q.title} ({q.saqaId})
        </option>
      ))}
    </>
  )

  const provinceOptions = (
    <>
      <option value="">Select your province</option>
      {SA_PROVINCES.map((p) => (
        <option key={p} value={p}>
          {p}
        </option>
      ))}
    </>
  )

  return (
    <>
      <AnimatePresence>
        {errorToast && (
          <motion.div
            role="alert"
            aria-live="assertive"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed right-4 top-24 z-50 flex max-w-sm items-start gap-3 rounded-sm border border-red-200/80 bg-surface px-5 py-4 shadow-elevated"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
            <p className="text-sm font-medium text-charcoal">{errorToast}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit}
        onFocus={handleFormStart}
        noValidate
        className="card-executive rounded-sm border-l-4 border-l-sa-gold p-6 sm:p-8"
        aria-label="Programme enquiry form"
      >
        <p className="eyebrow-executive">Enquire Now</p>
        <h2 className="font-heading text-xl font-bold tracking-tight text-charcoal sm:text-2xl">
          Request Programme Information
        </h2>
        <p className="mt-2 text-sm text-muted">
          Submit your details and our team will contact you about enrolment, learnerships, and
          workplace placement options.
        </p>

        <AnimatePresence mode="wait">
          {submitted && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex items-start gap-3 rounded-sm border border-gold/30 bg-ivory px-4 py-4"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <p className="text-sm text-charcoal">
                Thank you. Your programme enquiry has been received. Our team will respond shortly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {errors.form && !errorToast && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {errors.form}
          </p>
        )}

        <fieldset disabled={loading} className="mt-8 grid gap-6 sm:grid-cols-2">
          <FormField
            id="fullName"
            name="fullName"
            label="Full Name"
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
            autoComplete="name"
          />
          <FormField
            id="email"
            name="email"
            label="Email Address"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            required
            autoComplete="email"
          />
          <FormField
            id="phone"
            name="phone"
            label="Phone Number"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            required
            autoComplete="tel"
          />
          <FormField
            id="province"
            name="province"
            label="Province"
            value={form.province}
            onChange={handleChange}
            error={errors.province}
            required
            as="select"
            options={provinceOptions}
          />
          {showCorporateFields && (
            <>
              <FormField
                id="companyName"
                name="companyName"
                label="Company Name"
                value={form.companyName}
                onChange={handleChange}
                error={errors.companyName}
                autoComplete="organization"
              />
              <FormField
                id="numberOfLearners"
                name="numberOfLearners"
                label="Number of Learners"
                type="number"
                value={form.numberOfLearners}
                onChange={handleChange}
                error={errors.numberOfLearners}
              />
            </>
          )}
          <div className="sm:col-span-2">
            <FormField
              id="qualification"
              name="qualification"
              label="Qualification Interested In"
              value={form.qualification}
              onChange={handleChange}
              error={errors.qualification}
              required
              as="select"
              options={qualificationOptions}
            />
          </div>
          <div className="sm:col-span-2">
            <FormField
              id="message"
              name="message"
              label="Additional Message (Optional)"
              value={form.message}
              onChange={handleChange}
              error={errors.message}
              as="textarea"
            />
          </div>
        </fieldset>

        <Button
          type="submit"
          className="mt-8 w-full sm:w-auto"
          disabled={loading}
          analyticsLabel="programme_enquiry_submit"
          analyticsLocation="programme_form"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            'Submit Enquiry'
          )}
        </Button>
      </form>
    </>
  )
}
