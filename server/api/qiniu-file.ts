import qiniu from "qiniu"
const baseUrl = 'https://qiniusite.gaowenju.com'

export default defineEventHandler(async (event) => {
	const { key = '' } = getQuery(event)
	const accessKey = process.env.NUXT_QINIU_ACCESS_KEY
	const secretKey = process.env.NUXT_QINIU_SECRET_KEY
	const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
	const config = new qiniu.conf.Config()
	//config.useHttpsDomain = true;
	// @ts-ignore
	config.zone = qiniu.zone.Zone_z2
	const bucketManager = new qiniu.rs.BucketManager(mac, config)
	// @ts-ignore
	const deadline = parseInt(Date.now() / 1000) + 300;
	if (key) {
		// @ts-ignore
		return bucketManager.privateDownloadUrl(baseUrl, `${decodeURIComponent(key)}-watermark`, deadline)
	} else {
		return createError({
			statusCode: 400,
			statusMessage: '图床sdk请求错误❎',
		})
	}
})