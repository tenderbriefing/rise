import { Download } from 'lucide-react'
import Container from './Container'
import Button from './Button'
import SectionHeader from './SectionHeader'
import AnimatedSection from './AnimatedSection'

export default function CTASection({
  title = 'Partner With Rise Institute',
  description = 'Let us help you implement accredited occupational training that delivers measurable impact for your organisation and South Africa’s economy.',
  showDownload = true,
  primaryCta = { label: 'Contact Us', to: '/contact' },
  secondaryCta,
}) {
  return (
    <AnimatedSection className="section-padding bg-forest text-white">
      <Container>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <SectionHeader title={title} description={description} align="left" light />
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-0 lg:shrink-0">
            <Button to={primaryCta.to} variant="gold" size="lg">
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button to={secondaryCta.to} variant="ghost" size="lg">
                {secondaryCta.label}
              </Button>
            )}
            {showDownload && (
              <Button
                href="/rise-institute-corporate-profile.pdf"
                variant="secondary"
                size="lg"
                className="!border-white/30 !bg-white !text-forest hover:!bg-mint"
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
