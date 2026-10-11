import { Link } from 'react-router-dom'
import Container from './Container'
import BrandLogo from './BrandLogo'
import { navLinks, siteConfig } from '../data/navigation'
import { trackEmailClick, trackPhoneClick } from '../utils/analytics'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="sa-footer-accent relative border-t border-border bg-ivory">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <BrandLogo variant="wordmark" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.tagline}. Byls Bridge Office Park, Centurion, South Africa.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted transition-colors hover:text-navy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <a
                  href={`tel:${siteConfig.landlineTel}`}
                  className="transition-colors hover:text-navy"
                  onClick={() => trackPhoneClick('footer', 'landline')}
                >
                  {siteConfig.landline}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-navy"
                  onClick={() => trackEmailClick('footer')}
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="leading-relaxed">
                {siteConfig.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">© {year} Rise Institute</p>
          <p className="text-xs text-muted">QCTO accredited · Centurion, Gauteng</p>
        </div>
      </Container>
    </footer>
  )
}
