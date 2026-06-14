import { CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import Container from '../components/Container'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import TrustBadges from '../components/TrustBadges'
import PillarCard from '../components/PillarCard'
import PremiumCTA from '../components/PremiumCTA'
import AnimatedSection from '../components/AnimatedSection'
import HeroSlideshow from '../components/HeroSlideshow'
import HomeVisualStory from '../components/HomeVisualStory'
import SectionShell from '../components/SectionShell'
import StatsStrip from '../components/StatsStrip'
import ProgrammeCard from '../components/ProgrammeCard'
import { getCanonical } from '../data/seoRoutes'
import { homeTrustStrip } from '../data/trustBadges'
import { corePillars, whyChooseUs } from '../data/pillars'
import { ctaPresets } from '../data/ctaPresets'
import {
  allQualifications,
  fourIrPillars,
  getQualificationsByFacultyId,
  programmeStats,
  seoKeywords,
} from '../data/qualifications'
import { getSeoLandingPages } from '../data/seoLandingPages'
import { brandStatement } from '../data/navigation'

export default function Home() {
  const cta = ctaPresets.home
  const fourIrProgrammes = getQualificationsByFacultyId('4ir').slice(0, 4)
  const popularSeoPages = getSeoLandingPages()

  return (
    <>
      <SEO
        title="Rise Institute | QCTO Accredited Occupational Training Provider"
        description="Rise Institute delivers nine QCTO-accredited qualifications in AI, data science, cloud, IoT, agriculture, project management, and occupational health and safety."
        keywords={seoKeywords}
        canonical={getCanonical('/')}
        courses={allQualifications}
      />

      <HeroSlideshow />

      <section className="page-hero-creative relative overflow-hidden border-b border-sa-gold/20 py-14 lg:py-16">
        <div className="hero-decor-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <Container size="content" className="relative z-10">
          <p className="eyebrow-executive-light text-center">Fourth Industrial Revolution</p>
          <h2 className="text-center font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Preparing South Africa&apos;s Workforce for the Fourth Industrial Revolution
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-center text-lg leading-relaxed text-white/80">
            QCTO-accredited qualifications in artificial intelligence, data science, cloud computing,
            and IoT — alongside agriculture, business, and workplace safety programmes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button to="/4ir-academy" variant="gold" analyticsLabel="explore_4ir" analyticsLocation="home_4ir_banner">
              Explore 4IR Academy
            </Button>
            <Button to="/programmes" variant="ghost" analyticsLabel="view_programmes" analyticsLocation="home_4ir_banner">
              View All Programmes
            </Button>
          </div>
        </Container>
      </section>

      <StatsStrip stats={programmeStats} variant="page" />

      <SectionShell tone="white" padding="compact">
        <p className="mx-auto max-w-4xl text-center text-lg leading-relaxed text-muted md:text-xl">
          {brandStatement}
        </p>
      </SectionShell>

      <TrustBadges badges={homeTrustStrip} variant="strip" />

      <HomeVisualStory />

      <SectionShell tone="pattern" padding="default">
        <SectionHeader
          eyebrow="4IR Academy"
          title="Fourth Industrial Revolution Qualifications"
          description="Industry-aligned digital qualifications preparing learners for high-demand roles in AI, data, cloud infrastructure, and connected systems."
        />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fourIrPillars.map(({ title, description, icon: Icon }) => (
              <div key={title} className="card-executive p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-ivory text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-charcoal">{title}</h3>
                <p className="mt-2 text-sm text-muted">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {fourIrProgrammes.map((qual) => (
              <ProgrammeCard key={qual.slug} {...qual} faculty={qual.facultyTitle} compact />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button to="/4ir-academy" variant="outline" analyticsLabel="4ir_academy_home" analyticsLocation="home_4ir">
              Visit 4IR Academy
            </Button>
          </div>
      </SectionShell>

      <SectionShell tone="creative" padding="default">
          <SectionHeader
            eyebrow="Accredited Training"
            title="Popular Accredited Courses in South Africa"
            description="Explore QCTO-accredited qualifications in AI, data science, cloud, IoT, project management, occupational health and safety, and agriculture."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularSeoPages.map((page) => (
              <article
                key={page.id}
                className="card-executive group flex h-full flex-col border-l-2 border-l-transparent p-6 transition-colors hover:border-l-sa-gold"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">{page.saqaId}</p>
                <h3 className="mt-3 font-heading text-base font-bold leading-snug text-primary group-hover:text-gold">
                  {page.cardTitle}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">{page.cardDescription}</p>
                <div className="mt-6">
                  <Button
                    to={page.path}
                    variant="outline"
                    size="sm"
                    analyticsLabel={`seo_home_${page.id}`}
                    analyticsLocation="home_popular_seo"
                  >
                    Learn More
                  </Button>
                </div>
              </article>
            ))}
          </div>
      </SectionShell>

      <SectionShell tone="pattern" padding="default">
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
      </SectionShell>

      <SectionShell tone="white" padding="default">
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
              <div className="executive-panel rounded-sm border-l-4 border-l-sa-gold p-10 lg:p-12">
                <SectionHeader
                  eyebrow="Executive Overview"
                  title="Bridging the Gap Between Education and Employment"
                  align="left"
                />
                <p className="mt-6 prose-editorial !max-w-none">
                  {brandStatement} Our demand-driven occupational qualifications combine structured
                  theoretical learning, practical simulation, and mandatory workplace experience to
                  ensure learners are workplace-ready from day one.
                </p>
              </div>
            </div>
          </div>
      </SectionShell>

      <AnimatedSection className="section-padding section-dark">
        <Container size="content">
          <SectionHeader
            eyebrow="Impact"
            title="Driving Economic Participation Through Skills Development"
            description="Rise Institute supports youth employment, 4IR readiness, agricultural sustainability, workplace safety, and inclusive economic growth through QCTO-aligned occupational training."
            light
          />
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
