import { logEvent } from 'firebase/analytics'
import { getFirebaseAnalytics, isFirebaseConfigured } from '../lib/firebase'

export const AnalyticsEvents = {
  CTA_CLICK: 'cta_click',
  NAV_CLICK: 'nav_click',
  FORM_SUBMIT: 'form_submit',
  DOWNLOAD_PROFILE: 'download_corporate_profile',
  PAGE_VIEW: 'page_view',
}

async function withAnalytics(callback) {
  if (!isFirebaseConfigured) {
    if (import.meta.env.DEV) {
      console.debug('[analytics]', callback.name || 'event')
    }
    return
  }
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
  await withAnalytics((analytics) => {
    logEvent(analytics, eventName, {
      ...params,
      page_path: window.location.pathname,
      page_title: document.title,
    })
  })

  if (import.meta.env.DEV) {
    console.debug('[analytics]', eventName, params)
  }
}

export function trackPageView(pathname, title) {
  return trackEvent(AnalyticsEvents.PAGE_VIEW, {
    page_path: pathname,
    page_title: title,
  })
}

export function trackCtaClick({ label, destination, location }) {
  return trackEvent(AnalyticsEvents.CTA_CLICK, {
    cta_label: label,
    destination,
    cta_location: location,
  })
}

export function trackNavClick({ label, path }) {
  return trackEvent(AnalyticsEvents.NAV_CLICK, {
    nav_label: label,
    nav_path: path,
  })
}

export function trackFormSubmit({ formName, interest }) {
  return trackEvent(AnalyticsEvents.FORM_SUBMIT, {
    form_name: formName,
    interest_area: interest,
  })
}

export function trackDownloadProfile({ location }) {
  return trackEvent(AnalyticsEvents.DOWNLOAD_PROFILE, {
    download_location: location,
  })
}
