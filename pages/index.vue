<template>
	<div class="px-4 xl:w-10/12 m-auto max-w-screen-xl">
		<page-banner />
		<div class="divider"></div>
		<div class="flex flex-row">
			<div class="flex-1 pb-20">
				<page-category />
				<div class="divider"></div>
				<!-- <div class="grid lg:grid-cols-3 pb-20 xl:grid-cols-3 2xl:grid-cols-3 gap-4 md:grid-cols-2"> -->
				<list-item :list="list" />
				<!-- </div> -->
			</div>
			<div class="h-fit hidden md:block w-72 pl-4">
				<home-side />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import pageBanner from './../components/page-banner.vue'
import pageCategory from './../components/page-category.vue'
import listItem from './../components/tools/list-item.vue'
import homeSide from './../components/home-side.vue'
let list = await queryContent()
	.only(['_path', 'banner', 'date', 'description', 'header', 'tags', 'img', 'category', 'title'])
	.limit(20)
	.sort({ date: -1 })
	.find()
</script>

<style lang="postcss" scoped>
.badge {
	@apply inline-block bg-gray-200 dark:bg-gray-950 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-400;

	.badge:hover {
		@apply bg-gray-300;
	}
}
</style>
