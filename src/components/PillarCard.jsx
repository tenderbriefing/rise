import { motion } from 'framer-motion'
import { cardHover } from '../utils/motion'

export default function PillarCard({ title, description, icon: Icon }) {
  return (
    <motion.article
      className="group rounded-2xl border border-border bg-white p-8 shadow-soft transition-colors hover:border-primary/20"
      initial="rest"
      whileHover="hover"
      variants={cardHover}
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-mint text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-charcoal">{title}</h3>
      <p className="mt-3 leading-relaxed text-muted">{description}</p>
    </motion.article>
  )
}
