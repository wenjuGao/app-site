import { allAuthors } from '@/lib/content'
import type { Authors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from '@/lib/mdx'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from '@/lib/content'
import Seo from '@/components/Seo'

export default function About() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <Seo title="小书童" canonical="/about" />
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
