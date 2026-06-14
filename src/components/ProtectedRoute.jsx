import { Navigate, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading, isConfigured } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <Loader2 className="h-8 w-8 animate-spin text-forest" aria-label="Loading" />
      </div>
    )
  }

  if (!isConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory p-8">
        <div className="max-w-md rounded-sm border border-border bg-surface p-8 text-center shadow-soft">
          <p className="font-heading text-lg font-semibold text-charcoal">Firebase not configured</p>
          <p className="mt-2 text-sm text-muted">
            For local development, add Firebase credentials to <code className="text-forest">.env.local</code>.
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
