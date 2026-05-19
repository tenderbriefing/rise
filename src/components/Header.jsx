import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks } from '../data/navigation'
import Button from './Button'

export default function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const onHero = isHome && !scrolled && !mobileOpen

  const navLinkClass = ({ isActive }) => {
    if (onHero) {
      return `text-sm font-medium transition-colors ${
        isActive ? 'text-gold' : 'text-white/90 hover:text-white'
      }`
    }
    return `text-sm font-medium transition-colors ${
      isActive ? 'text-primary' : 'text-charcoal hover:text-primary'
    }`
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'border-b border-border bg-white/95 shadow-soft backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className={`font-heading text-xl font-bold sm:text-2xl ${
            onHero ? 'text-white' : 'text-primary'
          }`}
          onClick={closeMobile}
        >
          Rise Institute
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={navLinkClass} end={link.path === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button to="/contact" size="sm" variant={onHero ? 'gold' : 'primary'}>
            Partner With Us
          </Button>
        </div>

        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-lg p-2 lg:hidden ${
            onHero ? 'text-white hover:bg-white/10' : 'text-charcoal hover:bg-mint'
          }`}
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-white lg:hidden"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 text-base font-medium ${
                        isActive ? 'bg-mint text-primary' : 'text-charcoal hover:bg-light'
                      }`
                    }
                    end={link.path === '/'}
                    onClick={closeMobile}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <Button to="/contact" className="w-full" onClick={closeMobile}>
                  Partner With Us
                </Button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
