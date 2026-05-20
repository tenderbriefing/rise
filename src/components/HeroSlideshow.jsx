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
  { label: 'Midrand, Gauteng', icon: MapPin },
]

const authorityItems = [
  { label: 'QCTO Accredited', icon: Award },
  { label: 'NQF Levels 3–5', icon: BadgeCheck },
  { label: 'Workplace-Integrated Learning', icon: ShieldCheck },
  { label: 'Midrand, Gauteng', icon: MapPin },
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
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-white"
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
            <div
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
                  initial={{ scale: 1 }}
                  animate={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : HERO_SLIDE_INTERVAL_MS / 1000,
                    ease: 'linear',
                  }}
                />
              )}
            </div>
          )}
        </AnimatePresence>

        {slides.map((slide, index) => {
          if (index === activeIndex || !slide.image) return null
          const isNext = index === (activeIndex + 1) % slideCount
          if (!isNext) return null
          return <link key={slide.id} rel="preload" as="image" href={slide.image} />
        })}
      </div>

      {/* Cinematic overlays */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/80 via-forest/70 to-ink/95"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/95 via-forest/85 to-transparent lg:via-forest/60 lg:to-forest/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,transparent_0%,rgb(6_31_26/0.5)_55%,rgb(10_13_16/0.85)_100%)]"
        aria-hidden="true"
      />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-32 sm:justify-center sm:pb-20 sm:pt-36">
        <div
          className="max-w-4xl lg:max-w-5xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div variants={staggerItem} className="sa-accent-bar mb-8" aria-hidden="true" />

          <motion.p
            variants={staggerItem}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-gold"
          >
            QCTO Accredited · South Africa
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="mt-6 font-heading text-[2.5rem] font-bold leading-[1.02] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.02]"
          >
            Developing High-Impact Skills for a Transforming Economy
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl sm:leading-relaxed"
          >
            Rise Institute is a fully QCTO-accredited training institution delivering occupational
            qualifications designed to drive employment, strengthen agricultural sustainability,
            and support corporate compliance across South Africa.
          </motion.p>

          <div
            variants={staggerItem}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button
              to="/qualifications"
              variant="gold"
              size="lg"
              analyticsLabel="explore_programmes_hero"
              analyticsLocation="home_hero"
            >
              Explore Our Programmes
            </Button>
            <Button
              to="/contact"
              variant="ghost"
              size="lg"
              analyticsLabel="partner_hero"
              analyticsLocation="home_hero"
            >
              Partner With Us
            </Button>
          </div>

          <div variants={staggerItem} className="mt-14 flex flex-wrap gap-3">
            {trustBadges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white/90 backdrop-blur-sm"
              >
                <badge.icon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                {badge.label}
              </span>
            ))}
          </div>

          <div
            variants={staggerItem}
            className="hero-trust-glass mt-8 rounded-sm p-6 sm:p-8"
          >
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {authorityItems.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-3 border-l border-gold/40 pl-4">
                  <Icon className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="text-sm font-medium leading-snug text-white/90">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
