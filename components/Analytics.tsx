import siteMetadata from '@/data/siteMetadata'

export default function Analytics() {
  const umami = siteMetadata.analytics?.umamiAnalytics
  if (umami?.umamiWebsiteId) {
    return (
      <script
        async
        defer
        src="https://analytics.umami.is/script.js"
        data-website-id={umami.umamiWebsiteId}
      />
    )
  }
  return null
}
