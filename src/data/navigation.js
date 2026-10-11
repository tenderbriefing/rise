/** Canonical primary navigation — single source for header, mobile, and footer. */
export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Programmes', path: '/programmes' },
  { label: '4IR Academy', path: '/4ir-academy' },
  { label: 'Agriculture', path: '/agriculture-academy' },
  { label: 'OHS', path: '/occupational-health-safety' },
  { label: 'Corporate', path: '/corporate-funding' },
  { label: 'Contact', path: '/contact' },
]

/** @deprecated Prefer `navLinks` — kept as an alias for any legacy imports. */
export const footerQuickLinks = navLinks

export const siteConfig = {
  name: 'Rise Institute',
  domain: 'https://riseinstitute.co.za',
  email: 'info@riseinstitute.co.za',
  /** Public enquiry mailbox (FormSubmit destination). */
  enquiryEmail: 'Calvin@riseinstitute.co.za',
  landline: '+27 12 004 8728',
  landlineTel: '+27120048728',
  addressLines: ['Byls Bridge Office Park', 'Centurion', 'South Africa'],
  address: 'Byls Bridge Office Park, Centurion, South Africa',
  streetAddress: 'Byls Bridge Office Park',
  locality: 'Centurion',
  region: 'Gauteng',
  postalCode: '',
  country: 'ZA',
  tagline: 'QCTO-accredited occupational training institution',
}

export const brandStatement =
  'Rise Institute is a QCTO-accredited training provider partnering with employers, SETA-funded organisations, and public institutions to deliver occupational qualifications, digital skills pathways, and industry-aligned learnership programmes across South Africa.'
