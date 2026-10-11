import { Navigate, useParams } from 'react-router-dom'
import { CheckCircle2, Clock3, Layers, GraduationCap, MessageSquare } from 'lucide-react'
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
  const outcomes = programme.learningOutcomes?.length
    ? programme.learningOutcomes
    : programme.focus

  return (
    <>
      <SEO
        title={`${programme.shortTitle} · ${programme.nqf} · SAQA ${programme.saqaId} | Rise Institute`}
        description={`${programme.description} Duration: ${programme.duration}. Credits: ${programme.creditsLabel}.`}
        keywords={`${seoKeywords}, ${programme.shortTitle}, QCTO ${programme.saqaId}, ${programme.nqf}`}
        canonical={canonical}
        pathname={`/programmes/${programme.slug}`}
        courses={[programme]}
      />

      <PageHero title={programme.shortTitle} description={programme.description} light />

      <SectionShell tone="white" padding="compact" className="border-b border-navy/10">
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            {programme.nqf}
          </span>
          <span className="rounded-full border border-navy/15 bg-ivory px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
            SAQA {programme.saqaId}
          </span>
          <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
            {programme.category}
          </span>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              Duration
            </dt>
            <dd className="mt-2 font-heading text-xl font-bold text-navy">{programme.duration}</dd>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
              <Layers className="h-4 w-4" aria-hidden="true" />
              Credits
            </dt>
            <dd className="mt-2 font-heading text-xl font-bold text-navy">{programme.creditsLabel}</dd>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              NQF Level
            </dt>
            <dd className="mt-2 font-heading text-xl font-bold text-navy">{programme.nqf}</dd>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Next step
            </dt>
            <dd className="mt-2 font-heading text-lg font-bold leading-snug text-navy">
              Enquire about this programme
            </dd>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Request programme information from admissions.
            </p>
          </div>
        </dl>
      </SectionShell>

      <SectionShell tone="pattern" padding="default">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="Learning Outcomes"
              title="What you will be able to do"
              align="left"
            />
            <ul className="mt-6 space-y-3">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3 text-charcoal">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            {programme.entryRequirements && (
              <>
                <SectionHeader
                  eyebrow="Entry"
                  title="Entry Requirements"
                  align="left"
                  className="mt-12"
                />
                <p className="mt-4 rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted shadow-soft">
                  {programme.entryRequirements}
                </p>
              </>
            )}

            <SectionHeader eyebrow="Delivery" title="Delivery Modes" align="left" className="mt-12" />
            <ul className="mt-6 flex flex-wrap gap-2">
              {programme.deliveryModes.map((mode) => (
                <li
                  key={mode}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-charcoal"
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

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                to="/contact"
                variant="primary"
                analyticsLabel={`enrol_${programme.slug}`}
                analyticsLocation="programme_detail"
              >
                Enquire to Enrol
              </Button>
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

      <PremiumCTA
        {...ctaPresets.qualifications}
        location={`programme_${programme.slug}`}
        variant="forest"
      />
    </>
  )
}
