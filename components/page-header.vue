<template>
	<nav :class="pageClass" :key="pageClass">
		<div class="container mx-auto my-1">
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
						<theme-swap />
						<menu-swap :menu="headerMenu" />
					</ClientOnly>
				</div>
				<div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
					<ul class="menu p-0 menu-horizontal rounded-box">
						<li
							v-for="(item, index) in headerMenu"
							:key="index"
							@click="handleClick(item.link)"
							:class="route.path == `${app.baseURL}${item.link}` ? 'active group' : 'group'"
						>
							<span v-if="item.icon" :class="`${item.icon} text-2xl`"> </span>
							<template v-if="!item.icon || !pin">
								{{ item.label }}
							</template>
						</li>
					</ul>
					<!-- <div class="dropdown dropdown-bottom mr-3 dropdown-end">
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
					</div> -->
					<ClientOnly fallback-tag="span" fallback="Loading">
						<template #fallback>
							<div class="ww-full h-full flex justify-center items-center">
								<span className="loading loading-ring loading-lg"></span>
							</div>
						</template>
						<theme-swap />
					</ClientOnly>
					<div class="mx-3 p-1 flex cursor-pointer" @click="handlePin">
						<div :class="`${pin ? 'i-mdi-pin-outline' : 'i-mdi-pin-off-outline'}  w-6 h-6`"></div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>
<script setup lang="ts">
import menuSwap from './tools/menu-swap.vue'
import themeSwap from './tools/theme-swap.vue'
import { handleLink } from '@/utils/util'
import useAppStore from '@/stores/app'
import { useLocales, useLocale } from '@/composables/locale'
const locales = useLocales()
const locale = useLocale()
const { headerMenu } = useAppConfig()
const route: any = useRoute()
const config = useRuntimeConfig()
const app: any = config.app
const appStore = useAppStore()
const pin = computed(() => appStore.pin)

const handleClick = (path: string) => handleLink(`${app.baseURL}${path}`, useRouter())

const handlePin = () => appStore.setPin(!pin.value)
const pageClass = computed(() => {
	if (pin.value) {
		return 'page-header pin-header'
	}
	return 'page-header unpin-header'
})
</script>
<style lang="postcss" scoped>
.page-header {
	@apply sticky top-0 z-20 min-h-8 navbar transition-all duration-100 backdrop-blur glass border-none bg-base-100 bg-opacity-10 shadow-md;
	.group {
		@apply p-1 mx-2 flex flex-nowrap flex-row justify-center items-center cursor-pointer;
		&.active {
			@apply rounded-md bg-base-300 glass;
		}
	}
}

.pin-header {
	@apply sticky top-1 container min-h-12 btn-ghost max-w-144 py-0 rounded-3xl bg-base-100 bg-opacity-80 m-auto;
	.group {
		@apply w-8 h-8 p-1 mx-2 flex justify-center items-center  cursor-pointer border border-transparent;
		> span {
			@apply p-0 m-0 w-6 h-6;
		}
		&.active {
			@apply rounded-full border-inherit bg-slate-100;
			> span {
				@apply p-0 m-0;
			}
		}
	}
}

.unpin-header {
	@apply bg-base-300 bg-opacity-70;
}
</style>
