import qiniu from "qiniu"

export const baseUrl = process.env.NUXT_QINIU_BASE_URL

export const bucketManager = () => {
	const accessKey = process.env.NUXT_QINIU_ACCESS_KEY
	const secretKey = process.env.NUXT_QINIU_SECRET_KEY
	const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
	const config: any = new qiniu.conf.Config()
	config.zone = qiniu.zone.Zone_z0
	return new qiniu.rs.BucketManager(mac, config)
}

export const fileLink = (key: string) => {
	const accessKey = process.env.NUXT_QINIU_ACCESS_KEY || ''
	const secretKey = process.env.NUXT_QINIU_SECRET_KEY || ''
	qiniu.conf.ACCESS_KEY = accessKey;
	qiniu.conf.SECRET_KEY = secretKey;
	// @ts-ignore
	const policy = new qiniu.rs.GetPolicy();
	return policy.makeRequest(`${baseUrl}${key}`);
}