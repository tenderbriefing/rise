import { useMemo, useState } from 'react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import ProgrammeCard from '../components/ProgrammeCard'
import PremiumCTA from '../components/PremiumCTA'
import SectionShell from '../components/SectionShell'
import AcademyLinksBand from '../components/AcademyLinksBand'
import { getCanonical } from '../data/seoRoutes'
import { ctaPresets } from '../data/ctaPresets'
import { allQualifications, getQualificationCategories, seoKeywords } from '../data/qualifications'

export default function Programmes() {
  const [categoryFilter, setCategoryFilter] = useState('all')
  const categories = useMemo(() => ['all', ...getQualificationCategories()], [])

  const filtered =
    categoryFilter === 'all'
      ? allQualifications
      : allQualifications.filter((q) => q.category === categoryFilter)

  return (
    <>
      <SEO
        title="QCTO Accredited Programmes & Qualifications | Rise Institute"
        description="Explore nine QCTO-accredited occupational qualifications across 4IR, agriculture, project management, and occupational health and safety at Rise Institute, Midrand."
        keywords={seoKeywords}
        canonical={getCanonical('/programmes')}
      />

      <PageHero
        title="Programmes & Qualifications"
        description="Nine QCTO-accredited occupational qualifications preparing South Africa's workforce for the Fourth Industrial Revolution, sustainable agriculture, business leadership, and workplace safety."
        light
      />

      <AcademyLinksBand />

      <SectionShell tone="white" padding="compact" className="border-b border-navy/10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow-executive">Accredited Portfolio</p>
            <p className="font-heading text-2xl font-bold text-navy sm:text-3xl">
              {allQualifications.length} QCTO-accredited qualifications
            </p>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Filter by industry category or visit a dedicated academy for faculty-specific
              pathways.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-sm border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  categoryFilter === cat
                    ? 'border-navy bg-navy text-white'
                    : 'border-border bg-surface text-charcoal hover:border-navy/30'
                }`}
              >
                {cat === 'all' ? 'All Programmes' : cat}
              </button>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="pattern" padding="default">
        <SectionHeader
          eyebrow="Programmes"
          title="Browse Accredited Qualifications"
          description="Each qualification includes QCTO codes, NQF levels, delivery modes, and career pathways."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((qual) => (
            <ProgrammeCard key={qual.slug} {...qual} faculty={qual.facultyTitle} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-8 rounded-sm border border-border bg-surface p-8 text-center text-muted shadow-soft">
            No programmes match this category.
          </p>
        )}
      </SectionShell>

      <PremiumCTA {...ctaPresets.qualifications} location="programmes_footer" variant="forest" />
    </>
  )
}
