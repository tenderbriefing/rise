import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Mail, MapPin, Phone, CheckCircle2, Building2 } from 'lucide-react'
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

function ContactDetail({ icon: Icon, label, children }) {
  return (
    <li className="flex gap-4 border-b border-border/80 pb-6 last:border-0 last:pb-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border bg-ivory text-gold">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">{label}</p>
        <div className="mt-2 text-sm leading-relaxed text-charcoal">{children}</div>
      </div>
    </li>
  )
}

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
        light
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            className="fixed right-4 top-24 z-50 flex max-w-sm items-center gap-3 rounded-sm border border-gold/30 bg-surface px-5 py-4 shadow-elevated"
          >
            <CheckCircle2 className="h-6 w-6 shrink-0 text-gold" aria-hidden="true" />
            <p className="text-sm font-medium text-charcoal">
              Thank you. Your enquiry has been received. Our team will respond shortly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatedSection className="section-padding section-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-4">
              <div className="executive-panel sticky top-28 rounded-sm border-l-4 border-l-gold p-8 lg:p-10">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-forest text-gold">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="eyebrow-executive !mb-0">Institutional</p>
                    <h2 className="font-heading text-xl font-bold text-charcoal">Contact Details</h2>
                  </div>
                </div>
                <ul className="space-y-0">
                  <ContactDetail icon={MapPin} label="Physical Address">
                    {siteConfig.address}
                  </ContactDetail>
                  <ContactDetail icon={Phone} label="Telephone">
                    <>
                      <p>
                        Landline:{' '}
                        <a
                          href="tel:+27100133423"
                          className="font-medium text-forest hover:text-gold"
                          onClick={() => trackPhoneClick('contact_page', 'landline')}
                        >
                          {siteConfig.landline}
                        </a>
                      </p>
                      <p className="mt-1">
                        Mobile:{' '}
                        <a
                          href="tel:+27720708467"
                          className="font-medium text-forest hover:text-gold"
                          onClick={() => trackPhoneClick('contact_page', 'mobile')}
                        >
                          {siteConfig.mobile}
                        </a>
                      </p>
                    </>
                  </ContactDetail>
                  <ContactDetail icon={Mail} label="Email">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-medium text-forest hover:text-gold"
                      onClick={() => trackEmailClick('contact_page')}
                    >
                      {siteConfig.email}
                    </a>
                  </ContactDetail>
                </ul>

                <div className="mt-8 border-t border-border pt-8">
                  <Button
                    href="/rise-institute-corporate-profile.pdf"
                    variant="outline"
                    className="w-full"
                    download
                    analyticsLabel="download_profile"
                    analyticsLocation="contact_sidebar"
                  >
                    <Download className="h-5 w-5" aria-hidden="true" />
                    Download Corporate Profile
                  </Button>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <ContactForm onSuccess={handleFormSuccess} />
            </div>
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding section-dark">
        <Container size="content">
          <SectionHeader
            eyebrow="Governance"
            title="Compliance & Governance"
            description="Rise Institute maintains institutional compliance frameworks suitable for corporate procurement, SETA engagement, and public sector partnership."
            light
          />
          <dl className="mt-12 grid gap-5 sm:grid-cols-2">
            {[
              { term: 'Legal Entity', value: 'Rise Institute' },
              { term: 'Accreditation Authority', value: 'Quality Council for Trades and Occupations' },
              { term: 'CSD Status', value: 'Registered and Verified' },
              {
                term: 'SARS Compliance',
                value: 'Tax Compliant, TCS PIN available upon request',
              },
            ].map(({ term, value }) => (
              <div
                key={term}
                className="executive-panel-dark rounded-sm border border-white/10 p-6 sm:p-7"
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-gold">{term}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-white/85">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </AnimatedSection>

      <PremiumCTA {...cta} location="contact_footer" variant="forest" />
    </>
  )
}
