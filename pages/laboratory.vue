<template>
	<NuxtLayout>
		<div class="container pb-24 m-auto">
			<article class="prose w-full max-w-full py-10">
				<h1>Codeing 实验室</h1>
				<p>
					一些Idea，样式或者逻辑或者效果的最小实现，也包含整理遇到的有意思的Idea。当然也可以基于某个Idea实现个人商业项目，也期待小伙伴的加入一起快乐coding。
				</p>
			</article>
			<div class="py-10">
				<div class="grid md:grid-cols-3 md:gap-4 gap-0 grid-cols-1">
					<custom-clock />
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>
<script setup
		lang="ts">
		import customClock from '~/components/laboratory/custom-clock.vue';
		useSeoMeta({
			title: 'Codeing 实验室',
			ogTitle: 'Codeing 实验室',
			description: '前端开发,全职开发,自由工作,codeing,javascript,Vue,React',
			ogDescription: '前端开发,全职开发,自由工作,codeing,javascript,Vue,React',
			ogImage: 'https://site.gaowenju.com/img/logo.png',
			twitterCard: 'summary_large_image',
		})
</script>

<style lang="postcss">
.img-box {
	column-gap: 10px;
	counter-reset: count;

	li,
	ul {
		padding: 0;
		/* margin: 0; */
		list-style: none;
	}

	img {
		height: auto;
		vertical-align: middle;
	}

	.view-box {
		background-color: rgba(0, 0, 0, .5);

	}
}

.img-modal {
	img {
		max-height: 80vh;
		vertical-align: middle;
	}
}

.close {
	@apply absolute right-12 w-10 h-10 rounded-full bg-base-300 hover:bg-base-200 flex justify-center items-center cursor-pointer;
}
</style>
