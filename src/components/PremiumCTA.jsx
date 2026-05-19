import { Download } from 'lucide-react'
import Container from './Container'
import Button from './Button'
import GradientOrb from './GradientOrb'
import AnimatedSection from './AnimatedSection'
import { trackCTAClick, trackCorporateProfileDownload } from '../utils/analytics'

const variants = {
  forest: 'bg-forest text-white',
  gradient: 'hero-pattern text-white',
  mint: 'bg-mint text-charcoal',
  light: 'bg-light text-charcoal',
}

export default function PremiumCTA({
  title,
  description,
  primaryCta,
  secondaryCta,
  showDownload = false,
  variant = 'forest',
  location = 'page_cta',
}) {
  const isLight = variant === 'mint' || variant === 'light'

  const handlePrimary = () => {
    if (primaryCta.download) {
      trackCorporateProfileDownload(location)
    } else {
      trackCTAClick(primaryCta.label, location, primaryCta.to || primaryCta.href)
    }
  }

  const handleSecondary = () => {
    if (secondaryCta?.download) {
      trackCorporateProfileDownload(`${location}_secondary`)
    } else if (secondaryCta) {
      trackCTAClick(
        secondaryCta.label,
        `${location}_secondary`,
        secondaryCta.to || secondaryCta.href,
      )
    }
  }

  return (
    <AnimatedSection className={`section-padding relative overflow-hidden ${variants[variant]}`}>
      {!isLight && (
        <>
          <GradientOrb className="-left-20 top-0" size="lg" color="accent" />
          <GradientOrb className="-right-10 bottom-0" size="md" color="gold" delay={0.5} />
        </>
      )}
      <Container className="relative">
        <div
          className={`rounded-2xl border p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12 ${
            isLight
              ? 'border-border bg-white shadow-card'
              : 'border-white/15 bg-white/5 backdrop-blur-md'
          }`}
        >
          <div className="max-w-2xl">
            <h2
              className={`font-heading text-2xl font-bold tracking-tight sm:text-3xl ${
                isLight ? 'text-charcoal' : 'text-white'
              }`}
            >
              {title}
            </h2>
            <p className={`mt-4 text-lg leading-relaxed ${isLight ? 'text-muted' : 'text-white/85'}`}>
              {description}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-0 lg:shrink-0">
            <Button
              to={primaryCta.to}
              href={primaryCta.href}
              variant={isLight ? 'primary' : 'gold'}
              size="lg"
              download={primaryCta.download}
              onClick={handlePrimary}
              analyticsLabel={primaryCta.eventLabel}
            >
              {primaryCta.download && <Download className="h-5 w-5" aria-hidden="true" />}
              {primaryCta.label}
            </Button>

            {secondaryCta && (
              <Button
                to={secondaryCta.to}
                href={secondaryCta.href}
                variant={isLight ? 'secondary' : 'ghost'}
                size="lg"
                download={secondaryCta.download}
                onClick={handleSecondary}
                className={
                  isLight ? '' : '!border-white/40 !text-white hover:!bg-white/10'
                }
              >
                {secondaryCta.download && <Download className="h-5 w-5" aria-hidden="true" />}
                {secondaryCta.label}
              </Button>
            )}

            {showDownload && !primaryCta.download && !secondaryCta?.download && (
              <Button
                href="/rise-institute-corporate-profile.pdf"
                variant={isLight ? 'secondary' : 'ghost'}
                size="lg"
                download
                className={isLight ? '' : '!border-white/30 !bg-white !text-forest hover:!bg-mint'}
                onClick={() => trackCorporateProfileDownload(location)}
              >
                <Download className="h-5 w-5" aria-hidden="true" />
                Download Corporate Profile
              </Button>
            )}
          </div>
        </div>
      </Container>
    </AnimatedSection>
  )
}
