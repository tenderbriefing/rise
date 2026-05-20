import { BarChart3, CheckCircle2, Inbox, Target } from 'lucide-react'
import GlassCard from '../GlassCard'

const cards = [
  { key: 'total', label: 'Total Leads', icon: BarChart3, accent: 'text-forest bg-ivory' },
  { key: 'new', label: 'New Leads', icon: Inbox, accent: 'text-sa-blue bg-ivory' },
  { key: 'qualified', label: 'Qualified Leads', icon: Target, accent: 'text-gold bg-ivory' },
  { key: 'closed', label: 'Closed Leads', icon: CheckCircle2, accent: 'text-forest bg-ivory' },
]

export default function LeadStatsCards({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, label, icon: Icon, accent }) => (
        <GlassCard key={key} className="card-executive p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
              <p className="mt-2 font-heading text-3xl font-bold tracking-tight text-charcoal">
                {stats[key] ?? 0}
              </p>
            </div>
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-sm border border-border ${accent}`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-4 h-0.5 overflow-hidden bg-border">
            <div
              className="h-full bg-gold"
              style={{
                width: stats.total
                  ? `${Math.min(100, ((stats[key] ?? 0) / stats.total) * 100)}%`
                  : '0%',
              }}
            />
          </div>
        </GlassCard>
      ))}
    </div>
  )
}
