import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { ensureFirebaseInitialized, getFirebaseAuth } from '../lib/firebase'

const AuthContext = createContext(null)

async function resolveAdminClaim(user) {
  if (!user) return false
  try {
    const token = await user.getIdTokenResult(true)
    return token.claims?.admin === true
  } catch (error) {
    console.error('[auth] Failed to read admin claim', error)
    return false
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
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

      unsubscribe = onAuthStateChanged(authInstance, async (nextUser) => {
        if (cancelled) return
        setLoading(true)
        setUser(nextUser)
        const admin = await resolveAdminClaim(nextUser)
        if (cancelled) return
        setIsAdmin(admin)
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

    const admin = await resolveAdminClaim(credential.user)
    setIsAdmin(admin)

    if (!admin) {
      await firebaseSignOut(authInstance)
      setUser(null)
      setIsAdmin(false)
      throw new Error(
        'This account is signed in to Firebase but is not authorised as a Rise Institute administrator. An admin custom claim is required.',
      )
    }

    return credential.user
  }, [])

  const signOut = useCallback(async () => {
    const authInstance = getFirebaseAuth()
    if (authInstance) await firebaseSignOut(authInstance)
    setUser(null)
    setIsAdmin(false)
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin,
      isConfigured: configured,
      signIn,
      signOut,
    }),
    [user, loading, isAdmin, configured, signIn, signOut],
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
