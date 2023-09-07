<template>
	<div :class="`scroll-top ${show ? 'opacity-1' : 'opacity-0'}`" @click="handleTop">
		<img class="w-full" src="/img/top.png" alt="" />
	</div>
</template>
<script setup>
const show = ref(false)

const handleScroll = useDebounce(() => {
	const scrollTop = document.querySelector('html').scrollTop
	show.value = scrollTop > 300
	if (scrollTop > 5) {
		document.querySelector('.page-header').setAttribute('class', 'opacity-header page-header')
	} else {
		document.querySelector('.page-header').setAttribute('class', 'page-header bg-base-300')
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
	@apply fixed bottom-20 right-20 w-16 transition-all items-center justify-center cursor-pointer flex p-2 bg-base-200 rounded-full hover:bg-neutral-content;
}
</style>
