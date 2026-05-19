import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '../utils/motion'

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  duration = 1.8,
  className = '',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const numericValue =
    typeof value === 'number' ? value : parseInt(String(value).replace(/\D/g, ''), 10) || 0
  const isNumeric = typeof value === 'number' || /^\d+/.test(String(value))
  const [display, setDisplay] = useState(isNumeric ? 0 : value)

  useEffect(() => {
    if (!isInView || !isNumeric) return

    let frameId
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(Math.floor(eased * numericValue))
      if (progress < 1) frameId = requestAnimationFrame(tick)
      else setDisplay(numericValue)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isInView, numericValue, duration, isNumeric])

  const shown = isNumeric ? display : value

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <p className="font-heading text-3xl font-bold text-white sm:text-4xl">
        {prefix}
        {shown}
        {suffix}
      </p>
      {label && <p className="mt-2 text-sm font-medium text-white/80">{label}</p>}
    </motion.div>
  )
}
