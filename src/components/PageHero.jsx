import { motion } from 'framer-motion'
import Container from './Container'
import { staggerContainer, staggerItem } from '../utils/motion'

/**
 * Institutional page hero.
 * @param {boolean} light — light ivory surface (default). When false, uses navy surface.
 */
export default function PageHero({ title, description, light = true, children }) {
  const isLight = light !== false

  return (
    <section
      className={`relative overflow-hidden section-padding ${
        isLight ? 'sv-mesh text-ink' : 'page-hero-creative text-white'
      }`}
    >
      {!isLight && <div className="page-hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />}
      <Container size="content" className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={staggerItem}
            className={`mb-4 text-sm font-semibold ${isLight ? 'text-navy' : 'text-sa-gold'}`}
          >
            QCTO Accredited · South Africa
          </motion.p>
          <motion.h1
            variants={staggerItem}
            className={`font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08] ${
              isLight ? 'text-navy' : 'text-white'
            }`}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={staggerItem}
              className={`mt-5 text-lg leading-relaxed ${
                isLight ? 'text-muted' : 'text-white/85'
              }`}
            >
              {description}
            </motion.p>
          )}
          {children && <motion.div variants={staggerItem} className="mt-8">{children}</motion.div>}
        </motion.div>
      </Container>
    </section>
  )
}
