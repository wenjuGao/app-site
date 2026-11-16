import siteMetadata from '@/data/siteMetadata'

// newsletter 目前未启用（provider 为空），保留占位组件以便 MDX 组件表引用。
export default function BlogNewsletterForm() {
  if (!siteMetadata.newsletter?.provider) {
    return null
  }
  return null
}
