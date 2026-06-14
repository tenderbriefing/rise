import { Leaf, Sprout, Tractor } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import ProgrammeCard from '../components/ProgrammeCard'
import PremiumCTA from '../components/PremiumCTA'
import SectionShell from '../components/SectionShell'
import InstitutionalHighlights from '../components/InstitutionalHighlights'
import VisualPanel from '../components/VisualPanel'
import Button from '../components/Button'
import { getCanonical } from '../data/seoRoutes'
import { ctaPresets } from '../data/ctaPresets'
import { getQualificationsByFacultyId, seoKeywords } from '../data/qualifications'

const agricultureHighlights = [
  {
    title: 'Food Security',
    description: 'Training that supports national priorities in sustainable production and rural enterprise.',
    icon: Sprout,
  },
  {
    title: 'Green Economy',
    description: 'Skills for agri-processing, quality assurance, and export-ready agricultural value chains.',
    icon: Leaf,
  },
  {
    title: 'Workplace Learning',
    description: 'On-farm and agri-business placements aligned to QCTO occupational standards.',
    icon: Tractor,
  },
]

export default function AgricultureAcademy() {
  const programmes = getQualificationsByFacultyId('agriculture')

  return (
    <>
      <SEO
        title="Agriculture Academy | QCTO Agricultural Qualifications | Rise Institute"
        description="QCTO-accredited agricultural qualifications in crop analysis, poultry farming, and livestock supervision — supporting food security and rural enterprise development."
        keywords={`${seoKeywords}, agricultural training South Africa`}
        canonical={getCanonical('/agriculture-academy')}
      />

      <PageHero
        title="Agriculture Academy"
        description="QCTO-accredited occupational qualifications supporting food security, rural enterprise development, and South Africa's growing Green Economy."
        light
      />

      <SectionShell tone="creative" padding="default">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Sustainable Agriculture"
              title="Building Agricultural Capability"
              description="Workplace-integrated training in crop production, poultry farming, and livestock supervision — aligned to QCTO standards and industry demand."
              align="left"
            />
            <InstitutionalHighlights items={agricultureHighlights} variant="light" columns={1} className="!mt-8" />
          </div>
          <VisualPanel imageKey="agricultureTraining" variant="agriculture" className="min-h-[300px] shadow-card" />
        </div>
      </SectionShell>

      <SectionShell tone="pattern" padding="default">
        <SectionHeader
          eyebrow="Accredited Programmes"
          title="Agriculture Qualifications"
          description="QCTO occupational certificates for crop, poultry, and livestock pathways."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programmes.map((qual) => (
            <ProgrammeCard key={qual.slug} {...qual} faculty={qual.facultyTitle} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button to="/programmes" variant="outline" analyticsLabel="view_all_programmes" analyticsLocation="agriculture_academy">
            View All Programmes
          </Button>
        </div>
      </SectionShell>

      <PremiumCTA {...ctaPresets.qualifications} location="agriculture_academy_footer" variant="forest" />
    </>
  )
}
