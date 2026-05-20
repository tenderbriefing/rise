import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'
import QualificationCard from '../components/QualificationCard'
import PremiumCTA from '../components/PremiumCTA'
import AnimatedSection from '../components/AnimatedSection'
import { getCanonical } from '../data/seoRoutes'
import { ctaPresets } from '../data/ctaPresets'
import { faculties } from '../data/qualifications'

export default function Qualifications() {
  const totalQualifications = faculties.reduce((n, f) => n + f.qualifications.length, 0)

  return (
    <>
      <SEO
        title="QCTO Accredited Qualifications | Rise Institute"
        canonical={getCanonical('/qualifications')}
      />

      <PageHero
        title="Our Qualifications"
        description="QCTO-accredited occupational qualifications across sustainable agriculture, project management, and occupational health and safety — structured for workplace-integrated delivery."
        light
      />

      <AnimatedSection className="section-padding-compact section-surface border-b border-border">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow-executive">Portfolio</p>
              <p className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                {totalQualifications} accredited occupational qualifications
              </p>
            </div>
            <div className="flex gap-8 border-l border-border pl-8">
              <div>
                <p className="text-3xl font-bold text-forest">{faculties.length}</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Faculties
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gold">NQF 3–5</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Levels offered
                </p>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {faculties.map((faculty, index) => (
        <AnimatedSection
          key={faculty.id}
          className={`section-padding ${index % 2 === 0 ? 'section-ivory' : 'section-surface'}`}
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    Faculty {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="mt-4 flex items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-border bg-surface text-forest shadow-soft">
                      <faculty.icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                  </div>
                  <SectionHeader
                    title={faculty.title}
                    description={faculty.intro}
                    align="left"
                    className="!max-w-none mt-4"
                  />
                  <p className="mt-6 text-sm text-muted">
                    {faculty.qualifications.length} qualification
                    {faculty.qualifications.length !== 1 ? 's' : ''} in this faculty
                  </p>
                </div>
              </div>
              <div className="lg:col-span-8">
                <div className="grid gap-6 md:grid-cols-2">
                  {faculty.qualifications.map((qual) => (
                    <QualificationCard key={qual.saqaId} {...qual} />
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </AnimatedSection>
      ))}

      <PremiumCTA {...ctaPresets.qualifications} location="qualifications_footer" variant="forest" />
    </>
  )
}
