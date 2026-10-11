import EnquiryTemporarilyUnavailable from './EnquiryTemporarilyUnavailable'
import { ENQUIRY_SUBMISSION_ENABLED } from '../data/navigation'

/**
 * Contact enquiry surface. Submission is temporarily disabled until production
 * email notification is operational — do not show a false success state.
 */
export default function ContactForm() {
  if (!ENQUIRY_SUBMISSION_ENABLED) {
    return <EnquiryTemporarilyUnavailable title="Send an Enquiry" />
  }

  // Re-enable full form implementation only after SMTP E2E is proven.
  return <EnquiryTemporarilyUnavailable title="Send an Enquiry" />
}
