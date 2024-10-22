<template>
	<section class="p-1 ease-out">
		<div class="content" @click="handleClick">
			<slot />
		</div>
		<div class="translate ease-in" v-show="show">
			<slot name="translate" />
		</div>
	</section>
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
