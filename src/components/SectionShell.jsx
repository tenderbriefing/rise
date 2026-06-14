import AnimatedSection from './AnimatedSection'
import Container from './Container'
import { SectionDecor } from './PageDecor'

const toneClasses = {
  ivory: 'section-surface',
  surface: 'section-surface',
  white: 'section-surface',
  mint: 'section-white-band',
  pattern: 'section-pattern',
  gradient: 'section-creative-white',
  creative: 'section-creative-white',
  navy: 'section-dark',
}

const paddingClasses = {
  default: 'section-padding',
  compact: 'section-padding-compact',
  none: '',
}

export default function SectionShell({
  children,
  tone = 'pattern',
  padding = 'default',
  className = '',
  containerSize,
  containerClassName = '',
  ...sectionProps
}) {
  const resolved = toneClasses[tone] ?? toneClasses.pattern
  const isNavy = resolved === 'section-dark'
  const isLight =
    resolved === 'section-pattern' ||
    resolved === 'section-creative-white' ||
    resolved === 'section-surface' ||
    resolved === 'section-white-band'

  return (
    <AnimatedSection
      className={`relative overflow-hidden ${resolved} ${paddingClasses[padding] ?? paddingClasses.default} ${className}`}
      {...sectionProps}
    >
      <SectionDecor variant={isNavy ? 'navy' : 'light'} />
      {isLight && <div className="section-inner-glow pointer-events-none absolute inset-0" aria-hidden="true" />}
      <Container size={containerSize} className={`relative z-10 ${containerClassName}`}>
        {children}
      </Container>
    </AnimatedSection>
  )
}
