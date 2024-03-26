<template>
	<NuxtLayout>
		<div class="px-4 xl:w-10/12 m-auto max-w-screen-xl">
			<page-banner />
			<div class="flex flex-row">
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

<script setup
		lang="ts">
		import listItem from '@/components/tools/list-item.vue'
		// import homeSide from '@/components/home-side.vue'
</script>

<style lang="postcss"
	   scoped>
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
