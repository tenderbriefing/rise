export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

export const cardHover = {
  rest: { y: 0, boxShadow: '0 8px 30px -12px rgb(6 61 42 / 0.12)' },
  hover: {
    y: -4,
    boxShadow: '0 16px 40px -16px rgb(6 61 42 / 0.18)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
}
