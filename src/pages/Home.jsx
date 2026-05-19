import { motion } from 'framer-motion'
import { Award, CheckCircle2, Download, MapPin } from 'lucide-react'
import SEO from '../components/SEO'
import Container from '../components/Container'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import TrustBadges from '../components/TrustBadges'
import PillarCard from '../components/PillarCard'
import CTASection from '../components/CTASection'
import AnimatedSection from '../components/AnimatedSection'
import VisualPanel from '../components/VisualPanel'
import { siteConfig } from '../data/navigation'
import { homeTrustStrip } from '../data/trustBadges'
import { corePillars, whyChooseUs } from '../data/pillars'
import { staggerContainer, staggerItem } from '../utils/motion'

const authorityItems = [
  { label: 'QCTO Accredited', icon: Award },
  { label: 'NQF Levels 3–5', icon: CheckCircle2 },
  { label: 'Midrand, Gauteng', icon: MapPin },
  { label: 'Workplace-Integrated Learning', icon: CheckCircle2 },
]

export default function Home() {
  return (
    <>
      <SEO
        title="Rise Institute | QCTO Accredited Occupational Training Provider"
        canonical={`${siteConfig.domain}/`}
      />

      <section className="hero-pattern relative min-h-[90vh] overflow-hidden pt-28 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <Container className="relative pb-20 pt-8 lg:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div variants={staggerItem} className="mb-4 h-1 w-16 rounded-full bg-gold" />
              <motion.h1
                variants={staggerItem}
                className="font-heading text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl"
              >
                Developing High-Impact Skills for a Transforming Economy
              </motion.h1>
              <motion.p variants={staggerItem} className="mt-6 text-lg leading-relaxed text-white/90">
                Rise Institute is a fully QCTO-accredited training institution delivering occupational
                qualifications designed to drive employment, strengthen agricultural sustainability,
                and support corporate compliance across South Africa.
              </motion.p>
              <motion.div variants={staggerItem} className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button to="/qualifications" variant="gold" size="lg">
                  Explore Our Programmes
                </Button>
                <Button to="/contact" variant="ghost" size="lg">
                  Partner With Us
                </Button>
              </motion.div>
            </motion.div>

            <motion.aside
              className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-8"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                Institutional Authority
              </p>
              <ul className="mt-6 space-y-4">
                {authorityItems.map(({ label, icon: Icon }) => (
                  <li key={label} className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-gold">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="font-heading text-lg font-semibold">{label}</span>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </Container>
      </section>

      <TrustBadges badges={homeTrustStrip} variant="strip" />

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
                <Button to="/about" variant="secondary">
                  Learn About Our Institution
                </Button>
              </div>
            </div>
            <VisualPanel variant="corporate" className="min-h-[320px]" />
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-white">
        <Container size="content">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <VisualPanel variant="classroom" className="min-h-[280px] order-2 lg:order-1" />
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
            <Button to="/corporate-funding" variant="gold">
              Explore Corporate &amp; Funding Solutions
            </Button>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}
