import { O as klona, Z as defuFn } from '../nitro/nitro.mjs';
import { e as useNuxtApp, m as defineAppConfig } from './server.mjs';

const cfg0 = defineAppConfig({
  myInfo: {
    bgImg: "/img/my-bg.png",
    name: "\u524D\u7AEF\u5C0F\u4E66\u7AE5",
    desc: "\u5E73\u5E73\u65E0\u5947 \u5C0F\u82B1\u74F6",
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
        label: "\u6398\u91D1",
        img: "/img/juejin.png",
        link: "https://juejin.cn/user/2383396937933166"
      },
      {
        label: "telegram",
        img: "/img/telegram.png",
        link: "https://t.me/FrontEndDevep"
      }
    ]
  },
  headerMenu: [
    {
      label: "\u9996\u9875",
      link: "",
      class: "primary",
      icon: "group-hover:i-mdi-home-circle  i-mdi-home-circle-outline"
    },
    {
      label: "\u5F52\u6863",
      link: "archives",
      class: "primary",
      icon: "i-mdi-archive-star-outline group-hover:i-mdi-archive-star"
    },
    {
      label: "\u5B9E\u9A8C\u5BA4",
      link: "laboratory",
      class: "primary",
      icon: "i-mdi-toggle-switch-variant-off group-hover:i-mdi-toggle-switch-variant"
    },
    {
      label: "\u5173\u4E8E",
      link: "about",
      class: "primary",
      icon: "i-mdi-card-bulleted-settings-outline group-hover:i-mdi-heart-box-outline"
    }
  ],
  categoryMenu: [
    {
      label: "javascript",
      link: "javascript",
      value: ["javascript", "Javascript", "js", "JS"],
      class: "primary",
      img: "/img/javascript.png"
    },
    {
      label: "Vue",
      link: "vue",
      value: ["vue", "Vue", "vuejs", "VUE", "vue2", "vue3", "Vue3", "Vue3"],
      class: "secondary",
      img: "/img/vue.jpg"
    },
    {
      label: "React",
      link: "react",
      value: ["React", "react", "reactjs", "react native", "react Native", "react16", "react18", "preact"],
      class: "accent",
      img: "/img/react.svg"
    },
    // {
    // 	label: 'Svelte',
    // 	link: '/Svelte'
    // },
    {
      label: "\u5C0F\u7A0B\u5E8F",
      link: "miniprogram",
      value: ["\u5C0F\u7A0B\u5E8F", "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F", "uniapp", "taro", "tarojs"],
      class: "neutral",
      img: "/img/miniprogram.svg"
    },
    {
      label: "\u7B97\u6CD5",
      link: "leetcode",
      value: ["leetcode", "\u7B97\u6CD5"],
      class: "info",
      img: "/img/leetcode.webp"
    },
    {
      label: "\u7B14\u8BB0",
      link: "note",
      value: ["note", "\u7B14\u8BB0", "\u7FFB\u8BD1", "\u6536\u85CF"],
      class: "warning",
      img: "/img/note.png"
    },
    {
      label: "\u9762\u8BD5",
      link: "interview",
      value: ["interview", "\u9762\u8BD5"],
      class: "error",
      img: "/img/interview.png"
    },
    {
      label: "\u5176\u4ED6",
      link: "other",
      value: ["other", "\u5176\u4ED6"],
      class: "success",
      img: "/img/article.png"
    }
  ],
  imgHold: "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
});
const inlineConfig = {
  "nuxt": {}
};
const __appConfig = /* @__PURE__ */ defuFn(cfg0, inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = klona(__appConfig);
  }
  return nuxtApp._appConfig;
}

export { useAppConfig as u };
//# sourceMappingURL=config-GqaW2bTo.mjs.map
