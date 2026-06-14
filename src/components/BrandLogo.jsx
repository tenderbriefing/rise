import { useState } from 'react'
import { Link } from 'react-router-dom'
import riseMark from '../assets/brand/rise-mark.png'
import riseWordmark from '../assets/brand/rise-wordmark.png'
import riseLogo from '../assets/brand/rise-logo.png'

const assets = {
  crest: riseMark,
  wordmark: riseWordmark,
  full: riseLogo,
}

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
        ? 'h-12 w-auto max-w-[168px] sm:h-14 sm:max-w-[196px]'
        : 'h-auto w-full max-w-[220px] sm:max-w-[260px]'

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
