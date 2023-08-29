import { CategoryMenuType } from "./constant"
export const categoryMenu: CategoryMenuType[] = [
	{
		label: 'javascript',
		link: '/javascript',
		class: 'primary',
		img: '/img/javascript.png'
	},
	{
		label: 'Vue',
		link: '/vue',
		class: 'secondary',
		img: '/img/vue.jpg'
	},
	{
		label: 'React',
		link: '/react',
		class: 'accent',
		img: '/img/react.svg'
	},
	// {
	// 	label: 'Svelte',
	// 	link: '/Svelte'
	// },
	{
		label: '小程序',
		link: '/miniprogram',
		class: 'neutral',
		img: '/img/miniprogram.svg'
	},
	{
		label: '算法',
		link: '/leetcode',
		class: 'info',
		img: '/img/leetcode.webp'
	},
	{
		label: '笔记',
		link: '/note',
		class: 'warning',
		img: '/img/note.png'
	},
	{
		label: '面试',
		link: '/interview',
		class: 'error',
		img: '/img/interview.png'
	},
	{
		label: '其他',
		link: '/other',
		class: 'success',
		img: '/img/article.png'
	}
]


const themes = [
	'success',
	'error',
	'warning',
]