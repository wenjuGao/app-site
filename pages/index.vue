<template>
	<div class="container">
		<page-banner />
		<div class="tabs">
			<a
				v-for="(item, index) in tabList"
				:key="index"
				@click="() => (active = item.label)"
				:class="`tab tab-lg tab-lifted ${active === item.label ? 'tab-active' : ''}`"
			>
				<span :class="item.icon"></span>
			</a>
		</div>
		<template v-if="active === 'card'">
			<div class="max-w-sm rounded overflow-hidden shadow-lg mb-4 bg-white dark:bg-gray-900">
				<img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
				<div class="px-6 py-4 pb-2">
					<div class="font-bold text-xl mb-2 dark:text-white">The Coldest Sunset</div>
					<p class="text-gray-700 dark:text-gray-300">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
						exercitationem praesentium nihil.
					</p>
				</div>
				<div class="px-6 py-4">
					<span class="badge mr-2">#photography</span>
					<span class="badge mr-2">#travel</span>
					<span class="badge">#winter</span>
				</div>
			</div>
			<div class="card w-96 glass">
				<figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" /></figure>
				<div class="card-body">
					<h2 class="card-title">Life hack</h2>
					<p>How to park your car at your garage?</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">Learn now!</button>
					</div>
				</div>
			</div>
		</template>
		<template v-if="active === 'list'">
			<div class="card card-side bg-base-100 shadow-xl">
				<figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
				<div class="card-body">
					<h2 class="card-title">New movie is released!</h2>
					<p>Click the button to watch on Jetflix app.</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">Watch</button>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import pageBanner from './../components/page-banner.vue'
const active = ref('card')
const tabList = [
	{
		label: 'card',
		icon: 'i-mdi-card-bulleted-settings-outline'
	},
	{
		label: 'list',
		icon: 'i-mdi-format-list-bulleted'
	}
]
</script>

<style lang="postcss" scoped>
.badge {
	@apply inline-block bg-gray-200 dark:bg-gray-950 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-400;
	&:hover {
		@apply bg-gray-300;
	}
}
</style>
