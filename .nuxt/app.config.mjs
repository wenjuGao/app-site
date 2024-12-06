
import { updateAppConfig } from '#app/config'
import { defuFn } from 'defu'

const inlineConfig = {
  "nuxt": {
    "buildId": "d5598f7b-0a24-45d6-8424-e8ca7220ab26"
  }
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}

import cfg0 from "/Users/gaowenju/github/app-site/app.config.ts"

export default /*@__PURE__*/ defuFn(cfg0, inlineConfig)
