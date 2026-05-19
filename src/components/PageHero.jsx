import { motion } from 'framer-motion'
import Container from './Container'
import { staggerContainer, staggerItem } from '../utils/motion'

export default function PageHero({ title, description, light = false, children }) {
  return (
    <section
      className={`relative overflow-hidden section-padding ${
        light ? 'hero-pattern text-white' : 'bg-mint'
      }`}
    >
      {!light && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 70% 30%, rgb(11 93 59 / 0.12) 0%, transparent 50%)',
          }}
        />
      )}
      {light && (
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            <motion.div variants={staggerItem} className="mb-4 h-1 w-16 rounded-full bg-gold" />
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
