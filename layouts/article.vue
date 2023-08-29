<template>
	<ClientOnly fallback-tag="span"
				fallback="Loading comments...">
		<page-header />
	</ClientOnly>
	<main class="bg-base-100">
		<ContentDoc v-slot="{ doc }">
			<h1>{{ doc.title }}</h1>
			<ContentRendererMarkdown :value="doc" />
		</ContentDoc>
	</main>
	<page-footer />
</template>

<script setup>
import PageFooter from '@/components/page-footer.vue'
import PageHeader from '@/components/page-header.vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const user = {
	name: 'Tom Cook',
	email: 'tom@example.com',
	imageUrl:
		'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}
const navigation = [
	{ name: 'Dashboard', href: '#', current: true },
	{ name: 'Team', href: '#', current: false },
	{ name: 'Projects', href: '#', current: false },
	{ name: 'Calendar', href: '#', current: false },
	{ name: 'Reports', href: '#', current: false }
]
const userNavigation = [
	{ name: 'Your Profile', href: '#' },
	{ name: 'Settings', href: '#' },
	{ name: 'Sign out', href: '#' }
]
</script>
