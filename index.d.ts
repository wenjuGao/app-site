interface CategoryMenuType {
	label: string;
	link: string;
	class: string;
	img?: string;
	icon?: string;
}



declare module 'nuxt/schema' {
	interface AppConfig {
		headerMenu: CategoryMenuType
		categoryMenu: CategoryMenuType
	}
}

// It is always important to ensure you import/export something when augmenting a type
export {
	CategoryMenuType
}
