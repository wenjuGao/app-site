<template>
	<div id="tcomment"></div>
</template>
<script setup>
onMounted(() => {
	nextTick(() => {
		twikoo
			.init({
				// envId: 'https://appsite-twikoo.vercel.app', // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
				envId: 'https://sitetwikoo.gaowenju.com', // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
				el: '#tcomment', // 容器元素
				// region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
				path: location.pathname, // 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
				lang: 'zh-CN', // 用于手动设定评论区语言，支持的语言列表 https://github.com/imaegoo/twikoo/blob/main/src/client/utils/i18n/index.js
				katex: {
					delimiters: [
						{ left: '$$', right: '$$', display: true },
						{ left: '$', right: '$', display: false },
						{ left: '\\(', right: '\\)', display: false },
						{ left: '\\[', right: '\\]', display: true }
					],
					throwOnError: false
				},
				onCommentLoaded: function () {
					console.log('评论加载完成')
				}
			})
			.then(function () {
				console.log('Twikoo 加载完成')
			})
			.catch(console.log)
	})
})
</script>
