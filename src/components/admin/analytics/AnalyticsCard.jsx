export default function AnalyticsCard({ title, subtitle, actions, children, className = '' }) {
  return (
    <section className={`card-executive rounded-sm p-6 ${className}`}>
      {(title || subtitle || actions) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && <h2 className="font-heading text-lg font-semibold text-charcoal">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  )
}

