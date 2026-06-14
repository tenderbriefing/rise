export default function InstitutionalHighlights({
  items,
  variant = 'dark',
  columns = 3,
  className = '',
}) {
  const gridClass =
      columns === 1
        ? 'mt-10 flex flex-col gap-4'
        : columns === 4
      ? 'mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'
      : columns === 2
        ? 'mt-10 grid gap-5 md:grid-cols-2'
        : 'mt-10 grid gap-5 md:grid-cols-3'

  const isDark = variant === 'dark'

  return (
    <ul className={`${gridClass} ${className}`}>
      {items.map(({ title, description, icon: Icon }) => (
        <li
          key={title}
          className={
            isDark
              ? 'executive-panel-dark rounded-sm border border-white/10 p-6'
              : 'card-executive rounded-sm p-6'
          }
        >
          {Icon && (
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-sm ${
                isDark ? 'bg-sa-gold/15 text-sa-gold' : 'border border-border bg-ivory text-navy'
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
          <h3
            className={`mt-4 font-heading text-lg font-bold leading-snug ${
              isDark ? 'text-white' : 'text-navy'
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-2 text-sm leading-relaxed ${
              isDark ? 'text-white/75' : 'text-muted'
            }`}
          >
            {description}
          </p>
        </li>
      ))}
    </ul>
  )
}
