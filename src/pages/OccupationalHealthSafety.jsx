import { HardHat, ShieldCheck, ClipboardList } from 'lucide-react'
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
import { getQualificationsByFacultyId, seoKeywords } from '../data/qualifications'

const ohsHighlights = [
  {
    title: 'OHS Act Compliance',
    description: 'Training aligned to South African occupational health and safety legislation and regulations.',
    icon: ShieldCheck,
  },
  {
    title: 'Risk Management',
    description: 'Hazard identification, risk assessment, and control measures for diverse workplaces.',
    icon: ClipboardList,
  },
  {
    title: 'Site & Industry Ready',
    description: 'Practical competence for construction, mining, manufacturing, and public sector environments.',
    icon: HardHat,
  },
]

export default function OccupationalHealthSafety() {
  const programmes = getQualificationsByFacultyId('ohs')

  return (
    <>
      <SEO
        title="Occupational Health & Safety Qualification | Rise Institute"
        description="QCTO-accredited Higher Occupational Certificate in Occupational Health and Safety Practitioner (121527) — OHS Act compliance and workplace safety systems."
        keywords={`${seoKeywords}, occupational health and safety course`}
        canonical={getCanonical('/occupational-health-safety')}
      />

      <PageHero
        title="Occupational Health & Safety"
        description="QCTO-accredited qualifications for practitioners responsible for hazard control, risk assessment, and OHS Act compliance across all industry sectors."
        light
      />

      <SectionShell tone="navy" padding="default">
        <SectionHeader
          eyebrow="Workplace Safety"
          title="Protecting People, Assets & Operations"
          description="Occupational health and safety training aligned to national compliance frameworks and real-world workplace requirements."
        />
        <InstitutionalHighlights items={ohsHighlights} columns={3} />
      </SectionShell>

      <SectionShell tone="pattern" padding="default" containerSize="content">
        <SectionHeader
          eyebrow="Accredited Programmes"
          title="OHS Qualifications"
          description="QCTO occupational certificates for workplace safety practitioners."
        />
        <div className="mt-12 grid gap-6">
          {programmes.map((qual) => (
            <ProgrammeCard key={qual.slug} {...qual} faculty={qual.facultyTitle} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button to="/programmes" variant="outline" analyticsLabel="view_all_programmes" analyticsLocation="ohs_page">
            View All Programmes
          </Button>
        </div>
      </SectionShell>

      <PremiumCTA {...ctaPresets.qualifications} location="ohs_footer" variant="forest" />
    </>
  )
}
