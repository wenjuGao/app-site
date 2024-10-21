<template>
	<NuxtLayout>
		<div class="container pb-24 m-auto">
			<page-banner />
			<div class="flex mt-5 flex-row">
				<div class="flex-1 pb-20">
					<list-item />
				</div>
				<div class="right-side h-fit hidden md:block w-72 pl-4">
					<home-side />
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import listItem from '@/components/tools/list-item.vue'
import homeSide from '@/components/home-side.vue'

useSeoMeta({
	title: '小书童',
	ogTitle: '小书童',
	description: '前端开发,全职开发,自由工作,codeing,javascript,Vue,React',
	ogDescription: '前端开发,全职开发,自由工作,codeing,javascript,Vue,React',
	ogImage: '/img/logo.png',
	twitterCard: 'summary_large_image'
})
</script>

<style lang="postcss" scoped>
.badge {
	@apply inline-block bg-gray-200 dark:bg-gray-950 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-400;

	.badge:hover {
		@apply bg-gray-300;
	}
}

.right-side {
	position: sticky;
	top: 70px;
}
</style>
