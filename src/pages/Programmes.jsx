import { useMemo, useState } from 'react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import ProgrammeCard from '../components/ProgrammeCard'
import PremiumCTA from '../components/PremiumCTA'
import SectionShell from '../components/SectionShell'
import AcademyLinksBand from '../components/AcademyLinksBand'
import { getCanonical } from '../data/seoRoutes'
import { ctaPresets } from '../data/ctaPresets'
import { allQualifications, getQualificationCategories, seoKeywords } from '../data/qualifications'

export default function Programmes() {
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [nqfFilter, setNqfFilter] = useState('all')
  const categories = useMemo(() => ['all', ...getQualificationCategories()], [])
  const nqfLevels = useMemo(
    () => ['all', ...[...new Set(allQualifications.map((q) => q.nqf))].sort()],
    [],
  )

  const filtered = allQualifications.filter((q) => {
    const categoryOk = categoryFilter === 'all' || q.category === categoryFilter
    const nqfOk = nqfFilter === 'all' || q.nqf === nqfFilter
    return categoryOk && nqfOk
  })

  return (
    <>
      <SEO
        title="Browse QCTO Courses & Qualifications | Rise Institute"
        description="Explore nine QCTO-accredited courses with NQF levels, duration, credit values, and learning outcomes across AI, data, cloud, IoT, agriculture, project management, and OHS."
        keywords={seoKeywords}
        canonical={getCanonical('/programmes')}
      />

      <PageHero title="Browse Courses" />

      <AcademyLinksBand />

      <SectionShell tone="white" padding="compact" className="border-b border-navy/10">
        <div className="flex flex-col gap-8">
          <div>
            <p className="eyebrow-executive">Course Catalogue</p>
            <p className="font-heading text-2xl font-bold text-navy sm:text-3xl">
              {filtered.length} course{filtered.length === 1 ? '' : 's'} available
            </p>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Request programme information for individual enrolment or learnership delivery.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                      categoryFilter === cat
                        ? 'border-accent bg-accent text-white'
                        : 'border-border bg-surface text-charcoal hover:border-accent/40'
                    }`}
                  >
                    {cat === 'all' ? 'All Courses' : cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">NQF Level</p>
              <div className="flex flex-wrap gap-2">
                {nqfLevels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setNqfFilter(level)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                      nqfFilter === level
                        ? 'border-accent bg-accent text-white'
                        : 'border-border bg-surface text-charcoal hover:border-accent/40'
                    }`}
                  >
                    {level === 'all' ? 'All Levels' : level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="pattern" padding="default">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((qual) => (
            <ProgrammeCard key={qual.slug} {...qual} faculty={qual.facultyTitle} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-border bg-surface p-8 text-center text-muted shadow-soft">
            No courses match these filters. Try another category or NQF level.
          </p>
        )}
      </SectionShell>

      <PremiumCTA {...ctaPresets.qualifications} location="programmes_footer" variant="forest" />
    </>
  )
}
