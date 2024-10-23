<template>
	<figure ref="root"
			class="mermaid-container">
		<pre ref="codeBlock"
			 :class="{
				'opacity-0': isDiagramLoading
			}"
			 v-text="decodedCode" />
	</figure>
</template>

<script setup>
import mermaid from 'mermaid'
const rendered = ref(false)
const props = defineProps({
	code: {
		type: String,
		default: null
	}
})

const decodedCode = computed(() => props.code)

const codeBlock = ref(null)
const isDiagramLoading = ref(true)

async function renderMermaidDiagram () {
	isDiagramLoading.value = true
	if (codeBlock.value && mermaid) {
		try {
			await mermaid.run({
				nodes: [codeBlock.value],
				suppressErrors: true
			})
		} catch (e) {
			console.warn(e)
		}

		isDiagramLoading.value = false
	}
}

onMounted(() => {
	setTimeout(() => {
		renderMermaidDiagram()
	}, 100)
})
</script>

<style>
.mermaid-container {
	position: relative;
}

.mermaid-placeholder {
	position: absolute;
	inset: 0;
}

.mermaid-placeholder__spinner {
	max-height: calc(100% - 2rem);
}

.opacity-0 {
	opacity: 0;
}

.mermaid rect {
	stroke: #6195ff !important;
	fill: #fff !important;
}

.mermaid .current-doc.node .label {
	color: #fff !important;
}

.mermaid line {
	stroke: #6195ff !important;
}

[data-theme='dark'] .mermaid .flowchart-link {
	stroke: #fff !important;
}

[data-theme='dark'] .mermaid .messageText {
	fill: #fff !important;
}

[data-theme='dark'] .mermaid marker {
	fill: #fff !important;
	color: #fff !important;
}

[data-theme='dark'] .mermaid line {
	stroke: #fff !important;
}
</style>
