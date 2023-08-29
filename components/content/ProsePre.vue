<template>
	<pre :class="$props.class"><slot /></pre>
</template>

<script setup lang="ts">
defineProps({
	class: {
		type: String,
		default: null
	},
	code: {
		type: String,
		default: ''
	},
	language: {
		type: String,
		default: null
	},
	filename: {
		type: String,
		default: null
	},
	highlights: {
		type: Array as () => number[],
		default: () => []
	},
	meta: {
		type: String,
		default: null
	}
})
</script>

<style lang="postcss"></style>
