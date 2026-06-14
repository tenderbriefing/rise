/**
 * Institutional geometric accents — navy & gold only.
 */
export function HeroDecor({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="hero-decor-slash absolute -right-[15%] top-0 h-[130%] w-[55%] rotate-[-12deg]" />
      <div className="hero-decor-dots absolute inset-0 opacity-60" />
      <div className="hero-decor-frame absolute left-6 top-24 hidden h-24 w-24 border-l-2 border-t-2 border-sa-gold/50 lg:block" />
      <div className="hero-decor-frame absolute bottom-20 right-8 hidden h-16 w-16 border-b-2 border-r-2 border-sa-gold/40 lg:block" />
    </div>
  )
}

export function SectionDecor({ variant = 'light', className = '' }) {
  if (variant === 'navy') {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-sa-gold/10 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
        <div className="section-decor-line absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sa-gold via-sa-gold/40 to-transparent" />
      </div>
    )
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="section-decor-corner absolute right-0 top-0 h-32 w-32" />
      <div className="section-decor-line absolute bottom-0 left-0 h-1 w-2/3 bg-gradient-to-r from-navy via-sa-gold to-transparent opacity-30" />
    </div>
  )
}
