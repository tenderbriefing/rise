import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageLoader() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = requestAnimationFrame(() => setLoading(true))
    const timer = setTimeout(() => setLoading(false), 450)
    return () => {
      cancelAnimationFrame(start)
      clearTimeout(timer)
    }
  }, [location.pathname])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 origin-left bg-gradient-to-r from-gold via-accent to-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="progressbar"
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  )
}
