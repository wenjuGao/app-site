import tailwindTypography from '@tailwindcss/typography'


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: '前端小书童',
      charset: 'utf-8',
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: "32x32",
          href: "https://qiniu.gaowenju.com/app-site/logo.png-32X32"
        },
      ],
      style: [
        {
          // @ts-ignore
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
          integrity: 'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
          crossorigin: "anonymous"
        }
      ],
      script: [
        {
          // 不蒜子
          src: 'https://busuanzi.icodeq.com/busuanzi.pure.mini.js',
          tagPosition: 'bodyOpen'
        },
        {
          src: 'https://cdn.staticfile.org/twikoo/1.6.18/twikoo.all.min.js',
          crossorigin: "anonymous",
          tagPosition: 'bodyOpen'
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js',
          crossorigin: "anonymous",
          tagPosition: 'bodyOpen',
          integrity: "sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4"

        },
        {
          src: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js',
          crossorigin: "anonymous",
          tagPosition: 'bodyOpen',
          integrity: "sha384-mll67QQFJfxn0IYznZYonOWZ644AWYC+Pt2cHqMaRhXVrursRwvLnLaebdGIlYNa"
        },
        {
          innerhtml: `var _hmt = _hmt || [];
            (function () {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?3f484b76ee9be574223c2becdbcb6d87";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            })(); `
        }
      ],
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
    documentDriven: true,
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
    },
    // @ts-ignore
    toc: {
      depth: 2,
      searchDepth: 2
    }
  },
  runtimeConfig: {
    app: {
      baseURL: "/",
      title: "前端小书童",
      logo: "https://qiniu.gaowenju.com/app-site/logo.png",
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
    'dayjs-nuxt',
    'nuxt-lodash',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  dayjs: {
    plugins: ['weekday', 'advancedFormat', 'timezone'],
  },
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
