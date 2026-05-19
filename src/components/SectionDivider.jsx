export default function SectionDivider({ variant = 'default' }) {
  if (variant === 'gold') {
    return (
      <div className="flex items-center justify-center py-2" aria-hidden="true">
        <span className="h-px w-16 bg-gold/60" />
        <span className="mx-3 h-1.5 w-1.5 rounded-full bg-gold" />
        <span className="h-px w-16 bg-gold/60" />
      </div>
    )
  }

  return (
    <div
      className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-border to-transparent"
      aria-hidden="true"
    />
  )
}
