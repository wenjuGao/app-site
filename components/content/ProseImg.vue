<template>
	<img :src="imgUrl || imgHold" :key="props.src" :class="props.class" :alt="props.alt" />
</template>
<script setup lang="ts">
const { imgHold } = useAppConfig()
const props = defineProps({
	src: {
		type: String,
		default: function () {
			return ''
		}
	},
	class: {
		type: String,
		default: function () {
			return ''
		}
	},
	alt: {
		type: String,
		default: function () {
			return ''
		}
	}
})
const imgUrl = ref()
onMounted(() => {
	$fetch('/api/qiniu-file', {
		method: 'post',
		cache: 'no-cache',
		body: {
			key: props.src
		}
	}).then((data) => (imgUrl.value = unref(data)))
})
</script>
