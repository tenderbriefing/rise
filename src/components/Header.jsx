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
  const isGlass = scrolled || mobileOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when navigating
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false)
  }, [location.pathname])

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
          return `relative block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
            isActive ? 'bg-mint text-primary' : 'text-charcoal hover:bg-light'
          }`
        }
        if (onHero) {
          return `relative text-sm font-medium transition-colors ${
            isActive ? 'text-gold' : 'text-white/90 hover:text-white'
          }`
        }
        return `relative text-sm font-medium transition-colors ${
          isActive ? 'text-primary' : 'text-charcoal hover:text-primary'
        }`
      }}
    >
      {({ isActive }) => (
        <>
          {link.label}
          {isActive && (
            <motion.span
              layoutId="nav-indicator"
              className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                onHero && !mobile ? 'bg-gold' : 'bg-primary'
              }`}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
        </>
      )}
    </NavLink>
  )

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isGlass
          ? 'border-b border-white/20 bg-white/75 shadow-nav backdrop-blur-xl supports-[backdrop-filter]:bg-white/65'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <BrandLogo onHero={onHero} onClick={closeMobile} />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavItem key={link.path} link={link} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            to="/contact"
            size="sm"
            variant={onHero ? 'gold' : 'primary'}
            analyticsLabel="partner_header"
            analyticsLocation="header_desktop"
            className="shadow-sm"
          >
            Partner With Us
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            to="/contact"
            size="sm"
            variant={onHero && !isGlass ? 'gold' : 'primary'}
            analyticsLabel="partner_header_mobile"
            analyticsLocation="header_mobile_sticky"
            className="!px-4 !py-2 text-xs"
          >
            Partner
          </Button>
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-xl p-2.5 transition-colors ${
              onHero && !isGlass
                ? 'text-white hover:bg-white/10'
                : 'text-charcoal hover:bg-mint'
            }`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              className="fixed inset-0 top-[60px] z-[-1] bg-charcoal/20 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
              onClick={closeMobile}
            />
            <motion.nav
              id="mobile-menu"
              variants={menuSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden border-t border-border/50 bg-white/95 backdrop-blur-xl lg:hidden"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavItem link={link} mobile />
                  </li>
                ))}
                <li className="pt-3">
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
