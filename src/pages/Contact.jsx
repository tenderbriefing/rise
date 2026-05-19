import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import ContactForm from '../components/ContactForm'
import PremiumCTA from '../components/PremiumCTA'
import AnimatedSection from '../components/AnimatedSection'
import { siteConfig } from '../data/navigation'
import { getCanonical } from '../data/seoRoutes'
import { ctaPresets } from '../data/ctaPresets'
import { trackEmailClick, trackPhoneClick } from '../utils/analytics'

export default function Contact() {
  const [toast, setToast] = useState(false)
  const cta = ctaPresets.contact

  const handleFormSuccess = () => {
    setToast(true)
    setTimeout(() => setToast(false), 6000)
  }

  return (
    <>
      <SEO
        title="Contact Rise Institute | QCTO Training Provider in Midrand"
        canonical={getCanonical('/contact')}
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
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            className="fixed right-4 top-24 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-primary/20 bg-white px-5 py-4 shadow-card"
          >
            <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
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
                      <a
                        href="tel:+27100133423"
                        className="text-primary hover:underline"
                        onClick={() => trackPhoneClick('contact_page', 'landline')}
                      >
                        {siteConfig.landline}
                      </a>
                    </p>
                    <p className="text-muted">
                      Mobile:{' '}
                      <a
                        href="tel:+27720708467"
                        className="text-primary hover:underline"
                        onClick={() => trackPhoneClick('contact_page', 'mobile')}
                      >
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
                      onClick={() => trackEmailClick('contact_page')}
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-10">
                <Button
                  href="/rise-institute-corporate-profile.pdf"
                  variant="secondary"
                  download
                  analyticsLabel="download_profile"
                  analyticsLocation="contact_sidebar"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  Download Corporate Profile
                </Button>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ContactForm onSuccess={handleFormSuccess} />
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
            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
              <dt className="text-sm font-semibold text-charcoal">Legal Entity</dt>
              <dd className="mt-1 text-muted">Rise Institute</dd>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
              <dt className="text-sm font-semibold text-charcoal">Accreditation Authority</dt>
              <dd className="mt-1 text-muted">Quality Council for Trades and Occupations</dd>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
              <dt className="text-sm font-semibold text-charcoal">CSD Status</dt>
              <dd className="mt-1 text-muted">Registered and Verified</dd>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
              <dt className="text-sm font-semibold text-charcoal">SARS Compliance</dt>
              <dd className="mt-1 text-muted">Tax Compliant, TCS PIN available upon request</dd>
            </div>
          </dl>
        </Container>
      </AnimatedSection>

      <PremiumCTA {...cta} location="contact_footer" />
    </>
  )
}
