import { CheckCircle2, Download } from 'lucide-react'
import SEO from '../components/SEO'
import Container from '../components/Container'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import TrustBadges from '../components/TrustBadges'
import PillarCard from '../components/PillarCard'
import PremiumCTA from '../components/PremiumCTA'
import AnimatedSection from '../components/AnimatedSection'
import HeroSlideshow from '../components/HeroSlideshow'
import { getCanonical } from '../data/seoRoutes'
import { homeTrustStrip } from '../data/trustBadges'
import { corePillars, whyChooseUs } from '../data/pillars'
import { ctaPresets } from '../data/ctaPresets'

export default function Home() {
  const cta = ctaPresets.home

  return (
    <>
      <SEO
        title="Rise Institute | QCTO Accredited Occupational Training Provider"
        canonical={getCanonical('/')}
      />

      <HeroSlideshow />

      <TrustBadges badges={homeTrustStrip} variant="strip" />

      <AnimatedSection className="section-padding section-surface">
        <Container>
          <SectionHeader
            eyebrow="Our Approach"
            title="Core Pillars of Delivery"
            description="Integrated occupational training designed for measurable workforce and economic impact."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
            {corePillars.map((pillar) => (
              <PillarCard key={pillar.title} {...pillar} />
            ))}
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding section-ivory">
        <Container>
          <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="Why Rise Institute"
                title="Why Organisations Choose Rise Institute"
                align="left"
              />
              <ul className="mt-10 space-y-5">
                {whyChooseUs.map((item) => (
                  <li key={item} className="flex gap-4 border-b border-border/80 pb-5 last:border-0">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button
                  to="/about"
                  variant="outline"
                  analyticsLabel="learn_about"
                  analyticsLocation="home_why"
                >
                  Learn About Our Institution
                </Button>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="executive-panel rounded-sm border-l-4 border-l-gold p-10 lg:p-12">
                <SectionHeader
                  eyebrow="Executive Overview"
                  title="Bridging the Gap Between Education and Employment"
                  align="left"
                />
                <p className="mt-6 prose-editorial !max-w-none">
                  At Rise Institute, we believe skills development must deliver measurable economic
                  impact. Our demand-driven occupational qualifications combine structured theoretical
                  learning, practical simulation, and mandatory workplace experience to ensure
                  learners are workplace-ready from day one.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding section-dark">
        <Container size="content">
          <SectionHeader
            eyebrow="Impact"
            title="Driving Economic Participation Through Skills Development"
            description="Rise Institute is committed to supporting youth employment, agricultural sustainability, workplace safety, and inclusive economic growth through industry-aligned occupational training and workplace-integrated learning."
            light
          />
          <div className="mt-12 flex justify-center">
            <Button
              href="/rise-institute-corporate-profile.pdf"
              variant="gold"
              size="lg"
              download
              analyticsLabel="download_profile"
              analyticsLocation="home_impact"
            >
              <Download className="h-5 w-5" aria-hidden="true" />
              Download Corporate Profile
            </Button>
          </div>
        </Container>
      </AnimatedSection>

      <section className="sa-section-accent section-charcoal relative border-t border-white/10 py-20 text-center lg:py-24">
        <Container size="narrow">
          <p className="font-heading text-2xl font-bold leading-snug tracking-tight sm:text-3xl lg:text-4xl">
            Building Skills That Strengthen Industries, Empower Communities, and Drive South Africa
            Forward.
          </p>
          <div className="mt-10">
            <Button
              to="/corporate-funding"
              variant="gold"
              analyticsLabel="explore_funding"
              analyticsLocation="home_closing"
            >
              Explore Corporate &amp; Funding Solutions
            </Button>
          </div>
        </Container>
      </section>

      <PremiumCTA {...cta} location="home_footer" variant="forest" />
    </>
  )
}
