<template>
	<page-header />
	<main class="bg-base-100">
		<slot />
	</main>
	<ClientOnly>
		<scoll-top />
	</ClientOnly>
</template>

<script setup>
import PageHeader from '@/components/page-header.vue'
</script>
