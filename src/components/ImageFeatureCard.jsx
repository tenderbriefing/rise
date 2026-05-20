import { useState } from 'react'
import { motion } from 'framer-motion'

const patternStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.08' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
}

export default function ImageFeatureCard({
  title,
  description,
  image,
  alt,
  icon: Icon,
  fallbackGradient = 'from-emerald-900 to-green-700',
  priority = false,
  className = '',
  aspectClass = 'aspect-[4/3]',
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(image) && !imageFailed

  return (
    <motion.article
      className={`group relative overflow-hidden rounded-sm border border-border bg-surface shadow-soft ${className}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      aria-label={!showImage ? alt : undefined}
    >
      <div className={`relative w-full ${aspectClass}`}>
        {showImage ? (
          <img
            src={image}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${fallbackGradient} p-8`}
            aria-hidden="true"
          >
            <div className="absolute inset-0 opacity-30" style={patternStyle} />
            {Icon && (
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-gold ring-1 ring-white/25">
                <Icon className="h-8 w-8" strokeWidth={1.5} />
              </span>
            )}
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <span className="mb-3 block h-0.5 w-10 rounded-full bg-gold" aria-hidden="true" />
          <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/85">{description}</p>
        </div>
      </div>
    </motion.article>
  )
}
