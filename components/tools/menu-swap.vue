<template>
	<div :class="`dropdown  dropdown-end menu-swap`"
		 ref="menuRef">
		<label tabindex="0"
			   class="btn btn-circle swap swap-rotate">
			<input type="checkbox"
				   :checked="flag"
				   @click="tiggerChange" />

			<svg class="swap-off fill-current"
				 xmlns="http://www.w3.org/2000/svg"
				 width="32"
				 height="32"
				 viewBox="0 0 512 512">
				<path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
			</svg>

			<svg class="swap-on fill-current"
				 xmlns="http://www.w3.org/2000/svg"
				 width="32"
				 height="32"
				 viewBox="0 0 512 512">
				<polygon
						 points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
			</svg>
		</label>
		<!-- menu bg-base-200 w-56 p-0 [&_li>*]:rounded-none -->
		<ul tabindex="0"
			class="menu bg-base-200 shadow-md w-56 p-0 [&_li>*]:rounded-none dropdown-content rounded-box">
			<li v-for="(item, index) in  props.menu "
				:key="index">
				<a :href="item.link"
				   aria-current="page">{{ item.label }}</a>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
const flag = ref(false)
const menuRef = ref(null)
const props = defineProps({
	menu: {
		type: Array,
		default: function () {
			return []
		}
	}
})

const tiggerChange = () => {
	flag.value = !flag.value
	if (flag.value) {
		// @ts-ignore
		menuRef.value?.focus()
	} else {
		// @ts-ignore
		document.activeElement.blur()
	}
}
onClickOutside(menuRef, () => {
	flag.value = false
	// @ts-ignore
	menuRef.value?.blur()
})
</script>
