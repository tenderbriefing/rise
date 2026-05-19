import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '../data/navigation'
import { getBreadcrumbs, getCanonical } from '../data/seoRoutes'

const defaults = {
  title: 'Rise Institute | QCTO Accredited Occupational Training Provider in Gauteng',
  description:
    'Rise Institute is a QCTO-accredited occupational training institution in Midrand, Gauteng, delivering workplace-integrated qualifications in agriculture, project management, and occupational health and safety.',
  keywords:
    'QCTO accredited training provider, occupational training South Africa, learnerships Gauteng, B-BBEE skills development, SETA training provider, occupational health and safety course, project management qualification, agricultural training South Africa',
  ogType: 'website',
  ogImage: 'https://riseinstitute.co.za/og-rise-institute.jpg',
  twitterCard: 'summary_large_image',
  twitterSite: '@riseinstitute',
}

function buildStructuredData({ canonicalUrl, description, breadcrumbs }) {
  const address = {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address,
    addressLocality: 'Midrand',
    addressRegion: 'Gauteng',
    postalCode: '1685',
    addressCountry: 'ZA',
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.domain}/#website`,
        url: siteConfig.domain,
        name: siteConfig.name,
        description: defaults.description,
        publisher: { '@id': `${siteConfig.domain}/#organization` },
        inLanguage: 'en-ZA',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteConfig.domain}/contact?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteConfig.domain}/#organization`,
        name: siteConfig.name,
        url: siteConfig.domain,
        logo: `${siteConfig.domain}/favicon.svg`,
        email: siteConfig.email,
        telephone: siteConfig.landline,
        description,
        address,
        sameAs: [],
        areaServed: { '@type': 'Country', name: 'South Africa' },
        knowsAbout: [
          'Occupational Training',
          'Skills Development',
          'Learnerships',
          'QCTO Qualifications',
          'B-BBEE Skills Development',
        ],
      },
      {
        '@type': 'EducationalOrganization',
        '@id': `${siteConfig.domain}/#educational`,
        name: siteConfig.name,
        url: siteConfig.domain,
        email: siteConfig.email,
        telephone: siteConfig.landline,
        description,
        address,
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
        address,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -25.9991,
          longitude: 28.1262,
        },
        areaServed: 'South Africa',
        priceRange: '$$',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${siteConfig.domain}${item.path === '/' ? '' : item.path}`,
        })),
      },
    ],
  }
}

export default function SEO({
  title,
  description = defaults.description,
  keywords = defaults.keywords,
  canonical,
  pathname,
  ogTitle,
  ogDescription,
  ogType = defaults.ogType,
  ogImage = defaults.ogImage,
  twitterCard = defaults.twitterCard,
  article = false,
  publishedTime,
  modifiedTime,
  noindex = false,
}) {
  const location = useLocation()
  const currentPath = pathname || location.pathname
  const pageTitle = title || defaults.title
  const canonicalUrl = canonical || getCanonical(currentPath)
  const socialTitle = ogTitle || pageTitle
  const socialDescription = ogDescription || description
  const breadcrumbs = getBreadcrumbs(currentPath)
  const structuredData = buildStructuredData({
    canonicalUrl,
    description,
    breadcrumbs,
  })

  return (
    <Helmet>
      <html lang="en-ZA" />
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={siteConfig.name} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={socialDescription} />
      <meta property="og:type" content={article ? 'article' : ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${siteConfig.name} — QCTO Accredited Training`} />
      <meta property="og:locale" content="en_ZA" />

      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={defaults.twitterSite} />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={socialDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${siteConfig.name} — QCTO Accredited Training`} />

      <meta name="geo.region" content="ZA-GP" />
      <meta name="geo.placename" content="Midrand" />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}
