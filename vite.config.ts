import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
      'contentlayer/generated': fileURLToPath(
        new URL('./.contentlayer/generated', import.meta.url)
      ),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  ssr: {
    // 将所有依赖打包进 SSR bundle，避免 Node 运行时对 CJS 依赖的命名导出 interop 问题。
    noExternal: true,
  },
})
