
export default defineAppConfig({
	myInfo: {
		bgImg: "/img/my-bg.png",
		name: "前端小书童",
		desc: "平平无奇 小花瓶",
		avatar: "/img/header.png",
		links: [
			{
				label: "github",
				img: "/img/GitHub.png",
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
			label: '图床',
			link: 'iamges',
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
			value: ['javascript', 'Javascript', 'js', 'JS'],
			class: 'primary',
			img: '/img/javascript.png'
		},
		{
			label: 'Vue',
			link: 'vue',
			value: ['vue', 'Vue', 'vuejs', 'VUE', 'vue2', 'vue3', 'Vue3', 'Vue3'],
			class: 'secondary',
			img: '/img/vue.jpg'
		},
		{
			label: 'React',
			link: 'react',
			value: ['React', 'react', 'reactjs', 'react native', 'react Native', 'react16', 'react18', 'preact'],
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
			value: ['小程序', '微信小程序', 'uniapp', 'taro', 'tarojs'],
			class: 'neutral',
			img: '/img/miniprogram.svg'
		},
		{
			label: '算法',
			link: 'leetcode',
			value: ['leetcode', '算法'],
			class: 'info',
			img: '/img/leetcode.webp'
		},
		{
			label: '笔记',
			link: 'note',
			value: ['note', '笔记', '翻译', '收藏'],
			class: 'warning',
			img: '/img/note.png'
		},
		{
			label: '面试',
			link: 'interview',
			value: ['interview', '面试'],
			class: 'error',
			img: '/img/interview.png'
		},
		{
			label: '其他',
			link: 'other',
			value: ['other', '其他'],
			class: 'success',
			img: '/img/article.png'
		}
	],
	imgHold: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
})