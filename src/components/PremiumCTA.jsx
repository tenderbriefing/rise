import { Download } from 'lucide-react'
import Container from './Container'
import Button from './Button'
import AnimatedSection from './AnimatedSection'
import { trackCTAClick, trackCorporateProfileDownload } from '../utils/analytics'

const variants = {
  forest: 'section-dark',
  gradient: 'section-dark',
  mint: 'section-ivory',
  light: 'section-surface',
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
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 100% 0%, rgb(196 160 82 / 0.12), transparent 50%)',
        }}
      />
      <Container className="relative">
        <div
          className={`rounded-sm border p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12 ${
            isLight ? 'card-executive border-border' : 'executive-panel-dark border-white/10'
          }`}
        >
          <div className="max-w-2xl">
            <p className={isLight ? 'eyebrow-executive' : 'eyebrow-executive-light'}>Next Step</p>
            <h2
              className={`font-heading text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl ${
                isLight ? 'text-charcoal' : 'text-white'
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-4 text-lg leading-relaxed ${
                isLight ? 'text-muted' : 'text-white/80'
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
                className={isLight ? '' : '!border-white/40 !text-white hover:!bg-white/10'}
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
                className={isLight ? '' : '!border-white/30 !text-white hover:!bg-white/10'}
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
