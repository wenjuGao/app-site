<template>
	<div :class="`countdown ${props.customClass}`">
		<template v-if="props.count && +props.count > 99">
			99+
		</template>
		<span v-else :style="`--value:${props.count || 0};`"></span>
	</div>
</template>
<script setup lang="ts">
const props = defineProps({
	count: {
		type: Number,
		default: 0
	},
	customClass: {
		type: String,
		default: ''
	}
})
</script>
