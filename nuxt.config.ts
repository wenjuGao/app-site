import tailwindTypography from '@tailwindcss/typography'


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    routeRules: {
      '/**': { isr: true }
    }
  },
  $development: {
    //
  },
  runtimeConfig: {
    app: {
      baseURL: "/",
      title: "前端小书童",
      logo: "http://qiniu.gaowenju.com/app-site/logo.png"
    },
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    }
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  // colorMode: {
  //   preference: 'system', // default theme
  //   dataValue: 'theme', // activate data-theme in <html> tag
  //   classSuffix: ''
  // },
  tailwindcss: {
    // Options
    cssPath: '~/assets/styles/index.css',
    configPath: 'tailwind.config',
    exposeConfig: true,
    exposeLevel: 2,
    config: {
      plugins: [tailwindTypography]
    },
    injectPosition: 'first',
    viewer: true,
  },
  devtools: { enabled: true },
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/tailwindcss"
  ],
  build: {
    // @ts-ignore
    postcss: {
      plugins: {
        "postcss-color-gray": {}
      }
    }
  }
})
