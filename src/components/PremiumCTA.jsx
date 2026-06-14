import Container from './Container'
import Button from './Button'
import AnimatedSection from './AnimatedSection'
import { SectionDecor } from './PageDecor'
import { trackCTAClick } from '../utils/analytics'

const variants = {
  forest: 'section-dark',
  navy: 'section-dark',
  gradient: 'section-dark',
  mint: 'section-surface',
  light: 'section-surface',
}

export default function PremiumCTA({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = 'forest',
  location = 'page_cta',
}) {
  const isLight = variant === 'mint' || variant === 'light'

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
    <AnimatedSection className={`section-padding relative overflow-hidden ${variants[variant]}`}>
      {!isLight && <SectionDecor variant="navy" />}
      <div className="premium-cta-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative z-10">
        <div
          className={`relative overflow-hidden rounded-sm border p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12 ${
            isLight
              ? 'card-premium border-navy/15'
              : 'border border-sa-gold/30 bg-navy-dark/80 shadow-elevated backdrop-blur-sm'
          }`}
        >
          {!isLight && (
            <div
              className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sa-gold via-sa-gold/50 to-navy"
              aria-hidden="true"
            />
          )}
          <div className="max-w-2xl">
            <p className={isLight ? 'eyebrow-executive' : 'eyebrow-executive-light'}>Next Step</p>
            <h2
              className={`font-heading text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl ${
                isLight ? 'text-navy' : 'text-white'
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-4 text-lg leading-relaxed ${
                isLight ? 'text-muted' : 'text-white/85'
              }`}
            >
              {description}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-0 lg:shrink-0">
            <Button
              to={primaryCta.to}
              href={primaryCta.href}
              variant={isLight ? 'primary' : 'gold'}
              size="lg"
              onClick={handlePrimary}
              analyticsLabel={primaryCta.eventLabel}
            >
              {primaryCta.label}
            </Button>

            {secondaryCta && (
              <Button
                to={secondaryCta.to}
                href={secondaryCta.href}
                variant={isLight ? 'secondary' : 'ghost'}
                size="lg"
                onClick={handleSecondary}
                className={isLight ? '' : '!border-white/40 !text-white hover:!bg-white/10'}
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
