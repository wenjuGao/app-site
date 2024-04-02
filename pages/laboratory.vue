<template>
	<NuxtLayout>
		<div class="flex  py-4 px-2 lg:overflow-visible lg:px-0">
			<div class="mb-2">
				<custom-clock />
			</div>
		</div>
	</NuxtLayout>
</template>
<script setup
		lang="ts">
		import customClock from '~/components/laboratory/custom-clock.vue';
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
