<template>
	<footer class="p-10 pt-20 bg-base-200">
		<div class="text-base-content w-full footer items-end justify-between">
			<div>
				<img :src="app.footLogo"
					 class="h-24 mr-3"
					 :alt="app.title" />
				<p>{{ app.description }}</p>
			</div>

		</div>
	</footer>
	<footer class="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
		<aside class="items-center grid-flow-col">
			<p>
				2023 ©Wenju’blog<br />
				Powered by <a class="ink link-info"
				   href="https://nuxt.com">Nuxt</a> <a class="ink link-info"
				   href="https://tailwindcss.com">tailwindcss</a> <br />
			</p>
		</aside>
		<nav class="md:place-self-center md:justify-self-end">
			<div class="site-num">
				<span id="busuanzi_container_site_pv"
					  class="site-pv site-item">
					<span class="site-label">
						<span class="i-mdi-chart-multiple"></span>
						访问量
					</span>
					<em id="busuanzi_value_site_pv"></em>
				</span>
				<span id="busuanzi_container_site_uv"
					  class="site-uv site-item">
					<span class="site-label">
						<span class="i-mdi-cursor-default-click-outline"></span>
						访客量
					</span>
					<em id="busuanzi_value_site_uv"></em>
				</span>
				<span id="busuanzi_container_page_pv"
					  class="page-pv site-item">
					<span class="site-label">
						<span class="i-mdi-chart-timeline-variant-shimmer"></span>
						本页访客
					</span>
					<em id="busuanzi_value_page_pv"></em>
				</span>
			</div>
		</nav>
	</footer>
</template>

<script setup lang="ts">
import { NitroRuntimeConfigApp } from 'nitropack'
const config = useRuntimeConfig()
const app: NitroRuntimeConfigApp = config.app
</script>

<style lang="postcss" scoped>
.footer {
	margin: auto;

	.site-num {
		display: flex;
	}

	.site-item {
		display: flex !important;
		margin: 0 0 4px 6px;
		padding: 0 0 0 5px;
		height: 24px;
		line-height: 24px;
		overflow: hidden;
		font-size: 12px;
		font-weight: bold;
		color: #e4e7ed;
		background: #000;
		border-radius: 5px;

		.site-label {
			padding-right: 5px;
		}

		em {
			min-width: 50px;
			text-align: center;
		}
	}

	.site-pv em {
		padding: 0 3px;
		background: linear-gradient(0deg, #d0339b, #d03336);
	}

	.site-uv em {
		padding: 0 3px;
		background: linear-gradient(0deg, #e2c63a, #f58044);
	}

	.page-pv em {
		padding: 0 3px;
		background: linear-gradient(0deg, #367eda, #964fdb);
	}
}
</style>
