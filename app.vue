<template>
	<NuxtLayout>
		<NuxtPage class="mx-auto p-4" />
	</NuxtLayout>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const colorMode = useColorMode()
</script>

<style lang="postcss">
body {
	@apply min-h-screen bg-white dark:bg-gray-800 dark:text-gray-200;
}
</style>
