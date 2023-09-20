<template>
	<div class="px-4 xl:w-10/12 m-auto max-w-screen-xl py-5">
		<ClientOnly fallback-tag="span" fallback="Loading comments...">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<tags-chart />
				<category-chart />
			</div>
		</ClientOnly>
		<div class="item mt-3" v-for="(item, index) in mapList" :key="index">
			<div :class="`collapse rounded-none pl-8  collapse-arrow ${opens.includes(index) ? 'collapse-open' : ''}`">
				<div class="collapse-title rounded bg-base-200" @click="handleTigger(index)">
					{{ index }}
				</div>
				<div class="collapse-content">
					<p v-for="child in item" class="py-2" :key="child._path">
						<a class="link link-hover block truncate break-all" :href="child._path">
							<span class="i-mdi-link-variant"></span>
							{{ child.title }}
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import tagsChart from '@/components/tools/tags-chart.vue'
import categoryChart from '@/components/tools/category-chart.vue'
interface DayMap {
	[day: string]: any[]
}
const dayjs = useDayjs()
let list = await queryContent('articles')
	.only(['_path', 'banner', 'date', 'description', 'header', 'tags', 'img', 'category', 'title'])
	.limit(20)
	.sort({ date: -1 })
	.find()
// 按照日期分组
let mapList = ref<DayMap>({})
let opens = ref<any[]>([])
list.forEach((i) => {
	const day: string = dayjs(i.date).format('YYYY-MM-DD')
	if (mapList.value[day]) {
		mapList.value[day] = [...mapList.value[day], i]
	} else {
		mapList.value[day] = [i]
		opens.value.push(day)
	}
})
const handleTigger = (day: string | number) => {
	opens.value.includes(day)
		? opens.value.splice(
				opens.value.findIndex((i) => i === day),
				1
		  )
		: opens.value.push(day)
}
</script>

<style lang="postcss" scoped>
.item {
	position: relative;

	.collapse-title {
		position: relative;
		padding: 10px;
		min-height: fit-content;
		margin-bottom: 20px;
		/* width: calc(100% - 40px); */
	}

	.collapse-content {
		width: calc(100% - 30px);
	}

	.collapse-title::before {
		content: '';
		position: absolute;
		top: 50%;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
		left: -8px;
		width: 0;
		height: 0;
		border-right: 8px solid hsl(var(--b2));
		border-top: 8px solid transparent;
		border-bottom: 8px solid transparent;
	}
}

.item::after {
	position: absolute;
	content: '';
	top: 14px;
	width: 13px;
	height: 13px;
	border-radius: 50%;
	@apply bg-base-200;
}

.item::before {
	position: absolute;
	content: '';
	left: 6px;
	top: 22px;
	width: 1px;
	height: 100%;
	@apply bg-base-200;
}
</style>
