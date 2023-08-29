<template>
	<div class="px-4 xl:mx-auto max-w-7xl">
		<page-banner />
		<page-category />
		<div class="divider"></div>
		<home-list />
	</div>
</template>

<script setup lang="ts">
import pageBanner from './../components/page-banner.vue'
import pageCategory from './../components/page-category.vue'
import homeList from './../components/home-list.vue'
</script>

<style lang="postcss" scoped>
.badge {
	@apply inline-block bg-gray-200 dark:bg-gray-950 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-400;
	&:hover {
		@apply bg-gray-300;
	}
}
</style>
