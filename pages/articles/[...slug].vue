<template>
	<ContentDoc v-slot="{ doc }">
		<main class="px-4 w-full">
			<article class="relative isolate flex justify-center lg:px-6 pt-10 pb-24 lg:overflow-visible lg:px-0">
				<div class="grow max-w-4xl w-full pr-4 lg:pr-10 box-content">
					<h1 class="mt-2 text-3xl font-bold tracking-tight break-all sm:text-4xl">{{ doc.title }}</h1>
					<img
						class="mt-6 h-72 object-contain max-w-full m-auto rounded-xl shadow-xl ring-1 ring-gray-400/10"
						:src="doc.header"
						:alt="doc.title"
					/>
					<p class="mt-6 text-md rounded-xl text-accent-conten break-all text-left bg-base-200 p-2 leading-8">
						{{ doc.description }}
					</p>
					<div class="mt-6 text-accent-content article leading-7 break-all">
						<ContentRenderer :value="doc" />
					</div>
				</div>
				<div class="lg:sticky flex-none h-fit lg:top-32 menu bg-base-200 w-56 rounded-box lg:overflow-hidden md:block sm:hidden">
					<li v-for="(item, key) in doc.body.toc.links" :key="key">
						<h2 class="menu-title">
							<a :href="`#${item.id}`" class="cursor-pointer line-clamp-1 break-all overflow-hidden">
								{{ item.text }}
							</a>
						</h2>
						<ul v-if="item.children && item.children.length">
							<li v-for="(child, index) in item.children" :key="`${index}-${key}`">
								<a :href="`#${child.id}`" class="line-clamp-1 cursor-pointer">{{ child.text }}</a>
							</li>
						</ul>
					</li>
				</div>
			</article>
		</main>
	</ContentDoc>
</template>
<script setup>
// import { marked } from 'marked'
// import DOMPurify from 'dompurify'
// import hljs from 'highlight.js/lib/common'
// // 代码主体样式文件
// import 'highlight.js/styles/github.css'
// marked.setOptions({
// 	renderer: new marked.Renderer(),
// 	highlight: function (code) {
// 		return hljs.highlightAuto(code).value
// 	},
// 	pedantic: false,
// 	gfm: true,
// 	tables: true,
// 	breaks: false,
// 	sanitize: false,
// 	smartLists: true,
// 	smartypants: false,
// 	xhtml: false
// })
// const html = DOMPurify.sanitize(marked.parse(text))
// console.log(html)
onMounted(() => {
	// const {
	// 	// Global references
	// 	globals,
	// 	navigation,
	// 	surround,
	// 	page,
	// 	// Computed properties from `page` key
	// 	excerpt,
	// 	toc,
	// 	type,
	// 	layout,
	// 	// Computed properties from `surround` key
	// 	next,
	// 	prev
	// } = useContent()
	// console.log({
	// 	// Global references
	// 	globals,
	// 	navigation,
	// 	surround,
	// 	page,
	// 	// Computed properties from `page` key
	// 	excerpt,
	// 	toc,
	// 	type,
	// 	layout,
	// 	// Computed properties from `surround` key
	// 	next,
	// 	prev
	// })
})
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
</style>
