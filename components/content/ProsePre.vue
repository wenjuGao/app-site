<template>
	<Mermaid :class="$props.class"
			 :code="props.code"
			 v-if="isMermaid">
		<slot />
	</Mermaid>
	<pre :class="$props.class"
		 v-else><slot /></pre>
</template>

<script setup lang="ts">
import Mermaid from './Mermaid.vue'
const props = defineProps({
	class: {
		type: String,
		default: null
	},
	code: {
		type: String,
		default: ''
	},
	language: {
		type: String,
		default: null
	},
	filename: {
		type: String,
		default: null
	},
	highlights: {
		type: Array as () => number[],
		default: () => []
	},
	meta: {
		type: String,
		default: null
	}
})


const isMermaid = ref(props.language === 'mermaid')

</script>

<style lang="postcss"></style>
