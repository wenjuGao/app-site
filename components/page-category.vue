<template>
	<div class="grid lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 md:grid-cols-2">
		<div v-for="(item, index) in list"
			 :key="index"
			 @click="handLink(item.label)"
			 :class="`stats border hover:shadow-xl cursor-pointer transition-all duration-300 shadow  shadow-${item.class} border-${item.class}`">
			<div class="stat">
				<div :class="`stat-figure  text-${item.class}`">
					<div class="avatar">
						<div class="w-16 rounded-full">
							<img :src="item.img" />
						</div>
					</div>
				</div>
				<div class="stat-title">{{ item.label }}</div>
				<div :class="`stat-value countdown text-${item.class}`">
					<!-- {{ item.count || 0 }} -->
					<span :style="`--value:${item.count || 0};`"></span>
					{{ item.count && +item.count > 99 ? '+' : '' }}
				</div>
				<div class="stat-desc"></div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import useArticleStore from '@/stores/articles'
import type { ArticleStoreType } from '@/stores/articles'
import type { ArticleType } from 'type'
const { categoryMenu } = useAppConfig()
let list = ref(categoryMenu)
const { categoryLinkArticle }: ArticleStoreType = useArticleStore()
list.value = categoryMenu.map((item: any) => {
	let articles: ArticleType[] = []
	item.value.forEach((i: string) => {
		if (categoryLinkArticle) {
			articles = [...articles, ...(categoryLinkArticle.get(i) || [])]
		}
	})
	return {
		...item,
		articles: articles,
		count: articles.length
	}
})
const handLink = (label: string) => {
	window.location.href = `/category/${label}`
}
</script>
