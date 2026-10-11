import { useState } from 'react'
import { Link } from 'react-router-dom'
import riseMark from '../assets/brand/rise-mark.svg'
import riseWordmark from '../assets/brand/rise-wordmark.svg'
import riseLogo from '../assets/brand/rise-logo.svg'

const assets = {
  crest: riseMark,
  wordmark: riseWordmark,
  full: riseLogo,
}

/**
 * Institutional Rise Institute crest / lockup (navy #002395 + gold #FFB612).
 * @param {'header' | 'full' | 'mark-only' | 'crest' | 'wordmark' | 'compact' | 'institutional'} variant
 */
export default function BrandLogo({
  className = '',
  showText = true,
  onClick,
  variant = 'institutional',
}) {
  const [imgError, setImgError] = useState(false)

  const assetKey =
    variant === 'mark-only' || variant === 'crest' || !showText
      ? 'crest'
      : variant === 'full' || variant === 'compact'
        ? 'full'
        : 'wordmark'

  const src = assets[assetKey]

  const sizeClass =
    assetKey === 'crest'
      ? 'h-11 w-11 sm:h-12 sm:w-12'
      : assetKey === 'wordmark'
        ? 'h-10 w-auto max-w-[200px] sm:h-12 sm:max-w-[240px]'
        : 'h-auto w-full max-w-[220px] sm:max-w-[280px]'

  return (
    <Link
      to="/"
      className={`group inline-flex shrink-0 items-center ${className}`}
      onClick={onClick}
      aria-label="Rise Institute home"
    >
      {!imgError && (
        <img
          src={src}
          alt="Rise Institute"
          className={`${sizeClass} object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]`}
          onError={() => setImgError(true)}
        />
      )}
      {imgError && (
        <span className="font-serif text-sm font-bold uppercase tracking-[0.16em] text-navy">
          Rise Institute
        </span>
      )}
    </Link>
  )
}
