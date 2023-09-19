<template>
	<div :class="`bg-neutral-content py-3 my-2 overflow-auto rounded-md ${$props.class}`">
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
pre code .line:before {
	content: attr(line);
	@apply h-5 text-accent-content bg-neutral-content box-content px-2 align-middle w-5 text-center sticky left-0;
}
</style>
