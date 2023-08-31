
export default defineAppConfig({
	headerMenu: [
		{
			label: '首页',
			link: '',
			class: 'primary',
			icon: 'group-hover:i-mdi-home-circle  i-mdi-home-circle-outline',
		},
		{
			label: '归档',
			link: 'archives',
			class: 'primary',
			icon: 'i-mdi-archive-star-outline group-hover:i-mdi-archive-star'
		},
		{
			label: '留言',
			link: 'message',
			class: 'primary',
			icon: 'i-mdi-toggle-switch-variant-off group-hover:i-mdi-toggle-switch-variant'
		},
		{
			label: '关于',
			link: 'about',
			class: 'primary',
			icon: 'i-mdi-card-bulleted-settings-outline group-hover:i-mdi-heart-box-outline'
		},
	],
	categoryMenu: [
		{
			label: 'javascript',
			link: 'javascript',
			class: 'primary',
			img: '/img/javascript.png'
		},
		{
			label: 'Vue',
			link: 'vue',
			class: 'secondary',
			img: '/img/vue.jpg'
		},
		{
			label: 'React',
			link: 'react',
			class: 'accent',
			img: '/img/react.svg'
		},
		// {
		// 	label: 'Svelte',
		// 	link: '/Svelte'
		// },
		{
			label: '小程序',
			link: 'miniprogram',
			class: 'neutral',
			img: '/img/miniprogram.svg'
		},
		{
			label: '算法',
			link: 'leetcode',
			class: 'info',
			img: '/img/leetcode.webp'
		},
		{
			label: '笔记',
			link: 'note',
			class: 'warning',
			img: '/img/note.png'
		},
		{
			label: '面试',
			link: 'interview',
			class: 'error',
			img: '/img/interview.png'
		},
		{
			label: '其他',
			link: 'other',
			class: 'success',
			img: '/img/article.png'
		}
	]
})