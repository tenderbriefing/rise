import { motion } from 'framer-motion'
import Container from './Container'
import { HeroDecor } from './PageDecor'
import { staggerContainer, staggerItem } from '../utils/motion'

export default function PageHero({ title, description, light = false, children }) {
  return (
    <section
      className={`relative overflow-hidden section-padding ${
        light ? 'page-hero-creative text-white' : 'section-surface'
      }`}
    >
      {light && <HeroDecor />}
      {!light && (
        <div className="page-hero-glow pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      )}
      <Container size="content" className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {light && (
            <motion.div variants={staggerItem} className="mb-6 flex items-center gap-4">
              <span className="sa-accent-bar" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sa-gold">
                QCTO Accredited · South Africa
              </span>
            </motion.div>
          )}
          <motion.h1
            variants={staggerItem}
            className={`font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08] ${
              light ? 'text-white' : 'text-navy'
            }`}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={staggerItem}
              className={`mt-5 text-lg leading-relaxed ${
                light ? 'text-white/90' : 'text-muted'
              }`}
            >
              {description}
            </motion.p>
          )}
          {children && <motion.div variants={staggerItem} className="mt-8">{children}</motion.div>}
        </motion.div>
      </Container>
      {light && (
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sa-gold to-transparent"
          aria-hidden="true"
        />
      )}
    </section>
  )
}
