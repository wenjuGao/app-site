<template>
	<table class="table table-bordered">
		<slot />
	</table>
</template>

<style lang="postcss">
table {
	border-collapse: collapse;
	margin: 1rem 0;
	display: block;
	overflow-x: auto;
	box-sizing: border-box;
	text-indent: initial;
	unicode-bidi: isolate;
	border-spacing: 2px;
	border-color: gray;
	thead {
		display: table-header-group;
		vertical-align: middle;
		unicode-bidi: isolate;
		border-color: inherit;
	}
	tr {
		border-top: 1px solid #dfe2e5;
		display: table-row;
		vertical-align: inherit;
		unicode-bidi: isolate;
		border-color: inherit;
	}
	th {
		display: table-cell;
		vertical-align: inherit;
		font-weight: bold;
		text-align: -internal-center;
		unicode-bidi: isolate;
	}

	td,
	th {
		border: 1px solid #dfe2e5;
		padding: 0.6em 1em;
	}
	tbody {
		border-radius: 0 0 10px 10px;
	}
}
</style>
