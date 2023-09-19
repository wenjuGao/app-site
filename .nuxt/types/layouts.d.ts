import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "article" | "custom" | "default"
declare module "/Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+nuxt@3.6.5_@types+node@18.17.3_rollup@3.28.1_typescript@5.2.2/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}