import { motion } from 'framer-motion'
import { fadeUp } from '../utils/motion'

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
  className = '',
}) {
  const alignClass =
    align === 'center' ? 'text-center mx-auto' : align === 'right' ? 'text-right ml-auto' : 'text-left'

  return (
    <motion.div
      className={`max-w-3xl ${alignClass} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
    >
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-wider ${
            light ? 'text-gold' : 'text-primary'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? 'text-white' : 'text-charcoal'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? 'text-white/85' : 'text-muted'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
