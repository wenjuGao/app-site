<template>
	<page-header />
	<main class="bg-base-100">
		<slot />
	</main>
	<page-footer />
</template>

<script setup>
import PageFooter from '@/components/page-footer.vue'
import PageHeader from '@/components/page-header.vue'
</script>
