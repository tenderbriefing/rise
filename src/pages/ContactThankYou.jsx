import { CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionShell from '../components/SectionShell'
import Button from '../components/Button'
import { siteConfig } from '../data/navigation'
import { getCanonical } from '../data/seoRoutes'

export default function ContactThankYou() {
  return (
    <>
      <SEO
        title="Thank You | Rise Institute"
        description="Thank you for contacting Rise Institute. Our team will respond to your enquiry shortly."
        canonical={getCanonical('/contact/thank-you')}
        noindex
      />

      <PageHero
        title="Thank you for your enquiry"
        description="Your message has been received. A member of the Rise Institute team will respond during business hours."
        light
      />

      <SectionShell tone="pattern" padding="default">
        <div className="mx-auto max-w-2xl card-executive rounded-sm border-l-4 border-l-sa-gold p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 h-8 w-8 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <h2 className="font-heading text-xl font-bold text-charcoal sm:text-2xl">
                Enquiry submitted successfully
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                If your matter is urgent, you may also email{' '}
                <a
                  href={`mailto:${siteConfig.enquiryEmail}`}
                  className="font-medium text-navy hover:text-gold"
                >
                  {siteConfig.enquiryEmail}
                </a>{' '}
                or call{' '}
                <a
                  href={`tel:${siteConfig.landlineTel}`}
                  className="font-medium text-navy hover:text-gold"
                >
                  {siteConfig.landline}
                </a>
                .
              </p>
              <p className="mt-4 text-sm text-muted">{siteConfig.address}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/" variant="primary" analyticsLabel="thankyou_home" analyticsLocation="contact_thank_you">
                  Return home
                </Button>
                <Button
                  to="/programmes"
                  variant="secondary"
                  analyticsLabel="thankyou_programmes"
                  analyticsLocation="contact_thank_you"
                >
                  Browse programmes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </>
  )
}
