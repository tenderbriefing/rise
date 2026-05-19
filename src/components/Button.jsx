import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { trackCTAClick, trackCorporateProfileDownload } from '../utils/analytics'

const variants = {
  primary:
    'bg-primary text-white hover:bg-forest border border-transparent shadow-sm hover:shadow-md focus-visible:ring-primary',
  secondary:
    'bg-white text-primary border border-primary hover:bg-mint focus-visible:ring-primary',
  gold:
    'bg-gold text-white hover:bg-gold/90 border border-transparent shadow-sm hover:shadow-md focus-visible:ring-gold',
  ghost:
    'bg-transparent text-white border border-white/40 hover:bg-white/10 focus-visible:ring-white',
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
  analyticsLabel,
  analyticsLocation = 'button',
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02, y: -1 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.2 },
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
