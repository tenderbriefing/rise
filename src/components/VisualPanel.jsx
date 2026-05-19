export default function VisualPanel({ variant = 'agriculture', className = '' }) {
  const gradients = {
    agriculture:
      'from-primary/90 via-forest to-accent/80',
    corporate:
      'from-forest via-primary to-charcoal/90',
    safety:
      'from-charcoal via-primary to-accent/70',
    classroom:
      'from-mint via-primary/80 to-forest',
    workplace:
      'from-gold/30 via-primary to-forest',
  }

  const labels = {
    agriculture: 'Agricultural training environment',
    corporate: 'Corporate workplace learning',
    safety: 'Occupational health and safety training',
    classroom: 'Classroom facilitation',
    workplace: 'Workplace practical learning',
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[variant]} ${className}`}
      role="img"
      aria-label={labels[variant]}
    >
      <div
        className="absolute inset-0 opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative flex h-full min-h-[200px] items-end p-6">
        <p className="text-sm font-medium text-white/90">{labels[variant]}</p>
      </div>
    </div>
  )
}
