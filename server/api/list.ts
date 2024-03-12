export default defineEventHandler(async (event) => {
	const { page = 1, size = 20 } = await readBody(event)
	// const list = await queryContent('articles')
	// 	.only(['_path', 'banner', 'date', 'description', 'header', 'tags', 'img', 'category', 'title'])
	// 	.sort({ date: -1 })
	// 	.skip((page - 1) * size)
	// 	.limit(size)
	// 	.find()
	// if (list.length) {
	// 	// @ts-ignore
	// 	return bucket.privateDownloadUrl(baseUrl, `${key}-header`, deadline)
	// } else {
	// 	return createError({
	// 		statusCode: 400,
	// 		statusMessage: '图床sdk请求错误❎',
	// 	})
	// }
})
