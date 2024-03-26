<template>
	<div class="px-4 xl:w-10/12 m-auto max-w-screen-xl py-5">
		<ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
			<li v-for="(item, index) in list"
				:key="index"
				@click="handleLink(item)">
				<template v-if="index > 0">
					<hr />
				</template>
				<div class="timeline-middle">
					<span class="i-mdi-clock-time-eight-outline"></span>
				</div>
				<div :class="`mb-10 ${index % 2 ? 'md:text-end timeline-start' : 'timeline-end'}`">
					<time class="font-mono italic"
						  v-if="item.date">{{ dayjs(item.date).format('YYYY-MM-DD') }}</time>
					<div class="card w-96 glass bg-base-100 shadow-xl">
						<figure>
							<img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
								 alt="Shoes"
								 class="rounded-xl" />
						</figure>
						<div class="card-body items-center text-left">
							<p>{{ item.title }}</p>
						</div>
					</div>
				</div>
				<hr />
			</li>
		</ul>
	</div>
</template>

<script setup
		lang="ts">
		const dayjs = useDayjs()
		const router = useRouter()
		let list = await queryContent('articles')
			.only(['_path', 'banner', 'date', 'description', 'header', 'tags', 'img', 'category', 'title'])
			.limit(20)
			.sort({ date: -1 })
			.find()
		// // 按照日期分组
		// let mapList = ref<DayMap>({})
		// let opens = ref<any[]>([])
		// list.forEach((i) => {
		// 	const day: string = dayjs(i.date).format('YYYY-MM-DD')
		// 	if (mapList.value[day]) {
		// 		mapList.value[day] = [...mapList.value[day], i]
		// 	} else {
		// 		mapList.value[day] = [i]
		// 		opens.value.push(day)
		// 	}
		// })
		const handleTigger = (day: string | number) => {
			console.log(day)
			// opens.value.includes(day)
			// 	? opens.value.splice(
			// 		opens.value.findIndex((i) => i === day),
			// 		1
			// 	)
			// 	: opens.value.push(day)
		}
		const handleLink = (item: any) => router.push({ path: item._path })
</script>

<style lang="postcss"
	   scoped>
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
