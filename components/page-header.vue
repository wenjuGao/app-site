<template>
	<nav class="page-header bg-base-300">
		<div class="flex-1">
			<div class="flex items-center cursor-pointer" @click="handleLink('')">
				<img :src="app.logo" class="h-8 mr-3" :alt="app.title" />
				<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> {{ app.title }}</span>
			</div>
		</div>
		<div class="flex-none">
			<div class="flex items-center sm:order-2 md:hidden">
				<ClientOnly fallback-tag="span" fallback="Loading comments...">
					<menu-swap :menu="headerMenu" />
				</ClientOnly>
			</div>
			<div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
				<ul class="menu menu-horizontal rounded-box">
					<li v-for="(item, index) in headerMenu" :key="index" class="group">
						<span @click="handleLink(item.link)" :class="route.path == `${app.baseURL}${item.link}` ? 'active' : ''">
							<span v-if="item.icon" :class="`${item.icon} text-xl`"> </span>
							{{ item.label }}
						</span>
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

const { headerMenu } = useAppConfig()
// const router = useRouter()
const route: any = useRoute()
const config = useRuntimeConfig()
const app: NitroRuntimeConfigApp = config.app

const handleLink = (path: string) => {
	window.location.href = `${app.baseURL}${path}` // router.push({ path: `${app.baseURL}${path}` })
}
</script>
<style lang="postcss" scoped>
.page-header {
	@apply sticky top-0  z-20 navbar transition-all;
}
.opacity-header {
	background-image: radial-gradient(transparent 1px, hsl(var(--b1) / var(--tw-bg-opacity)) 1px);
	background-size: 2px 2px;
	backdrop-filter: saturate(50%) blur(4px);
}
</style>
