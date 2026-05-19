import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import Container from './Container'
import TrustBadges from './TrustBadges'
import { footerQuickLinks, siteConfig } from '../data/navigation'
import { footerTrustBadges } from '../data/trustBadges'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-charcoal text-white">
      <Container className="section-padding !pb-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-heading text-2xl font-bold">Rise Institute</p>
            <p className="mt-2 text-sm text-white/70">
              QCTO Accredited · CSD Registered
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              {siteConfig.tagline} based in Midrand, Gauteng, delivering workplace-integrated
              occupational qualifications across South Africa.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2">
              {footerQuickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gold">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  Landline:{' '}
                  <a href="tel:+27100133423" className="hover:text-white">
                    {siteConfig.landline}
                  </a>
                  <br />
                  Mobile:{' '}
                  <a href="tel:+27720708467" className="hover:text-white">
                    {siteConfig.mobile}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <address className="not-italic">{siteConfig.address}</address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <TrustBadges badges={footerTrustBadges} variant="grid" />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/60 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-white">
              Terms &amp; Conditions
            </a>
          </div>
          <p className="max-w-md">
            POPIA: Rise Institute processes personal information in accordance with the Protection of
            Personal Information Act.
          </p>
          <p className="shrink-0">© {year} Rise Institute. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
