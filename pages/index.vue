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
import listItem from "@/components/tools/list-item.vue";
import homeSide from "@/components/home-side.vue";
import { pageMeta } from "@/content/seo/mata";

useSeoMeta(pageMeta.common);
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
