import { siteConfig } from './navigation'

export const routeMeta = {
  '/': {
    breadcrumb: 'Home',
    title: 'Rise Institute | QCTO Accredited Occupational Training Provider',
  },
  '/about': {
    breadcrumb: 'About Us',
    title: 'About Rise Institute | QCTO-Aligned Skills Development Institution',
  },
  '/qualifications': {
    breadcrumb: 'Qualifications',
    title: 'QCTO Accredited Qualifications | Rise Institute',
  },
  '/corporate-funding': {
    breadcrumb: 'Corporate & Funding',
    title: 'B-BBEE Skills Development & SETA Funding Solutions | Rise Institute',
  },
  '/contact': {
    breadcrumb: 'Contact Us',
    title: 'Contact Rise Institute | QCTO Training Provider in Midrand',
  },
}

export function getCanonical(pathname) {
  const path = pathname === '/' ? '' : pathname
  return `${siteConfig.domain}${path}`
}

export function getBreadcrumbs(pathname) {
  const items = [{ name: 'Home', path: '/' }]
  if (pathname !== '/' && routeMeta[pathname]) {
    items.push({ name: routeMeta[pathname].breadcrumb, path: pathname })
  }
  return items
}
