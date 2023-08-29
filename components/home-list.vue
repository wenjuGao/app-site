<template>
	<div class="grid lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 md:grid-cols-2">
		<div v-for="(item, index) in list"
			 :key="index"
			 class="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl cursor-pointer dark:bg-gray-900">
			<img class="w-full h-44 object-cover"
				 :src="item.header"
				 alt="Sunset in the mountains" />
			<div class="px-6 py-4 pb-2">
				<div class="font-bold text-xl mb-2 truncate dark:text-white">{{ item.title }}</div>
				<p class="text-gray-700 line-clamp-2 dark:text-gray-300">{{ item.description }}</p>
			</div>
			<div class="px-6 py-4">
				<template v-for="(tag, key) in item.tags"
						  :key="key">
					<span class="badge cursor-pointer mr-2"
						  v-if="key < 4">#{{ tag }}</span>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
let list = await queryContent('articles')
	.only(['_path', 'banner', 'date', 'description', 'header', 'tags', 'img', 'category', 'title'])
	.limit(20)
	.sort({ date: -1 })
	.find()
</script>
