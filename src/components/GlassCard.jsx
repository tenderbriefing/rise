import { motion } from 'framer-motion'
import { cardHover } from '../utils/motion'

export default function GlassCard({
  children,
  className = '',
  hover = true,
  padding = 'default',
}) {
  const paddingClass = {
    sm: 'p-5',
    default: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10',
  }[padding]

  const classNames = `rounded-sm border border-border bg-surface shadow-soft ${paddingClass} ${className}`

  if (!hover) {
    return <div className={classNames}>{children}</div>
  }

  return (
    <motion.div
      className={classNames}
      initial="rest"
      whileHover="hover"
      variants={cardHover}
    >
      {children}
    </motion.div>
  )
}
