<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
import type { ArticleType } from 'type'
import useArticleStore from '@/stores/articles'
const { setCategoryArticle, setTagsArticle, setAllArticles } = useArticleStore()
const init = async () => {
	let tagsMap = new Map<string, ArticleType[]>(),
		categoryMap = new Map<string, ArticleType[]>()
	const allArticles = await queryContent().only(['id', 'tags', '_path', 'title', 'date', 'category']).sort({ date: -1 }).find()

	allArticles.forEach((i: any) => {
		i.tags.forEach((tag: string) => {
			if (tagsMap.has(tag)) {
				tagsMap.set(tag, [...(tagsMap.get(tag) || []), i])
			} else {
				tagsMap.set(tag, [i])
			}
		})
		if (categoryMap.has(i.category)) {
			categoryMap.set(i.category, [...(categoryMap.get(i.category) || []), i])
		} else {
			categoryMap.set(i.category, [i])
		}
	})
	nextTick(() => {
		setCategoryArticle(categoryMap)
		setTagsArticle(tagsMap)
		// @ts-ignore
		setAllArticles(allArticles)
	})
}
init()
</script>

<style lang="postcss">
body {
	@apply min-h-screen bg-white dark:bg-gray-800 dark:text-gray-200;
}
</style>
