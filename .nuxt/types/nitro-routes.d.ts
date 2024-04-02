// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/banner': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/banner').default>>>>
    }
    '/api/image': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/image').default>>>>
    }
    '/api/list': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/list').default>>>>
    }
    '/api/qiniu-file': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/qiniu-file').default>>>>
    }
    '/api/qiniu-link': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/qiniu-link').default>>>>
    }
    '/api/qiniu-preview': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/qiniu-preview').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/nuxt@3.11.1_@types+node@18.19.26_@unocss+reset@0.58.6_floating-vue@5.2.2_rollup@3.29.4_typesc_f4ybvezt55use5n3ldxgxqrtky/node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
    '/api/_mdc/highlight': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxtjs+mdc@0.6.1_rollup@3.29.4/node_modules/@nuxtjs/mdc/dist/runtime/highlighter/event-handler').default>>>>
    }
    '/api/_content/query/:qid/**:params': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+content@2.12.1_nuxt@3.11.1_rollup@3.29.4_vue@3.4.21/node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/query/:qid': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+content@2.12.1_nuxt@3.11.1_rollup@3.29.4_vue@3.4.21/node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/query': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+content@2.12.1_nuxt@3.11.1_rollup@3.29.4_vue@3.4.21/node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/cache.json': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+content@2.12.1_nuxt@3.11.1_rollup@3.29.4_vue@3.4.21/node_modules/@nuxt/content/dist/runtime/server/api/cache').default>>>>
    }
    '/api/_content/navigation/:qid/**:params': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+content@2.12.1_nuxt@3.11.1_rollup@3.29.4_vue@3.4.21/node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
    }
    '/api/_content/navigation/:qid': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+content@2.12.1_nuxt@3.11.1_rollup@3.29.4_vue@3.4.21/node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
    }
    '/api/_content/navigation': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+content@2.12.1_nuxt@3.11.1_rollup@3.29.4_vue@3.4.21/node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
<<<<<<< HEAD
=======
    }
    '/_ipx/**': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+image@1.4.0_rollup@3.29.4/node_modules/@nuxt/image/dist/runtime/ipx').default>>>>
>>>>>>> edbc9063393234f7d37205b467043c1abf6a0433
    }
  }
}
export {}