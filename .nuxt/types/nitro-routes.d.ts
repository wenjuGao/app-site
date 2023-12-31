// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/qiniu-file': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/qiniu-file').default>>>>
    }
    '/api/qiniu-preview': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/qiniu-preview').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/registry.npmjs.org+nuxt@3.6.5_@types+node@18.17.3_rollup@3.28.1_typescript@5.2.2/node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
    '/api/_content/query/:qid/**:params': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/registry.npmjs.org+@nuxt+content@2.7.2_rollup@3.28.1/node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/query/:qid': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/registry.npmjs.org+@nuxt+content@2.7.2_rollup@3.28.1/node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/query': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/registry.npmjs.org+@nuxt+content@2.7.2_rollup@3.28.1/node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/cache.json': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/registry.npmjs.org+@nuxt+content@2.7.2_rollup@3.28.1/node_modules/@nuxt/content/dist/runtime/server/api/cache').default>>>>
    }
    '/api/_content/navigation/:qid/**:params': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/registry.npmjs.org+@nuxt+content@2.7.2_rollup@3.28.1/node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
    }
    '/api/_content/navigation/:qid': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/registry.npmjs.org+@nuxt+content@2.7.2_rollup@3.28.1/node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
    }
    '/api/_content/navigation': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/registry.npmjs.org+@nuxt+content@2.7.2_rollup@3.28.1/node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
    }
  }
}
export {}