import { klona } from 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+klona@2.0.6/node_modules/klona/dist/index.mjs';
import { e as useNuxtApp, l as defineAppConfig } from '../server.mjs';

function isObject(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject(value) && isObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defuFn = createDefu((object, key, currentValue) => {
  if (typeof object[key] !== "undefined" && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
const cfg0 = defineAppConfig({
  myInfo: {
    bgImg: "https://qiniu.gaowenju.com/app-site/my-bg.png",
    name: "\u524D\u7AEF\u5C0F\u4E66\u7AE5",
    desc: "\u5E73\u5E73\u65E0\u5947 \u5C0F\u82B1\u74F6",
    avatar: "https://qiniu.gaowenju.com/img/header.jpg",
    links: [
      {
        label: "github",
        img: "https://qiniu.gaowenju.com/app-site/GitHub.png",
        link: "https://github.com/wenjuGao"
      },
      {
        label: "twitter",
        img: "https://qiniu.gaowenju.com/app-site/twitter.png",
        link: "https://twitter.com/6QJM6pzFNe2TiEu"
      },
      {
        label: "\u6398\u91D1",
        img: "https://qiniu.gaowenju.com/app-site/juejin.png",
        link: "https://juejin.cn/user/2383396937933166"
      },
      {
        label: "telegram",
        img: "https://qiniu.gaowenju.com/app-site/telegram.png",
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
      label: "\u7559\u8A00",
      link: "message",
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
      img: "https://qiniu.gaowenju.com/app-site/javascript.png"
    },
    {
      label: "Vue",
      link: "vue",
      value: ["vue", "Vue", "vuejs", "VUE", "vue2", "vue3", "Vue3", "Vue3"],
      class: "secondary",
      img: "https://qiniu.gaowenju.com/app-site/vue.jpg"
    },
    {
      label: "React",
      link: "react",
      value: ["React", "react", "reactjs", "react native", "react Native", "react16", "react18", "preact"],
      class: "accent",
      img: "https://qiniu.gaowenju.com/app-site/react.svg"
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
      img: "https://qiniu.gaowenju.com/app-site/miniprogram.svg"
    },
    {
      label: "\u7B97\u6CD5",
      link: "leetcode",
      value: ["leetcode", "\u7B97\u6CD5"],
      class: "info",
      img: "https://qiniu.gaowenju.com/app-site/leetcode.webp"
    },
    {
      label: "\u7B14\u8BB0",
      link: "note",
      value: ["note", "\u7B14\u8BB0", "\u7FFB\u8BD1", "\u6536\u85CF"],
      class: "warning",
      img: "https://qiniu.gaowenju.com/app-site/note.png"
    },
    {
      label: "\u9762\u8BD5",
      link: "interview",
      value: ["interview", "\u9762\u8BD5"],
      class: "error",
      img: "https://qiniu.gaowenju.com/app-site/interview.png"
    },
    {
      label: "\u5176\u4ED6",
      link: "other",
      value: ["other", "\u5176\u4ED6"],
      class: "success",
      img: "https://qiniu.gaowenju.com/app-site/article.png"
    }
  ]
});
const inlineConfig = {};
const __appConfig = /* @__PURE__ */ defuFn(cfg0, inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = klona(__appConfig);
  }
  return nuxtApp._appConfig;
}

export { useAppConfig as u };
//# sourceMappingURL=config-749a8cc6.mjs.map
