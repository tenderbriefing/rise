import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AlertCircle, Loader2, Lock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import BrandLogo from '../../components/BrandLogo'

export default function AdminLogin() {
  const { signIn, user, loading, isConfigured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to={from} replace />
  }

  const canSignIn = isConfigured && !loading

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err?.message || 'Invalid email or password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink p-4">
      <div className="w-full max-w-md rounded-sm border border-border bg-surface p-8 shadow-elevated sm:p-10">
        <div className="mb-8 text-center">
          <BrandLogo className="mx-auto justify-center" />
          <p className="eyebrow-executive mt-6 !mb-3">Executive Portal</p>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
            Sign in to manage leads
          </h1>
        </div>

        {loading && (
          <p className="mb-4 flex items-center justify-center gap-2 text-sm text-muted">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Connecting to Firebase…
          </p>
        )}

        {!loading && !isConfigured && (
          <p className="mb-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
            Firebase could not be initialized. For local dev, add credentials to{' '}
            <code>.env.local</code>. On Firebase Hosting, ensure the site is linked to project{' '}
            <code>rise-f62a4</code>.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="mb-1 block text-sm font-medium text-charcoal">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-border px-3 py-2.5 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-1 block text-sm font-medium text-charcoal">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-border px-3 py-2.5 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>

          {error && (
            <p className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800" role="alert">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !canSignIn}
            className="flex w-full items-center justify-center gap-2 rounded-sm bg-forest py-3 text-sm font-semibold text-white transition-colors hover:bg-forest disabled:opacity-60"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Admin accounts are created manually in Firebase Authentication.
        </p>
      </div>
    </div>
  )
}
