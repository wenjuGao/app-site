<template>
	<footer class="pb-10 pt-20 bg-base-200">
		<div class="container m-auto">
			<div class="text-base-content  px-4 md:px-0 footer items-end justify-between">
				<div class="flex">
					<img :src="app.footLogo"
						 class="h-24 mr-3"
						 :alt="app.title" />
					<p class="flex-1">{{ app.description }}</p>
				</div>
			</div>
		</div>
	</footer>
	<footer class="footer  py-4 border-t bg-base-200 text-base-content border-base-300">
		<div class="container  px-4 md:px-0 justify-between flex flex-wrap m-auto">
			<aside class="items-center grid-flow-col">
				<p class="leading-10">
					Powered by
					<a class="ink link-info mr-2"
					   href="https://nuxt.com">Nuxtjs</a>
					<a class="ink link-info"
					   href="https://tailwindcss.com">tailwindcss</a>
					<a class="ink link-info"
					   href="https://tailwindcss.com">Typescript</a>
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
		</div>
	</footer>
	<footer class="footer footer-center p-4 bg-base-300 text-base-content">
		<div class="container m-auto">
			<aside>
				<p>Copyright © 2024 - All right reserved by wenjugao’blog </p>
				皖ICP备20001994号
			</aside>
		</div>
	</footer>
</template>

<script setup
		lang="ts">
		const config = useRuntimeConfig()
		const app: any = config.app
</script>

<style lang="postcss"
	   scoped>
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
