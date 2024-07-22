<script setup lang="ts">
import * as echarts from 'echarts'
const props = defineProps({
	height: {
		type: String,
		default: 'h-32'
	},
	option: {
		type: Object,
		default: {}
	}
})
const chatRef = ref<any>(null)
onMounted(() => {
	nextTick(() => {
		const chartView = echarts.init(chatRef.value)
		chartView && chartView.setOption(props.option)
	})
})
</script>

<template>
	<div class="p-2 border bg-white dark:bg-black dark:border-gray-700 rounded">
		<div ref="chatRef" :class="`w-full ${height}`"></div>
	</div>
</template>
