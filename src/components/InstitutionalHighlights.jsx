export default function InstitutionalHighlights({
  items,
  variant = 'light',
  columns = 3,
  className = '',
}) {
  void variant
  const gridClass =
    columns === 1
      ? 'mt-10 flex flex-col gap-4'
      : columns === 4
        ? 'mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'
        : columns === 2
          ? 'mt-10 grid gap-5 md:grid-cols-2'
          : 'mt-10 grid gap-5 md:grid-cols-3'

  return (
    <ul className={`${gridClass} ${className}`}>
      {items.map(({ title, description, icon: Icon }) => (
        <li
          key={title}
          className="rounded-2xl border border-border bg-white p-6 shadow-soft transition-all hover:border-accent/25 hover:shadow-card"
        >
          {Icon && (
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
          <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-ink">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        </li>
      ))}
    </ul>
  )
}
