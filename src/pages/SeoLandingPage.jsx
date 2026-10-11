import { Link, Navigate, useLocation } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import ProgrammeEnquiryForm from '../components/ProgrammeEnquiryForm'
import PremiumCTA from '../components/PremiumCTA'
import SectionShell from '../components/SectionShell'
import Button from '../components/Button'
import { getCanonical } from '../data/seoRoutes'
import { getSeoLandingPageByPath, getSeoLandingInternalLinks } from '../data/seoLandingPages'
import { getQualificationBySlug, seoKeywords } from '../data/qualifications'

export default function SeoLandingPage() {
  const { pathname } = useLocation()
  const page = getSeoLandingPageByPath(pathname)

  if (!page) {
    return <Navigate to="/programmes" replace />
  }

  const qualification = getQualificationBySlug(page.qualificationSlug)
  const canonical = getCanonical(page.path)
  const internalLinks = getSeoLandingInternalLinks(page)

  const corporateCta = {
    title: 'Corporate Training & Learnership Solutions',
    description: page.corporateCtaDescription,
    primaryCta: {
      label: 'Request Corporate Training',
      to: '/corporate-funding',
      eventLabel: `corporate_seo_${page.id}`,
    },
    secondaryCta: {
      label: 'Speak to Our Team',
      to: '/contact',
      eventLabel: `contact_seo_${page.id}`,
    },
    variant: 'forest',
  }

  return (
    <>
      <SEO
        title={page.metaTitle}
        description={page.metaDescription}
        keywords={`${seoKeywords}, ${page.keywords}`}
        canonical={canonical}
        pathname={page.path}
        courses={qualification ? [qualification] : []}
      />

      <PageHero title={page.h1} description={page.intro} light>
        <div className="flex flex-wrap gap-3">
          <Button
            to="#enquire"
            variant="gold"
            analyticsLabel={`enquire_hero_${page.id}`}
            analyticsLocation="seo_landing_hero"
          >
            Enquire Now
          </Button>
          {qualification && (
            <Button
              to={`/programmes/${qualification.slug}`}
              variant="ghost"
              analyticsLabel={`programme_hero_${page.id}`}
              analyticsLocation="seo_landing_hero"
            >
              View Full Programme
            </Button>
          )}
        </div>
      </PageHero>

      <SectionShell tone="white" padding="compact" className="border-b border-navy/10">
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="content-panel-rich p-5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-gold">Accreditation</dt>
            <dd className="mt-2 text-sm font-medium leading-snug text-charcoal">
              QCTO Accredited Occupational Qualification
            </dd>
          </div>
          <div className="content-panel-rich p-5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-gold">QCTO Code</dt>
            <dd className="mt-2 font-heading text-xl font-bold text-navy">{page.saqaId}</dd>
          </div>
          <div className="content-panel-rich p-5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-gold">NQF Level</dt>
            <dd className="mt-2 font-heading text-xl font-bold text-navy">{page.nqf}</dd>
          </div>
          <div className="content-panel-rich p-5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-gold">Qualification</dt>
            <dd className="mt-2 text-sm font-medium leading-snug text-charcoal">
              {page.qualificationTitle}
            </dd>
          </div>
        </dl>
      </SectionShell>

      <SectionShell tone="pattern" padding="default">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-4">
            <div className="sidebar-panel-navy sticky top-28 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Programme Summary
                </p>
                <p className="mt-3 font-heading text-lg font-bold leading-snug text-ink">
                  {page.qualificationTitle}
                </p>
              </div>
              <dl className="space-y-4 border-t border-border pt-5 text-sm">
                <div>
                  <dt className="text-muted">QCTO Code</dt>
                  <dd className="mt-1 font-semibold text-accent">{page.saqaId}</dd>
                </div>
                <div>
                  <dt className="text-muted">NQF Level</dt>
                  <dd className="mt-1 font-semibold text-ink">{page.nqf}</dd>
                </div>
              </dl>
              <ul className="space-y-2 border-t border-border pt-5 text-sm text-muted">
                <li>QCTO-accredited delivery</li>
                <li>Workplace-integrated learning</li>
                <li>Corporate &amp; individual pathways</li>
              </ul>
              {qualification && (
                <Button
                  to={`/programmes/${qualification.slug}`}
                  variant="gold"
                  size="sm"
                  className="w-full"
                  analyticsLabel={`programme_sidebar_${page.id}`}
                  analyticsLocation="seo_landing_sidebar"
                >
                  Full Programme Details
                </Button>
              )}
            </div>
          </aside>
          <article className="content-panel-rich-lg lg:col-span-8">
            {page.contentSections.map((section) => (
              <section key={section.title} className="mb-12 border-b border-border/80 pb-12 last:mb-0 last:border-0 last:pb-0">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="mt-5 leading-relaxed text-charcoal">
                    {paragraph}
                  </p>
                ))}
                {section.list?.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3 text-charcoal">
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </div>
      </SectionShell>

      <SectionShell tone="creative" padding="default" className="border-y border-navy/10">
          <SectionHeader
            eyebrow="Explore Further"
            title="Related Programmes & Resources"
            description="Navigate Rise Institute's accredited qualifications, faculty pages, and enrolment pathways."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {internalLinks.map((link) => (
              <li key={`${link.path}:${link.label}`}>
                <Link
                  to={link.path}
                  className="group flex items-center justify-between gap-3 rounded-sm border border-border bg-surface px-5 py-4 transition-colors hover:border-navy/30 hover:bg-ivory"
                >
                  <span className="text-sm font-medium text-charcoal group-hover:text-navy">
                    {link.label}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-muted group-hover:text-navy"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
      </SectionShell>

      <PremiumCTA {...corporateCta} location={`seo_${page.id}`} />

      <SectionShell id="enquire" tone="white" padding="default">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="Individual Learners"
                title="Request Programme Information"
                description="Submit your details and our admissions team will contact you about enrolment options, learnership availability, and workplace placement requirements for your province."
                align="left"
              />
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Whether you are an individual seeking career advancement or an employer planning team
                development, Rise Institute supports learners across all nine provinces with flexible
                delivery modes and QCTO-aligned assessment pathways.
              </p>
              <div className="mt-8">
                <Button
                  to="/corporate-funding"
                  variant="outline"
                  analyticsLabel={`corporate_inline_${page.id}`}
                  analyticsLocation="seo_landing_enquiry"
                >
                  Corporate &amp; Funding Solutions
                </Button>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ProgrammeEnquiryForm
                defaultQualification={page.qualificationSlug}
                qualificationTitle={page.qualificationTitle}
                saqaId={page.saqaId}
                showCorporateFields
              />
            </div>
          </div>
      </SectionShell>
    </>
  )
}
