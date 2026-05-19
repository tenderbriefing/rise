import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import { cardHover } from '../utils/motion'

export default function QualificationCard({ title, nqf, credits, saqaId, focus }) {
  return (
    <motion.article
      className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-soft sm:p-8"
      initial="rest"
      whileHover="hover"
      variants={cardHover}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-mint text-primary">
        <BadgeCheck className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-lg font-semibold leading-snug text-charcoal">{title}</h3>
      <dl className="mt-4 flex flex-wrap gap-2 text-sm">
        <div className="rounded-full bg-mint px-3 py-1 font-medium text-primary">{nqf}</div>
        <div className="rounded-full bg-light px-3 py-1 font-medium text-charcoal">{credits}</div>
        <div className="rounded-full bg-light px-3 py-1 font-medium text-muted">
          SAQA ID: {saqaId}
        </div>
      </dl>
      <div className="mt-6 flex-1">
        <p className="text-sm font-semibold text-charcoal">Focus areas</p>
        <ul className="mt-2 space-y-2">
          {focus.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}
