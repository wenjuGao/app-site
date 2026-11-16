import Link from '@/components/Link'
import { TagIcon } from '@heroicons/react/24/outline'
import { slug } from 'github-slugger'
import tagData from '../generated/tag-data.json'
import Seo from '@/components/Seo'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import FadeContent from '@/components/reactbits/FadeContent'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Tags() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <>
      <Seo title="Tags" description="博客标签分类" canonical="/tags" />
      <header className="flex flex-col items-center pt-12 pb-10 text-center md:pt-16 md:pb-14">
        <span className="bg-primary-50 dark:bg-primary-900/40 mb-4 inline-flex rounded-2xl p-3">
          <TagIcon className="text-primary-500 h-8 w-8" />
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
          标签
        </h1>
        <p className="mt-3 max-w-xl text-base text-gray-500 md:text-lg dark:text-gray-400">
          按标签分类浏览博客内容，共 {tagKeys.length} 个标签
        </p>
      </header>
      <div className="grid grid-cols-1 gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {tagKeys.length === 0 && '暂无标签'}
        {sortedTags.map((t, index) => (
          <FadeContent key={t} delay={index * 60} className="h-full">
            <Link
              href={`/tags/${slug(t)}`}
              className="group block h-full"
              aria-label={`查看标签 ${t} 下的文章`}
            >
              <SpotlightCard className="h-full rounded-xl">
                <Card className="h-full flex-row items-center justify-between gap-4 px-5 py-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <span className="flex min-w-0 items-center gap-3">
                    <TagIcon className="text-primary-500 h-5 w-5 shrink-0" />
                    <span className="group-hover:text-primary truncate text-base font-semibold transition-colors">
                      {t}
                    </span>
                  </span>
                  <Badge variant="secondary" className="shrink-0">
                    {tagCounts[t]} 篇
                  </Badge>
                </Card>
              </SpotlightCard>
            </Link>
          </FadeContent>
        ))}
      </div>
    </>
  )
}
