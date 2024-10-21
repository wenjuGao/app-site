<template>
	<NuxtLayout>
		<main class="px-1.5 md:container md:m-auto pb-24">
			<ClientOnly fallback-tag="div">
				<template #fallback>
					<div class="w-full min-h-64 flex justify-center items-center">
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
					<article class="relative isolate flex justify-center lg:px-2 lg:pt-10 pt-4 lg:overflow-visible">
						<div class="grow md:pr-2 lg:pr-4 overflow-auto box-content">
							<h1 class="mt-2 lg:text-3xl md::text-2xl text-xl font-bold tracking-tight break-all sm:text-4xl">
								{{ doc.title }}
							</h1>
							<ProseImg
								class="mt-6 object-cover min-h-20 max-h-80 max-w-full m-auto"
								v-if="doc.header"
								:src="doc.header"
								:alt="doc.title"
							/>
							<p
								v-if="doc.description"
								v-html="doc.description.replace(/\\n/g, '<br/>')"
								class="mt-6 text-md rounded-xl break-all text-left bg-base-200 p-2 leading-8"
							></p>
							<div class="article-content mt-6 mb-6 light:text-accent-content article leading-7 break-all">
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
						<div class="toc menu sticky top-20">
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
const { next, prev, page, toc } = useContent()
useSeoMeta({
	title: page.title,
	ogTitle: page.title,
	description: page.description,
	ogDescription: page.description,
	ogImage: '/img/logo.png',
	twitterCard: 'summary_large_image'
})
const handleClick = (url: string) => handleLink(url, useRouter())
</script>

<style lang="postcss">
.article h1,
.article h2,
.article h3,
.article h4,
.article h5,
.article h6 {
	line-height: 2.5;
	@apply mx-2 pb-2;
}
.article p a,
.article div a {
	color: #3880ff;
}

.article h1 {
	@apply text-2xl my-4  pt-4 font-extrabold mt-6;
}

.article h2 {
	@apply text-xl my-4 border-b-2  pt-4 border-amber-400 font-bold mt-4;
}

.article h3 {
	@apply text-lg my-2.5 pt-3 font-bold;
}

.article h4 {
	@apply text-base my-2.5 pt-2 font-semibold;
}

.article h5,
.article h6 {
	@apply text-base my-1.5 pt-1 font-medium;
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
	@apply overflow-hidden w-full mb-2 md:mb-0 bg-white shadow-lg ring-1 ring-black/5 rounded-xl flex items-center hover:scale-105 ease-in-out duration-300 delay-150;
}

.article ol,
.article ul {
	@apply my-1.5 pl-6 pr-2 rounded py-2;
}

.article ul {
	@apply bg-base-200 list-disc;
}
.article ol {
	@apply list-decimal;
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
.shiki code {
	--shiki-default-bg: #121212;
	--shiki-default-font-weight: 400;
	--shiki-default-text-decoration: none;
	@apply rounded-2xl overflow-hidden py-3;
	background-color: #121212;
	span.line:before {
		content: attr(line);
		@apply h-5  box-content px-2 mr-1 align-middle w-5 text-center sticky left-0;
	}
}
pre code {
	@apply p-1;
	display: flex;
	flex-direction: column;
}
</style>
