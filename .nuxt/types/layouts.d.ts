import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "article" | "custom" | "default"
declare module "../../node_modules/.pnpm/nuxt@3.11.1_@types+node@18.19.26_@unocss+reset@0.58.6_floating-vue@5.2.2_rollup@3.29.4_typesc_f4ybvezt55use5n3ldxgxqrtky/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}