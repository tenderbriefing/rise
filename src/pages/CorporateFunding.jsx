import { CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'
import CTASection from '../components/CTASection'
import AnimatedSection from '../components/AnimatedSection'
import { siteConfig } from '../data/navigation'
import {
  corporateBenefits,
  corporateSolutions,
  publicSectorSupport,
  section12HClaims,
  setaSupport,
} from '../data/corporateSolutions'

export default function CorporateFunding() {
  return (
    <>
      <SEO
        title="B-BBEE Skills Development & SETA Funding Solutions | Rise Institute"
        canonical={`${siteConfig.domain}/corporate-funding`}
      />

      <PageHero
        title="Corporate & Funding Solutions"
        description="Rise Institute helps organisations convert training investments into measurable commercial, compliance, and transformation outcomes."
      />

      <AnimatedSection className="section-padding bg-white">
        <Container size="content">
          <SectionHeader
            eyebrow="Strategic Value"
            title="Transform Skills Development Into Strategic Business Value"
            description="Our learnership and occupational training solutions support B-BBEE optimisation, tax efficiency, workforce development, and public sector alignment."
          />
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Corporate"
                title="For Corporate Clients"
                align="left"
                description="Partnering with Rise Institute enables organisations to implement structured learnership programmes that contribute directly toward Skills Development targets under the B-BBEE Codes of Good Practice."
              />
              <h3 className="mt-8 font-heading text-lg font-semibold text-charcoal">Benefits</h3>
              <ul className="mt-4 space-y-3">
                {corporateBenefits.map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <article className="rounded-2xl border border-border bg-white p-8 shadow-soft">
              <SectionHeader
                eyebrow="Tax Incentives"
                title="Section 12H Tax Incentives"
                align="left"
                description="Under Section 12H of the South African Income Tax Act, employers may qualify for tax deductions linked to registered learnerships."
              />
              <h3 className="mt-6 font-heading text-base font-semibold text-charcoal">
                Organisations may claim:
              </h3>
              <ul className="mt-4 space-y-3">
                {section12HClaims.map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-muted">
                Tax benefits are subject to applicable legislation, learner category, qualification
                level, and professional tax advice.
              </p>
            </article>
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-white">
        <Container>
          <SectionHeader
            eyebrow="SETA Compliance"
            title="SETA Grant Alignment & Compliance Support"
            description="Rise Institute provides structured administrative support to help organisations align training investments with grant and reporting requirements."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {setaSupport.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-border bg-light px-5 py-4 text-sm font-medium text-charcoal"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-mint">
        <Container>
          <SectionHeader
            eyebrow="Solutions"
            title="Corporate Skills Development Solutions"
            align="center"
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {corporateSolutions.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-border bg-white p-6 text-center shadow-soft"
              >
                <p className="font-medium text-charcoal">{item}</p>
              </li>
            ))}
          </ul>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-white">
        <Container size="content">
          <SectionHeader
            eyebrow="Public Sector"
            title="For Government & Public Sector Stakeholders"
            description="Rise Institute is structured to support large-scale public and donor-funded skills development initiatives."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {publicSectorSupport.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl bg-light px-5 py-4 text-charcoal">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </AnimatedSection>

      <CTASection
        title="Optimise Your Skills Development Investment"
        primaryCta={{ label: 'Partner With Us', to: '/contact' }}
        showDownload
      />
    </>
  )
}
