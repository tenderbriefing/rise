import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'
import LeadStatsCards from '../../components/admin/LeadStatsCards'
import GlassCard from '../../components/GlassCard'
import { fetchLeadStats, fetchLeads } from '../../services/leadService'
import LeadStatusBadge from '../../components/admin/LeadStatusBadge'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, new: 0, qualified: 0, closed: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const leads = await fetchLeads()
        if (cancelled) return
        setStats(await fetchLeadStats(leads))
        setRecent(leads.slice(0, 5))
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading dashboard" />
      </div>
    )
  }

  if (error) {
    return (
      <p className="rounded-lg bg-red-50 p-4 text-sm text-red-800" role="alert">
        {error}
      </p>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-muted">Overview of website enquiries and lead pipeline.</p>
      </div>

      <LeadStatsCards stats={stats} />

      <GlassCard className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-charcoal">Recent enquiries</h2>
          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-muted">No enquiries yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((lead) => (
              <li key={lead.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <Link to={`/admin/leads/${lead.id}`} className="font-medium text-primary hover:underline">
                    {lead.fullName}
                  </Link>
                  <p className="text-sm text-muted">{lead.company}</p>
                </div>
                <LeadStatusBadge status={lead.status} />
              </li>
            ))}
          </ul>
        )}
      </GlassCard>

      <GlassCard className="border-dashed p-8 text-center">
        <p className="text-sm font-medium text-muted">Analytics chart placeholder</p>
        <p className="mt-1 text-xs text-muted">Connect GA4 reporting in a future release.</p>
      </GlassCard>
    </div>
  )
}
