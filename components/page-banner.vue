<template>
	<div class="carousel carousel-center rounded-box mt-3">
		<div class="carousel-item cursor-pointer hover:font-bold"
			 v-for="(item, index) in banerList"
			 @click="handleClick(item)"
			 :key="index">
			<div class="carousel-item-box max-w-xs">
				<img :src="item.img"
					 :alt="item.title" />
				<div class="label h-20 hero-overlay bg-opacity-6 text-neutral-content">
					<p class="p-2 break-all line-clamp-2">{{ item.title }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { handleLink } from "@/utils/util"
const banerList = await queryContent('articles')
	.only(['_path', 'banner', 'img', 'category', 'title'])
	.where({ banner: true })
	.limit(5)
	.sort({ date: -1 })
	.find()
const handleClick = (item: any) => handleLink(item._path, useRouter());
</script>

<style lang="postcss" scoped>
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
