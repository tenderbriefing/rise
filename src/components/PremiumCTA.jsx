import Container from './Container'
import Button from './Button'
import AnimatedSection from './AnimatedSection'
import { trackCTAClick } from '../utils/analytics'

const variants = {
  forest: 'bg-navy text-white',
  navy: 'bg-navy text-white',
  gradient: 'bg-navy-dark text-white',
  mint: 'bg-mint text-ink',
  light: 'bg-surface text-ink',
}

export default function PremiumCTA({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = 'navy',
  location = 'page_cta',
}) {
  const isDark = variant === 'forest' || variant === 'navy' || variant === 'gradient'

  const handlePrimary = () => {
    trackCTAClick(primaryCta.label, location, primaryCta.to || primaryCta.href)
  }

  const handleSecondary = () => {
    if (secondaryCta) {
      trackCTAClick(
        secondaryCta.label,
        `${location}_secondary`,
        secondaryCta.to || secondaryCta.href,
      )
    }
  }

  return (
    <AnimatedSection
      className={`section-padding relative overflow-hidden ${variants[variant] || variants.navy}`}
    >
      <div className="premium-cta-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative z-10">
        <div
          className={`relative overflow-hidden rounded-sm border p-8 shadow-card sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12 ${
            isDark
              ? 'border-sa-gold/25 bg-navy-dark/40'
              : 'border-border bg-white'
          }`}
        >
          <div className="max-w-2xl">
            <p className={`mb-3 text-sm font-semibold ${isDark ? 'text-sa-gold' : 'text-navy'}`}>
              Next step
            </p>
            <h2
              className={`font-heading text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl ${
                isDark ? 'text-white' : 'text-ink'
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-4 text-lg leading-relaxed ${
                isDark ? 'text-white/80' : 'text-muted'
              }`}
            >
              {description}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <Button
              to={primaryCta.to}
              href={primaryCta.href}
              variant="gold"
              size="lg"
              onClick={handlePrimary}
              analyticsLabel={primaryCta.eventLabel || primaryCta.label}
              analyticsLocation={location}
            >
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button
                to={secondaryCta.to}
                href={secondaryCta.href}
                variant={isDark ? 'ghost' : 'outline'}
                size="lg"
                onClick={handleSecondary}
                analyticsLabel={secondaryCta.eventLabel || secondaryCta.label}
                analyticsLocation={`${location}_secondary`}
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </AnimatedSection>
  )
}
