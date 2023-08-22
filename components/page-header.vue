<template>
	<nav class="page-header bg-base-300 navbar">
		<div class="flex-1">
			<a :href="app.baseURL" class="flex items-center">
				<img :src="app.logo" class="h-8 mr-3" :alt="app.title" />
				<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> {{ app.title }} </span>
			</a>
		</div>
		<div class="flex-none">
			<div class="flex items-center sm:order-2 md:hidden">
				<menu-swap :menu="menus" />
			</div>
			<div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
				<ul class="menu menu-horizontal rounded-box">
					<li v-for="(item, index) in menus" :key="index">
						<a :href="item.link" aria-current="page">{{ item.label }}</a>
					</li>
				</ul>
				<select-theme />
			</div>
		</div>
	</nav>
</template>
<script setup lang="ts">
import { NitroRuntimeConfigApp } from 'nitropack'
import menuSwap from './tools/menu-swap.vue'
import selectTheme from './tools/select-theme.vue'
import { onMounted } from 'vue'
const config = useRuntimeConfig()
const app: NitroRuntimeConfigApp = config.app
const menus = [
	{
		label: '首页',
		link: '/'
	},
	{
		label: 'Vue',
		link: '/vue'
	},
	{
		label: 'React',
		link: '/react'
	},
	{
		label: '小程序',
		link: '/miniprogram'
	},
	{
		label: '算法',
		link: '/leetcode'
	},
	{
		label: '面试',
		link: '/interview'
	}
]
</script>
<style lang="postcss" scoped>
.page-header {
	position: sticky;
	top: 0;
	z-index: 2;
}
</style>
