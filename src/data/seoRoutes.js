import { siteConfig } from './navigation'
import { allQualifications } from './qualifications'
import { getSeoLandingPages } from './seoLandingPages'

export const routeMeta = {
  '/': {
    breadcrumb: 'Home',
    title: 'Rise Institute | QCTO Accredited Occupational Training Provider',
  },
  '/about': {
    breadcrumb: 'About Us',
    title: 'About Rise Institute | QCTO-Aligned Skills Development Institution',
  },
  '/programmes': {
    breadcrumb: 'Programmes',
    title: 'QCTO Accredited Programmes & Qualifications | Rise Institute',
  },
  '/qualifications': {
    breadcrumb: 'Qualifications',
    title: 'QCTO Accredited Qualifications | Rise Institute',
  },
  '/4ir-academy': {
    breadcrumb: '4IR Academy',
    title: '4IR Academy | AI, Data Science, Cloud & IoT Training | Rise Institute',
  },
  '/agriculture-academy': {
    breadcrumb: 'Agriculture Academy',
    title: 'Agriculture Academy | QCTO Agricultural Qualifications | Rise Institute',
  },
  '/occupational-health-safety': {
    breadcrumb: 'Occupational Health & Safety',
    title: 'Occupational Health & Safety Qualification | Rise Institute',
  },
  '/corporate-funding': {
    breadcrumb: 'Corporate & Funding',
    title: 'B-BBEE Skills Development & SETA Funding Solutions | Rise Institute',
  },
  '/contact': {
    breadcrumb: 'Contact Us',
    title: 'Contact Rise Institute | QCTO Training Provider in Centurion',
  },
}

getSeoLandingPages().forEach((page) => {
  routeMeta[page.path] = {
    breadcrumb: page.cardTitle,
    title: page.metaTitle,
  }
})

export function getCanonical(pathname) {
  const path = pathname === '/' ? '' : pathname
  return `${siteConfig.domain}${path}`
}

export function getBreadcrumbs(pathname) {
  const items = [{ name: 'Home', path: '/' }]

  if (pathname.startsWith('/programmes/')) {
    const slug = pathname.replace('/programmes/', '')
    const programme = allQualifications.find((q) => q.slug === slug)
    items.push({ name: 'Programmes', path: '/programmes' })
    if (programme) {
      items.push({ name: programme.shortTitle || programme.title, path: pathname })
    }
    return items
  }

  if (pathname !== '/' && routeMeta[pathname]) {
    items.push({ name: routeMeta[pathname].breadcrumb, path: pathname })
  }

  return items
}

export function getSitemapPaths() {
  const staticPaths = Object.keys(routeMeta)
  const programmePaths = allQualifications.map((q) => `/programmes/${q.slug}`)
  const seoPaths = getSeoLandingPages().map((page) => page.path)
  return [...staticPaths, ...programmePaths, ...seoPaths]
}
