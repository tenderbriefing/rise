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
  const isSolid = scrolled || mobileOpen || !isHome

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
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
          return `relative block rounded-sm px-4 py-3 text-base font-medium transition-colors ${
            isActive
              ? 'bg-navy/5 text-navy'
              : 'text-charcoal hover:bg-ivory hover:text-navy'
          }`
        }
        return `relative whitespace-nowrap text-sm font-medium transition-colors ${
          isActive
            ? onHero
              ? 'text-white'
              : 'text-navy'
            : onHero
              ? 'text-white/80 hover:text-white'
              : 'text-muted hover:text-navy'
        }`
      }}
    >
      {({ isActive }) => (
        <>
          {link.label}
          {isActive && !mobile && (
            <motion.span
              layoutId="nav-indicator"
              className={`absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                onHero ? 'bg-sa-gold' : 'bg-gold'
              }`}
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        isSolid
          ? 'border-b border-border/80 bg-white/95 shadow-nav backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <BrandLogo onClick={closeMobile} />

        {/* Desktop nav starts at xl (1280px) so eight institutional links are not cramped */}
        <nav
          className="hidden items-center gap-5 xl:flex 2xl:gap-6"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <NavItem key={link.path} link={link} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Button
            to="/contact"
            size="sm"
            variant={onHero ? 'gold' : 'primary'}
            analyticsLabel="partner_header"
            analyticsLocation="header_desktop"
          >
            Enquire
          </Button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <Button
            to="/contact"
            size="sm"
            variant="gold"
            analyticsLabel="partner_header_mobile"
            analyticsLocation="header_mobile_sticky"
            className="!px-3 !py-2 text-xs"
          >
            Enquire
          </Button>
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-sm border p-2.5 transition-colors ${
              onHero
                ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                : 'border-border bg-white/80 text-charcoal hover:bg-ivory'
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
              className="fixed inset-0 top-[65px] z-[-1] bg-ink/30 backdrop-blur-sm xl:hidden"
              aria-hidden="true"
              onClick={closeMobile}
            />
            <motion.nav
              id="mobile-menu"
              variants={menuSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden border-t border-border bg-white/95 backdrop-blur-xl xl:hidden"
              aria-label="Mobile navigation"
            >
              <ul className="flex max-h-[calc(100svh-65px)] flex-col overflow-y-auto px-3 py-3">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavItem link={link} mobile />
                  </li>
                ))}
                <li className="px-1 pt-3">
                  <Button
                    to="/contact"
                    className="w-full"
                    variant="gold"
                    onClick={closeMobile}
                    analyticsLabel="partner_mobile_menu"
                    analyticsLocation="header_mobile_menu"
                  >
                    Enquire
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
