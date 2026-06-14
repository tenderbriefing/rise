import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import AnalyticsCard from './AnalyticsCard'

const COLORS = {
  desktop: '#0c3d32',
  mobile: '#c4a052',
  tablet: '#1e3a5f',
  unknown: '#8a8780',
}

export default function DeviceBreakdownChart({ data }) {
  const rows = Array.isArray(data) ? data : []
  const hasData = rows.some((r) => (r.value ?? 0) > 0)

  return (
    <AnalyticsCard title="Device breakdown" subtitle="Events by device class.">
      {!hasData ? (
        <p className="text-sm text-muted">No device data yet for this date range.</p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={rows} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                {rows.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name] || COLORS.unknown} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </AnalyticsCard>
  )
}

