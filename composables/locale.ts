import type { Ref } from 'vue'

export const useLocale = () => useState<string>('locale', () => useDefaultLocale().value)

export const useDefaultLocale = (fallback = 'en-US') => {
	const locale = ref(fallback)
	if (process.server) {
		// Learn more about the nuxtApp interface on https://nuxt.com/docs/guide/going-further/internals#the-nuxtapp-interface
		const reqLocale = useRequestHeaders()['accept-language']?.split(',')[0]
		if (reqLocale) {
			locale.value = reqLocale
		}
	} else if (process.client) {
		const navLang = navigator.language
		if (navLang) {
			locale.value = navLang
		}
	}
	return locale
}

export const useLocales = () => {
	const locale = useLocale()
	const locales = ref([
		{
			"value": "en-US",
			"__name": "English",
			"__flag": "🇬🇧"
		},
		{
			"value": "zh-CN",
			"__name": "中文",
			"__flag": "🇨🇳"
		}
	])
	if (!locales.value.some(i => i.value === locale.value)) {
		locales.value.unshift({
			"value": locale.value,
			__name: '',
			__flag: ''
		})
	}
	return locales
}

// Using Intl.DateTimeFormat for language-sensitive date and time formatting
// Learn more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
export const useLocaleDate = (date: Ref<Date> | Date, locale = useLocale()) => {
	return computed(() => new Intl.DateTimeFormat(locale.value, { dateStyle: 'full' }).format(unref(date)))
}
