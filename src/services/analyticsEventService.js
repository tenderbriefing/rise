import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { ensureFirebaseInitialized, getFirestoreDb } from '../lib/firebase'
import { buildAttribution } from '../utils/trafficAttribution'

export const ANALYTICS_EVENTS_COLLECTION = 'analyticsEvents'

function cleanString(value, max = 300) {
  if (value == null) return null
  const s = String(value).trim()
  if (!s) return null
  return s.length > max ? s.slice(0, max) : s
}

function normalizeEvent(input) {
  const base = buildAttribution()
  const page = typeof document !== 'undefined' ? document.title : null
  const path = typeof window !== 'undefined' ? window.location.pathname : null

  const eventName = cleanString(input.eventName, 80)
  const eventType = cleanString(input.eventType || input.eventName, 40)

  return {
    eventName,
    eventType,
    page: cleanString(input.page ?? page, 200),
    path: cleanString(input.path ?? path, 200),
    source: cleanString(input.source ?? base.source, 120),
    medium: cleanString(input.medium ?? base.medium, 120),
    campaign: cleanString(input.campaign ?? base.campaign, 120),
    referrer: cleanString(input.referrer ?? base.referrer, 300),
    ctaLabel: cleanString(input.ctaLabel, 160),
    qualificationInterest: input.qualificationInterest ?? null,
    corporateInterest: input.corporateInterest ?? null,
    leadId: cleanString(input.leadId, 120),
    sessionId: cleanString(input.sessionId ?? base.sessionId, 80),
    deviceType: cleanString(input.deviceType ?? base.deviceType, 30),
    browser: cleanString(input.browser ?? base.browser, 40),
    createdAt: serverTimestamp(),
  }
}

export async function recordAnalyticsEvent(event) {
  try {
    const init = await ensureFirebaseInitialized()
    if (!init.ok) return { ok: false }

    const db = getFirestoreDb()
    if (!db) return { ok: false }

    const normalized = normalizeEvent(event)
    if (!normalized.eventName) return { ok: false }

    const docRef = await addDoc(collection(db, ANALYTICS_EVENTS_COLLECTION), normalized)
    return { ok: true, id: docRef.id }
  } catch (error) {
    // Analytics must never crash the app.
    if (import.meta.env.DEV) console.warn('[analyticsEvents] record failed', error)
    return { ok: false, error }
  }
}

export async function getAnalyticsEvents(limitCount = 2000) {
  await ensureFirebaseInitialized()
  const db = getFirestoreDb()
  if (!db) throw new Error('Firestore is not configured')

  // Note: limiting is not strictly necessary for small datasets; keep for admin UX performance.
  const q = query(collection(db, ANALYTICS_EVENTS_COLLECTION), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.slice(0, limitCount).map((d) => ({ id: d.id, ...d.data() }))
}

export async function getEventsByDateRange(startDate, endDate, limitCount = 4000) {
  await ensureFirebaseInitialized()
  const db = getFirestoreDb()
  if (!db) throw new Error('Firestore is not configured')

  const q = query(
    collection(db, ANALYTICS_EVENTS_COLLECTION),
    where('createdAt', '>=', startDate),
    where('createdAt', '<=', endDate),
    orderBy('createdAt', 'desc'),
  )
  const snap = await getDocs(q)
  return snap.docs.slice(0, limitCount).map((d) => ({ id: d.id, ...d.data() }))
}

export async function getAnalyticsSummary() {
  const events = await getAnalyticsEvents(4000)
  return {
    totalEvents: events.length,
    sessions: new Set(events.map((e) => e.sessionId).filter(Boolean)).size,
  }
}

