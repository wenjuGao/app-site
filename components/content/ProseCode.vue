<template>
	<div :class="`py-3 my-2 overflow-auto rounded-md ${$props.class}`">
		<div>asdasdlasjd</div>
		<code><slot /></code>
	</div>
</template>

<script setup lang="ts">
defineProps({
	class: {
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
