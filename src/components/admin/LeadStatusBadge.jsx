import { STATUS_LABELS, STATUS_STYLES } from '../../data/leadConstants'

export default function LeadStatusBadge({ status }) {
  const label = STATUS_LABELS[status] || status
  const style = STATUS_STYLES[status] || 'bg-slate-100 text-slate-700 ring-slate-200'

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${style}`}
    >
      {label}
    </span>
  )
}
