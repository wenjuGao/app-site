<template>
	<NuxtLayout>
		<main class="px-4 w-full pb-24">
			<ClientOnly fallback-tag="div">
				<template #fallback>
					<div class="ww-full min-h-64 flex justify-center items-center">
						<div class="text-center">
							<span className="loading loading-ring loading-lg"></span>
							<article class="prose">
								<p>
									加载中请稍后...
								</p>
							</article>
						</div>
					</div>
				</template>
				<ContentRenderer :value.sync="doc">
					<article class="relative isolate flex justify-center lg:px-6 pt-10 lg:overflow-visible">
						<div class="grow max-w-4xl w-full pr-4 lg:pr-10 overflow-auto box-content">
							<h1 class="mt-2 text-3xl font-bold tracking-tight break-all sm:text-4xl">
								{{ doc.title }}
							</h1>
							<ProseImg
								class="mt-6 object-contain min-h-20 max-h-48 max-w-full m-auto rounded-xl shadow-xl ring-1 ring-gray-400/10"
								v-if="doc.header"
								:src="doc.header"
								:alt="doc.title"
							/>
							<p
								v-if="doc.description"
								v-html="doc.description.replace(/\\n/g, '<br/>')"
								class="mt-6 text-md rounded-xl text-accent-conten break-all text-left bg-base-200 p-2 leading-8"
							></p>
							<div class="article-content mt-6 mb-6 text-accent-content article leading-7 break-all">
								<ContentRendererMarkdown :value="doc" />
							</div>
							<div class="divider"></div>
							<div class="grid md:grid-cols-2 grid-cols-1 md:gap-2" v-if="prev || next">
								<div
									v-if="prev"
									@click="handleClick(prev._path)"
									class="cursor-pointer link-page dark:bg-slate-800 dark:highlight-white/5 mr-auto"
								>
									<ProseImg class="!w-28 h-28 rounded-bl shadow-lg" :src="prev.header" :alt="prev.title" />
									<div class="w-full flex-1 pl-2">
										<div class="text-slate-900 font-medium text-sm sm:text-base truncate dark:text-slate-200">
											上一篇
										</div>
										<div class="text-slate-500 font-medium text-sm sm:text-base leading-tight truncate dark:text-slate-400">
											{{ prev.title }}
										</div>
									</div>
								</div>

								<div
									v-if="next"
									@click="handleClick(next._path)"
									class="cursor-pointer link-page dark:bg-slate-800 dark:highlight-white/5 ml-auto"
								>
									<ProseImg class="!w-28 h-28 rounded-bl shadow-lg" :src="next.header" :alt="next.title" />
									<div class="w-full flex-1 pl-2">
										<div class="text-slate-900 font-medium text-sm sm:text-base truncate dark:text-slate-200">
											下一篇
										</div>
										<div class="text-slate-500 font-medium text-sm sm:text-base leading-tight truncate dark:text-slate-400">
											{{ next.title }}
										</div>
									</div>
								</div>
							</div>
							<div class="mt-20">
								<!-- <twikoo-comment /> -->
							</div>
						</div>
						<div class="toc menu">
							<toc-menu :list="toc ? toc.links : []" />
						</div>
					</article>
					<template #empty>
						<empty-card />
					</template>
				</ContentRenderer>
			</ClientOnly>
		</main>
	</NuxtLayout>
</template>
<script setup lang="ts">
// import twikooComment from '@/components/twikoo-comment.vue'
import tocMenu from '@/components/tools/toc-menu.vue'
import emptyCard from '@/components/tools/empty-card.vue'
import ProseImg from '@/components/content/ProseImg.vue'
import { handleLink } from '@/utils/util'
const route = useRoute()
const doc: any = ref({})

definePageMeta({
	layout: 'article'
})
const result = await queryContent('articles')
	.where({
		_path: route.path
	})
	.findOne()
if (Array.isArray(result)) {
	doc.value = result.find((i) => i._path === route.path) || {}
} else {
	doc.value = result || {}
}
const { next, prev, toc } = useContent()
const handleClick = (url: string) => handleLink(url, useRouter())
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
	@apply overflow-hidden w-full  mb-2 md:mb-0 bg-white shadow-lg ring-1 ring-black/5 rounded-xl flex items-center  hover:scale-105 ease-in-out duration-300 delay-150;
}

.article ol,
.article ul {
	@apply my-2 list-decimal pl-10 pr-8 rounded py-4 bg-base-200;
}

.article li::marker {
	color: hsl(var(--af));
}

.demo-image__error .image-slot {
	font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
	font-size: 30px;
}
.demo-image__error .el-image {
	width: 100%;
	height: 200px;
}
</style>
