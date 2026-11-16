/**
 * 读取环境变量，同时兼容 Node（contentlayer/rss 脚本）与 Vite（浏览器端）。
 * 浏览器端使用 import.meta.env（仅 VITE_ 前缀可被静态注入），Node 端使用 process.env。
 */
function getEnv(key) {
  if (typeof process !== 'undefined' && process.env && process.env[key] != null) {
    return process.env[key]
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key] != null) {
    return import.meta.env[key]
  }
  return undefined
}

const basePath = getEnv('BASE_PATH') || getEnv('VITE_BASE_PATH') || ''

/** @type {import("pliny/config").PlinyConfig} */
const siteMetadata = {
  title: '小书童',
  author: 'wenjuGao',
  headerTitle: '小书童',
  description: '前端开发者的博客',
  language: 'zh',
  theme: 'system', // system, dark or light
  siteUrl: 'https://site.gaowenju.com/',
  siteRepo: 'https://github.com/wenjuGao/next-site',
  siteLogo: `${basePath}/static/images/logo.png`,
  socialBanner: `${basePath}/static/images/twitter-card.png`,
  mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'wenjugao3@gmail.com',
  github: 'https://github.com/wenjuGao',
  x: 'https://x.com/6QJM6pzFNe2TiEu',
  telegram: 'https://t.me/AmanCao12',
  facebook: 'https://facebook.com',
  youtube: 'https://www.youtube.com/@wenjugao5861',
  linkedin: 'https://www.linkedin.com/in/wenju-gao-823209278',
  threads: 'https://www.threads.net',
  instagram: 'https://www.instagram.com',
  medium: 'https://medium.com',
  bluesky: 'https://bsky.app/',
  locale: 'zh-CN',
  // set to true if you want a navbar fixed to the top
  stickyNav: true,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: getEnv('NEXT_UMAMI_ID') || getEnv('VITE_UMAMI_ID'),
    },
  },
  newsletter: {
    provider: '',
  },

  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${basePath}/search.json`,
    },
  },
}

export default siteMetadata
