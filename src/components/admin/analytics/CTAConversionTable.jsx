import AnalyticsCard from './AnalyticsCard'

export default function CTAConversionTable({ rows }) {
  const data = Array.isArray(rows) ? rows : []

  return (
    <AnalyticsCard title="CTA performance" subtitle="Clicks and lead conversion by CTA label.">
      {data.length === 0 ? (
        <p className="text-sm text-muted">No CTA performance data yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted">
                <th className="py-2 pr-3">CTA</th>
                <th className="py-2 pr-3">Clicks</th>
                <th className="py-2 pr-3">Leads</th>
                <th className="py-2">Conv.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((r) => (
                <tr key={r.label}>
                  <td className="py-3 pr-3 font-medium text-charcoal">{r.label}</td>
                  <td className="py-3 pr-3 text-muted">{r.clicks}</td>
                  <td className="py-3 pr-3 text-muted">{r.leads}</td>
                  <td className="py-3 font-semibold text-forest">{r.conversionRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AnalyticsCard>
  )
}

