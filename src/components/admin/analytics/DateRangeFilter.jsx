export default function DateRangeFilter({ start, end, onChange }) {
  const toISO = (d) => {
    const date = new Date(d)
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
  }

  const fromISO = (value) => {
    const [y, m, d] = String(value).split('-').map((x) => Number(x))
    return new Date(y, (m || 1) - 1, d || 1)
  }

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-sm border border-border bg-surface px-4 py-3 shadow-soft">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted" htmlFor="range-start">
          Start
        </label>
        <input
          id="range-start"
          type="date"
          value={toISO(start)}
          onChange={(e) => onChange({ start: fromISO(e.target.value), end })}
          className="mt-1 rounded-sm border border-border bg-surface px-3 py-2 text-sm text-charcoal focus:border-forest focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted" htmlFor="range-end">
          End
        </label>
        <input
          id="range-end"
          type="date"
          value={toISO(end)}
          onChange={(e) => onChange({ start, end: fromISO(e.target.value) })}
          className="mt-1 rounded-sm border border-border bg-surface px-3 py-2 text-sm text-charcoal focus:border-forest focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </div>
    </div>
  )
}

