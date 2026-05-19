import { motion } from 'framer-motion'
import { staggerItem } from '../utils/motion'

export default function FloatingBadge({ children, icon: Icon, className = '', delay = 0 }) {
  return (
    <motion.span
      variants={staggerItem}
      custom={delay}
      className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm ${className}`}
      whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.15)' }}
      transition={{ duration: 0.2 }}
    >
      {Icon && <Icon className="h-4 w-4 text-gold" aria-hidden="true" />}
      {children}
    </motion.span>
  )
}
