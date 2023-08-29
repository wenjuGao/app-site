<template>
	<div class="carousel carousel-center rounded-box mt-3">
		<div class="carousel-item cursor-pointer"
			 v-for="(item, index) in banerList"
			 @click="handleLink(item)"
			 :key="index">
			<div class="carousel-item-box max-w-xs">
				<img :src="item.img"
					 :alt="item.title" />
				<div class="label hero-overlay bg-opacity-6 text-neutral-content">
					<p class="mb-5 line-clamp-2">{{ item.title }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
const router = useRouter();

router.replace({ hash: "#bio" });
const banerList = await queryContent('articles')
	.only(['_path', 'banner', 'img', 'category', 'title'])
	.where({ banner: true })
	.limit(5)
	.sort({ date: -1 })
	.find();

const handleLink = (item: any) => router.push({ path: item._path });
</script>

<style lang="postcss" scoped>
.carousel-item-box {
	position: relative;

	.label {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: inherit;

		.mb-5 {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
