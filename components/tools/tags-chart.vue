<template>
	<div id="tags-chart" class="h-72"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import useArticleStore from '@/stores/articles'
import type { ArticleStoreType } from '@/stores/articles'
const { tagLinkArticles }: ArticleStoreType = useArticleStore()
const router = useRouter()
const seriesData = ref<any[]>([])

let chart = null

onMounted(() => {
	if (tagLinkArticles) {
		tagLinkArticles.forEach((value, key) => {
			seriesData.value.push({
				name: key,
				link: `/tag/${key}`,
				value: value.length || 0
			})
		})
	}
	nextTick(() => {
		chart = echarts.init(document.getElementById('tags-chart'))
		chart.setOption({
			title: {
				text: '{a|标签}{b|(双击进入标签页)}',
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
			series: {
				type: 'treemap',
				data: seriesData.value,

				breadcrumb: {
					show: false
				}
			}
		})
		chart.on('dblclick', 'series', function (val: any) {
			if (val.data && val.data.link) {
				router.push(val.data.link)
			}
		})
		window.onresize = chart.resize
	})
})
</script>
