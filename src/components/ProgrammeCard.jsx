import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock3, Layers } from 'lucide-react'
import Button from './Button'
import { recordAnalyticsEvent } from '../services/analyticsEventService'
import { easePremium } from '../utils/motion'

export default function ProgrammeCard({
  slug,
  title,
  shortTitle,
  nqf,
  creditsLabel,
  credits,
  saqaId,
  category,
  faculty,
  duration,
  learningOutcomes,
  focus,
  compact = false,
}) {
  const creditText = creditsLabel || (typeof credits === 'number' ? `${credits} Credits` : credits)
  const outcomes = (learningOutcomes || focus || []).slice(0, compact ? 2 : 3)

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
      className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-white shadow-soft"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: easePremium }}
      whileHover={{ y: -6, boxShadow: '0 20px 50px -20px rgb(0 35 149 / 0.16)' }}
    >
      <div className="border-b border-border bg-ivory/80 px-6 py-5 transition-colors group-hover:border-navy/15">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-navy px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
            {nqf}
          </span>
          <span className="rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-muted">
            SAQA {saqaId}
          </span>
        </div>
        <h3 className="mt-4 font-heading text-xl font-bold leading-snug tracking-tight text-ink">
          <Link
            to={`/programmes/${slug}`}
            className="hover:text-navy"
            onClick={handleInterest}
          >
            {shortTitle || title}
          </Link>
        </h3>
        {category && <p className="mt-2 text-sm text-muted">{category}</p>}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
              <Clock3 className="h-3.5 w-3.5 text-navy" aria-hidden="true" />
              Duration
            </p>
            <p className="mt-1 font-semibold text-ink">{duration}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
              <Layers className="h-3.5 w-3.5 text-navy" aria-hidden="true" />
              Credits
            </p>
            <p className="mt-1 font-semibold text-ink">{creditText}</p>
          </div>
        </div>

        {outcomes.length > 0 && (
          <div className="mt-5 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">You will learn</p>
            <ul className="mt-3 space-y-2">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-snug text-charcoal">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6">
          <Button
            to={`/programmes/${slug}`}
            variant="primary"
            size="sm"
            className="w-full"
            onClick={handleInterest}
            analyticsLabel={`view_course_${slug}`}
            analyticsLocation="course_card"
          >
            Enquire about this programme
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
