import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks } from '../data/navigation'
import Button from './Button'
import BrandLogo from './BrandLogo'
import { trackNavClick } from '../utils/analytics'
import { menuSlide } from '../utils/motion'

export default function Header() {
  const location = useLocation()
  const headerRef = useRef(null)
  const isHome = location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const onHero = isHome && !scrolled && !mobileOpen
  const isSolid = scrolled || mobileOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
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

  useEffect(() => {
    if (!mobileOpen) return

    const handleOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMobileOpen(false)
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }

    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  const handleNavClick = (link) => {
    trackNavClick({ label: link.label, path: link.path })
    closeMobile()
  }

  const NavItem = ({ link, mobile = false }) => (
    <NavLink
      to={link.path}
      end={link.path === '/'}
      onClick={() => handleNavClick(link)}
      className={({ isActive }) => {
        if (mobile) {
          return `relative block border-l-2 px-4 py-3.5 text-base font-medium transition-colors ${
            isActive
              ? 'border-gold bg-ivory text-forest'
              : 'border-transparent text-charcoal hover:border-border hover:bg-ivory'
          }`
        }
        if (onHero) {
          return `relative text-sm font-medium tracking-wide transition-colors ${
            isActive ? 'text-gold' : 'text-white/85 hover:text-white'
          }`
        }
        return `relative text-sm font-medium tracking-wide transition-colors ${
          isActive ? 'text-forest' : 'text-charcoal hover:text-forest'
        }`
      }}
    >
      {({ isActive }) => (
        <>
          {link.label}
          {isActive && !mobile && (
            <motion.span
              layoutId="nav-indicator"
              className={`absolute -bottom-1.5 left-0 h-px w-full ${onHero ? 'bg-gold' : 'bg-forest'}`}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            />
          )}
        </>
      )}
    </NavLink>
  )

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        isSolid
          ? 'border-b border-border/80 bg-surface/95 shadow-nav backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <BrandLogo onHero={onHero} onClick={closeMobile} />

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavItem key={link.path} link={link} />
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Button
            to="/contact"
            size="sm"
            variant={onHero ? 'gold' : 'primary'}
            analyticsLabel="partner_header"
            analyticsLocation="header_desktop"
          >
            Partner With Us
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            to="/contact"
            size="sm"
            variant={onHero && !isSolid ? 'gold' : 'primary'}
            analyticsLabel="partner_header_mobile"
            analyticsLocation="header_mobile_sticky"
            className="!px-3 !py-2 text-xs"
          >
            Partner
          </Button>
          <button
            type="button"
            className={`inline-flex items-center justify-center border p-2.5 transition-colors ${
              onHero && !isSolid
                ? 'border-white/25 text-white hover:border-white/40 hover:bg-white/5'
                : 'border-border text-charcoal hover:bg-ivory'
            }`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-[65px] z-[-1] bg-ink/40 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
              onClick={closeMobile}
            />
            <motion.nav
              id="mobile-menu"
              variants={menuSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden border-t border-border bg-surface lg:hidden"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col px-2 py-3">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavItem link={link} mobile />
                  </li>
                ))}
                <li className="px-2 pt-4">
                  <Button
                    to="/contact"
                    className="w-full"
                    onClick={closeMobile}
                    analyticsLabel="partner_mobile_menu"
                    analyticsLocation="header_mobile_menu"
                  >
                    Partner With Us
                  </Button>
                </li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
