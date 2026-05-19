import { useState } from 'react'
import { Link } from 'react-router-dom'
import riseMark from '../assets/brand/rise-mark.svg'

export default function BrandLogo({ onHero = false, className = '', showText = true, onClick }) {
  const [imgError, setImgError] = useState(false)

  const textClass = onHero
    ? 'font-heading text-xl font-bold text-white sm:text-2xl'
    : 'font-heading text-xl font-bold text-primary sm:text-2xl'

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 ${className}`} onClick={onClick}>
      {!imgError && (
        <img
          src={riseMark}
          alt=""
          className="h-10 w-10 shrink-0"
          onError={() => setImgError(true)}
        />
      )}
      {showText && <span className={textClass}>Rise Institute</span>}
    </Link>
  )
}
