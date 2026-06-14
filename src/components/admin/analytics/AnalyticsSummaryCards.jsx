import { Activity, MousePointerClick, TrendingUp, Users } from 'lucide-react'

function Card({ label, value, icon: Icon, accent = 'text-forest' }) {
  return (
    <div className="card-executive rounded-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
          <p className="mt-2 font-heading text-3xl font-bold tracking-tight text-charcoal">
            {value}
          </p>
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-ivory ${accent}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
    </div>
  )
}

export default function AnalyticsSummaryCards({ summary }) {
  const items = [
    { label: 'Events', value: summary.events ?? 0, icon: Activity, accent: 'text-forest' },
    { label: 'Sessions', value: summary.sessions ?? 0, icon: Users, accent: 'text-sa-blue' },
    { label: 'Leads', value: summary.leads ?? 0, icon: MousePointerClick, accent: 'text-gold' },
    { label: 'Lead conversion', value: `${summary.conversionRate ?? 0}%`, icon: TrendingUp, accent: 'text-forest' },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} {...item} />
      ))}
    </div>
  )
}

