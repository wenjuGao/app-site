import { useParams } from 'react-router-dom'
import { allCoreContent, sortPosts, allBlogs } from '@/lib/content'
import ListLayout from '@/layouts/ListLayoutWithTags'
import Seo from '@/components/Seo'
import NotFound from './NotFound'

const POSTS_PER_PAGE = 5

export default function BlogList() {
  const { page } = useParams()
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = page ? parseInt(page) : 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return <NotFound />
  }

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = { currentPage: pageNumber, totalPages }

  return (
    <>
      <Seo title="Blog" canonical={pageNumber === 1 ? '/blog' : `/blog/page/${pageNumber}`} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
