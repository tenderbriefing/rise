import { CheckCircle2, Download } from 'lucide-react'
import SEO from '../components/SEO'
import Container from '../components/Container'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import TrustBadges from '../components/TrustBadges'
import PillarCard from '../components/PillarCard'
import PremiumCTA from '../components/PremiumCTA'
import AnimatedSection from '../components/AnimatedSection'
import VisualPanel from '../components/VisualPanel'
import HomeHero from '../components/HomeHero'
import SectionDivider from '../components/SectionDivider'
import StatsStrip from '../components/StatsStrip'
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

      <HomeHero />

      <TrustBadges badges={homeTrustStrip} variant="strip" />

      <SectionDivider />

      <AnimatedSection className="section-padding bg-white">
        <Container>
          <SectionHeader
            eyebrow="Our Approach"
            title="Core Pillars of Delivery"
            description="Integrated occupational training designed for measurable workforce and economic impact."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {corePillars.map((pillar) => (
              <PillarCard key={pillar.title} {...pillar} />
            ))}
          </div>
        </Container>
      </AnimatedSection>

      <StatsStrip variant="page" />

      <AnimatedSection className="section-padding bg-light">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Why Rise Institute"
                title="Why Organisations Choose Rise Institute"
                align="left"
              />
              <ul className="mt-8 space-y-4">
                {whyChooseUs.map((item) => (
                  <li key={item} className="flex gap-3 text-charcoal">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  to="/about"
                  variant="secondary"
                  analyticsLabel="learn_about"
                  analyticsLocation="home_why"
                >
                  Learn About Our Institution
                </Button>
              </div>
            </div>
            <VisualPanel imageKey="corporateTraining" variant="corporate" className="min-h-[320px]" />
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-white">
        <Container size="content">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <VisualPanel imageKey="classroomLearning" variant="classroom" className="min-h-[280px] order-2 lg:order-1" />
            <div className="order-1 lg:order-2">
              <SectionHeader
                eyebrow="Executive Overview"
                title="Bridging the Gap Between Education and Employment"
                align="left"
              />
              <p className="mt-6 leading-relaxed text-muted">
                At Rise Institute, we believe skills development must deliver measurable economic
                impact. Our demand-driven occupational qualifications combine structured theoretical
                learning, practical simulation, and mandatory workplace experience to ensure learners
                are workplace-ready from day one.
              </p>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-mint">
        <Container size="content">
          <SectionHeader
            eyebrow="Impact"
            title="Driving Economic Participation Through Skills Development"
            description="Rise Institute is committed to supporting youth employment, agricultural sustainability, workplace safety, and inclusive economic growth through industry-aligned occupational training and workplace-integrated learning."
          />
          <div className="mt-10 flex justify-center">
            <Button
              href="/rise-institute-corporate-profile.pdf"
              variant="primary"
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

      <section className="border-t border-border bg-forest py-16 text-center text-white">
        <Container size="narrow">
          <p className="font-heading text-2xl font-semibold leading-snug sm:text-3xl">
            Building Skills That Strengthen Industries, Empower Communities, and Drive South Africa
            Forward.
          </p>
          <div className="mt-8">
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

      <PremiumCTA {...cta} location="home_footer" />
    </>
  )
}
