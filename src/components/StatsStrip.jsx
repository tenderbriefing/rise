import { motion } from 'framer-motion'
import { Award, BadgeCheck, Briefcase, GraduationCap } from 'lucide-react'
import { staggerContainer, staggerItem } from '../utils/motion'

const defaultStats = [
  { label: 'QCTO Accredited', icon: Award, highlight: 'Accredited' },
  { label: 'NQF Levels 3–5', icon: BadgeCheck, highlight: '3–5' },
  { label: 'Workplace-Integrated Learning', icon: GraduationCap, highlight: 'WIL' },
  { label: 'Corporate Skills Development', icon: Briefcase, highlight: 'Corporate' },
]

export default function StatsStrip({ stats = defaultStats, variant = 'hero' }) {
  if (variant === 'page') {
    return (
      <section className="border-y border-border bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-3 px-4 py-8 text-center sm:px-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-ivory text-forest border border-border">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold text-charcoal">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  if (variant === 'hero') {
    return (
      <motion.div
        className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="group rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-colors hover:border-gold/30 hover:bg-white/15"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 text-gold transition-transform group-hover:scale-105">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-4 font-heading text-sm font-semibold leading-snug text-white sm:text-base">
                {stat.label}
              </p>
            </motion.div>
          )
        })}
      </motion.div>
    )
  }

  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-3 px-4 py-8 text-center sm:px-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-ivory text-forest border border-border">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="text-sm font-semibold text-charcoal">{stat.label}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
