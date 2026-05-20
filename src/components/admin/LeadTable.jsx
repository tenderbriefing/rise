import { Link } from 'react-router-dom'
import LeadStatusBadge from './LeadStatusBadge'
import LeadPriorityBadge from './LeadPriorityBadge'

function formatDate(value) {
  if (!value) return '—'
  const date = value instanceof Date ? value : value.toDate?.() ?? new Date(value)
  return date.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function LeadTable({ leads }) {
  if (!leads.length) {
    return (
      <p className="rounded-sm border border-dashed border-border bg-surface p-12 text-center text-muted">
        No leads match your filters.
      </p>
    )
  }

  return (
  <>
    <div className="hidden overflow-hidden rounded-sm border border-border bg-surface shadow-soft md:block">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-ivory text-xs font-semibold uppercase tracking-wide text-muted">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Interest</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Submitted</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {leads.map((lead) => (
            <tr key={lead.id} className="transition-colors hover:bg-ivory/30">
              <td className="px-4 py-3 font-medium">
                <Link to={`/admin/leads/${lead.id}`} className="text-primary hover:underline">
                  {lead.fullName}
                </Link>
              </td>
              <td className="px-4 py-3 text-muted">{lead.company}</td>
              <td className="px-4 py-3">
                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                  {lead.email}
                </a>
              </td>
              <td className="px-4 py-3 text-muted">{lead.phone}</td>
              <td className="max-w-[160px] truncate px-4 py-3 text-muted" title={lead.interest}>
                {lead.interest}
              </td>
              <td className="px-4 py-3">
                <LeadStatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3">
                <LeadPriorityBadge priority={lead.priority} />
              </td>
              <td className="px-4 py-3 text-muted">{formatDate(lead.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <ul className="space-y-3 md:hidden">
      {leads.map((lead) => (
        <li key={lead.id}>
          <Link
            to={`/admin/leads/${lead.id}`}
            className="block rounded-sm border border-border bg-surface p-4 shadow-soft transition-colors hover:border-primary/30"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-charcoal">{lead.fullName}</p>
                <p className="text-sm text-muted">{lead.company}</p>
              </div>
              <LeadStatusBadge status={lead.status} />
            </div>
            <p className="mt-2 text-sm text-muted">{lead.interest}</p>
            <p className="mt-1 text-xs text-muted">{formatDate(lead.createdAt)}</p>
          </Link>
        </li>
      ))}
    </ul>
  </>
  )
}
