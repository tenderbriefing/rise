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

  const eyebrowClass = light ? 'eyebrow-executive-light' : 'eyebrow-executive'

  return (
    <motion.div
      className={`max-w-3xl ${alignClass} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
    >
      {eyebrow && <p className={eyebrowClass}>{eyebrow}</p>}
      <h2
        className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-4 flex items-center gap-2 ${align === 'center' ? 'justify-center' : ''}`}
        aria-hidden="true"
      >
        <span className="h-px w-8 bg-navy" />
        <span className="h-1.5 w-1.5 rotate-45 bg-sa-gold" />
        <span className="h-px w-16 bg-gradient-to-r from-sa-gold to-transparent" />
      </div>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-lg leading-relaxed ${
            light ? 'text-white/80' : 'text-muted'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
