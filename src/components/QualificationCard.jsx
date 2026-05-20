import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import { cardHover } from '../utils/motion'

export default function QualificationCard({ title, nqf, credits, saqaId, focus }) {
  return (
    <motion.article
      className="card-executive group flex h-full flex-col border-l-2 border-l-transparent p-6 transition-colors hover:border-l-gold sm:p-8"
      initial="rest"
      whileHover="hover"
      variants={cardHover}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-ivory text-forest transition-colors group-hover:border-gold/30 group-hover:text-gold">
          <BadgeCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-gold">{saqaId}</span>
      </div>
      <h3 className="font-heading text-lg font-bold leading-snug tracking-tight text-charcoal">
        {title}
      </h3>
      <dl className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
        <div className="rounded-sm border border-forest/15 bg-forest/5 px-2.5 py-1 text-forest">
          {nqf}
        </div>
        <div className="rounded-sm border border-border bg-ivory px-2.5 py-1 text-charcoal">
          {credits}
        </div>
      </dl>
      <div className="mt-6 flex-1 border-t border-border/80 pt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Focus areas</p>
        <ul className="mt-3 space-y-2.5">
          {focus.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
              <span className="mt-2 h-px w-3 shrink-0 bg-gold" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}
