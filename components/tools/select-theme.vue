<template>
	<div class="dropdown dropdown-bottom dropdown-end">
		<label tabindex="0" class="btn m-1 i-mdi-theme-light-dark">
			<span class="i-mdi-theme-light-dark"></span>
		</label>
		<div tabindex="1" class="dropdown-content z-[1] card card-compact p-2 shadow bg-primary text-primary-content" style="width: 70vw;">
			<div class="card-body">
				<h3 class="card-title text-primary-content">{{ theme }}</h3>
				<div class="rounded-box grid grid-cols-2 gap-4 sm:grid-cols-3 h-80 overflow-auto md:grid-cols-4 lg:grid-cols-5">
					<div
						class="border-base-content/20 hover:border-base-content/40 h-24 overflow-hidden w-34 rounded-lg border outline outline-2 outline-offset-2 outline-transparent"
						:data-set-theme="item"
						v-for="(item, index) in themes"
						:key="index"
						@click="() => store.setTheme(item)"
						data-act-class="!outline-base-content"
					>
						<div :data-theme="item" class="bg-base-100 text-base-content w-full cursor-pointer font-sans">
							<div class="grid grid-cols-5 grid-rows-3">
								<div class="bg-base-200 col-start-1 row-span-2 row-start-1" />
								<div class="bg-base-300 col-start-1 row-start-3" />
								<div class="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
									<div class="font-bold">
										{{ item }}
									</div>
									<div class="flex flex-wrap gap-1">
										<div class="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
											<div class="text-primary-content text-sm font-bold">A</div>
										</div>
										<div class="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
											<div class="text-secondary-content text-sm font-bold">A</div>
										</div>
										<div class="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6">
											<div class="text-accent-content text-sm font-bold">A</div>
										</div>
										<div class="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6">
											<div class="text-neutral-content text-sm font-bold">A</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { themeChange } from 'theme-change'
import useAppStore from './../../stores/app'
const themes = [
	'light',
	'dark',
	'cupcake',
	'bumblebee',
	'emerald',
	'corporate',
	'synthwave',
	'retro',
	'cyberpunk',
	'valentine',
	'halloween',
	'garden',
	'forest',
	'aqua',
	'lofi',
	'pastel',
	'fantasy',
	'wireframe',
	'black',
	'luxury',
	'dracula',
	'cmyk',
	'autumn',
	'business',
	'acid',
	'lemonade',
	'night',
	'coffee',
	'winter'
]

onMounted(() => {
	themeChange(false)
})
const store = useAppStore()

const theme = computed(() => store.theme)

useHead({
	htmlAttrs: {
		['data-theme']: theme.value || 'light'
	}
})
</script>
