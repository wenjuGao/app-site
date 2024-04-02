
import { defineStore } from 'pinia'
const THEME = 'site-theme'
const PIN = 'site-pin'

const localStorage = window && window.localStorage

const useAppStore = defineStore('app', () => {
	const lang = ref<string>('zh_cn')
	const theme = ref<string>('light')
	const pin = ref<boolean>(localStorage && localStorage.getItem(PIN) ? !!localStorage.getItem(PIN) : false)

	const setLang = (val: string) => {
		lang.value = val
	}
	const setTheme = (val: string) => {
		if (localStorage) {
			localStorage.setItem(THEME, val)
		}
		theme.value = val
	}
	const setPin = (val: boolean) => {
		if (localStorage) {
			localStorage.setItem(PIN, val ? '1' : '0')
		}
		pin.value = val
	}
	return {
		lang,
		setLang,
		theme,
		setTheme,
		pin,
		setPin
	}
})



export default useAppStore