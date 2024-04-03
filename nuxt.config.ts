import tailwindTypography from '@tailwindcss/typography'


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      title: '前端小书童',
      charset: 'utf-8',
      meta: [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
        },
        {
          "charset": "utf-8"
        },
        {
          "name": "keywords",
          "vmid": "keywords",
          "content": "前端,javascript,js,Vue,React,blog,nextjs,nuxtjs"
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: "32x32",
          href: "img/logo.png"
        },
        // {
        //   rel: 'shortcut icon',
        //   type: 'image/x-icon',
        //   href: "favicon.ico"
        // }
      ],
      style: [
        {
          // @ts-ignore
          rel: 'stylesheet',
          // href: '~/assets/lib/katex.min.css',
          href: `${process.env.NUXT_QINIU_ACCESS_KEY}/lib/katex.min.css`,
          integrity: 'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
          crossorigin: "anonymous"
        }
      ],
      script: [
        {
          // 不蒜子
          src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js',
          async: true,
          tagPosition: 'bodyClose'
        },
        {
          // src: 'https://cdn.staticfile.org/twikoo/1.6.18/twikoo.all.min.js',
          src: `${process.env.NUXT_QINIU_ACCESS_KEY}/lib/twikoo.all.min.js`,
          // src: '~/assets/lib/twikoo.all.min.js',
          crossorigin: "anonymous",
          tagPosition: 'bodyClose'
        },
        {
          // src: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js',
          src: `${process.env.NUXT_QINIU_ACCESS_KEY}/lib/katex.min.js`,
          // src: '~/assets/lib/katex.min.js',
          crossorigin: "anonymous",
          tagPosition: 'bodyClose',
          integrity: "sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4"

        },
        {
          // src: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js',
          src: `${process.env.NUXT_QINIU_ACCESS_KEY}/lib/auto-render.min.js`,
          // src: '~/assets/lib/contrib/auto-render.min.js',
          crossorigin: "anonymous",
          tagPosition: 'bodyClose',
          integrity: "sha384-mll67QQFJfxn0IYznZYonOWZ644AWYC+Pt2cHqMaRhXVrursRwvLnLaebdGIlYNa"
        },
        {
          innerHTML: `var _hmt = _hmt || [];
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
      '/**': { isr: false }
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
      langs: [
        'json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'xml', 'javascript', 'docker', 'py', 'mermaid'
      ],
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
      logo: "/img/logo.png",
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
    // 'nuxt-lodash',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    // '@nuxtjs/color-mode',
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
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {
      plugins: [tailwindTypography]
    },
    cssPath: ["~/assets/styles/index.css", { injectPosition: "first" }],
    viewer: true,
  },
  devtools: { enabled: true },
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/tailwindcss",
    '@nuxt/http'
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