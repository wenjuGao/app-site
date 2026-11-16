import content from '../src/generated/content.json'
import type { Blog, Authors } from 'contentlayer/generated'

export const allBlogs = content.allBlogs as unknown as Blog[]
export const allAuthors = content.allAuthors as unknown as Authors[]

/** 去掉 body/_raw/_id 等原始字段后的内容，用于列表渲染与序列化。 */
export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>

export function sortPosts<T extends { date: string }>(posts: T[]): T[] {
  return [...posts].sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))
}

export function coreContent<T>(content: T): CoreContent<T> {
  const {
    body: _body,
    _raw: _rawValue,
    _id: _idValue,
    ...rest
  } = content as Record<string, unknown>
  return rest as CoreContent<T>
}

export function allCoreContent<T>(contents: T[]): CoreContent<T>[] {
  const isProduction = import.meta.env.PROD
  return contents
    .map((c) => coreContent(c))
    .filter((c) => !(isProduction && 'draft' in c && c.draft === true))
}

export function formatDate(date: string, locale = 'en-US'): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
