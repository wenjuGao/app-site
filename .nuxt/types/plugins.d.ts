// Generated by Nuxt'
import type { Plugin } from '#app'

type Decorate<T extends Record<string, any>> = { [K in keyof T as K extends string ? `$${K}` : never]: T[K] }

type IsAny<T> = 0 extends 1 & T ? true : false
type InjectionType<A extends Plugin> = IsAny<A> extends true ? unknown : A extends Plugin<infer T> ? Decorate<T> : unknown

type NuxtAppInjections = 
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.11.1_@parcel+watcher@2.4.1_@types+node@18.19.26_@unocss+reset@0.58.6_async-validator@4_4hniqsuiy64r7hq2xdqx2ihbpi/node_modules/nuxt/dist/app/plugins/payload.client").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.11.1_@parcel+watcher@2.4.1_@types+node@18.19.26_@unocss+reset@0.58.6_async-validator@4_4hniqsuiy64r7hq2xdqx2ihbpi/node_modules/nuxt/dist/app/plugins/check-outdated-build.client").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/@pinia+nuxt@0.4.11_rollup@3.29.4_typescript@5.4.3_vue@3.4.21_typescript@5.4.3_/node_modules/@pinia/nuxt/dist/runtime/plugin.vue3").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.11.1_@parcel+watcher@2.4.1_@types+node@18.19.26_@unocss+reset@0.58.6_async-validator@4_4hniqsuiy64r7hq2xdqx2ihbpi/node_modules/nuxt/dist/app/plugins/revive-payload.server").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.11.1_@parcel+watcher@2.4.1_@types+node@18.19.26_@unocss+reset@0.58.6_async-validator@4_4hniqsuiy64r7hq2xdqx2ihbpi/node_modules/nuxt/dist/app/plugins/revive-payload.client").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.11.1_@parcel+watcher@2.4.1_@types+node@18.19.26_@unocss+reset@0.58.6_async-validator@4_4hniqsuiy64r7hq2xdqx2ihbpi/node_modules/nuxt/dist/head/runtime/plugins/unhead").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.11.1_@parcel+watcher@2.4.1_@types+node@18.19.26_@unocss+reset@0.58.6_async-validator@4_4hniqsuiy64r7hq2xdqx2ihbpi/node_modules/nuxt/dist/pages/runtime/plugins/router").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.11.1_@parcel+watcher@2.4.1_@types+node@18.19.26_@unocss+reset@0.58.6_async-validator@4_4hniqsuiy64r7hq2xdqx2ihbpi/node_modules/nuxt/dist/pages/runtime/plugins/prefetch.client").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxtjs+color-mode@3.3.3_rollup@3.29.4/node_modules/@nuxtjs/color-mode/dist/runtime/plugin.server").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxtjs+color-mode@3.3.3_rollup@3.29.4/node_modules/@nuxtjs/color-mode/dist/runtime/plugin.client").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxt+content@2.12.1_ioredis@5.3.2_nuxt@3.11.1_@parcel+watcher@2.4.1_@types+node@18.19.26_@un_n24hl7hihjezsfnsjdsdc4jba4/node_modules/@nuxt/content/dist/runtime/legacy/plugins/documentDriven").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/dayjs-nuxt@1.2.7_rollup@3.29.4/node_modules/dayjs-nuxt/dist/runtime/plugin").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.11.1_@parcel+watcher@2.4.1_@types+node@18.19.26_@unocss+reset@0.58.6_async-validator@4_4hniqsuiy64r7hq2xdqx2ihbpi/node_modules/nuxt/dist/app/plugins/chunk-reload.client").default>

declare module '#app' {
  interface NuxtApp extends NuxtAppInjections { }

  interface NuxtAppLiterals {
    pluginName: 'nuxt:revive-payload:client' | 'nuxt:head' | 'nuxt:router' | 'nuxt:payload' | 'nuxt:revive-payload:server' | 'nuxt:global-components' | 'nuxt:prefetch' | 'nuxt:chunk-reload'
  }
}

declare module 'vue' {
  interface ComponentCustomProperties extends NuxtAppInjections { }
}

export { }
