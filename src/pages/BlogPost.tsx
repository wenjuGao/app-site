import '@/css/prism.css'
import 'katex/dist/katex.css'

import { useParams } from 'react-router-dom'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from '@/lib/mdx'
import { sortPosts, coreContent, allCoreContent, allBlogs, allAuthors } from '@/lib/content'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import siteMetadata from '@/data/siteMetadata'
import Seo from '@/components/Seo'
import NotFound from './NotFound'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export default function BlogPost() {
  const params = useParams()
  const slug = decodeURIComponent(params['*'] || '')

  const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return <NotFound />
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allBlogs.find((p) => p.slug === slug) as Blog
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) =>
    coreContent(allAuthors.find((p) => p.slug === author) as Authors)
  )
  const mainContent = coreContent(post)
  const jsonLd = { ...post.structuredData }
  jsonLd['author'] = authorDetails.map((author) => ({
    '@type': 'Person',
    name: author.name,
  }))

  const Layout = layouts[post.layout || defaultLayout]

  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }

  return (
    <>
      <Seo
        title={post.title}
        description={post.summary}
        type="article"
        publishedTime={new Date(post.date).toISOString()}
        modifiedTime={new Date(post.lastmod || post.date).toISOString()}
        authors={authorDetails.map((a) => a.name)}
        image={imageList[0]}
        canonical={`/${post.path}`}
        jsonLd={jsonLd}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
}
