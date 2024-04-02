<template>
	<page-header />
	<main class="bg-base-100 px-4 md:px-0 default-main">
		<slot />
	</main>
	<ClientOnly>
		<scoll-top />
	</ClientOnly>
	<page-footer />
</template>

<script setup>
import PageFooter from '@/components/page-footer.vue'
import PageHeader from '@/components/page-header.vue'
</script>
<style lang="postcss"
	   scoped>
	.default-main {
		min-height: calc(100vh - 200px);
	}
</style>
