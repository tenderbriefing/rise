import { motion } from 'framer-motion'
import { fadeUp } from '../utils/motion'

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  as = 'section',
  id,
}) {
  const MotionTag = motion[as] ?? motion.section

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: { ...fadeUp.visible.transition, delay },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}
