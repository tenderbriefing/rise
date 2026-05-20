import { MapPin } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'
import PremiumCTA from '../components/PremiumCTA'
import AnimatedSection from '../components/AnimatedSection'
import VisualPanel from '../components/VisualPanel'
import { getCanonical } from '../data/seoRoutes'
import { ctaPresets } from '../data/ctaPresets'
import { siteConfig } from '../data/navigation'
import { learningMethodology } from '../data/qualifications'

export default function About() {
  return (
    <>
      <SEO
        title="About Rise Institute | QCTO-Aligned Skills Development Institution"
        canonical={getCanonical('/about')}
      />

      <PageHero
        title="About Rise Institute"
        description="Rise Institute is a professional occupational training institution committed to developing high-impact skills that support economic participation, workforce readiness, and sustainable development across South Africa."
        light
      />

      <AnimatedSection className="section-padding section-surface">
        <Container size="content">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <article className="executive-panel rounded-sm border-l-4 border-l-forest p-8 lg:p-10">
              <SectionHeader eyebrow="Vision" title="Our Vision" align="left" />
              <p className="mt-4 prose-editorial !max-w-none">
                To become South Africa’s leading catalyst for demand-led occupational skills
                development, empowering individuals and organisations to thrive in a rapidly
                transforming economy.
              </p>
            </article>
            <article className="executive-panel rounded-sm border-l-4 border-l-gold p-8 lg:p-10">
              <SectionHeader eyebrow="Mission" title="Our Mission" align="left" />
              <p className="mt-4 prose-editorial !max-w-none">
                To deliver world-class, compliant occupational qualifications that align with
                industry demand, national development priorities, and workforce transformation
                objectives, while enabling seamless compliance and skills development solutions for
                our corporate and public sector partners.
              </p>
            </article>
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding section-dark">
        <Container size="content">
          <SectionHeader
            eyebrow="QCTO Framework"
            title="QCTO-Aligned Delivery"
            description="All Rise Institute qualifications are structured in accordance with the Quality Council for Trades and Occupations framework, ensuring learners are comprehensively prepared for the External Integrated Summative Assessment and long-term workplace success."
            light
          />
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding section-ivory">
        <Container>
          <SectionHeader
            eyebrow="Methodology"
            title="Integrated Learning Methodology"
            description="A three-phase delivery model combining theory, practice, and workplace experience."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {learningMethodology.map(({ step, title, description, icon: Icon }) => (
              <article
                key={title}
                className="card-executive relative overflow-hidden p-8"
              >
                <span className="absolute right-6 top-6 font-heading text-5xl font-bold text-forest/10">
                  {step}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-surface text-forest">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-heading text-xl font-bold tracking-tight text-charcoal">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding section-surface">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                eyebrow="Location"
                title="Strategic Location"
                align="left"
                description="Operating from Maxwell Office Park in Midrand, Gauteng, Rise Institute is strategically positioned within South Africa’s primary economic corridor, enabling collaboration with corporate headquarters, government institutions, SETAs, and public sector stakeholders across Johannesburg and Pretoria."
              />
              <p className="mt-8 flex items-start gap-3 rounded-sm border border-border bg-ivory p-5 text-charcoal">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                {siteConfig.address}
              </p>
            </div>
            <VisualPanel imageKey="midrandOffice" variant="workplace" className="min-h-[320px]" />
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding section-charcoal">
        <Container size="content">
          <SectionHeader
            eyebrow="Partnerships"
            title="Workplace Experience Partnerships"
            description="Rise Institute collaborates with employers and industry stakeholders to facilitate structured workplace experience opportunities that ensure learners gain practical exposure aligned to QCTO requirements and real-world industry expectations."
            light
          />
        </Container>
      </AnimatedSection>

      <PremiumCTA {...ctaPresets.about} location="about_footer" variant="forest" />
    </>
  )
}
