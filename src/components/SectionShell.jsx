import AnimatedSection from './AnimatedSection'
import Container from './Container'

const toneClasses = {
  ivory: 'section-ivory',
  surface: 'section-surface',
  white: 'section-surface',
  mint: 'bg-mint',
  pattern: 'section-pattern',
  gradient: 'section-surface',
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
  id,
  ...sectionProps
}) {
  const resolved = toneClasses[tone] ?? toneClasses.pattern
  const showGlow =
    resolved === 'section-pattern' ||
    resolved === 'section-surface' ||
    resolved === 'section-ivory'

  return (
    <AnimatedSection
      id={id}
      className={`relative overflow-hidden ${resolved} ${paddingClasses[padding] ?? paddingClasses.default} ${className}`}
      {...sectionProps}
    >
      {showGlow && (
        <div className="section-inner-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      )}
      <Container size={containerSize} className={`relative z-10 ${containerClassName}`}>
        {children}
      </Container>
    </AnimatedSection>
  )
}
