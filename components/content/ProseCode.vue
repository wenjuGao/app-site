<template>
	<div :class="`py-3 my-2 overflow-auto rounded-md ${$props.class}`">
		<code><slot /></code>
	</div>
</template>

<script setup lang="ts">
defineProps({
	language: {
		type: String,
		default: null
	},
	class: {
		type: String,
		default: null
	},
	code: {
		type: String,
		default: null
	},
	value: {
		type: String,
		default: null
	}
})
</script>
<style lang="postcss">
pre code {
	@apply p-1;
}
</style>
