import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate, sortPosts, allCoreContent, allBlogs } from '@/lib/content'
import { CalendarIcon, ArrowRightIcon, TagIcon } from 'lucide-react'
import Hero from '@/components/Hero'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import FadeContent from '@/components/reactbits/FadeContent'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Seo from '@/components/Seo'

const MAX_DISPLAY = 10

export default function Home() {
  const posts = allCoreContent(sortPosts(allBlogs))
  return (
    <>
      <Seo noTemplate />
      <Hero title="WenjuGao" description={siteMetadata.description} />
      <ul className="grid gap-6 pb-8 md:grid-cols-2 xl:grid-cols-3">
        {!posts.length && 'No posts found.'}
        {posts.slice(0, MAX_DISPLAY).map((post, index) => {
          const { slug, date, title, summary, tags } = post
          return (
            <li key={slug} className="h-full">
              <FadeContent delay={index * 80} className="h-full">
                <SpotlightCard className="group h-full rounded-xl">
                  <Card className="group h-full gap-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <CardHeader>
                      <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                        <CalendarIcon className="size-4" />
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </div>
                      <CardTitle className="group-hover:text-primary text-xl leading-snug font-bold transition-colors">
                        <Link href={`/blog/${slug}`}>{title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="gap-1">
                            <TagIcon className="size-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-muted-foreground line-clamp-3 flex-1 text-sm leading-relaxed">
                        {summary}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild size="sm" className="group/btn">
                        <Link href={`/blog/${slug}`} aria-label={`Read more: "${title}"`}>
                          阅读更多
                          <ArrowRightIcon className="transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </SpotlightCard>
              </FadeContent>
            </li>
          )
        })}
      </ul>
      {posts.length > MAX_DISPLAY && (
        <FadeContent className="mb-8 flex justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/blog" aria-label="All posts">
              查看全部文章
              <ArrowRightIcon />
            </Link>
          </Button>
        </FadeContent>
      )}
    </>
  )
}
