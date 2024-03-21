<template>
	<client-only>
		<div class="skeleton w-full min-h-32" v-if="loading"></div>
		<img :class="props.class" v-else :src="url" :onerror="handleError" />
	</client-only>
</template>
<script setup lang="ts">
const loading = ref(false)
const error = ref(false)
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
const url = computed(() => (error.value ? '/img/img-error.svg' : imgUrl.value))
const imgUrl = ref()
const handleError = () => {
	error.value = true
}
onMounted(() => {
	loading.value = true
	$fetch('/api/qiniu-file', {
		method: 'post',
		cache: 'no-cache',
		body: {
			key: props.src
		}
	})
		.then((data) => {
			imgUrl.value = unref(data)
		})
		.finally(() => (loading.value = false))
})
</script>
