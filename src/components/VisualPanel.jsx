import { getImage } from '../data/images'

const gradients = {
  agriculture: 'from-primary-dark via-primary to-primary-dark',
  corporate: 'from-primary via-primary-dark to-primary',
  safety: 'from-primary-dark via-primary to-primary-dark',
  classroom: 'from-primary to-primary-dark',
  workplace: 'from-primary-dark via-primary to-primary',
}

const defaultLabels = {
  agriculture: 'Agricultural training environment',
  corporate: 'Corporate workplace learning',
  safety: 'Occupational health and safety training',
  classroom: 'Classroom facilitation',
  workplace: 'Workplace practical learning',
}

export default function VisualPanel({
  variant = 'agriculture',
  imageKey,
  className = '',
  label,
}) {
  const registryEntry = imageKey ? getImage(imageKey) : null
  const resolvedVariant = registryEntry?.variant || variant
  const resolvedLabel = label || registryEntry?.alt || defaultLabels[resolvedVariant] || 'Training environment'
  const imageSrc = registryEntry?.src

  if (imageSrc) {
    return (
      <div className={`relative overflow-hidden rounded-sm ${className}`}>
        <img
          src={imageSrc}
          alt={resolvedLabel}
          className="h-full w-full min-h-[200px] object-cover"
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary/25 to-transparent"
          aria-hidden="true"
        />
        <p className="absolute bottom-0 left-0 right-0 border-t border-sa-gold/20 bg-primary/50 p-6 text-sm font-medium tracking-wide text-white backdrop-blur-sm">
          {resolvedLabel}
        </p>
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-gradient-to-br ${gradients[resolvedVariant]} ${className}`}
      role="img"
      aria-label={resolvedLabel}
    >
      <div
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative flex h-full min-h-[200px] items-end p-6">
        <p className="text-sm font-medium tracking-wide text-white/90">{resolvedLabel}</p>
      </div>
    </div>
  )
}
