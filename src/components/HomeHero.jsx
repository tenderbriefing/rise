import { motion } from 'framer-motion'
import { Award, BadgeCheck, MapPin, ShieldCheck } from 'lucide-react'
import Container from './Container'
import Button from './Button'
import FloatingBadge from './FloatingBadge'
import GradientOrb from './GradientOrb'
import GlassCard from './GlassCard'
import StatsStrip from './StatsStrip'
import { staggerContainer, staggerItem } from '../utils/motion'

const badges = [
  { label: 'QCTO Accredited', icon: Award },
  { label: 'SAQA Aligned', icon: BadgeCheck },
  { label: 'Midrand, Gauteng', icon: MapPin },
]

export default function HomeHero() {
  return (
    <section className="hero-animated relative min-h-[92vh] overflow-hidden pt-28 text-white">
      <div className="hero-gradient-shift pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <GradientOrb className="left-[10%] top-[15%]" size="xl" color="accent" />
      <GradientOrb className="right-[5%] top-[40%]" size="lg" color="gold" delay={1} />
      <GradientOrb className="bottom-[10%] left-[40%]" size="md" color="mint" delay={2} />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent"
        aria-hidden="true"
      />

      <Container className="relative pb-16 pt-6 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={staggerItem} className="mb-5 h-1 w-20 rounded-full bg-gold" />

            <motion.div variants={staggerItem} className="mb-6 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <FloatingBadge key={badge.label} icon={badge.icon}>
                  {badge.label}
                </FloatingBadge>
              ))}
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              Developing High-Impact Skills for a Transforming Economy
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/90"
            >
              Rise Institute is a fully QCTO-accredited training institution delivering occupational
              qualifications designed to drive employment, strengthen agricultural sustainability,
              and support corporate compliance across South Africa.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                to="/qualifications"
                variant="gold"
                size="lg"
                analyticsLabel="explore_programmes_hero"
                analyticsLocation="home_hero"
              >
                Explore Our Programmes
              </Button>
              <Button
                to="/contact"
                variant="ghost"
                size="lg"
                analyticsLabel="partner_hero"
                analyticsLocation="home_hero"
              >
                Partner With Us
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard padding="lg" className="relative">
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent"
                aria-hidden="true"
              />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                  Institutional Authority
                </p>
                <ul className="mt-6 space-y-5">
                  {[
                    { label: 'QCTO Accredited', icon: Award },
                    { label: 'NQF Levels 3–5', icon: BadgeCheck },
                    { label: 'Midrand, Gauteng', icon: MapPin },
                    { label: 'Workplace-Integrated Learning', icon: ShieldCheck },
                  ].map(({ label, icon: Icon }) => (
                    <li key={label} className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-gold ring-1 ring-white/20">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="font-heading text-lg font-semibold">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <StatsStrip variant="hero" />
      </Container>
    </section>
  )
}
