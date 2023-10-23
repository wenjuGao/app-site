<template>
	<div class="empty">
		<slot name="image">
			<img class="w-28 h-28"
				 src="https://qiniu.gaowenju.com/app-site/empty.png" />
		</slot>
		<div class="mt-8  gray-400 text-sm">{{ props.emptyText }}</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	emptyText: {
		type: String,
		default: 'woos! 未查询到你要查看的内容'
	}
})
</script>

<style lang="postcss">
.empty {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	@apply mt-20;
}
</style>