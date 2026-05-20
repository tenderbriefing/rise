import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { trackCTAClick, trackCorporateProfileDownload } from '../utils/analytics'
import { easePremium } from '../utils/motion'

const variants = {
  primary:
    'bg-forest text-white border border-forest hover:bg-ink shadow-sm hover:shadow-card focus-visible:ring-gold',
  secondary:
    'bg-surface text-forest border border-charcoal/20 hover:border-forest hover:bg-ivory focus-visible:ring-gold',
  gold:
    'bg-gold text-ink border border-gold hover:bg-gold-dark hover:text-white focus-visible:ring-gold shadow-sm hover:shadow-card',
  ghost:
    'bg-transparent text-white border border-white/30 hover:border-white/50 hover:bg-white/5 focus-visible:ring-white',
  outline:
    'bg-transparent text-forest border-2 border-forest hover:bg-forest hover:text-white focus-visible:ring-forest',
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

    if (download || href?.includes('corporate-profile')) {
      trackCorporateProfileDownload(analyticsLocation)
    } else if (to || href) {
      trackCTAClick(label, analyticsLocation, to || href)
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
