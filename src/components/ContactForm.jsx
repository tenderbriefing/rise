import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import Button from './Button'
import FormField from './FormField'
import { submitContactForm, validateContactForm } from '../services/contactService'
import { trackFormSubmit } from '../utils/analytics'

const interestOptions = [
  'Sponsor a Learnership Programme',
  'B-BBEE Skills Development Support',
  'SETA & Public Sector Partnerships',
  'Workplace Hosting Opportunities',
  'General Enquiry',
]

const initialForm = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  interest: '',
  message: '',
}

export default function ContactForm({ onSuccess }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateContactForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      const result = await submitContactForm(form)
      if (result.success) {
        setSubmitted(true)
        setForm(initialForm)
        trackFormSubmit({ formName: 'contact_enquiry', interest: form.interest })
        onSuccess?.()
      }
    } catch {
      setErrors({ form: 'Unable to submit. Please try again or email us directly.' })
    } finally {
      setLoading(false)
    }
  }

  const selectOptions = (
    <>
      <option value="">Select an option</option>
      {interestOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </>
  )

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8"
      aria-label="Contact enquiry form"
    >
      <h2 className="font-heading text-xl font-semibold text-charcoal">Send an Enquiry</h2>
      <p className="mt-2 text-sm text-muted">
        Complete the form below and our team will respond to your organisation’s training or
        partnership requirements.
      </p>

      <AnimatePresence mode="wait">
        {submitted && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-mint px-4 py-4"
            role="alert"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm text-charcoal">
              Your enquiry has been submitted successfully. We will be in touch shortly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {errors.form && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {errors.form}
        </p>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
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
          id="company"
          name="company"
          label="Company / Organisation"
          value={form.company}
          onChange={handleChange}
          error={errors.company}
          required
          autoComplete="organization"
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
          label="Contact Number"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
          required
          autoComplete="tel"
        />
        <div className="sm:col-span-2">
          <FormField
            id="interest"
            name="interest"
            label="Area of Interest"
            value={form.interest}
            onChange={handleChange}
            error={errors.interest}
            required
            as="select"
            options={selectOptions}
          />
        </div>
        <div className="sm:col-span-2">
          <FormField
            id="message"
            name="message"
            label="Message"
            value={form.message}
            onChange={handleChange}
            error={errors.message}
            required
            as="textarea"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="mt-8 w-full sm:w-auto"
        disabled={loading}
        analyticsLabel="contact_form_submit"
        analyticsLocation="contact_page"
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
  )
}
