import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "article" | "custom" | "default"
declare module "../../node_modules/.pnpm/nuxt@3.11.1_@parcel+watcher@2.4.1_@types+node@18.19.26_@unocss+reset@0.58.6_async-validator@4_4hniqsuiy64r7hq2xdqx2ihbpi/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}