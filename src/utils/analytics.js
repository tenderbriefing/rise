import { logEvent } from 'firebase/analytics'
import { getFirebaseAnalytics, isFirebaseConfigured } from '../lib/firebase'

export const AnalyticsEvents = {
  PAGE_VIEW: 'page_view',
  CLICK: 'click',
  CONTACT: 'contact',
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  GENERATE_LEAD: 'generate_lead',
  FILE_DOWNLOAD: 'file_download',
  CTA_CLICK: 'cta_click',
  NAV_CLICK: 'nav_click',
  EXPORT: 'export',
  ADMIN_UPDATE: 'admin_update',
}

async function withAnalytics(callback) {
  try {
    const analytics = await getFirebaseAnalytics()
    if (analytics) callback(analytics)
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[analytics] failed', error)
    }
  }
}

export async function trackEvent(eventName, params = {}) {
  const enriched = {
    ...params,
    ...(typeof window !== 'undefined'
      ? {
          page_path: window.location.pathname,
          page_title: document.title,
        }
      : {}),
  }

  await withAnalytics((analytics) => {
    logEvent(analytics, eventName, enriched)
  })

  if (import.meta.env.DEV) {
    console.debug(
      '[analytics]',
      eventName,
      enriched,
      isFirebaseConfigured() ? '' : '(no Firebase config)',
    )
  }
}

export function trackPageView(pathname, title) {
  return trackEvent(AnalyticsEvents.PAGE_VIEW, {
    page_path: pathname,
    page_title: title,
  })
}

/** GA4 recommended: track when user begins filling the lead form */
export function trackLeadFormStart() {
  return trackEvent(AnalyticsEvents.FORM_START, {
    form_name: 'contact_enquiry',
    form_id: 'website-contact-form',
  })
}

/** Fired when user attempts to submit the form */
export function trackLeadFormSubmit({ interest } = {}) {
  return trackEvent(AnalyticsEvents.FORM_SUBMIT, {
    form_name: 'contact_enquiry',
    interest_area: interest,
  })
}

/** GA4 recommended conversion: successful lead capture */
export function trackLeadFormSuccess({ interest, enquiryId } = {}) {
  return Promise.all([
    trackEvent(AnalyticsEvents.GENERATE_LEAD, {
      form_name: 'contact_enquiry',
      interest_area: interest,
      enquiry_id: enquiryId,
      currency: 'ZAR',
      value: 1,
    }),
    trackEvent(AnalyticsEvents.CONTACT, {
      method: 'contact_form',
      interest_area: interest,
    }),
  ])
}

export function trackLeadFormError(errorMessage) {
  return trackEvent('form_error', {
    form_name: 'contact_enquiry',
    error_message: String(errorMessage).slice(0, 100),
  })
}

/** GA4 recommended: corporate profile PDF download */
export function trackCorporateProfileDownload(location) {
  return trackEvent(AnalyticsEvents.FILE_DOWNLOAD, {
    file_name: 'rise-institute-corporate-profile.pdf',
    link_url: '/rise-institute-corporate-profile.pdf',
    download_location: location,
  })
}

/** @deprecated Use trackCorporateProfileDownload */
export function trackDownloadProfile({ location }) {
  return trackCorporateProfileDownload(location)
}

export function trackCTAClick(label, location, destination) {
  return Promise.all([
    trackEvent(AnalyticsEvents.CLICK, {
      link_text: label,
      click_location: location,
      destination,
    }),
    trackEvent(AnalyticsEvents.CTA_CLICK, {
      cta_label: label,
      cta_location: location,
      destination,
    }),
  ])
}

export function trackNavClick({ label, path }) {
  return trackEvent(AnalyticsEvents.NAV_CLICK, {
    nav_label: label,
    nav_path: path,
  })
}

export function trackPhoneClick(location, phoneType = 'general') {
  return trackEvent(AnalyticsEvents.CONTACT, {
    method: 'phone',
    contact_location: location,
    phone_type: phoneType,
  })
}

export function trackEmailClick(location) {
  return trackEvent(AnalyticsEvents.CONTACT, {
    method: 'email',
    contact_location: location,
  })
}

/** Backward-compatible CTA helper (object params) */
export function trackCtaClick({ label, destination, location }) {
  return trackCTAClick(label, location, destination)
}

/** @deprecated Use trackLeadFormSubmit */
export function trackFormSubmit({ interest }) {
  return trackLeadFormSubmit({ interest })
}

export function trackCsvExport({ count, scope = 'filtered' }) {
  return trackEvent(AnalyticsEvents.EXPORT, {
    export_type: 'leads_csv',
    lead_count: count,
    export_scope: scope,
  })
}

export function trackAdminLeadUpdate({ leadId, field, status, priority }) {
  return trackEvent(AnalyticsEvents.ADMIN_UPDATE, {
    lead_id: leadId,
    updated_field: field,
    lead_status: status,
    lead_priority: priority,
  })
}
