<template>
	<ClientOnly fallback-tag="span"
				fallback="Loading">
		<template #fallback>
			<div class="skeleton w-full h-52 rounded-box my-3"></div>
		</template>
		<div class="carousel carousel-center rounded-box mt-3">
			<div class="skeleton w-full h-52"
				 v-if="loading"></div>
			<template v-else>
				<div class="carousel-item min-h-60 cursor-pointer hover:font-bold"
					 v-for="(item, index) in banerList"
					 @click="handleClick(item)"
					 :key="index">
					<div class="carousel-item-box max-w-xs">
						<ProseImg :src="item.img"
								  :alt="item.title" />
						<div class="label h-12 hero-overlay bg-opacity-6 text-neutral-content">
							<p class="p-2 break-all line-clamp-2">{{ item.title }}</p>
						</div>
					</div>
				</div>
			</template>
		</div>
	</ClientOnly>
</template>
<script setup
		lang="ts">
		import ProseImg from '@/components/content/ProseImg.vue'
		import { handleLink } from '@/utils/util'
		const loading = ref(true)
		const banerList = await queryContent('articles')
			.only(['_path', 'banner', 'date', 'description', 'header', 'tags', 'img', 'category', 'title'])
			.sort({ date: -1 })
			.where({ banner: true })
			.limit(5)
			.find()
		loading.value = false
		const handleClick = (item: any) => handleLink(item._path, useRouter())
</script>

<style lang="postcss"
	   scoped>
	.carousel-item-box {
		position: relative;

		.label {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
</style>
