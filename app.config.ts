
export default defineAppConfig({
	myInfo: {
		bgImg: "/img/my-bg.png",
		name: "前端小书童",
		desc: "平平无奇 小花瓶",
		avatar: "/img/avatar.jpg",
		links: [
			{
				label: "github",
				img: "/img/Github.png",
				link: "https://github.com/wenjuGao"
			},
			{
				label: "twitter",
				img: "/img/twitter.png",
				link: "https://twitter.com/6QJM6pzFNe2TiEu"
			},
			{
				label: "掘金",
				img: "/img/juejin.png",
				link: "https://juejin.cn/user/2383396937933166"
			},
			{
				label: "telegram",
				img: "/img/telegram.png",
				link: "https://t.me/FrontEndDevep"
			},

		]
	},
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