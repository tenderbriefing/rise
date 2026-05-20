import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

function trimEnv(value) {
  if (value == null) return ''
  const s = String(value).trim()
  if (!s || s === 'undefined' || s === 'null') return ''
  return s
}

/** @returns {import('firebase/app').FirebaseOptions} */
export function buildConfigFromEnv() {
  return {
    apiKey: trimEnv(import.meta.env.VITE_FIREBASE_API_KEY),
    authDomain: trimEnv(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
    projectId: trimEnv(import.meta.env.VITE_FIREBASE_PROJECT_ID),
    storageBucket: trimEnv(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: trimEnv(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
    appId: trimEnv(import.meta.env.VITE_FIREBASE_APP_ID),
    measurementId: trimEnv(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
  }
}

export function isValidFirebaseConfig(config) {
  return Boolean(
    config?.apiKey && config?.authDomain && config?.projectId && config?.appId,
  )
}

function normalizeConfig(data) {
  if (!data || typeof data !== 'object') return null
  const config = {
    apiKey: trimEnv(data.apiKey),
    authDomain: trimEnv(data.authDomain),
    projectId: trimEnv(data.projectId),
    storageBucket: trimEnv(data.storageBucket),
    messagingSenderId: trimEnv(data.messagingSenderId),
    appId: trimEnv(data.appId),
    measurementId: trimEnv(data.measurementId),
  }
  return isValidFirebaseConfig(config) ? config : null
}

async function fetchHostingFirebaseConfig() {
  if (typeof window === 'undefined') return null
  try {
    const response = await fetch('/__/firebase/init.json', {
      credentials: 'same-origin',
      cache: 'no-store',
    })
    if (!response.ok) return null
    const data = await response.json()
    return normalizeConfig(data)
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[firebase] Hosting init.json unavailable', error)
    }
    return null
  }
}

let firebaseConfig = null
let app = null
let auth = null
let db = null
let analytics = null
let analyticsInitPromise = null
let initPromise = null
/** @type {{ ok: boolean, source: string, config: object | null, error?: unknown } | null} */
let initResult = null

/**
 * Initialize Firebase from VITE_* env (build/dev) or Hosting /__/firebase/init.json (production).
 * Auth and Firestore work even if Analytics fails later.
 */
export async function ensureFirebaseInitialized() {
  if (initResult) return initResult

  if (!initPromise) {
    initPromise = (async () => {
      let config = buildConfigFromEnv()
      let source = 'env'

      if (!isValidFirebaseConfig(config)) {
        config = await fetchHostingFirebaseConfig()
        source = config ? 'hosting' : 'none'
      }

      if (!isValidFirebaseConfig(config)) {
        initResult = { ok: false, source: 'none', config: null }
        console.warn(
          '[firebase] Not configured — set VITE_FIREBASE_* in .env.local for local dev, or deploy to Firebase Hosting.',
        )
        return initResult
      }

      firebaseConfig = config
      app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
      auth = getAuth(app)
      db = getFirestore(app)
      initResult = { ok: true, source, config: firebaseConfig }

      console.info(`[firebase] Ready (${source}) — project: ${firebaseConfig.projectId}`)
      return initResult
    })().catch((error) => {
      initPromise = null
      console.error('[firebase] Initialization failed', error)
      initResult = { ok: false, source: 'error', config: null, error }
      return initResult
    })
  }

  return initPromise
}

/** True after successful init, or when valid env is present (pre-init). */
export function isFirebaseConfigured() {
  if (initResult?.ok) return true
  return isValidFirebaseConfig(buildConfigFromEnv())
}

export function getFirebaseApp() {
  return app
}

export function getFirestoreDb() {
  return db
}

export function getFirebaseAuth() {
  return auth
}

/** Analytics is optional — failures never affect auth or Firestore. */
export async function getFirebaseAnalytics() {
  const result = await ensureFirebaseInitialized()
  if (!result.ok || typeof window === 'undefined') return null

  if (analytics) return analytics

  if (!analyticsInitPromise) {
    analyticsInitPromise = (async () => {
      try {
        const supported = await isSupported()
        if (!supported || !app) return null
        analytics = getAnalytics(app)
        return analytics
      } catch (error) {
        console.warn('[firebase] Analytics unavailable (auth unaffected)', error)
        return null
      }
    })()
  }

  return analyticsInitPromise
}
