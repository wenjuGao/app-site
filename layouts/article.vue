<template>
	<page-header />
	<main class="px-2">
		<slot />
	</main>
	<ClientOnly>
		<scoll-top />
	</ClientOnly>
</template>

<script setup>
import PageHeader from '@/components/page-header.vue'
</script>
