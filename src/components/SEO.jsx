import { Helmet } from 'react-helmet-async'
import { siteConfig } from '../data/navigation'

const defaults = {
  title: 'Rise Institute | QCTO Accredited Occupational Training Provider in Gauteng',
  description:
    'Rise Institute is a QCTO-accredited occupational training institution in Midrand, Gauteng, delivering workplace-integrated qualifications in agriculture, project management, and occupational health and safety.',
  keywords:
    'QCTO accredited training provider, occupational training South Africa, learnerships Gauteng, B-BBEE skills development, SETA training provider, occupational health and safety course, project management qualification, agricultural training South Africa',
  ogType: 'website',
  ogImage: `${siteConfig.domain}/og-rise-institute.jpg`,
  twitterCard: 'summary_large_image',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteConfig.domain}/#organization`,
      name: siteConfig.name,
      url: siteConfig.domain,
      email: siteConfig.email,
      telephone: siteConfig.landline,
      description: defaults.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address,
        addressLocality: 'Midrand',
        addressRegion: 'Gauteng',
        addressCountry: 'ZA',
      },
      areaServed: {
        '@type': 'Country',
        name: 'South Africa',
      },
      knowsAbout: [
        'Occupational Training',
        'Skills Development',
        'Learnerships',
        'QCTO Qualifications',
      ],
    },
    {
      '@type': 'EducationalOrganization',
      '@id': `${siteConfig.domain}/#educational`,
      name: siteConfig.name,
      url: siteConfig.domain,
      email: siteConfig.email,
      telephone: siteConfig.landline,
      description: defaults.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address,
        addressLocality: 'Midrand',
        addressRegion: 'Gauteng',
        addressCountry: 'ZA',
      },
      areaServed: 'South Africa',
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${siteConfig.domain}/#localbusiness`,
      name: siteConfig.name,
      url: siteConfig.domain,
      email: siteConfig.email,
      telephone: siteConfig.landline,
      image: defaults.ogImage,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address,
        addressLocality: 'Midrand',
        addressRegion: 'Gauteng',
        addressCountry: 'ZA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -25.9991,
        longitude: 28.1262,
      },
      areaServed: 'South Africa',
      priceRange: '$$',
    },
  ],
}

export default function SEO({
  title,
  description = defaults.description,
  keywords = defaults.keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogType = defaults.ogType,
  ogImage = defaults.ogImage,
  twitterCard = defaults.twitterCard,
}) {
  const pageTitle = title || defaults.title
  const canonicalUrl = canonical || siteConfig.domain
  const socialTitle = ogTitle || pageTitle
  const socialDescription = ogDescription || description

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={socialDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_ZA" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={socialDescription} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}
