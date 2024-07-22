<script setup lang="ts">
import G6 from '@antv/g6'
const props = defineProps({
	height: {
		type: String,
		default: 'h-32'
	},
	container: {
		type: Object,
		default: {}
	},
	data: {
		type: Object,
		default: {}
	}
})
const slots = defineSlots<{
	default(props: any): any
}>()
const chatRef = ref<any>(null)
onMounted(() => {
	nextTick(() => {
		console.log(props)
		const graph = new G6.Graph({
			container: chatRef.value,
			...props.container
		})
		graph && graph.data(props.data)
		graph.render()
	})
})
</script>

<template>
	<div class="p-2 border bg-white dark:bg-black dark:border-gray-700 rounded">
		<div ref="chatRef" :class="`w-full ${height}`"></div>
	</div>
</template>
