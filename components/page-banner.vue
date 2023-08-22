<template>
	<div class="carousel carousel-center space-x-4 rounded-box">
		<div class="carousel-item" v-for="(item, index) in list" :key="index">
			<img :src="item.img" alt="Burger" />
		</div>
	</div>
</template>
<script setup lang="ts">
const list = [
	{
		label: '文章1',
		img: 'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg'
	},
	{
		label: '文章2',
		img: 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg'
	},
	{
		label: '文章3',
		img: 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
	},
	{
		label: '文章4',
		img: 'https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg'
	},
	{
		label: '文章5',
		img: 'https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg'
	}
]
</script>
