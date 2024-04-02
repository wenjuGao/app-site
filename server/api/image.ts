import { bucketManager, baseUrl } from "../utils/index"

export default defineEventHandler(async (event) => {
	const { key = '' } = await readBody(event)
	const bucket = bucketManager()
	// @ts-ignore
	const deadline = parseInt(Date.now() / 1000) + 300;
	if (key) {
		// @ts-ignore
		return bucket.privateDownloadUrl(baseUrl, `${key}-header`, deadline)
	} else {
		return createError({
			statusCode: 400,
			statusMessage: '图床sdk请求错误❎',
		})
	}
})