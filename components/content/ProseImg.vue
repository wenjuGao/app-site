<template>
	<ClientOnly fallbackTag="span">
		<template #fallback>
			<div class="skeleton w-full h-full min-h-32"></div>
		</template>
		<div
			:class="`custom-img group-hover:scale-102 flex justify-center duration-300 ease-in-out hover:scale-102 w-full ${props.class}`"
			ref="imgRef"
		>
			<div class="h-full w-full min-h-32" v-if="loading"></div>
			<img class="object-cover w-full rounded" v-else :src="url" :onerror="handleError" />
		</div>
	</ClientOnly>
</template>
<script setup lang="ts">
const imgRef = ref<null | HTMLElement>(null)
const loading = ref(true)
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

const loadImage = (cb: Function) => {
	if (props.src) {
		imgUrl.value = props.src // `/api/img?key=${encodeURIComponent(props.src)}`
	}
	// $fetch('/api/qiniu-file', {
	// 	method: 'post',
	// 	cache: 'no-cache',
	// 	body: {
	// 		key: props.src
	// 	}
	// })
	// 	.then((data) => {
	// 		imgUrl.value = unref(data)
	// 	})
	// 	.catch(() => (error.value = true))
	// 	.finally(() => {
	loading.value = false
	// 		cb()
	// 	})
}

onMounted(() => {
	const ob: any = new IntersectionObserver((entires) => {
		for (const entry of entires) {
			if (entry.isIntersecting) {
				const rect = entry.target.getBoundingClientRect()
				if (rect.top <= window.innerHeight) {
					loadImage(() => ob.unobserve(entry.target))
				}
			}
		}
	})
	nextTick(() => {
		imgRef.value && ob.observe(imgRef.value)
	})
})
</script>
