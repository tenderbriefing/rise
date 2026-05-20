import { LEAD_PRIORITIES, LEAD_STATUSES, STATUS_LABELS, PRIORITY_LABELS } from '../../data/leadConstants'

export default function LeadFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  sortField,
  onSortFieldChange,
  sortDirection,
  onSortDirectionChange,
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
      <div className="min-w-[200px] flex-1">
        <label htmlFor="lead-search" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
          Search
        </label>
        <input
          id="lead-search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Name, company, email, phone…"
          className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </div>

      <div>
        <label htmlFor="filter-status" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
          Status
        </label>
        <select
          id="filter-status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full min-w-[140px] rounded-sm border border-border bg-surface px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-priority" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
          Priority
        </label>
        <select
          id="filter-priority"
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="w-full min-w-[120px] rounded-sm border border-border bg-surface px-3 py-2 text-sm"
        >
          <option value="">All priorities</option>
          {LEAD_PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {PRIORITY_LABELS[p]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sort-field" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
          Sort by
        </label>
        <div className="flex gap-2">
          <select
            id="sort-field"
            value={sortField}
            onChange={(e) => onSortFieldChange(e.target.value)}
            className="rounded-sm border border-border bg-surface px-3 py-2 text-sm"
          >
            <option value="createdAt">Date submitted</option>
            <option value="fullName">Name</option>
            <option value="company">Company</option>
            <option value="status">Status</option>
            <option value="priority">Priority</option>
          </select>
          <select
            aria-label="Sort direction"
            value={sortDirection}
            onChange={(e) => onSortDirectionChange(e.target.value)}
            className="rounded-sm border border-border bg-surface px-3 py-2 text-sm"
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
      </div>
    </div>
  )
}
