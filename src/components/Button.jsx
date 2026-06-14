import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { trackCTA } from '../utils/analytics'
import { easePremium } from '../utils/motion'

const variants = {
  primary:
    'bg-primary text-white border border-primary hover:bg-primary-dark shadow-sm hover:shadow-card focus-visible:ring-gold',
  secondary:
    'bg-sa-gold text-primary border border-sa-gold hover:bg-gold-dark focus-visible:ring-gold shadow-sm',
  gold:
    'bg-sa-gold text-primary border border-sa-gold hover:bg-gold-dark hover:shadow-card focus-visible:ring-gold shadow-sm',
  ghost:
    'bg-transparent text-white border border-white/30 hover:border-sa-gold/50 hover:bg-white/5 focus-visible:ring-gold',
  outline:
    'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white focus-visible:ring-gold',
  goldOutline:
    'bg-transparent text-sa-gold border-2 border-sa-gold hover:bg-sa-gold hover:text-primary focus-visible:ring-gold',
}

const sizes = {
  sm: 'px-4 py-2.5 text-xs tracking-wide',
  md: 'px-6 py-3 text-sm',
  lg: 'px-9 py-4 text-sm font-semibold tracking-wide',
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
  analyticsLabel,
  analyticsLocation = 'button',
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2.5 rounded-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`

  const motionProps = {
    whileHover: disabled ? {} : { y: -2 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.25, ease: easePremium },
  }

  const handleClick = (e) => {
    const label =
      analyticsLabel || (typeof children === 'string' ? children : 'cta_click')

    if (to || href) {
      trackCTA(label, analyticsLocation, to || href)
    }

    onClick?.(e)
  }

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link to={to} className={classes} onClick={handleClick} {...props}>
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
          onClick={handleClick}
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
      onClick={handleClick}
      disabled={disabled}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  )
}
