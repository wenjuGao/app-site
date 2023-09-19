<template>
	<div id="category-chart" class="h-72"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import useArticleStore from '@/stores/articles'
import type { ArticleStoreType } from '@/stores/articles'
const { categoryLinkArticle }: ArticleStoreType = useArticleStore()
const router = useRouter()
const seriesData = ref<any[]>([])

let chart = null

onMounted(() => {
	if (categoryLinkArticle) {
		categoryLinkArticle.forEach((value, key) => {
			seriesData.value.push({
				name: key,
				link: `/category/${key}`,
				value: value.length || 0
			})
		})
	}
	nextTick(() => {
		chart = echarts.init(document.getElementById('category-chart'))

		chart.setOption({
			title: {
				text: '{a|分类}{b|(双击进入分类页)}',
				textStyle: {
					rich: {
						a: {
							fontSize: 14,
							color: '#333'
						},
						b: {
							fontSize: 12,
							color: '#aaa'
						}
					}
				}
			},
			tooltip: {},
			series: [
				{
					type: 'wordCloud',
					gridSize: 2,
					sizeRange: [12, 50],
					rotationRange: [-90, 90],
					shape: 'pentagon',
					width: 600,
					height: 400,
					drawOutOfBound: true,
					textStyle: {
						color: function () {
							return (
								'rgb(' +
								[Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',') +
								')'
							)
						}
					},
					emphasis: {
						textStyle: {
							shadowBlur: 10,
							shadowColor: '#333'
						}
					},
					data: seriesData.value
				}
			]
		})
		chart.on('click', 'series', function (val: any) {
			if (val.data && val.data.link) {
				router.push(val.data.link)
			}
		})
		window.onresize = chart.resize
	})
})
</script>
