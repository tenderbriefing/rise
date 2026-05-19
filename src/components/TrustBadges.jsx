import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../utils/motion'

export default function TrustBadges({ badges, variant = 'strip' }) {
  if (variant === 'strip') {
    return (
      <div className="border-y border-border bg-light">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <motion.ul
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {badges.map(({ label, icon: Icon }) => (
              <motion.li
                key={label}
                variants={staggerItem}
                className="flex items-center gap-2 text-sm font-medium text-charcoal"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint text-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {label}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    )
  }

  return (
    <motion.ul
      className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {badges.map(({ label, icon: Icon }) => (
        <motion.li
          key={label}
          variants={staggerItem}
          className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-white p-4 text-center shadow-soft"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mint text-primary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-xs font-semibold text-charcoal sm:text-sm">{label}</span>
        </motion.li>
      ))}
    </motion.ul>
  )
}
