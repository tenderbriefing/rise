import { motion } from 'framer-motion'

export default function SectionDivider({ variant = 'default' }) {
  if (variant === 'sa') {
    return (
      <motion.div
        className="flex items-center justify-center gap-2 py-3"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
        <span className="h-1 w-1 rounded-full bg-sa-green" />
        <span className="h-px w-8 bg-sa-gold/70" />
        <span className="h-1 w-1 rounded-full bg-sa-blue/80" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/30" />
      </motion.div>
    )
  }

  if (variant === 'gold') {
    return (
      <div className="flex items-center justify-center py-2" aria-hidden="true">
        <span className="h-px w-16 bg-gold/60" />
        <span className="mx-3 h-1.5 w-1.5 rounded-full bg-gold" />
        <span className="h-px w-16 bg-gold/60" />
      </div>
    )
  }

  return (
    <div
      className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-border to-transparent"
      aria-hidden="true"
    />
  )
}
