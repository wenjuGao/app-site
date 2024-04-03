import qiniu from "qiniu"
const baseUrl = process.env.NUXT_QINIU_BASE_URL || ''
const accessKey = process.env.NUXT_QINIU_ACCESS_KEY
const secretKey = process.env.NUXT_QINIU_SECRET_KEY
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const config: any = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z0
const bucket = new qiniu.rs.BucketManager(mac, config)

export default function handler(req, res) {

	// Echo back request as response
	return {
		req,
		res,
	}
	// // @ts-ignore
	// const deadline = parseInt(Date.now() / 1000) + 3600;
	// const file = /jpg|jpeg|png/.test(key) && !/watermark/.test(key) ? `${key}-watermark` : key
	// if (file && file !== undefined) {
	// 	return {
	// 		file,
	// 		qiniuUrl: bucket.privateDownloadUrl(baseUrl, file, deadline),
	// 		query,
	// 		key
	// 	}
	// } else {
	// 	return createError({
	// 		statusCode: 400,
	// 		statusMessage: '图床sdk请求错误❎',
	// 	})
	// }
})