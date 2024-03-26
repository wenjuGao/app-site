import banner from './data/banner.json'
import list from './data/list.json'

export default defineEventHandler(async (event) => {
	return {
		banner,
		list
	}
})
