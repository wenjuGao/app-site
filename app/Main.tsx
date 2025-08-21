import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { CalendarIcon } from '@heroicons/react/24/outline'
import Hero from '@/components/Hero' // 新增引入

const MAX_DISPLAY = 10

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 font-sans dark:divide-gray-700">
        {/* 替换为 Hero 组件 */}
        <Hero title="WenjuGao" description={siteMetadata.description} />
        <ul className="grid gap-8 py-8 md:grid-cols-3 xl:grid-cols-4">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li
                key={slug}
                className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
              >
                <article className="flex h-full flex-col p-6">
                  <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
                    <CalendarIcon className="inline-block h-5 w-5" />
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                  </div>
                  <h2 className="hover:text-primary-500 mb-2 text-xl font-bold text-gray-900 transition dark:text-gray-100">
                    <Link href={`/blog/${slug}`}>{title}</Link>
                  </h2>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold"
                      >
                        {/* 可用 Heroicons 的标签图标 */}
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 7h10M7 11h10M7 15h10"
                          ></path>
                        </svg>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="prose mb-4 line-clamp-3 max-w-none flex-1 text-gray-500 dark:text-gray-400">
                    {summary}
                  </div>
                  <div className="mt-auto">
                    <Link
                      href={`/blog/${slug}`}
                      className="bg-primary-500 hover:bg-primary-600 inline-block rounded-lg px-4 py-2 text-white shadow transition-all duration-200 hover:scale-105"
                      aria-label={`Read more: "${title}"`}
                    >
                      阅读更多 &rarr;
                    </Link>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/blog"
            className="bg-primary-500 hover:bg-primary-600 inline-block rounded-lg px-6 py-2 text-white shadow transition-all duration-200 hover:scale-105"
            aria-label="All posts"
          >
            查看全部文章 &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex flex-col items-center justify-center pt-6">
          <NewsletterForm title="订阅博客更新" />
        </div>
      )}
    </>
  )
}
