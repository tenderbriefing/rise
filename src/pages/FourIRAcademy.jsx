import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import ProgrammeCard from '../components/ProgrammeCard'
import PremiumCTA from '../components/PremiumCTA'
import SectionShell from '../components/SectionShell'
import InstitutionalHighlights from '../components/InstitutionalHighlights'
import Button from '../components/Button'
import { getCanonical } from '../data/seoRoutes'
import { ctaPresets } from '../data/ctaPresets'
import { fourIrPillars, getQualificationsByFacultyId, seoKeywords } from '../data/qualifications'

export default function FourIRAcademy() {
  const programmes = getQualificationsByFacultyId('4ir')

  return (
    <>
      <SEO
        title="4IR Academy | AI, Data Science, Cloud & IoT Training | Rise Institute"
        description="QCTO-accredited Fourth Industrial Revolution qualifications in artificial intelligence, data science, cloud administration, and IoT development at Rise Institute."
        keywords={seoKeywords}
        canonical={getCanonical('/4ir-academy')}
      />

      <PageHero
        title="4IR Academy"
        description="Preparing South Africa's Workforce for the Fourth Industrial Revolution through QCTO-accredited qualifications in AI, data science, cloud computing, and the Internet of Things."
        light
      />

      <SectionShell tone="navy" padding="default">
        <SectionHeader
          eyebrow="Fourth Industrial Revolution"
          title="Digital Skills for a Competitive Economy"
          description="Industry-aligned occupational qualifications that equip learners for high-demand roles in artificial intelligence, data, cloud infrastructure, and connected systems."
        />
        <InstitutionalHighlights
          items={fourIrPillars.map((p) => ({
            title: p.title,
            description: p.description,
            icon: p.icon,
          }))}
          columns={4}
        />
      </SectionShell>

      <SectionShell tone="pattern" padding="default">
        <SectionHeader
          eyebrow="Accredited Programmes"
          title="4IR Qualifications"
          description="All programmes are QCTO-accredited with classroom, online, and hybrid delivery options."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {programmes.map((qual) => (
            <ProgrammeCard key={qual.slug} {...qual} faculty={qual.facultyTitle} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button to="/programmes" variant="outline" analyticsLabel="view_all_programmes" analyticsLocation="4ir_academy">
            View All Programmes
          </Button>
        </div>
      </SectionShell>

      <PremiumCTA {...ctaPresets.qualifications} location="4ir_academy_footer" variant="forest" />
    </>
  )
}
