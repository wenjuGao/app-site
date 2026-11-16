import { useParams } from 'react-router-dom'
import { slug } from 'github-slugger'
import { allCoreContent, sortPosts, allBlogs } from '@/lib/content'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import tagData from '../generated/tag-data.json'
import Seo from '@/components/Seo'
import NotFound from './NotFound'

const POSTS_PER_PAGE = 5

export default function TagPage() {
  const params = useParams()
  const tag = decodeURIComponent(params.tag || '')
  const pageNumber = params.page ? parseInt(params.page) : 1
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return <NotFound />
  }

  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = { currentPage: pageNumber, totalPages }

  return (
    <>
      <Seo
        title={tag}
        description={`${siteMetadata.title} ${tag} tagged content`}
        canonical={
          pageNumber === 1 ? `/tags/${slug(tag)}` : `/tags/${slug(tag)}/page/${pageNumber}`
        }
      />
      <ListLayout
        posts={filteredPosts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={title}
      />
    </>
  )
}
