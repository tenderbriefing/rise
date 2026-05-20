import { PRIORITY_LABELS, PRIORITY_STYLES } from '../../data/leadConstants'

export default function LeadPriorityBadge({ priority }) {
  const label = PRIORITY_LABELS[priority] || priority
  const style = PRIORITY_STYLES[priority] || PRIORITY_STYLES.normal

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${style}`}>
      {label}
    </span>
  )
}
