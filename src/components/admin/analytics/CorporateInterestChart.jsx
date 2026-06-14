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

export default function CorporateInterestChart({ data }) {
  const rows = Array.isArray(data) ? data : []
  const hasData = rows.some((r) => (r.value ?? 0) > 0)

  return (
    <AnalyticsCard title="Corporate interest" subtitle="Engagement across corporate funding sections.">
      {!hasData ? (
        <p className="text-sm text-muted">No corporate-interest events yet.</p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} margin={{ top: 10, right: 16, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" name="Events" fill="#1e3a5f" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </AnalyticsCard>
  )
}

