import { build } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const mode = process.argv[2] || 'client'

console.log(`[vite-build] ${mode} start`)

if (mode === 'client') {
  await build({ root, build: { outDir: 'dist', emptyOutDir: true } })
} else if (mode === 'ssr') {
  await build({
    root,
    build: {
      outDir: '.ssr',
      emptyOutDir: true,
      copyPublicDir: false,
      ssr: 'src/entry-server.tsx',
      rollupOptions: {
        output: {
          entryFileNames: 'entry-server.js',
        },
      },
    },
  })
} else {
  throw new Error(`unknown mode: ${mode}`)
}

console.log(`[vite-build] ${mode} done`)
