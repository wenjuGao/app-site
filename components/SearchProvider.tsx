import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
} from 'kbar'
import { formatDate } from '@/lib/content'
import siteMetadata from '@/data/siteMetadata'

interface SearchAction {
  id: string
  name: string
  subtitle?: string
  keywords?: string
  section?: string
  perform?: () => void
}

function RenderResults() {
  const { results } = useMatches()
  return (
    <div className="max-h-96 overflow-y-auto px-2 pb-4">
      {results.map((result) => {
        if (typeof result === 'string') {
          return (
            <div
              key={result}
              className="px-3 pt-3 pb-1 text-xs font-semibold tracking-wide text-gray-400 uppercase"
            >
              {result}
            </div>
          )
        }
        const action = result as SearchAction & { active?: boolean }
        return (
          <button
            key={action.id}
            onClick={() => action.perform?.()}
            className="flex w-full flex-col items-start rounded-lg px-3 py-2 text-left text-gray-700 transition-colors data-[active=true]:bg-gray-100 dark:text-gray-200 dark:data-[active=true]:bg-gray-800"
            data-active={action.active}
          >
            <span className="text-sm font-medium">{action.name}</span>
            {action.subtitle && (
              <span className="text-xs text-gray-500 dark:text-gray-400">{action.subtitle}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function KBarModal({ isLoading }: { isLoading: boolean }) {
  return (
    <KBarPortal>
      <KBarPositioner className="fixed inset-0 z-50 flex items-start justify-center bg-gray-900/40 pt-[15vh] backdrop-blur-sm">
        <KBarAnimator className="w-full max-w-xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
          <KBarSearch className="w-full border-b border-gray-200 bg-transparent px-4 py-3 text-base text-gray-800 outline-none dark:border-gray-700 dark:text-gray-100" />
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500">正在加载搜索索引…</div>
          ) : (
            <RenderResults />
          )}
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  )
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [searchActions, setSearchActions] = useState<SearchAction[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)

  const kbarConfig = siteMetadata.search.kbarConfig

  useEffect(() => {
    const mapPosts = (posts: any[]): SearchAction[] =>
      posts.map((post) => ({
        id: post.path,
        name: post.title,
        keywords: post?.summary || '',
        section: 'Content',
        subtitle: formatDate(post.date, 'en-US'),
        perform: () => navigate('/' + post.path),
      }))

    if (kbarConfig.searchDocumentsPath) {
      fetch(kbarConfig.searchDocumentsPath)
        .then((res) => res.json())
        .then((json) => {
          setSearchActions(mapPosts(json))
          setDataLoaded(true)
        })
        .catch(() => setDataLoaded(true))
    } else {
      setDataLoaded(true)
    }
  }, [kbarConfig.searchDocumentsPath, navigate])

  return (
    <KBarProvider actions={searchActions}>
      <KBarModal isLoading={!dataLoaded} />
      {children}
    </KBarProvider>
  )
}
