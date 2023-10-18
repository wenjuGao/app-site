<template>
	<div class="list-item-container">
		<div class="card mb-3 border-solid cursor-pointer transition-all border md:card-side bg-base-100 shadow hover:shadow-xl"
			 v-for="(item, index) in props.list"
			 :key="index"
			 @click="handleLink(item)">
			<figure class="w-full md:max-w-[180px] md:min-w-[120px]">
				<img :src="item.header"
					 class="md:h-full h-40 w-full object-cover"
					 :alt="item.title" />
			</figure>
			<div class="card-body flex-1 p-4">
				<h2 class="card-title line-clamp-1 break-all">{{ item.title }}</h2>
				<p class="text-gray-700 line-clamp-2 dark:text-gray-300">{{ item.description }}</p>
				<div class="px-6 card-actions justify-end py-4">
					<template v-for="(tag, key) in item.tags"
							  :key="key">
						<span class="badge cursor-pointer"
							  v-if="key < 4">#{{ tag }}</span>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const router = useRouter()
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
const handleLink = (item: any) => router.push({ path: item._path });
</script>
