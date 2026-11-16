import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import path from 'path'

const root = process.cwd()

const blogsPath = path.join(root, '.contentlayer/generated/Blog/_index.json')
const authorsPath = path.join(root, '.contentlayer/generated/Authors/_index.json')

const blogs = JSON.parse(readFileSync(blogsPath, 'utf8'))
const authors = JSON.parse(readFileSync(authorsPath, 'utf8'))

// 去除运行时用不到的 body.raw，仅保留编译后的 body.code，减小产物体积。
const stripRaw = (doc) => {
  if (doc && doc.body && typeof doc.body === 'object') {
    return { ...doc, body: { code: doc.body.code } }
  }
  return doc
}

const output = {
  allBlogs: blogs.map(stripRaw),
  allAuthors: authors.map(stripRaw),
}

mkdirSync(path.join(root, 'src/generated'), { recursive: true })
writeFileSync(path.join(root, 'src/generated/content.json'), JSON.stringify(output))

console.log(`Generated src/generated/content.json (${blogs.length} posts, ${authors.length} authors)`)
