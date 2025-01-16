
import { updateAppConfig } from '#app/config'
import { defuFn } from 'defu'

const inlineConfig = {
  "nuxt": {
    "buildId": "841b9327-0d42-428d-be6c-93450d5d9a58"
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
