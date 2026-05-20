import { Clock } from 'lucide-react'

function formatWhen(value) {
  if (!value) return '—'
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleString('en-ZA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function LeadTimeline({ activityLog = [] }) {
  if (!activityLog.length) {
    return (
      <p className="text-sm text-muted">No activity recorded yet.</p>
    )
  }

  return (
    <ul className="space-y-4">
      {activityLog.map((entry, index) => (
        <li key={`${entry.createdAt}-${index}`} className="relative flex gap-3 pl-6">
          <span
            className="absolute left-0 top-1.5 flex h-3 w-3 rounded-full bg-sa-gold ring-4 ring-mint"
            aria-hidden="true"
          />
          {index < activityLog.length - 1 && (
            <span className="absolute left-[5px] top-4 h-full w-px bg-border" aria-hidden="true" />
          )}
          <div className="min-w-0 flex-1 pb-2">
            <p className="text-sm font-medium text-charcoal">{entry.message}</p>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {formatWhen(entry.createdAt)}
              {entry.createdBy && <span>· {entry.createdBy}</span>}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
