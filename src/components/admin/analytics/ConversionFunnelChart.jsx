import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import AnalyticsCard from './AnalyticsCard'

export default function ConversionFunnelChart({ data }) {
  const funnel = data || {}
  const rows = [
    { step: 'Page views', value: funnel.page_views ?? 0 },
    { step: 'CTA clicks', value: funnel.cta_clicks ?? 0 },
    { step: 'Form starts', value: funnel.form_starts ?? 0 },
    { step: 'Form submits', value: funnel.form_submits ?? 0 },
    { step: 'Leads created', value: funnel.generated_leads ?? 0 },
  ]

  const hasData = rows.some((r) => r.value > 0)

  return (
    <AnalyticsCard
      title="Conversion funnel"
      subtitle="Behavioural progression from traffic to lead creation."
    >
      {!hasData ? (
        <p className="text-sm text-muted">
          No funnel data yet. Once users browse pages and submit enquiries, this will populate automatically.
        </p>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} layout="vertical" margin={{ top: 10, right: 16, left: 18, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="step" tick={{ fontSize: 12 }} width={110} />
              <Tooltip />
              <Bar dataKey="value" fill="#c4a052" radius={[2, 2, 2, 2]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </AnalyticsCard>
  )
}

