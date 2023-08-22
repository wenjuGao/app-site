<script setup lang="ts">
const { data } = await useAsyncData('page-data', () => queryContent('/about').findOne())
</script>

<template>
	<main>
		<ContentRenderer :value="data">
			<h1>{{ data.title }}</h1>
			<ContentRendererMarkdown :value="data" />
			<template #empty>
				<p>No content found.</p>
			</template>
		</ContentRenderer>
	</main>
</template>
