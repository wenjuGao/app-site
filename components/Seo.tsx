import { Helmet } from 'react-helmet-async'
import siteMetadata from '@/data/siteMetadata'

interface SeoProps {
  title?: string
  description?: string
  image?: string
  type?: string
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  canonical?: string
  jsonLd?: Record<string, unknown>
  noTemplate?: boolean
}

export default function Seo({
  title,
  description,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  canonical,
  jsonLd,
  noTemplate = false,
}: SeoProps) {
  const siteUrl = siteMetadata.siteUrl.replace(/\/$/, '')
  const pageTitle = title || siteMetadata.title
  const fullTitle = noTemplate || !title ? pageTitle : `${pageTitle} | ${siteMetadata.title}`
  const desc = description || siteMetadata.description
  const img = image || siteMetadata.socialBanner
  const absoluteImage = img.startsWith('http') ? img : `${siteUrl}${img}`
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />
      <link rel="alternate" type="application/rss+xml" href={`${siteUrl}/feed.xml`} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="zh_CN" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {authors?.map((a) => (
        <meta key={a} property="article:author" content={a} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={absoluteImage} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
