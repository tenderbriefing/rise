import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import Button from './Button'
import { cardHover } from '../utils/motion'
import { recordAnalyticsEvent } from '../services/analyticsEventService'

export default function ProgrammeCard({
  slug,
  title,
  shortTitle,
  nqf,
  credits,
  saqaId,
  category,
  faculty,
  focus,
  compact = false,
}) {
  const handleInterest = () => {
    recordAnalyticsEvent({
      eventName: 'qualification_interest',
      eventType: 'qualification_interest',
      qualificationInterest: {
        title,
        saqaId,
        nqf,
        faculty: faculty || null,
      },
    })
  }

  return (
    <motion.article
      className="card-programme group flex h-full flex-col p-6 sm:p-8"
      initial="rest"
      whileHover="hover"
      variants={cardHover}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-sm border border-sa-gold/30 bg-ivory text-primary transition-colors group-hover:border-sa-gold group-hover:text-gold">
          <BadgeCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="badge-brand">{saqaId}</span>
      </div>

      <h3 className="font-heading text-lg font-bold leading-snug tracking-tight text-primary">
        {shortTitle || title}
      </h3>

      {category && (
        <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted">{category}</p>
      )}

      <dl className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
        <div className="badge-brand">{nqf}</div>
        {credits && (
          <div className="rounded-sm border border-border bg-ivory px-2.5 py-1 text-charcoal">
            {credits}
          </div>
        )}
      </dl>

      {!compact && focus?.length > 0 && (
        <div className="mt-6 flex-1 border-t border-border/80 pt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">Focus areas</p>
          <ul className="mt-3 space-y-2.5">
            {focus.slice(0, 4).map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <span className="mt-2 h-px w-3 shrink-0 bg-sa-gold" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <Button
          to={`/programmes/${slug}`}
          variant="gold"
          size="sm"
          className="w-full sm:w-auto"
          onClick={handleInterest}
          analyticsLabel={`learn_more_${slug}`}
          analyticsLocation="programme_card"
        >
          Learn More
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </motion.article>
  )
}
