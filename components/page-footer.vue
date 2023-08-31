<template>
	<footer class="p-10 pt-20 bg-base-200">
		<div class="container text-base-content w-full footer justify-between">
			<div>
				<img :src="app.footLogo" class="h-24 mr-3" :alt="app.title" />
				<p>{{ app.description }}</p>
			</div>
			<div>
				<span class="footer-title">Services</span>
				<span id="busuanzi_container_page_pv"> 本文总阅读量<span id="busuanzi_value_page_pv">3341505</span>次</span>
				<span id="busuanzi_container_site_pv"> 本站总访问量<span id="busuanzi_value_site_pv"></span>次 </span>
				<span id="busuanzi_container_site_uv"> 本站访客数<span id="busuanzi_value_site_uv"></span>人次 </span>
				<a class="link link-hover">Branding</a>
				<a class="link link-hover">Design</a>
				<a class="link link-hover">Marketing</a>
				<a class="link link-hover">Advertisement</a>
			</div>
			<div>
				<span class="footer-title">Company</span>
				<a class="link link-hover">About us</a>
				<a class="link link-hover">Contact</a>
				<a class="link link-hover">Jobs</a>
				<a class="link link-hover">Press kit</a>
			</div>
			<div>
				<span class="footer-title">Legal</span>
				<a class="link link-hover">Terms of use</a>
				<a class="link link-hover">Privacy policy</a>
				<a class="link link-hover">Cookie policy</a>
			</div>
		</div>
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
}
</style>
