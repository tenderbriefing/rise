import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, LogOut, Users } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import BrandLogo from '../components/BrandLogo'

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2.5 rounded-sm border px-3 py-2.5 text-sm font-medium tracking-wide transition-colors ${
    isActive
      ? 'border-forest/20 bg-forest text-white shadow-sm'
      : 'border-transparent text-charcoal hover:border-border hover:bg-surface'
  }`

export default function AdminLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-border bg-surface shadow-nav">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-6">
            <BrandLogo className="h-8" />
            <div className="hidden border-l border-border pl-6 sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                Executive Portal
              </p>
              <p className="text-sm font-medium text-charcoal">Lead Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden max-w-[220px] truncate text-sm text-muted sm:block">
              {user?.email}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-sm font-medium text-charcoal transition-colors hover:border-forest/30 hover:bg-ivory"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:py-8">
        <aside className="lg:w-60 lg:shrink-0">
          <nav
            className="card-executive flex flex-row gap-1 p-2 lg:flex-col"
            aria-label="Admin navigation"
          >
            <NavLink to="/admin" end className={navLinkClass}>
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              Dashboard
            </NavLink>
            <NavLink to="/admin/leads" className={navLinkClass}>
              <Users className="h-4 w-4" aria-hidden="true" />
              Leads
            </NavLink>
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
