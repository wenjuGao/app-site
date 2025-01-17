import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "article" | "custom" | "default"
declare module "../../node_modules/.pnpm/nuxt@3.15.2_@types+node@18.19.71_rollup@3.29.5_typescript@5.7.3_vite@6.0.7/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}