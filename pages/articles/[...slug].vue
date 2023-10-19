<template>
	<div class="articles-box">
		<Suspense>
			<ClientOnly fallback-tag="span"
						fallback="Loading comments...">
				<articles-page />
			</ClientOnly>
		</Suspense>
	</div>
</template>

<script setup lang="ts">
import articlesPage from '@/components/articles-page.vue'
</script>

<style lang="postcss" scoped></style>