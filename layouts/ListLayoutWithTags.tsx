'use client'

import { useLocation } from 'react-router-dom'
import { slug } from 'github-slugger'
import { formatDate, type CoreContent } from '@/lib/content'
import type { Blog } from 'contentlayer/generated'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from '@/src/generated/tag-data.json'
import FadeContent from '@/components/reactbits/FadeContent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const { pathname } = useLocation()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <nav className="flex items-center justify-between pt-6 pb-8">
      <Button asChild={prevPage} variant="outline" size="sm" disabled={!prevPage}>
        {prevPage ? (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            <ChevronLeftIcon /> 上一页
          </Link>
        ) : (
          <span className="inline-flex items-center gap-2">
            <ChevronLeftIcon /> 上一页
          </span>
        )}
      </Button>
      <span className="text-muted-foreground text-sm">
        {currentPage} / {totalPages}
      </span>
      <Button asChild={nextPage} variant="outline" size="sm" disabled={!nextPage}>
        {nextPage ? (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            下一页 <ChevronRightIcon />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-2">
            下一页 <ChevronRightIcon />
          </span>
        )}
      </Button>
    </nav>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const { pathname } = useLocation()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className="pt-6 pb-8">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl dark:text-gray-100">
          {title}
        </h1>
      </div>
      <div className="flex gap-8">
        <aside className="hidden sm:block">
          <Card className="sticky top-20 max-h-[calc(100vh-6rem)] w-[240px] gap-0 overflow-auto py-4">
            <CardHeader className="px-4 pb-2">
              {pathname.startsWith('/blog') ? (
                <span className="text-primary inline-flex items-center gap-2 text-sm font-bold uppercase">
                  <LayoutGridIcon className="size-4" /> All Posts
                </span>
              ) : (
                <Link
                  href={`/blog`}
                  className="hover:text-primary inline-flex items-center gap-2 text-sm font-bold text-gray-700 uppercase transition-colors dark:text-gray-300"
                >
                  <LayoutGridIcon className="size-4" /> All Posts
                </Link>
              )}
            </CardHeader>
            <CardContent className="px-2">
              <ul>
                {sortedTags.map((t) => {
                  const active = decodeURI(pathname.split('/tags/')[1] ?? '') === slug(t)
                  return (
                    <li key={t}>
                      <Link
                        href={`/tags/${slug(t)}`}
                        aria-label={`View posts tagged ${t}`}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'my-0.5 flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium uppercase transition-colors',
                          active
                            ? 'bg-accent text-primary'
                            : 'text-muted-foreground hover:bg-accent/60 hover:text-primary'
                        )}
                      >
                        <span>{t}</span>
                        <span className="text-xs opacity-70">{tagCounts[t]}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        </aside>
        <div className="min-w-0 flex-1">
          <ul className="space-y-4">
            {displayPosts.map((post, index) => {
              const { path, date, title, summary, tags } = post
              return (
                <li key={path}>
                  <FadeContent delay={Math.min(index, 5) * 60}>
                    <Card className="group gap-0 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                      <CardContent className="space-y-3">
                        <div className="text-muted-foreground flex items-center gap-2 text-sm">
                          <CalendarIcon className="size-4" />
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                        </div>
                        <h2 className="text-2xl leading-8 font-bold tracking-tight">
                          <Link
                            href={`/${path}`}
                            className="group-hover:text-primary text-gray-900 transition-colors dark:text-gray-100"
                          >
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">
                          {tags?.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                          {summary}
                        </p>
                      </CardContent>
                    </Card>
                  </FadeContent>
                </li>
              )
            })}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </>
  )
}
