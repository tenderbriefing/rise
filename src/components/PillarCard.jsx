import { motion } from 'framer-motion'
import { cardHover } from '../utils/motion'

export default function PillarCard({ title, description, icon: Icon }) {
  return (
    <motion.article
      className="group card-executive relative overflow-hidden rounded-sm p-8 lg:p-10"
      initial="rest"
      whileHover="hover"
      variants={cardHover}
    >
      <div
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-navy to-sa-gold transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-ivory text-accent transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent group-hover:text-white">
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="font-heading text-xl font-bold tracking-tight text-charcoal lg:text-2xl">{title}</h3>
      <p className="mt-4 leading-relaxed text-muted">{description}</p>
    </motion.article>
  )
}
