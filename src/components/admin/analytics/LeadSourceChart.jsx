import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import AnalyticsCard from './AnalyticsCard'

export default function LeadSourceChart({ data }) {
  const rows = Array.isArray(data) ? data : []
  const hasData = rows.some((r) => (r.value ?? 0) > 0)

  return (
    <AnalyticsCard
      title="Lead sources"
      subtitle="Generated leads by attributed channel."
    >
      {!hasData ? (
        <p className="text-sm text-muted">No lead-source data yet for this date range.</p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} margin={{ top: 10, right: 16, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Leads" fill="#0c3d32" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </AnalyticsCard>
  )
}

