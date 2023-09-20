<script setup>
defineProps(['type'])
</script>

<template>
	<div class="my-2">
		<p class="type">{{ type }}</p>
		<ContentSlot :use="$slots.default" unwrap="p" />
	</div>
</template>
