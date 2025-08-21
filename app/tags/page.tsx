import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { TagIcon } from '@heroicons/react/24/outline'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: '博客标签分类' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 dark:divide-gray-700">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="flex items-center gap-2 text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl dark:text-gray-100">
            <TagIcon className="text-primary-500 h-8 w-8" />
            标签
          </h1>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">按标签分类浏览博客内容</p>
        </div>
        <div className="flex max-w-2xl flex-wrap gap-4 py-6">
          {tagKeys.length === 0 && '暂无标签'}
          {sortedTags.map((t) => (
            <Link
              key={t}
              href={`/tags/${slug(t)}`}
              className="group"
              aria-label={`查看标签 ${t} 下的文章`}
            >
              <div className="bg-primary-50 dark:bg-primary-900 flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 shadow transition-all duration-200 hover:scale-105 hover:shadow-lg">
                <TagIcon className="text-primary-500 h-5 w-5" />
                <Tag text={t} className="text-primary-700 dark:text-primary-300 font-semibold" />
                <span className="bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 ml-2 rounded-full px-2 py-0.5 text-xs font-bold">
                  {tagCounts[t]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
