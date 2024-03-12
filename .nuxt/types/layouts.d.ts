import { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "article" | "custom" | "default"
declare module "../../node_modules/.pnpm/nuxt@3.10.3_@types+node@18.19.21_rollup@3.29.4_typescript@5.3.3_vite@5.1.5/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}