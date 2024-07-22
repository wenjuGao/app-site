<template>
	<NuxtLayout>
		<div class="container m-auto py-5">
			<ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
				<li v-for="(item, index) in list" :key="index" @click="handleLink(item)">
					<template v-if="index > 0">
						<hr />
					</template>
					<div class="timeline-middle">
						<span class="i-mdi-clock-time-eight-outline"></span>
					</div>
					<div :class="`mb-10 ${index % 2 ? 'md:text-end timeline-start' : 'timeline-end'}`">
						<time class="font-mono italic" v-if="item.date">{{ dayjs(item.date).format('YYYY-MM-DD') }}</time>
						<div class="card w-96 glass group cursor-pointer card-side bg-base-100 shadow hover:shadow-xl">
							<figure class="w-40">
								<ProseImg :src="item.header" class="md:h-60 max-h-32 w-40 object-cover" :alt="item.title" />
							</figure>
							<article class="flex-1 p-2 text-left">
								<h2 class="text-lg font-semibold line-clamp-1">
									{{ item.title }}
								</h2>
								<p class="line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
									{{ item.description }}
								</p>
							</article>
						</div>
					</div>
					<hr />
				</li>
			</ul>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import ProseImg from '@/components/content/ProseImg.vue'
const dayjs = useDayjs()
const router = useRouter()
let list = await queryContent('articles')
	.only(['_path', 'banner', 'date', 'description', 'header', 'tags', 'img', 'category', 'title'])
	.limit(20)
	.sort({ date: -1 })
	.find()
useSeoMeta({
	title: '小书童-归档',
	ogTitle: '小书童-归档',
	description: '文章归档，面试,codeing,javascript,Vue,React',
	ogDescription: '文章归档，面试,自由工作,codeing,javascript,Vue,React',
	ogImage: 'https://site.gaowenju.com/img/logo.png',
	twitterCard: 'summary_large_image'
})
const handleLink = (item: any) => router.push({ path: item._path })
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
