import { Mail } from 'lucide-react'
import { siteConfig } from '../data/navigation'
import { trackEmailClick } from '../utils/analytics'

/**
 * Temporary public enquiry notice while production email delivery is deferred.
 * Must not claim that a form submission was received or emailed.
 */
export default function EnquiryTemporarilyUnavailable({
  title = 'Enquire with Rise Institute',
  className = '',
}) {
  const enquiryEmail = siteConfig.enquiryEmail

  return (
    <div
      className={`card-executive rounded-sm border-l-4 border-l-sa-gold p-6 sm:p-10 ${className}`}
      role="region"
      aria-label="Enquiry information"
    >
      <p className="eyebrow-executive">Enquiry</p>
      <h2 className="font-heading text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-xl text-muted">
        Online enquiry submission is temporarily unavailable while we finalise our institutional
        email notification service. Please contact us directly and our team will respond during
        business hours.
      </p>

      <div className="mt-8 rounded-sm border border-border bg-ivory px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Email enquiries to</p>
        <a
          href={`mailto:${enquiryEmail}`}
          className="mt-2 inline-flex items-center gap-2 font-heading text-lg font-semibold text-navy hover:text-gold"
          onClick={() => trackEmailClick('enquiry_notice')}
        >
          <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
          {enquiryEmail}
        </a>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Include your full name, organisation (if applicable), programme of interest, and a brief
          message. You may also call{' '}
          <a
            href={`tel:${siteConfig.landlineTel}`}
            className="font-medium text-navy hover:text-gold"
          >
            {siteConfig.landline}
          </a>{' '}
          or visit us at {siteConfig.address}.
        </p>
      </div>
    </div>
  )
}
