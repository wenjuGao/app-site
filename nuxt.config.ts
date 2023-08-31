import tailwindTypography from '@tailwindcss/typography'


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      // script: [
      //   {
      //     // 不蒜子
      //     src: 'https://busuanzi.icodeq.com/busuanzi.pure.mini.js',
      //     // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
      //     tagPosition: 'bodyOpen'
      //   }
      // ],
      htmlAttrs: {
        class: "scroll-smooth"
      }
    }
  },
  $production: {
    routeRules: {
      '/**': { isr: true }
    }
  },
  $development: {
    //
  },
  content: {
    highlight: {
      // Theme used in all color schemes.
      // theme: 'github-light'
      // OR
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      },
      preload: [
        'diff', 'json', 'js', 'ts', 'css', 'shell', 'html', 'md', 'yaml'
      ]
    }
  },
  runtimeConfig: {
    app: {
      baseURL: "/",
      title: "前端小书童",
      logo: "http://qiniu.gaowenju.com/app-site/logo.png",
      footLogo: "/img/qrcode.jpg",
      description: "前端工程师的杂货铺"
    },
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    }
  },
  modules: [
    'nuxt-lodash',
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
    },
  },
})
