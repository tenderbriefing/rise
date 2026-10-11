import SEO from '../components/SEO'
import Button from '../components/Button'
import SectionShell from '../components/SectionShell'
import { getCanonical } from '../data/seoRoutes'

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found | Rise Institute"
        description="The page you requested could not be found. Return to Rise Institute or browse QCTO-accredited programmes."
        canonical={getCanonical('/404')}
        noindex
      />

      <SectionShell tone="white" padding="default">
        <div className="mx-auto max-w-2xl py-16 text-center sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-dark">404</p>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Page not found
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted">
            The page you are looking for does not exist or may have moved. Explore our programmes or
            return to the homepage.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/" variant="primary" size="lg" analyticsLabel="404_home">
              Return Home
            </Button>
            <Button to="/programmes" variant="outline" size="lg" analyticsLabel="404_programmes">
              View Programmes
            </Button>
          </div>
        </div>
      </SectionShell>
    </>
  )
}
