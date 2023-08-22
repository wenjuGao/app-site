
import { defineStore } from 'pinia'
import { langType, AppInfo } from "./type.d"
const THEME = 'site-theme'

const useAppStore = defineStore('app', () => {
	const lang = ref<string>('zh_cn')
	const theme = ref<string>('light')

	const setLang = (val: string) => {
		lang.value = val
	}
	const setTheme = (val: string) => {
		localStorage.setItem(THEME, val)
		theme.value = val
	}
	return {
		lang,
		setLang,
		theme,
		setTheme
	}
})



export default useAppStore