import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { slug } from 'github-slugger'
import App from './App'
import { allBlogs, allCoreContent, sortPosts } from '@/lib/content'
import tagData from './generated/tag-data.json'

const POSTS_PER_PAGE = 5

export function render(url: string) {
  const helmetContext: { helmet?: any } = {}
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  )
  return { html, helmet: helmetContext.helmet }
}

/** 收集所有需要预渲染的静态路径。 */
export function getRoutes(): string[] {
  const routes: string[] = ['/', '/blog', '/tags', '/about', '/experiment']

  const posts = allCoreContent(sortPosts(allBlogs))
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  for (let i = 2; i <= totalPages; i++) routes.push(`/blog/page/${i}`)

  posts.forEach((p) => routes.push(`/${p.path}`))

  const tagCounts = tagData as Record<string, number>
  Object.keys(tagCounts).forEach((tag) => {
    routes.push(`/tags/${slug(tag)}`)
    const totalTagPages = Math.ceil(tagCounts[tag] / POSTS_PER_PAGE)
    for (let i = 2; i <= totalTagPages; i++) routes.push(`/tags/${slug(tag)}/page/${i}`)
  })

  return routes
}
