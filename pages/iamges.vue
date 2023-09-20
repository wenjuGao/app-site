<template>
	<div>
		<div class="avatar">
			<div class="w-24 rounded" v-for="img in images" :key="img.key">
				<img :src="img.url" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
const images = ref<any[]>([])
const pages = reactive({
	size: 10,
	current: 1,
	total: 1
})
const init = async () => {
	const { data } = await useFetch('/api/qiniu', { method: 'post', body: { size: pages.size, current: pages.current } })
	images.value = data.value || []
}
init()
</script>
