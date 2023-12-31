<template>
	<Suspense>
		<ContentRenderer :key="doc._id"
						 :value.sync="doc">
			<template #empty>
				<empty-card />
			</template>
			<main class="px-4 w-full pb-24">
				<article class="relative isolate flex justify-center lg:px-6 pt-10 lg:overflow-visible lg:px-0">
					<div class="grow max-w-4xl w-full pr-4 lg:pr-10 overflow-auto box-content">
						<h1 class="mt-2 text-3xl font-bold tracking-tight break-all sm:text-4xl">{{ doc.title }}</h1>
						<img v-if="doc.header"
							 class="mt-6 h-72 object-contain max-w-full m-auto rounded-xl shadow-xl ring-1 ring-gray-400/10"
							 :src="doc.header"
							 :alt="doc.title" />
						<p v-if="doc.description"
						   v-html="doc.description.replace(/\\n/g, '<br/>')"
						   class="mt-6 text-md rounded-xl indent-8 text-accent-conten break-all text-left bg-base-200 p-2 leading-8">
						</p>
						<div class="article-content mt-6 mb-6 text-accent-content article leading-7 break-all">
							<ContentRendererMarkdown :value="doc" />
						</div>
						<div class="divider"></div>
						<div class="justify-between flex sm:flex-wrap"
							 v-if="prev || next">
							<div v-if="prev"
								 @click="handleClick(prev._path)"
								 class="cursor-pointer link-page dark:bg-slate-800 dark:highlight-white/5 mr-auto">
								<img class="absolute -left-6 w-28 h-28 rounded-full shadow-lg"
									 :src="prev.header" />
								<div class="min-w-0 py-5 pl-28 pr-5">
									<div
										 class="text-slate-900 font-medium text-sm sm:text-base truncate dark:text-slate-200">
										上一篇</div>
									<div
										 class="text-slate-500 font-medium text-sm sm:text-base leading-tight truncate dark:text-slate-400">
										{{ prev.title }}
									</div>
								</div>
							</div>
							<div v-if="next"
								 @click="handleClick(next._path)"
								 class="cursor-pointer link-page dark:bg-slate-800 dark:highlight-white/5 ml-auto">
								<img class="absolute -left-6 w-28 h-28 rounded-full shadow-lg"
									 :src="next.header" />
								<div class="min-w-0 py-5 pl-28 pr-5">
									<div
										 class="text-slate-900 font-medium text-sm sm:text-base truncate dark:text-slate-200">
										下一篇</div>
									<div
										 class="text-slate-500 font-medium text-sm sm:text-base leading-tight truncate dark:text-slate-400">
										{{ next.title }}
									</div>
								</div>
							</div>
						</div>
						<div class="mt-20">
							<twikoo-comment />
						</div>
					</div>
					<div class="toc menu">
						<toc-menu :list="toc ? toc.links : []" />
					</div>
				</article>
			</main>
		</ContentRenderer>
		<template #fallback>
			<loading-card />
		</template>
	</Suspense>
</template>
<script setup lang="ts">
import twikooComment from '@/components/twikoo-comment.vue'
import tocMenu from '@/components/tools/toc-menu.vue'
import emptyCard from '@/components/tools/empty-card.vue'
import loadingCard from '@/components/tools/loading-card.vue'
const route = useRoute()
const doc: any = ref({})
import { handleLink } from "@/utils/util"
definePageMeta({
	layout: 'article'
})
const result = await queryContent('articles').where({
	'_path': route.path
}).findOne()
if (Array.isArray(result)) {
	doc.value = result.find(i => i._path === route.path)
} else {
	doc.value = result
}
const { next, prev, toc } = useContent()
const handleClick = (url: string) => handleLink(url, useRouter());
</script>

<style lang="postcss">
.article h1,
.article h2,
.article h3,
.article h4,
.article h5,
.article h6 {
	line-height: 1.5;
	@apply text-neutral mx-1 pb-2;
}

.article h1 {
	@apply text-2xl my-2 font-bold mt-6;
}

.article h2 {
	@apply text-xl my-1 border-b-2 border-amber-400 font-bold mt-4;
}

.article h3 {
	@apply text-lg my-0.5 font-semibold;
}

.article h4 {
	@apply text-base my-0.5 font-medium;
}

.article h5,
.article h6 {
	@apply text-base my-0.5;
}

.article p {
	@apply mb-2;
}

.article img {
	@apply max-w-full;
}

.toc {
	@apply lg:sticky flex-none h-fit lg:top-32 menu bg-base-200 w-56 rounded-box lg:overflow-hidden md:block hidden;
}

.link-page {
	@apply mt-6 overflow-hidden w-full md:w-2/5 relative bg-white shadow-lg ring-1 ring-black/5 rounded-xl flex items-center gap-6;
}

.article ol,
.article ul {
	@apply my-2 list-decimal pl-10 pr-8 rounded py-4 bg-base-200;
}

.article li::marker {
	color: hsl(var(--af));
}
</style>
