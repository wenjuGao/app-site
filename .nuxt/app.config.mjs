
import { updateAppConfig } from '#app/config'
import { defuFn } from 'defu'

const inlineConfig = {
  "nuxt": {
    "buildId": "d7d7b0ac-31be-45e0-a6d2-1061f04c77c0"
  }
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}

import cfg0 from "/Users/gaowenju/my-job/app-site/app.config.ts"

export default /*@__PURE__*/ defuFn(cfg0, inlineConfig)
