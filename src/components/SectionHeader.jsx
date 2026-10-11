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
  void light
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
      {eyebrow && <p className="mb-3 text-sm font-semibold text-accent">{eyebrow}</p>}
      <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-lg leading-relaxed text-muted ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
