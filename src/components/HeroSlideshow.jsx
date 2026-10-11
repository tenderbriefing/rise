import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Award, BadgeCheck, MapPin, ShieldCheck } from 'lucide-react'
import Container from './Container'
import Button from './Button'
import { heroSlides, HERO_SLIDE_INTERVAL_MS } from '../data/homeImages'
import { easePremium, staggerContainer, staggerItem } from '../utils/motion'

const CROSSFADE_DURATION = 1.8

const trustBadges = [
  { label: 'QCTO Accredited', icon: Award },
  { label: 'SAQA Aligned', icon: BadgeCheck },
  { label: 'Centurion, Gauteng', icon: MapPin },
]

const authorityItems = [
  { label: 'QCTO Accredited', icon: Award },
  { label: 'NQF Levels 3–5', icon: BadgeCheck },
  { label: 'Workplace-Integrated Learning', icon: ShieldCheck },
  { label: 'Centurion, Gauteng', icon: MapPin },
]

export default function HeroSlideshow() {
  const slides = heroSlides
  const slideCount = slides.length
  const prefersReducedMotion = useReducedMotion()

  const [activeIndex, setActiveIndex] = useState(0)

  const goToSlide = useCallback(
    (index) => {
      if (slideCount === 0) return
      const nextIndex = ((index % slideCount) + slideCount) % slideCount
      setActiveIndex(nextIndex)
    },
    [slideCount],
  )

  const goToNext = useCallback(() => {
    goToSlide(activeIndex + 1)
  }, [activeIndex, goToSlide])

  useEffect(() => {
    if (prefersReducedMotion || slideCount <= 1) return undefined

    const timer = window.setInterval(goToNext, HERO_SLIDE_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [activeIndex, goToNext, prefersReducedMotion, slideCount])

  const activeSlide = slides[activeIndex]

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden bg-navy-dark text-white"
      aria-label="Rise Institute hero"
    >
      {activeSlide?.alt && (
        <p className="sr-only" aria-live="polite">
          {activeSlide.alt}
        </p>
      )}

      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence initial={false}>
          {activeSlide && (
            <motion.div
              key={activeSlide.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: CROSSFADE_DURATION, ease: easePremium }}
            >
              {activeSlide.image ? (
                <motion.img
                  src={activeSlide.image}
                  alt=""
                  className="h-full w-full object-cover"
                  initial={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                  animate={{ scale: prefersReducedMotion ? 1 : 1.12 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : HERO_SLIDE_INTERVAL_MS / 1000,
                    ease: 'linear',
                  }}
                  decoding={activeIndex === 0 ? 'sync' : 'async'}
                  fetchPriority={activeIndex === 0 ? 'high' : 'low'}
                />
              ) : (
                <div
                  className={`h-full w-full bg-gradient-to-br ${activeSlide.fallbackGradient}`}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {slides.map((slide, index) => {
          if (index === activeIndex || !slide.image) return null
          const isNext = index === (activeIndex + 1) % slideCount
          if (!isNext) return null
          return <link key={slide.id} rel="preload" as="image" href={slide.image} />
        })}
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/40 to-navy-dark/30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-xl bg-gradient-to-r from-navy-dark/80 via-navy/35 to-transparent lg:max-w-2xl"
        aria-hidden="true"
      />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-32 sm:justify-center sm:pb-20 sm:pt-36">
        <motion.div
          className="max-w-4xl lg:max-w-5xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={staggerItem} className="sa-accent-bar mb-8" aria-hidden="true" />

          <motion.p
            variants={staggerItem}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-sa-gold"
          >
            QCTO Accredited · South Africa
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="mt-6 font-heading text-[2.5rem] font-bold leading-[1.02] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.02]"
          >
            Developing Africa&apos;s Workforce for the Future
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl sm:leading-relaxed"
          >
            QCTO-accredited occupational qualifications in Artificial Intelligence, Data Science,
            Cloud Computing, Agriculture, Occupational Health &amp; Safety, and Project Management.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button
              to="/contact"
              variant="gold"
              size="lg"
              analyticsLabel="apply_now_hero"
              analyticsLocation="home_hero"
            >
              Apply Now
            </Button>
            <Button
              to="/programmes"
              variant="goldOutline"
              size="lg"
              analyticsLabel="browse_programmes_hero"
              analyticsLocation="home_hero"
            >
              View Programmes
            </Button>
          </motion.div>

          <motion.div variants={staggerItem} className="mt-14 flex flex-wrap gap-3">
            {trustBadges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white/90 backdrop-blur-sm"
              >
                <badge.icon className="h-3.5 w-3.5 text-sa-gold" aria-hidden="true" />
                {badge.label}
              </span>
            ))}
          </motion.div>

          <motion.div variants={staggerItem} className="hero-trust-glass mt-8 rounded-sm p-6 sm:p-8">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {authorityItems.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-3 border-l border-sa-gold/40 pl-4">
                  <Icon className="h-4 w-4 shrink-0 text-sa-gold" aria-hidden="true" />
                  <span className="text-sm font-medium leading-snug text-white/90">{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
