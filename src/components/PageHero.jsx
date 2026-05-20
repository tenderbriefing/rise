import { motion } from 'framer-motion'
import Container from './Container'
import { staggerContainer, staggerItem } from '../utils/motion'

export default function PageHero({ title, description, light = false, children }) {
  return (
    <section
      className={`relative overflow-hidden section-padding ${
        light ? 'section-dark' : 'section-ivory'
      }`}
    >
      {!light && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 70% 50% at 80% 20%, rgb(196 160 82 / 0.08) 0%, transparent 55%)',
          }}
        />
      )}
      {light && (
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgb(6 31 26 / 0.35) 100%)',
          }}
        />
      )}
      <Container size="content" className="relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {light && (
            <motion.div variants={staggerItem} className="mb-4 h-0.5 w-14 bg-gold" />
          )}
          <motion.h1
            variants={staggerItem}
            className={`font-heading text-4xl font-bold tracking-tight sm:text-5xl ${
              light ? 'text-white' : 'text-charcoal'
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
    </section>
  )
}
