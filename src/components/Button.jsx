import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-primary text-white hover:bg-forest border border-transparent focus-visible:ring-primary',
  secondary:
    'bg-white text-primary border border-primary hover:bg-mint focus-visible:ring-primary',
  gold: 'bg-gold text-white hover:bg-gold/90 border border-transparent focus-visible:ring-gold',
  ghost: 'bg-transparent text-white border border-white/40 hover:bg-white/10',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  className = '',
  onClick,
  disabled = false,
  external = false,
  download = false,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.2 },
  }

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link to={to} className={classes} {...props}>
          {children}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <a
          href={href}
          className={classes}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          download={download || undefined}
          {...props}
        >
          {children}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  )
}
