<template>
	<nav :class="pageClass">
		<div class="flex-1">
			<div class="flex items-center cursor-pointer"
				 @click="handleClick('')">
				<img src="/img/logo.png"
					 class="md:h-8 h-6 mr-3"
					 :alt="app.title" />
			</div>
		</div>
		<div class="flex-none">
			<div class="flex items-center sm:order-2 md:hidden">
				<ClientOnly fallback-tag="span"
							fallback="Loading">
					<template #fallback>
						<div class="ww-full h-full flex justify-center items-center">
							<span className="loading loading-ring loading-lg"></span>
						</div>
					</template>
					<menu-swap :menu="headerMenu" />
				</ClientOnly>
			</div>
			<div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
				<ul class="menu p-0 menu-horizontal rounded-box">
					<li v-for="(item, index) in headerMenu"
						:key="index"
						class="group">
						<span @click="handleClick(item.link)"
							  :class="route.path == `${app.baseURL}${item.link}` ? 'active' : ''">
							<span v-if="item.icon"
								  :class="`${item.icon} text-xl`">
							</span>
							<template v-if="!item.icon || !pin">
								{{ item.label }}
							</template>
						</span>
					</li>
				</ul>
				<div class="dropdown dropdown-bottom mr-3 dropdown-end">
					<div tabindex="0"
						 role="button"
						 class="flex p-1">
						<div class="i-mdi-language w-6 h-6"></div>
					</div>
					<ul tabindex="0"
						class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
						<li v-for="item in locales"
							:key="item.value"
							:class="`${locale === item.value ? 'active' : ''}`">
							<span>
								<i class="text-3xl">{{ item.__flag }}</i>
								{{ item.__name }}</span>
						</li>
					</ul>
				</div>
				<theme-swap />
				<div class="mr-3 p-1 flex cursor-pointer"
					 @click="handlePin">
					<div :class="`${pin ? 'i-mdi-pin-outline' : 'i-mdi-pin-off-outline'}  w-6 h-6`"></div>
				</div>
			</div>
		</div>
	</nav>
</template>
<script setup
		lang="ts">
		import menuSwap from './tools/menu-swap.vue'
		import themeSwap from './tools/theme-swap.vue'
		import { handleLink } from '@/utils/util'
		import { useLocales, useLocale } from '@/composables/locale'
		const locales = useLocales()
		const locale = useLocale()
		const { headerMenu } = useAppConfig()
		const route: any = useRoute()
		const config = useRuntimeConfig()
		const app: any = config.app
		const pin = ref<Boolean>(false)

		const handleClick = (path: string) => handleLink(`${app.baseURL}${path}`, useRouter());

		const handlePin = () => pin.value = !pin.value
		const pageClass = computed(() => {
			if (pin.value) {
				return 'transition-all page-header bg-base-100 sticky top-2 btn-ghost rounded-3xl shadow-md'
			} else {
				return 'transition-all page-header bg-base-300'
			}
		})
</script>
<style lang="postcss"
	   scoped>
	.page-header {
		@apply sticky top-0 z-20 navbar transition-all;
	}

	.opacity-header {
		background-image: radial-gradient(transparent 1px, hsl(var(--b1) / var(--tw-bg-opacity)) 1px);
		background-size: 2px 2px;
		backdrop-filter: saturate(50%) blur(4px);
	}
</style>
