<template>
	<div class="loading">
		<slot name="image">
			<span class="loading loading-ring loading-lg"></span>
		</slot>
		<div class="loading-text">{{ props.loadingText }}</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	loadingText: {
		type: String,
		default: '加载中...'
	}
})

</script>