import { Navigate, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import ProgrammeEnquiryForm from '../components/ProgrammeEnquiryForm'
import PremiumCTA from '../components/PremiumCTA'
import SectionShell from '../components/SectionShell'
import Button from '../components/Button'
import { getCanonical } from '../data/seoRoutes'
import { ctaPresets } from '../data/ctaPresets'
import { getQualificationBySlug, seoKeywords } from '../data/qualifications'

export default function ProgrammeDetail() {
  const { slug } = useParams()
  const programme = getQualificationBySlug(slug)

  if (!programme) {
    return <Navigate to="/programmes" replace />
  }

  const canonical = getCanonical(`/programmes/${programme.slug}`)

  return (
    <>
      <SEO
        title={`${programme.shortTitle} (${programme.saqaId}) | Rise Institute`}
        description={programme.description}
        keywords={`${seoKeywords}, ${programme.shortTitle}, QCTO ${programme.saqaId}`}
        canonical={canonical}
        pathname={`/programmes/${programme.slug}`}
        courses={[programme]}
      />

      <PageHero title={programme.title} description={programme.description} light />

      <SectionShell tone="white" padding="compact" className="border-b border-navy/10">
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="content-panel-rich p-5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-gold">QCTO Code</dt>
            <dd className="mt-2 font-heading text-xl font-bold text-navy">{programme.saqaId}</dd>
          </div>
          <div className="content-panel-rich p-5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-gold">NQF Level</dt>
            <dd className="mt-2 font-heading text-xl font-bold text-navy">{programme.nqf}</dd>
          </div>
          <div className="content-panel-rich p-5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-gold">Category</dt>
            <dd className="mt-2 text-sm font-medium leading-snug text-charcoal">{programme.category}</dd>
          </div>
          <div className="content-panel-rich p-5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-gold">Duration</dt>
            <dd className="mt-2 text-sm font-medium text-charcoal">{programme.duration}</dd>
          </div>
        </dl>
      </SectionShell>

      <SectionShell tone="pattern" padding="default">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeader eyebrow="Delivery" title="Delivery Modes" align="left" />
              <ul className="mt-6 flex flex-wrap gap-2">
                {programme.deliveryModes.map((mode) => (
                  <li
                    key={mode}
                    className="rounded-sm border border-border bg-surface px-3 py-2 text-sm font-medium text-charcoal"
                  >
                    {mode}
                  </li>
                ))}
              </ul>

              <SectionHeader
                eyebrow="Career Outcomes"
                title="Career Paths"
                align="left"
                className="mt-12"
              />
              <ul className="mt-6 space-y-3">
                {programme.careerPaths.map((path) => (
                  <li key={path} className="flex gap-3 text-charcoal">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                    {path}
                  </li>
                ))}
              </ul>

              <SectionHeader eyebrow="Curriculum" title="Focus Areas" align="left" className="mt-12" />
              <ul className="mt-6 space-y-3">
                {programme.focus.map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <span className="mt-2 h-px w-3 shrink-0 bg-gold" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button
                  to={programme.facultyPath}
                  variant="outline"
                  analyticsLabel={`back_${programme.facultyId}`}
                  analyticsLocation="programme_detail"
                >
                  Explore {programme.facultyTitle}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ProgrammeEnquiryForm
                defaultQualification={programme.slug}
                qualificationTitle={programme.title}
                saqaId={programme.saqaId}
              />
            </div>
          </div>
      </SectionShell>

      <PremiumCTA {...ctaPresets.qualifications} location={`programme_${programme.slug}`} variant="forest" />
    </>
  )
}
