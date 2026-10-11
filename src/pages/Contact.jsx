import { Mail, MapPin, Phone, Building2 } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import ContactForm from '../components/ContactForm'
import PremiumCTA from '../components/PremiumCTA'
import SectionShell from '../components/SectionShell'
import TrustBadges from '../components/TrustBadges'
import AnimatedSection from '../components/AnimatedSection'
import { siteConfig } from '../data/navigation'
import { getCanonical } from '../data/seoRoutes'
import { ctaPresets } from '../data/ctaPresets'
import { footerTrustBadges } from '../data/trustBadges'
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
  const cta = ctaPresets.contact

  return (
    <>
      <SEO
        title="Contact Rise Institute | QCTO Training Provider in Centurion"
        canonical={getCanonical('/contact')}
      />

      <PageHero
        title="Contact Rise Institute"
        description="Whether you are a corporate organisation seeking a strategic training partner, a government stakeholder evaluating implementation capacity, or an employer interested in workplace hosting opportunities, our team is ready to assist."
        light
      />

      <AnimatedSection className="section-padding-compact section-white-band">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrustBadges badges={footerTrustBadges} variant="strip" />
        </div>
      </AnimatedSection>

      <SectionShell tone="pattern" padding="default">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-4">
              <div className="executive-panel sticky top-28 rounded-sm border-l-4 border-l-gold p-8 lg:p-10">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="eyebrow-executive !mb-0">Institutional</p>
                    <h2 className="font-heading text-xl font-bold text-charcoal">Contact Details</h2>
                  </div>
                </div>
                <ul className="space-y-0">
                  <ContactDetail icon={MapPin} label="Physical Address">
                    <address className="not-italic">
                      {siteConfig.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </ContactDetail>
                  <ContactDetail icon={Phone} label="Telephone">
                    <a
                      href={`tel:${siteConfig.landlineTel}`}
                      className="font-medium text-navy hover:text-gold"
                      onClick={() => trackPhoneClick('contact_page', 'landline')}
                    >
                      {siteConfig.landline}
                    </a>
                  </ContactDetail>
                  <ContactDetail icon={Mail} label="Enquiries">
                    <a
                      href={`mailto:${siteConfig.enquiryEmail}`}
                      className="font-medium text-navy hover:text-gold"
                      onClick={() => trackEmailClick('contact_page_enquiry')}
                    >
                      {siteConfig.enquiryEmail}
                    </a>
                  </ContactDetail>
                  <ContactDetail icon={Mail} label="General">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-medium text-navy hover:text-gold"
                      onClick={() => trackEmailClick('contact_page')}
                    >
                      {siteConfig.email}
                    </a>
                  </ContactDetail>
                </ul>

              </div>
            </aside>

            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
      </SectionShell>

      <SectionShell tone="mint" padding="default">
        <SectionHeader
          eyebrow="Governance"
          title="Compliance & Governance"
          description="Rise Institute maintains institutional compliance frameworks suitable for corporate procurement, SETA engagement, and public sector partnership."
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
              className="rounded-2xl border border-border bg-white p-6 shadow-soft sm:p-7"
            >
              <dt className="text-xs font-semibold uppercase tracking-wider text-accent">{term}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-charcoal">{value}</dd>
            </div>
          ))}
        </dl>
      </SectionShell>

      <PremiumCTA {...cta} location="contact_footer" variant="forest" />
    </>
  )
}
