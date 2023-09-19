

interface ArticleType {
	_path: string
	title: string
	category: string
	tags: string[]
	img?: string
	date?: string
	header?: string
	description?: string
}

interface ArticleLinkType {
	[x: string]: any;
	count?: Number
	value?: any[]
	list?: ArticleType[]
}

interface CategoryMenuType extends ArticleLinkType {
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
	CategoryMenuType,
	ArticleType,
	ArticleLinkType
}
