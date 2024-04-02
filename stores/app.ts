
import { defineStore } from 'pinia'
const PIN = 'site-pin'


const localStorage = window && window.localStorage

const useAppStore = defineStore('app', () => {
	const lang = ref<string>('zh_cn')
	const pin = ref<boolean>(localStorage && localStorage.getItem(PIN) ? !!localStorage.getItem(PIN) : false)

	const setLang = (val: string) => {
		lang.value = val
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
		pin,
		setPin
	}
})



export default useAppStore