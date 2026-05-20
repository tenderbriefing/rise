import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
)

let app = null
let analytics = null
let analyticsInitPromise = null
let db = null
let auth = null

export function getFirebaseApp() {
  if (!isFirebaseConfigured) return null
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  }
  return app
}

export function getFirestoreDb() {
  if (!isFirebaseConfigured) return null
  if (!db) {
    const firebaseApp = getFirebaseApp()
    if (!firebaseApp) return null
    db = getFirestore(firebaseApp)
  }
  return db
}

export function getFirebaseAuth() {
  if (!isFirebaseConfigured) return null
  if (!auth) {
    const firebaseApp = getFirebaseApp()
    if (!firebaseApp) return null
    auth = getAuth(firebaseApp)
  }
  return auth
}

export async function getFirebaseAnalytics() {
  if (!isFirebaseConfigured || typeof window === 'undefined') return null
  if (analytics) return analytics
  if (!analyticsInitPromise) {
    analyticsInitPromise = (async () => {
      const supported = await isSupported()
      if (!supported) return null
      const firebaseApp = getFirebaseApp()
      if (!firebaseApp) return null
      analytics = getAnalytics(firebaseApp)
      return analytics
    })()
  }
  return analyticsInitPromise
}
