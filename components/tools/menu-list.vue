<template>
	<ul tabindex="0" class="menu bg-base-200 shadow-md w-56 p-0 [&_li>*]:rounded-none dropdown-content rounded-box">
		<li v-for="(item, index) in props.menu" :key="index">
			<a :href="item.link" aria-current="page">{{ item.label }}</a>
		</li>
	</ul>
</template>
