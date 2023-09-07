<template>
	<div class="card bg-base-100 shadow-xl">
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
			<div class="flex flex-row justify-between mt-6">
				<div class="count-item">
					<custom-count :count="totalInfo.categories" :custom-class="customClass" />
					<span class="count-item-label">分类</span>
				</div>
				<div class="divider m-0 divider-horizontal"></div>
				<div class="count-item">
					<custom-count :count="totalInfo.tags" :custom-class="customClass" />
					<span class="count-item-label">标签</span>
				</div>
				<div class="divider m-0 divider-horizontal"></div>
				<div class="count-item">
					<custom-count :count="totalInfo.totals" :custom-class="customClass" />
					<span class="count-item-label">文章</span>
				</div>
			</div>
			<template v-if="myInfo.links && myInfo.links.length">
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
const { myInfo } = useAppConfig()
const totalInfo = reactive({
	tags: 0,
	categories: 0,
	totals: 0
})
const categoryMap = new Set(),
	tagSet = new Set()

const result = await queryContent('articles').only(['id', 'category', 'tags']).find()

// 统计 分类及标签数量
totalInfo.totals = result.length
result.forEach((i) => {
	if (i.tags && i.tags.length) {
		i.tags.forEach((child) => tagSet.add(child))
	}
	categoryMap.add(i.category)
})
nextTick(() => {
	totalInfo.tags = tagSet.size
	totalInfo.categories = categoryMap.size
})

// console.log(result)
// Promise.all([
// 	queryContent('articles')
// 		.only(['id'])
// 		.where({ category: { $contains: item.label } })
// 		.find()
// ])
</script>

<style lang="postcss">
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
