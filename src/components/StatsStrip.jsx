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
  if (variant === 'hero') {
    return null
  }

  return (
    <section className="border-y border-border bg-white">
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className={`flex flex-col items-center gap-3 px-4 py-10 text-center sm:px-6 ${
                index > 0 ? 'border-l border-border' : ''
              } ${index === 2 ? 'border-t border-border lg:border-t-0' : ''} ${
                index === 3 ? 'border-t border-border lg:border-t-0' : ''
              }`}
            >
              <motion.span
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent"
                whileHover={{ scale: 1.08, rotate: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </motion.span>
              <p className="text-sm font-semibold text-ink">{stat.label}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
