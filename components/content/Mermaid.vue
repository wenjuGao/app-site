<template>
	<pre ref="el"
		 class="mermaid"
		 :style="{ display: rendered ? 'block' : 'none' }">
{{ props.code }}
	<slot />
  </pre>
</template>

<script setup>
// import mermaid from 'mermaid'
const el = ref(null)
const rendered = ref(false)
const props = defineProps({
	code: {
		type: String,
		default: null
	}
})

async function render () {
	if (!el.value) {
		return
	}
	if (el.value.querySelector('svg')) {
		// Already rendered
		return
	}
	el.value.classList.add('mermaid')
	rendered.value = true
	// mermaid.initialize({ startOnLoad: true });
	// Iterate children to remove comments
	for (const child of el.value.childNodes) {
		if (child.nodeType === Node.COMMENT_NODE) {
			el.value.removeChild(child)
		}
	}
	console.log(mermaid, el.value)
	nextTick(() => {
		mermaid.run()
	})
}

onMounted(() => {
	// mermaid.initialize({ startOnLoad: true });
	// render()
})
</script>

<style>
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
