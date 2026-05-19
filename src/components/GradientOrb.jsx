import { motion } from 'framer-motion'
import { floatingAnimation } from '../utils/motion'

export default function GradientOrb({
  className = '',
  size = 'lg',
  color = 'accent',
  delay = 0,
}) {
  const sizes = {
    sm: 'h-32 w-32',
    md: 'h-48 w-48',
    lg: 'h-72 w-72',
    xl: 'h-96 w-96',
  }

  const colors = {
    accent: 'from-accent/30 to-primary/10',
    gold: 'from-gold/25 to-transparent',
    mint: 'from-mint/40 to-transparent',
  }

  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full bg-gradient-to-br blur-3xl ${sizes[size]} ${colors[color]} ${className}`}
      variants={floatingAnimation}
      initial={false}
      animate="animate"
      transition={{ delay }}
      aria-hidden="true"
    />
  )
}
