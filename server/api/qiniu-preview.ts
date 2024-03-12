import { bucketManager, baseUrl } from "../utils/index"

export default defineEventHandler(async () => {
	const bucket = bucketManager()
	return new Promise((resolve, reject) => {
		bucket.listPrefix('wenju-site', {
			limit: 10,
			prefix: 'site/'
		}, function (err, respBody, respInfo) {
			if (err || respInfo.statusCode != 200) {
				reject(err)
			} else {
				resolve(respBody)
			}
		})
	}).then((resp: any) => {

		return resp.items.filter((i: { fsize: number }) => i.fsize > 0).map((i: any) => {
			// @ts-ignore
			const deadline = parseInt(Date.now() / 1000) + 300;
			return {
				...i,
				url: bucket.privateDownloadUrl(baseUrl || '', `${i.key}-preview`, deadline)
			}
		})
	}).catch(() => {
		return createError({
			statusCode: 400,
			statusMessage: '图床sdk请求错误❎',
		})
	})
})