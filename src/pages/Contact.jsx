import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import AnimatedSection from '../components/AnimatedSection'
import { siteConfig } from '../data/navigation'

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

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState(false)

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required'
    if (!form.company.trim()) next.company = 'Company or organisation is required'
    if (!form.email.trim()) {
      next.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address'
    }
    if (!form.phone.trim()) next.phone = 'Contact number is required'
    if (!form.interest) next.interest = 'Please select an area of interest'
    if (!form.message.trim()) next.message = 'Message is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setLoading(false)
    setSubmitted(true)
    setToast(true)
    setForm(initialForm)
    setTimeout(() => setToast(false), 5000)
  }

  const inputClass = (field) =>
    `mt-1 w-full rounded-xl border px-4 py-3 text-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-border bg-white hover:border-primary/30'
    }`

  return (
    <>
      <SEO
        title="Contact Rise Institute | QCTO Training Provider in Midrand"
        canonical={`${siteConfig.domain}/contact`}
      />

      <PageHero
        title="Contact Rise Institute"
        description="Whether you are a corporate organisation seeking a strategic training partner, a government stakeholder evaluating implementation capacity, or an employer interested in workplace hosting opportunities, our team is ready to assist."
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed right-4 top-24 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-primary/20 bg-white px-5 py-4 shadow-card"
          >
            <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
            <p className="text-sm font-medium text-charcoal">
              Thank you. Your enquiry has been received. Our team will respond shortly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatedSection className="section-padding bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <SectionHeader eyebrow="Get in Touch" title="Contact Details" align="left" />
              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-charcoal">Physical Address</p>
                    <p className="mt-1 text-muted">{siteConfig.address}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-charcoal">Telephone</p>
                    <p className="mt-1 text-muted">
                      Landline:{' '}
                      <a href="tel:+27100133423" className="text-primary hover:underline">
                        {siteConfig.landline}
                      </a>
                    </p>
                    <p className="text-muted">
                      Mobile:{' '}
                      <a href="tel:+27720708467" className="text-primary hover:underline">
                        {siteConfig.mobile}
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-charcoal">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="mt-1 inline-block text-primary hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-10">
                <Button href="/rise-institute-corporate-profile.pdf" variant="secondary" download>
                  <Download className="h-5 w-5" aria-hidden="true" />
                  Download Corporate Profile
                </Button>
              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-border bg-light p-6 shadow-soft sm:p-8"
                aria-label="Contact enquiry form"
              >
                <h2 className="font-heading text-xl font-semibold text-charcoal">Send an Enquiry</h2>
                <p className="mt-2 text-sm text-muted">
                  Complete the form below and our team will respond to your organisation’s training
                  or partnership requirements.
                </p>

                {submitted && (
                  <div
                    className="mt-6 rounded-xl border border-primary/20 bg-mint px-4 py-3 text-sm text-charcoal"
                    role="alert"
                  >
                    Your enquiry has been submitted successfully. We will be in touch shortly.
                  </div>
                )}

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-5">
                    <div>
                      <label htmlFor="fullName" className="text-sm font-medium text-charcoal">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        value={form.fullName}
                        onChange={handleChange}
                        className={inputClass('fullName')}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      />
                      {errors.fullName && (
                        <p id="fullName-error" className="mt-1 text-xs text-red-600">
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="company" className="text-sm font-medium text-charcoal">
                        Company / Organisation <span className="text-primary">*</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={handleChange}
                        className={inputClass('company')}
                        aria-invalid={!!errors.company}
                      />
                      {errors.company && (
                        <p className="mt-1 text-xs text-red-600">{errors.company}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-charcoal">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-charcoal">
                      Contact Number <span className="text-primary">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass('phone')}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="interest" className="text-sm font-medium text-charcoal">
                      Area of Interest <span className="text-primary">*</span>
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      className={inputClass('interest')}
                      aria-invalid={!!errors.interest}
                    >
                      <option value="">Select an option</option>
                      {interestOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.interest && (
                      <p className="mt-1 text-xs text-red-600">{errors.interest}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="text-sm font-medium text-charcoal">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className={inputClass('message')}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                    )}
                  </div>
                </div>

                <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={loading}>
                  {loading ? 'Submitting…' : 'Submit Enquiry'}
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-light">
        <Container size="content">
          <SectionHeader
            eyebrow="Governance"
            title="Compliance & Governance"
            description="Rise Institute maintains institutional compliance frameworks suitable for corporate procurement, SETA engagement, and public sector partnership."
          />
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-6">
              <dt className="text-sm font-semibold text-charcoal">Legal Entity</dt>
              <dd className="mt-1 text-muted">Rise Institute</dd>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <dt className="text-sm font-semibold text-charcoal">Accreditation Authority</dt>
              <dd className="mt-1 text-muted">Quality Council for Trades and Occupations</dd>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <dt className="text-sm font-semibold text-charcoal">CSD Status</dt>
              <dd className="mt-1 text-muted">Registered and Verified</dd>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <dt className="text-sm font-semibold text-charcoal">SARS Compliance</dt>
              <dd className="mt-1 text-muted">Tax Compliant, TCS PIN available upon request</dd>
            </div>
          </dl>
        </Container>
      </AnimatedSection>
    </>
  )
}
