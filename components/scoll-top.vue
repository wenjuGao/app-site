<template>
	<div :class="`scroll-top ${show ? 'block' : 'hidden'}`" @click="handleTop">
		<img class="w-9 hover:scale-125 ease-in-out duration-300 delay-150" src="/img/top.png" alt="" />
	</div>
</template>
<script setup>
import { tocActive } from '@/utils/screen'
const show = ref(false)
const { toc } = useContent()

const handleScroll = useDebounce(() => {
	const scrollTop = document.querySelector('html').scrollTop

	// back top
	show.value = scrollTop > 300

	// page header style
	if (scrollTop > 5) {
		document.querySelector('.page-header').setAttribute('class', 'opacity-header page-header')
	} else {
		document.querySelector('.page-header').setAttribute('class', 'page-header bg-base-300')
	}
	// toc style
	if (document.querySelector('.toc') && toc.value && toc.value.links && toc.value.links.length) {
		tocActive(scrollTop)
	}
}, 100)
const handleTop = () => {
	document.querySelector('html').scrollTop = 0
}

onMounted(() => {
	nextTick(() => {
		document.addEventListener('scroll', handleScroll, true)
	})
})

onUnmounted(() => {
	document.removeEventListener('scroll', handleScroll, true)
})
</script>

<style lang="postcss" scoped>
.scroll-top {
	@apply fixed bottom-20 right-20 w-16 h-16 transition-all items-center justify-center cursor-pointer flex bg-base-200 rounded-full hover:bg-neutral-content;
}
</style>
