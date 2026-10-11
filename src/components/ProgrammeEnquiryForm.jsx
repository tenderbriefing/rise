import { Mail } from 'lucide-react'
import Button from './Button'
import { siteConfig } from '../data/navigation'
import { trackEmailClick } from '../utils/analytics'

/**
 * Programme / SEO pages direct enquiries to the main Contact FormSubmit flow.
 */
export default function ProgrammeEnquiryForm() {
  return (
    <div
      className="card-executive rounded-sm border-l-4 border-l-sa-gold p-6 sm:p-8"
      role="region"
      aria-label="Programme enquiry information"
    >
      <p className="eyebrow-executive">Enquire Now</p>
      <h2 className="font-heading text-xl font-bold tracking-tight text-charcoal sm:text-2xl">
        Request Programme Information
      </h2>
      <p className="mt-2 text-sm text-muted">
        Use the Rise Institute contact form to enquire about this programme, learnership options, or
        corporate training. Our team will respond during business hours.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button
          to="/contact"
          variant="primary"
          analyticsLabel="programme_to_contact"
          analyticsLocation="programme_form"
        >
          Enquire about this programme
        </Button>
        <a
          href={`mailto:${siteConfig.enquiryEmail}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold"
          onClick={() => trackEmailClick('programme_enquiry_mailto')}
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          {siteConfig.enquiryEmail}
        </a>
      </div>
    </div>
  )
}
