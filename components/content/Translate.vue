<template>
	<figure class="content"
			@click="handleClick">
		<slot />
	</figure>
	<figure class="translate py-1 mb-2 ease-in"
			v-show="show">
		<slot name="translate" />
	</figure>
</template>

<script setup lang="ts">
const show: boolean = ref(false)
const handleClick = () => (show.value = !show.value)
</script>

<style lang="postcss">
.translate {
	border-top: 1px dashed rgb(237, 41, 69);
	opacity: 0.8;
	padding-top: 5px;
}
</style>
