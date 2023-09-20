<template>
	<div class="flex justify-center lg:px-6 py-4 px-2 lg:overflow-visible lg:px-0">
		<ul class="img-box flex-wrap flex justify-start">
			<li class="rounded mb-2.5 overflow-hidden relative cursor-pointer group hover:shadow-xl"
				v-for="img in images"
				:key="img.key">
				<img class="w-24"
					 :src="img.url" />
				<div @click="handleView(img)"
					 class="hidden group-hover:flex top-0 left-0 right-0 bottom-0 absolute view-box items-center justify-center">
					<span class="i-mdi-eye-outline text-xl text-white"></span>
				</div>
			</li>
		</ul>
		<dialog :class="`modal bg-transparent ${open ? 'modal-open' : 'modal-close'}`">
			<div class="img-modal w-screen flex justify-center">
				<div class="close"
					 @click="handleClose">
					<span class="i-mdi-window-close  text-xl text-white"></span>
				</div>
				<img :src="scopeInfo.url"
					 ref="imgRef"
					 class="w-6/12"
					 v-if="scopeInfo.url"
					 :alt="scopeInfo.key">
			</div>
		</dialog>
	</div>
</template>
<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
const scopeInfo = ref<any>({})
const imgRef = ref(null)
const open = ref(false)
const images = ref<any[]>([])
const pages = reactive({
	size: 100,
	current: 1,
	total: 1
})
const init = async () => {
	const { data } = await useFetch('/api/qiniu-preview', { method: 'post', body: { size: pages.size, current: pages.current } })
	images.value = data.value || []
}


init();

const handleView = async (item: any) => {
	const { data } = await useFetch(`/api/qiniu-file`, {
		method: 'post', body: {
			key: item.key
		}
	})
	open.value = true
	scopeInfo.value = {
		...item,
	}
	if (data) {
		scopeInfo.value.url = data
	}
	
	
}
const handleClose = () => {
	open.value = false
}

onClickOutside(imgRef, () => {
	open.value = false
	scopeInfo.value = {}
	// @ts-ignore
	imgRef.value?.blur()
})
</script>

<style lang="postcss">
.img-box {
	column-gap: 10px;
	counter-reset: count;

	li,
	ul {
		padding: 0;
		/* margin: 0; */
		list-style: none;
	}

	img {
		height: auto;
		vertical-align: middle;
	}

	.view-box {
		background-color: rgba(0, 0, 0, .5);

	}
}
.img-modal {
	img {
		max-height: 80vh;
		vertical-align: middle;
	}
}
.close {
	@apply absolute right-12 w-10 h-10 rounded-full bg-base-300 hover:bg-base-200 flex justify-center items-center cursor-pointer;
}
</style>
