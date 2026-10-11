import EnquiryTemporarilyUnavailable from './EnquiryTemporarilyUnavailable'
import { ENQUIRY_SUBMISSION_ENABLED } from '../data/navigation'

/**
 * Programme / SEO landing enquiry surface. Submission is temporarily disabled
 * until production email notification is operational.
 */
export default function ProgrammeEnquiryForm() {
  if (!ENQUIRY_SUBMISSION_ENABLED) {
    return <EnquiryTemporarilyUnavailable title="Request Programme Information" />
  }

  return <EnquiryTemporarilyUnavailable title="Request Programme Information" />
}
