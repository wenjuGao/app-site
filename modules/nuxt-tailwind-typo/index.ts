// ~/modules/nuxt-tailwind-typo/index.ts
import { defineNuxtModule, addTemplate } from '@nuxt/kit'
import tailwindTypography from '@tailwindcss/typography'

export default defineNuxtModule({
	meta: {
		name: 'nuxt-tailwind-typo'
	},
	setup(options, nuxt) {
		nuxt.hook('tailwindcss:config', function (tailwindConfig) {
			tailwindConfig.plugins.push(tailwindTypography)
		})

		nuxt.hook('tailwindcss:resolvedConfig', function (resolvedConfig) {
			// read: https://tailwindcss.nuxtjs.org/tailwind/editor-support
			addTemplate({
				filename: 'tailwind.config.cjs',
				getContents: () => `module.exports = ${JSON.stringify(resolvedConfig)}`,
				write: true
			})
		})
	}
})
