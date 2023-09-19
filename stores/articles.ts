
import { defineStore } from 'pinia'
import type { ArticleType } from "type"

type MapArticleType = Map<string, ArticleType[]>;

const useArticleStore = defineStore('article', () => {
	const tagLinkArticles = ref<MapArticleType>()
	const categoryLinkArticle = ref<MapArticleType>()
	const allArticles = ref<ArticleType[]>([])

	const setTagsArticle = (val: MapArticleType) => {
		tagLinkArticles.value = val
	}
	const setCategoryArticle = (val: MapArticleType) => {
		categoryLinkArticle.value = val
	}
	const setAllArticles = (val: ArticleType[]) => {
		allArticles.value = val
	}
	return {
		tagLinkArticles,
		categoryLinkArticle,
		allArticles,
		setCategoryArticle,
		setTagsArticle,
		setAllArticles,
	}
})



export default useArticleStore

export type ArticleStoreType = {
	tagLinkArticles?: MapArticleType,
	categoryLinkArticle?: MapArticleType,
	allArticles?: ArticleType[],
	setCategoryArticle?: (val: MapArticleType) => void,
	setTagsArticle?: (val: MapArticleType) => void,
	setAllArticles?: (val: ArticleType[]) => void,
}