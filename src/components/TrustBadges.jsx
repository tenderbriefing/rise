import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../utils/motion'

export default function TrustBadges({ badges, variant = 'strip' }) {
  if (variant === 'strip') {
    return (
      <div className="border-y border-border bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.ul
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {badges.map(({ label, icon: Icon }) => (
              <motion.li
                key={label}
                variants={staggerItem}
                className="flex items-center gap-3 text-sm font-medium tracking-wide text-charcoal"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                {label}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    )
  }

  // Light footer badges
  return (
    <motion.ul
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {badges.map(({ label, icon: Icon }) => (
        <motion.li
          key={label}
          variants={staggerItem}
          className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-5 text-center shadow-soft"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="text-xs font-semibold tracking-wide text-ink sm:text-sm">{label}</span>
        </motion.li>
      ))}
    </motion.ul>
  )
}
