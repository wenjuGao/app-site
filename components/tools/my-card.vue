<template>
	<div class="card my-card bg-base-100 overflow-hidden shadow-2xl rounded-2xl">
		<svg class="absolute w-0 h-0">
			<clipPath id="my-clip-path" clipPathUnits="objectBoundingBox" stroke="white" stroke-width="2">
				<path
					d="M0.001,0.031 C0.001,0.014,0.026,0.001,0.055,0.001 H0.492 C0.506,0.001,0.52,0.004,0.53,0.009 L0.61,0.052 C0.62,0.057,0.634,0.06,0.649,0.06 H0.947 C0.977,0.06,1,0.074,1,0.091 V0.971 C1,0.987,0.977,1,0.947,1 H0.055 C0.026,1,0.001,0.987,0.001,0.971 V0.031"
				></path>
			</clipPath>
		</svg>
		<figure>
			<img :src="myInfo.bgImg" class="h-40 object-cover w-full" />
		</figure>
		<div class="card-body card-message">
			<div class="avatar">
				<div class="w-24 m-auto rounded-full">
					<img lass="mask mask-decagon" :src="myInfo.avatar" />
				</div>
			</div>

			<h2 class="card-title text-lg justify-center mt-3">
				{{ myInfo.name }}
			</h2>
			<p class="break-all mt-3 chat-footer opacity-50">{{ myInfo.desc }}</p>
			<div class="flex flex-row justify-between mt-6"></div>
			<template v-if="myInfo && myInfo.links && myInfo.links.length">
				<div class="divider m-0"></div>
				<div class="flex flex-row justify-between mt-3">
					<a
						v-for="(item, index) in myInfo.links"
						:title="item.label"
						:key="index"
						:href="item.link"
						target="_blank"
						class="w-7 h-7"
						rel="noopener noreferrer"
					>
						<img :src="item.img" :alt="item.label" class="object-cover w-7 h-7" />
					</a>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup>
import CustomCount from './custom-count.vue'
const customClass = 'text-xl font-mono'
// const artTotal = await queryContent('articles').count()
// const interTotal = await queryContent('interviewer').count()
// const leetTotal = await queryContent('leetcode').count()
// const timeTotal = await queryContent('time-line').count()
const { myInfo } = useAppConfig()
const totalInfo = reactive({
	tags: 0,
	categories: 0,
	totals: 0
})
const categoryMap = new Set(),
	tagSet = new Set()

// const result = await queryContent('articles').only(['id', 'category', 'tags']).find()

// 统计 分类及标签数量
// totalInfo.totals = result.length
// result.forEach((i) => {
// 	const tags = Array.isArray(i.tags) ? i.tags : []
// 	if (tags && tags.length) {
// 		tags.forEach((child) => tagSet.add(child))
// 	}
// 	categoryMap.add(i.category)
// })
// nextTick(() => {
// 	totalInfo.tags = tagSet.size
// 	totalInfo.categories = categoryMap.size
// })

// console.log(result)
// Promise.all([
// 	queryContent('articles')
// 		.only(['id'])
// 		.where({ category: { $contains: item.label } })
// 		.find()
// ])
</script>

<style lang="postcss">
.my-card {
	clip-path: url(#my-clip-path);
}
.card-message {
	@apply relative p-5;
	.avatar {
		@apply absolute -top-20 left-0 right-0 z-10;
	}
	.count-item {
		@apply flex flex-col items-center justify-center;
		.count-item-label {
			@apply inline-block chat-footer opacity-50;
		}
	}
}
.card-message::before {
	content: '';
	@apply absolute -top-20 left-0 right-0 z-10 w-full h-20;
	background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), hsl(var(--b1) / var(--tw-bg-opacity)));
}
</style>
