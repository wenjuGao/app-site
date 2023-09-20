<template>
	<ContentDoc v-slot="{ doc }">
		<main class="px-4 w-full pb-24">
			<article class="relative isolate flex justify-center lg:px-6 pt-10 lg:overflow-visible lg:px-0">
				<div class="grow max-w-4xl w-full pr-4 lg:pr-10 overflow-auto box-content">
					<h1 class="mt-2 text-3xl font-bold tracking-tight break-all sm:text-4xl">{{ doc.title }}</h1>
					<img
						v-if="doc.header"
						class="mt-6 h-72 object-contain max-w-full m-auto rounded-xl shadow-xl ring-1 ring-gray-400/10"
						:src="doc.header"
						:alt="doc.title"
					/>
					<p v-if="doc.description" class="mt-6 text-md rounded-xl text-accent-conten break-all text-left bg-base-200 p-2 leading-8">
						{{ doc.description }}
					</p>
					<div class="article-content mt-6 mb-6 text-accent-content article leading-7 break-all">
						<ContentRenderer :key="page._id" :value="page" />
					</div>
					<div class="divider"></div>
					<div class="justify-between flex sm:flex-wrap" v-if="prev || next">
						<div
							v-if="prev"
							@click="handLink(prev._path)"
							class="cursor-pointer link-page dark:bg-slate-800 dark:highlight-white/5 mr-auto"
						>
							<img class="absolute -left-6 w-28 h-28 rounded-full shadow-lg" :src="prev.header" />
							<div class="min-w-0 py-5 pl-28 pr-5">
								<div class="text-slate-900 font-medium text-sm sm:text-base truncate dark:text-slate-200">上一篇</div>
								<div class="text-slate-500 font-medium text-sm sm:text-base leading-tight truncate dark:text-slate-400">
									{{ prev.title }}
								</div>
							</div>
						</div>
						<div
							v-if="next"
							@click="handLink(next._path)"
							class="cursor-pointer link-page dark:bg-slate-800 dark:highlight-white/5 ml-auto"
						>
							<img class="absolute -left-6 w-28 h-28 rounded-full shadow-lg" :src="next.header" />
							<div class="min-w-0 py-5 pl-28 pr-5">
								<div class="text-slate-900 font-medium text-sm sm:text-base truncate dark:text-slate-200">下一篇</div>
								<div class="text-slate-500 font-medium text-sm sm:text-base leading-tight truncate dark:text-slate-400">
									{{ next.title }}
								</div>
							</div>
						</div>
					</div>
					<div class="mt-20">
						<twikoo-comment />
					</div>
				</div>
				<div class="toc">
					<toc-menu :list="toc ? toc.links : []" />
				</div>
			</article>
		</main>
	</ContentDoc>
</template>
<script setup lang="ts">
import twikooComment from '@/components/twikoo-comment.vue'
import tocMenu from '@/components/tools/toc-menu.vue'
definePageMeta({
	layout: 'article'
})
const { page, next, prev, toc } = useContent()
const handLink = (url: string) => {
	window.location.href = url
}
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
	@apply text-2xl my-2 font-bold;
}
.article h2 {
	@apply text-xl my-1 border-b-2 border-amber-400 font-bold;
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
	@apply mt-6 overflow-hidden w-full md:w-2/5  relative bg-white shadow-lg ring-1 ring-black/5 rounded-xl flex items-center gap-6;
}
</style>
