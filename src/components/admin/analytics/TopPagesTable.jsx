import AnalyticsCard from './AnalyticsCard'

export default function TopPagesTable({ rows }) {
  const data = Array.isArray(rows) ? rows : []

  return (
    <AnalyticsCard title="Top pages" subtitle="Pages driving views, clicks and leads.">
      {data.length === 0 ? (
        <p className="text-sm text-muted">No page performance data yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted">
                <th className="py-2 pr-3">Page</th>
                <th className="py-2 pr-3">Views</th>
                <th className="py-2 pr-3">CTA clicks</th>
                <th className="py-2 pr-3">Leads</th>
                <th className="py-2">Conv.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((r) => (
                <tr key={r.path}>
                  <td className="py-3 pr-3 font-medium text-charcoal">{r.path}</td>
                  <td className="py-3 pr-3 text-muted">{r.pageViews}</td>
                  <td className="py-3 pr-3 text-muted">{r.ctaClicks}</td>
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

