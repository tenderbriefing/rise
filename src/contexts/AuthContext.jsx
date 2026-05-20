import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { ensureFirebaseInitialized, getFirebaseAuth } from '../lib/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [configured, setConfigured] = useState(false)

  useEffect(() => {
    let unsubscribe
    let cancelled = false

    ensureFirebaseInitialized().then((result) => {
      if (cancelled) return

      setConfigured(result.ok)

      if (!result.ok) {
        setLoading(false)
        return
      }

      const authInstance = getFirebaseAuth()
      if (!authInstance) {
        console.error('[firebase] Auth instance missing after init')
        setConfigured(false)
        setLoading(false)
        return
      }

      unsubscribe = onAuthStateChanged(authInstance, (nextUser) => {
        setUser(nextUser)
        setLoading(false)
      })
    })

    return () => {
      cancelled = true
      unsubscribe?.()
    }
  }, [])

  const signIn = useCallback(async (email, password) => {
    const result = await ensureFirebaseInitialized()
    if (!result.ok) {
      throw new Error('Firebase Authentication is not configured')
    }

    const authInstance = getFirebaseAuth()
    if (!authInstance) {
      throw new Error('Firebase Authentication is not available')
    }

    const credential = await signInWithEmailAndPassword(
      authInstance,
      email.trim(),
      password,
    )
    return credential.user
  }, [])

  const signOut = useCallback(async () => {
    const authInstance = getFirebaseAuth()
    if (authInstance) await firebaseSignOut(authInstance)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isConfigured: configured,
      signIn,
      signOut,
    }),
    [user, loading, configured, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with provider
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
