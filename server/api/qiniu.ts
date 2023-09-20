import qiniu from "qiniu"
const baseUrl = 'https://qiniusite.gaowenju.com'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const accessKey = process.env.NUXT_QINIU_ACCESS_KEY
	const secretKey = process.env.NUXT_QINIU_SECRET_KEY
	const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
	const config = new qiniu.conf.Config()
	//config.useHttpsDomain = true;
	// @ts-ignore
	config.zone = qiniu.zone.Zone_z2
	const bucketManager = new qiniu.rs.BucketManager(mac, config)
	// @param options 列举操作的可选参数
	//                prefix    列举的文件前缀
	//                marker    上一次列举返回的位置标记，作为本次列举的起点信息
	//                limit     每次返回的最大列举文件数量
	//                delimiter 指定目录分隔符
	return new Promise((resolve, reject) => {
		bucketManager.listPrefix('wenju-site', {
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
				url: bucketManager.privateDownloadUrl(baseUrl, i.key, deadline)
			}
		})
	}).catch(() => {
		return createError({
			statusCode: 400,
			statusMessage: '图床sdk请求错误❎',
		})
	})
})