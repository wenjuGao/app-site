<template>
	<nav class="page-header bg-base-300">
		<div class="flex-1">
			<div class="flex items-center cursor-pointer" @click="handleClick('')">
				<img src="/img/logo.png" class="md:h-8 h-6 mr-3" :alt="app.title" />
			</div>
		</div>
		<div class="flex-none">
			<div class="flex items-center sm:order-2 md:hidden">
				<ClientOnly fallback-tag="span" fallback="Loading">
					<template #fallback>
						<div class="ww-full h-full flex justify-center items-center">
							<span className="loading loading-ring loading-lg"></span>
						</div>
					</template>
					<menu-swap :menu="headerMenu" />
				</ClientOnly>
			</div>
			<div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
				<ul class="menu menu-horizontal rounded-box">
					<li v-for="(item, index) in headerMenu" :key="index" class="group">
						<span @click="handleClick(item.link)" :class="route.path == `${app.baseURL}${item.link}` ? 'active' : ''">
							<span v-if="item.icon" :class="`${item.icon} text-xl`"> </span>
							{{ item.label }}
						</span>
					</li>
				</ul>
				<!-- <div class="dropdown dropdown-bottom mr-3 dropdown-end">
					<div tabindex="0" role="button" class="m-1">
						<img src="/img/lang.png" class="w-6 h-6" alt="" />
					</div>
					<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
						<li><a>简体</a></li>
						<li><a>EN</a></li>
					</ul>
				</div>
				<theme-swap /> -->
			</div>
		</div>
	</nav>
</template>
<script setup lang="ts">
import menuSwap from './tools/menu-swap.vue'
import { handleLink } from '@/utils/util'

const { headerMenu } = useAppConfig()
const route: any = useRoute()
const config = useRuntimeConfig()
const app: any = config.app

const handleClick = (path: string) => handleLink(`${app.baseURL}${path}`, useRouter())
</script>
<style lang="postcss" scoped>
.page-header {
	@apply sticky top-0 z-20 navbar transition-all;
}

.opacity-header {
	background-image: radial-gradient(transparent 1px, hsl(var(--b1) / var(--tw-bg-opacity)) 1px);
	background-size: 2px 2px;
	backdrop-filter: saturate(50%) blur(4px);
}
</style>
