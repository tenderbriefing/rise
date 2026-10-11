import { MapPin } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import PremiumCTA from '../components/PremiumCTA'
import SectionShell from '../components/SectionShell'
import InstitutionalHighlights from '../components/InstitutionalHighlights'
import VisualPanel from '../components/VisualPanel'
import { getCanonical } from '../data/seoRoutes'
import { ctaPresets } from '../data/ctaPresets'
import { siteConfig, brandStatement } from '../data/navigation'
import { learningMethodology } from '../data/qualifications'
import { partnershipHighlights, qctoDeliveryHighlights } from '../data/institutionalContent'

export default function About() {
  return (
    <>
      <SEO
        title="About Rise Institute | QCTO-Aligned Skills Development Institution"
        canonical={getCanonical('/about')}
      />

      <PageHero
        title="About Rise Institute"
        description={brandStatement}
        light
      />

      <SectionShell tone="creative" padding="default">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <article className="content-panel-rich-lg border-l-4 border-l-sa-gold">
            <SectionHeader eyebrow="Vision" title="Our Vision" align="left" />
            <p className="mt-4 prose-editorial !max-w-none">
              To become South Africa’s leading catalyst for demand-led occupational skills
              development, empowering individuals and organisations to thrive in a rapidly
              transforming economy.
            </p>
          </article>
          <article className="content-panel-rich-lg border-l-4 border-l-gold">
            <SectionHeader eyebrow="Mission" title="Our Mission" align="left" />
            <p className="mt-4 prose-editorial !max-w-none">
              To deliver world-class, compliant occupational qualifications that align with
              industry demand, national development priorities, and workforce transformation
              objectives, while enabling seamless compliance and skills development solutions for
              our corporate and public sector partners.
            </p>
          </article>
        </div>
      </SectionShell>

      <SectionShell tone="navy" padding="default">
        <SectionHeader
          eyebrow="QCTO Framework"
          title="QCTO-Aligned Delivery"
          description="All Rise Institute qualifications are structured in accordance with the Quality Council for Trades and Occupations framework — spanning 4IR, agriculture, business, and occupational health and safety."
        />
        <InstitutionalHighlights items={qctoDeliveryHighlights} columns={4} />
      </SectionShell>

      <SectionShell tone="pattern" padding="default">
        <SectionHeader
          eyebrow="Methodology"
          title="Integrated Learning Methodology"
          description="A three-phase delivery model combining theory, practice, and workplace experience."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {learningMethodology.map(({ step, title, description, icon: Icon }) => (
            <article key={title} className="card-executive relative overflow-hidden p-8">
              <span className="absolute right-6 top-6 font-heading text-5xl font-bold text-navy/10">
                {step}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-ivory text-navy">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-heading text-xl font-bold tracking-tight text-navy">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell tone="white" padding="default">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Location"
              title="Strategic Location"
              align="left"
              description="Operating from Byls Bridge Office Park in Centurion, Gauteng, Rise Institute is strategically positioned within South Africa’s primary economic corridor."
            />
            <p className="mt-8 flex items-start gap-3 rounded-sm border border-border bg-surface p-5 text-charcoal shadow-soft">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <span>
                {siteConfig.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
          </div>
          <VisualPanel imageKey="centurionCampus" variant="workplace" className="min-h-[320px] shadow-card" />
        </div>
      </SectionShell>

      <SectionShell tone="navy" padding="default">
        <SectionHeader
          eyebrow="Partnerships"
          title="Workplace Experience Partnerships"
          description="Rise Institute collaborates with employers and industry stakeholders to facilitate structured workplace experience aligned to QCTO requirements."
        />
        <InstitutionalHighlights items={partnershipHighlights} columns={3} />
      </SectionShell>

      <PremiumCTA {...ctaPresets.about} location="about_footer" variant="forest" />
    </>
  )
}
