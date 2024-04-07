<template>
	<NuxtLayout>
		<div class="container pb-24 m-auto">
			<article class="prose w-full max-w-full py-10">
				<h1>Codeing 实验室</h1>
				<p>
					一些Idea，样式或者逻辑或者效果的最小实现，也包含整理遇到的有意思的Idea。当然也可以基于某个Idea实现个人商业项目，也期待小伙伴的加入一起快乐coding。
				</p>
			</article>
			<div class="py-10">
				<div class="grid md:grid-cols-4 sm:grid-cols-2 sm:gap-2 md:gap-4 gap-3  grid-cols-1">
					<div v-for="item in list"
						 :key="item.url"
						 @click="handleLink(item)"
						 className="bg-secondary-content cursor-pointer rounded w-full shadow-xl">
						<ProseImg :src="item.img"
								  :class="`h-48 w-full object-cover rounded`"
								  :alt="item.label" />
						<div className="card-body py-2 px-2">
							<div class="my-2">
								<p className="text-lg font-medium">{{ item.label }}</p>
							</div>
							<p className="text-sm font-thin">{{ item.description }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>
<script setup lang="ts">
const router = useRouter()

const list = [
	{
		label: "时钟",
		url: "clock",
		img: "laboratory/clock.jpg",
		description: "时钟时钟时钟时钟时钟时钟时钟",
	},
	{
		label: "房贷计算器",
		url: "interest-rate",
		img: "laboratory/interest-rate.jpg",
		description: "房贷计算器房贷计算器房贷计算器房贷计算器房贷计算器房贷计算器"
	},
	{
		label: "图片转base64",
		url: "img-to-base64",
		img: "laboratory/img-base.jpg",
		description: "图片转base64图片转base64图片转base64图片转base64图片转base64"
	},
	{
		label: "base64加解密",
		url: "base64",
		img: "laboratory/base64.jpg",
		description: "base64加解密base64加解密base64加解密base64加解密"
	},
	{
		label: "JSON格式化",
		url: "json",
		img: "laboratory/json.jpg",
		description: "JSON格式化JSON格式化JSON格式化"
	},
	{
		label: "转码解码",
		url: "encode-decode",
		img: "laboratory/decode.jpg",
		description: "转码解码转码解码转码解码"
	}
]

const handleLink = (item: any) => {
	router.push(`/laboratory/${item.url}`)
}

useSeoMeta({
	title: 'Codeing 实验室',
	ogTitle: 'Codeing 实验室',
	description: '前端开发,全职开发,自由工作,codeing,javascript,Vue,React',
	ogDescription: '前端开发,全职开发,自由工作,codeing,javascript,Vue,React',
	ogImage: 'https://site.gaowenju.com/img/logo.png',
	twitterCard: 'summary_large_image',
})
</script>

<style lang="postcss">
.img-box {
	column-gap: 10px;
	counter-reset: count;

	li,
	ul {
		padding: 0;
		/* margin: 0; */
		list-style: none;
	}

	img {
		height: auto;
		vertical-align: middle;
	}

	.view-box {
		background-color: rgba(0, 0, 0, .5);

	}
}

.img-modal {
	img {
		max-height: 80vh;
		vertical-align: middle;
	}
}

.close {
	@apply absolute right-12 w-10 h-10 rounded-full bg-base-300 hover:bg-base-200 flex justify-center items-center cursor-pointer;
}
</style>
