import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const root = process.cwd()
const distDir = path.join(root, 'dist')

const template = readFileSync(path.join(distDir, 'index.html'), 'utf8')

const serverEntryUrl = pathToFileURL(path.join(root, '.ssr', 'entry-server.js')).href
const { render, getRoutes } = await import(serverEntryUrl)

function renderHelmet(helmet) {
  if (!helmet) return ''
  const parts = []
  if (helmet.title) parts.push(helmet.title.toString())
  if (helmet.base) parts.push(helmet.base.toString())
  if (helmet.meta) parts.push(helmet.meta.toString())
  if (helmet.link) parts.push(helmet.link.toString())
  if (helmet.script) parts.push(helmet.script.toString())
  if (helmet.style) parts.push(helmet.style.toString())
  if (helmet.noscript) parts.push(helmet.noscript.toString())
  return parts.join('\n')
}

const routes = getRoutes()
let count = 0

for (const route of routes) {
  const { html, helmet } = render(route)
  const head = renderHelmet(helmet)

  let page = template.replace('</head>', `${head}</head>`)

  if (page.includes('<div id="root"></div>')) {
    page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  } else {
    page = page.replace('<div id="root">', `<div id="root">${html}`)
  }

  const outFile = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}/index.html`
  const outPath = path.join(distDir, outFile)
  mkdirSync(path.dirname(outPath), { recursive: true })
  writeFileSync(outPath, page)
  count++
  console.log('✓', route)
}

console.log(`\nPrerendered ${count} routes to ${distDir}`)
