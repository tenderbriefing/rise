import AnalyticsCard from './AnalyticsCard'

export default function QualificationInterestHeatmap({ data }) {
  const rows = Array.isArray(data) ? data : []
  const max = rows.reduce((m, r) => Math.max(m, r.count || 0), 0)

  return (
    <AnalyticsCard title="Qualification interest" subtitle="Interactions by faculty and qualification.">
      {rows.length === 0 ? (
        <p className="text-sm text-muted">No qualification interest events yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.slice(0, 10).map((r) => {
            const pct = max > 0 ? Math.round(((r.count || 0) / max) * 100) : 0
            return (
              <div key={`${r.faculty}-${r.title}`} className="rounded-sm border border-border bg-surface p-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">{r.faculty}</p>
                    <p className="mt-1 text-sm font-medium text-charcoal">{r.title}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-forest">{r.count}</p>
                </div>
                <div className="mt-3 h-1 overflow-hidden bg-border">
                  <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </AnalyticsCard>
  )
}

