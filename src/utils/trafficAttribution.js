import { getSessionId } from './session'

export function getUTMParams() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const source = params.get('utm_source')
  const medium = params.get('utm_medium')
  const campaign = params.get('utm_campaign')
  return {
    source: source || null,
    medium: medium || null,
    campaign: campaign || null,
  }
}

export function getReferrer() {
  if (typeof document === 'undefined') return null
  return document.referrer || null
}

export function getDeviceType() {
  if (typeof window === 'undefined') return 'unknown'
  const width = window.innerWidth || 0
  if (width < 640) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

export function getBrowserName() {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent
  if (/edg/i.test(ua)) return 'edge'
  if (/chrome|crios/i.test(ua)) return 'chrome'
  if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) return 'safari'
  if (/firefox/i.test(ua)) return 'firefox'
  return 'other'
}

export function getTrafficSource() {
  const utm = getUTMParams()
  if (utm.source || utm.medium || utm.campaign) {
    return {
      source: utm.source,
      medium: utm.medium,
      campaign: utm.campaign,
      channel: classifyChannel({ source: utm.source, medium: utm.medium }),
    }
  }

  const ref = getReferrer()
  if (!ref) return { source: null, medium: null, campaign: null, channel: 'direct' }

  try {
    const host = new URL(ref).hostname
    const channel = classifyReferrer(host)
    return { source: host, medium: 'referral', campaign: null, channel }
  } catch {
    return { source: ref, medium: 'referral', campaign: null, channel: 'referral' }
  }
}

function classifyChannel({ source, medium }) {
  const s = (source || '').toLowerCase()
  const m = (medium || '').toLowerCase()
  if (m.includes('cpc') || m.includes('ppc') || m.includes('paid')) return 'paid'
  if (m.includes('email')) return 'email'
  if (m.includes('social') || /facebook|instagram|linkedin|twitter|tiktok/.test(s)) return 'social'
  if (m.includes('organic') || m.includes('seo')) return 'organic'
  if (m) return 'unknown'
  return 'direct'
}

function classifyReferrer(hostname) {
  const h = hostname.toLowerCase()
  if (/google\.|bing\.|yahoo\./.test(h)) return 'organic'
  if (/facebook\.|instagram\.|linkedin\.|twitter\.|tiktok\./.test(h)) return 'social'
  return 'referral'
}

export function buildAttribution() {
  const sessionId = getSessionId()
  const traffic = getTrafficSource()
  const referrer = getReferrer()

  return {
    sessionId,
    source: traffic.source,
    medium: traffic.medium,
    campaign: traffic.campaign,
    channel: traffic.channel,
    referrer,
    landingPage:
      typeof window !== 'undefined' ? window.location.pathname + window.location.search : null,
    currentPage: typeof window !== 'undefined' ? window.location.pathname : null,
    deviceType: getDeviceType(),
    browser: getBrowserName(),
  }
}

