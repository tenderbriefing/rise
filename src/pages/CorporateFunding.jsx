import { CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import PremiumCTA from '../components/PremiumCTA'
import SectionShell from '../components/SectionShell'
import InstitutionalHighlights from '../components/InstitutionalHighlights'
import { getCanonical } from '../data/seoRoutes'
import { brandStatement } from '../data/navigation'
import { ctaPresets } from '../data/ctaPresets'
import {
  corporateBenefits,
  corporateSolutions,
  publicSectorSupport,
  section12HClaims,
  setaSupport,
} from '../data/corporateSolutions'
import { corporateValueCards } from '../data/institutionalContent'
import { recordAnalyticsEvent } from '../services/analyticsEventService'

function BenefitItem({ children, gold = false }) {
  return (
    <li className="flex gap-3 border-b border-border/60 pb-4 text-sm leading-relaxed text-charcoal last:border-0 last:pb-0">
      <CheckCircle2
        className={`mt-0.5 h-4 w-4 shrink-0 ${gold ? 'text-gold' : 'text-primary'}`}
        aria-hidden="true"
      />
      {children}
    </li>
  )
}

export default function CorporateFunding() {
  return (
    <>
      <SEO
        title="B-BBEE Skills Development & SETA Funding Solutions | Rise Institute"
        canonical={getCanonical('/corporate-funding')}
      />

      <PageHero
        title="Corporate & Funding Solutions"
        description={`${brandStatement} We help organisations convert training investments into measurable commercial, compliance, and transformation outcomes.`}
        light
      />

      <SectionShell tone="creative" padding="default" containerSize="content">
        <SectionHeader
          eyebrow="Strategic Value"
          title="Transform Skills Development Into Strategic Business Value"
          description="Our learnership and occupational training solutions support B-BBEE optimisation, tax efficiency, workforce development, and public sector alignment."
        />
        <InstitutionalHighlights items={corporateValueCards} variant="light" columns={3} />
      </SectionShell>

      <SectionShell tone="pattern" padding="default">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeader
                eyebrow="Corporate"
                title="For Corporate Clients"
                align="left"
                description="Partnering with Rise Institute enables organisations to implement structured learnership programmes that contribute directly toward Skills Development targets under the B-BBEE Codes of Good Practice."
              />
              <h3 className="mt-10 text-xs font-semibold uppercase tracking-wider text-gold">
                Key benefits
              </h3>
              <ul className="mt-5 space-y-0">
                {corporateBenefits.map((item) => (
                  <BenefitItem key={item}>{item}</BenefitItem>
                ))}
              </ul>
            </div>
            <article
              className="lg:col-span-6 executive-panel rounded-sm border-l-4 border-l-gold p-8 lg:p-10"
              onMouseEnter={() =>
                recordAnalyticsEvent({
                  eventName: 'corporate_interest',
                  eventType: 'corporate_interest',
                  corporateInterest: { interestType: 'tax_incentives', section: 'Section 12H' },
                })
              }
            >
              <SectionHeader
                eyebrow="Tax Incentives"
                title="Section 12H Tax Incentives"
                align="left"
                description="Under Section 12H of the South African Income Tax Act, employers may qualify for tax deductions linked to registered learnerships."
              />
              <h3 className="mt-8 text-xs font-semibold uppercase tracking-wider text-gold">
                Organisations may claim
              </h3>
              <ul className="mt-5 space-y-0">
                {section12HClaims.map((item) => (
                  <BenefitItem key={item} gold>
                    {item}
                  </BenefitItem>
                ))}
              </ul>
              <p className="mt-8 border-t border-border pt-6 text-xs leading-relaxed text-muted">
                Tax benefits are subject to applicable legislation, learner category, qualification
                level, and professional tax advice.
              </p>
            </article>
          </div>
      </SectionShell>

      <SectionShell tone="navy" padding="default">
          <SectionHeader
            eyebrow="SETA Compliance"
            title="SETA Grant Alignment & Compliance Support"
            description="Rise Institute provides structured administrative support to help organisations align training investments with grant and reporting requirements."
            light
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {setaSupport.map((item) => (
              <li
                key={item}
                className="hero-trust-glass flex items-start gap-3 rounded-sm p-5 text-sm leading-relaxed text-white/90"
                onMouseEnter={() =>
                  recordAnalyticsEvent({
                    eventName: 'corporate_interest',
                    eventType: 'corporate_interest',
                    corporateInterest: { interestType: 'seta_support', section: 'SETA Support' },
                  })
                }
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
      </SectionShell>

      <SectionShell tone="white" padding="default">
          <SectionHeader
            eyebrow="Solutions"
            title="Corporate Skills Development Solutions"
            align="center"
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {corporateSolutions.map((item, i) => (
              <li
                key={item}
                className="card-executive group p-6 text-center transition-colors hover:border-gold/25"
                onMouseEnter={() =>
                  recordAnalyticsEvent({
                    eventName: 'corporate_interest',
                    eventType: 'corporate_interest',
                    corporateInterest: { interestType: 'corporate_solutions', section: 'Solutions' },
                  })
                }
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 font-medium leading-snug text-charcoal">{item}</p>
              </li>
            ))}
          </ul>
      </SectionShell>

      <SectionShell tone="pattern" padding="default" containerSize="content">
          <SectionHeader
            eyebrow="Public Sector"
            title="For Government & Public Sector Stakeholders"
            description="Rise Institute is structured to support large-scale public and donor-funded skills development initiatives."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {publicSectorSupport.map((item) => (
              <li
                key={item}
                className="flex gap-4 rounded-sm border border-border bg-surface p-5 shadow-soft"
                onMouseEnter={() =>
                  recordAnalyticsEvent({
                    eventName: 'corporate_interest',
                    eventType: 'corporate_interest',
                    corporateInterest: { interestType: 'public_sector', section: 'Public Sector' },
                  })
                }
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-navy text-sa-gold">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed text-charcoal">{item}</span>
              </li>
            ))}
          </ul>
      </SectionShell>

      <PremiumCTA {...ctaPresets.corporate} location="corporate_footer" variant="forest" />
    </>
  )
}
