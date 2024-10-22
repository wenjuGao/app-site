<template>
	<ul class="w-full box-border">
		<li v-for="(item, key) in props.list" :key="key + item.id">
			<a :href="`#${item.id}`" :data-value="item.id" @click="handleLink(item.id)" :class="`toc-item ${item.depth <= 2 ? 'font-semibold' : ''}`">
				{{ item.text }}
			</a>
			<template v-if="item.children && item.children.length">
				<toc-menu :list="item.children" :style="`width:calc(100% - 20px);`" />
			</template>
		</li>
	</ul>
</template>

<script setup lang="ts">
import tocMenu from '@/components/tools/toc-menu.vue'
import { setToc } from '@/utils/screen'
type PropsType = {
	list: any[]
}

const props: PropsType = defineProps({
	list: {
		type: Array,
		default: function () {
			return []
		}
	}
})
const handleLink = (id: string | number) => {
	setToc(id)
}
</script>

<style lang="postcss" scoped>
.toc-item {
	@apply cursor-pointer block w-full  truncate;
}
</style>
