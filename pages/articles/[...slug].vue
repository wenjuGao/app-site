<template>
	<main class="px-4 xl:mx-auto max-w-7xl">
		<ContentDoc v-slot="{ doc }">
			<article class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
				<div
					 class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
					<div
						 class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
						<div class="lg:pr-4">
							<div class="lg:max-w-lg">
								<h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 break-all sm:text-4xl">{{
									doc.title }}
								</h1>
								<img class="mt-6 w-full rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10"
									 :src="doc.header"
									 :alt="doc.title">
								<p class="mt-6 text-xl leading-8 text-gray-700">{{ doc.description }}</p>
							</div>
						</div>
					</div>
					<div
						 class="lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden md:block sm:hidden">

						{{ doc.body.toc }}
					</div>
					<div
						 class="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
						<div class="lg:pr-4">
							<div class="max-w-xl text-base leading-7 break-all text-gray-700 lg:max-w-lg">
								<ContentRenderer :value="doc" />
							</div>
						</div>
					</div>
				</div>
			</article>
		</ContentDoc>
	</main>
</template>
<script setup>
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js/lib/common'
// 代码主体样式文件
import 'highlight.js/styles/github.css'
marked.setOptions({
	renderer: new marked.Renderer(),
	highlight: function (code) {
		return hljs.highlightAuto(code).value
	},
	pedantic: false,
	gfm: true,
	tables: true,
	breaks: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	xhtml: false
})
// const html = DOMPurify.sanitize(marked.parse(text))
</script>
