<template>
	<div v-for="(item, index) in props.list"
		 :key="index"
		 @click="handleClick(item)"
		 class="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl cursor-pointer dark:bg-gray-900">
		<img class="w-full h-44 object-cover"
			 :src="item.header"
			 :alt="item.title" />
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
</template>

<script setup lang="ts">
import { handleLink } from "@/utils/util"
type propsType = {
	list: any[]
}
const props: propsType = defineProps({
	list: {
		type: Array,
		default: function () {
			return []
		}
	}
})
const handleClick = (item: any) => handleLink(item._path, useRouter());
</script>
