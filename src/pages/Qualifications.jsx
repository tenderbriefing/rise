import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'
import QualificationCard from '../components/QualificationCard'
import PremiumCTA from '../components/PremiumCTA'
import { getCanonical } from '../data/seoRoutes'
import { ctaPresets } from '../data/ctaPresets'
import AnimatedSection from '../components/AnimatedSection'
import { faculties } from '../data/qualifications'

export default function Qualifications() {
  return (
    <>
      <SEO
        title="QCTO Accredited Qualifications | Rise Institute"
        canonical={getCanonical('/qualifications')}
      />

      <PageHero
        title="Our Qualifications"
        description="QCTO-accredited occupational qualifications across sustainable agriculture, project management, and occupational health and safety — structured for workplace-integrated delivery."
      />

      {faculties.map((faculty, index) => (
        <AnimatedSection
          key={faculty.id}
          className={`section-padding ${index % 2 === 0 ? 'bg-white' : 'bg-light'}`}
        >
          <Container>
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-mint text-primary">
                <faculty.icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <SectionHeader title={faculty.title} description={faculty.intro} align="left" />
              </div>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {faculty.qualifications.map((qual) => (
                <QualificationCard key={qual.saqaId} {...qual} />
              ))}
            </div>
          </Container>
        </AnimatedSection>
      ))}

      <PremiumCTA {...ctaPresets.qualifications} location="qualifications_footer" />
    </>
  )
}
