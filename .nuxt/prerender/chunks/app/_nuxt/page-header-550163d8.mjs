import { _ as __nuxt_component_0 } from './client-only-29ef7f45.mjs';
import { y as defineStore, u as useHead, g as useRoute, h as useRuntimeConfig } from '../server.mjs';
import { ref, useSSRContext, defineComponent, computed, mergeProps, unref } from 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+vue@3.3.4/node_modules/vue/index.mjs';
import { u as useAppConfig } from './config-749a8cc6.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrRenderClass } from 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+vue@3.3.4/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const THEME = "site-theme";
const useAppStore = defineStore("app", () => {
  const lang = ref("zh_cn");
  const theme = ref("light");
  const setLang = (val) => {
    lang.value = val;
  };
  const setTheme = (val) => {
    localStorage.setItem(THEME, val);
    theme.value = val;
  };
  return {
    lang,
    setLang,
    theme,
    setTheme
  };
});
const useAppStore$1 = useAppStore;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "select-theme",
  __ssrInlineRender: true,
  setup(__props) {
    const themes = [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter"
    ];
    const store = useAppStore$1();
    const theme = computed(() => store.theme);
    useHead({
      htmlAttrs: {
        ["data-theme"]: theme.value || "light"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dropdown dropdown-bottom dropdown-end" }, _attrs))}><label tabindex="0" class="btn m-1 i-mdi-theme-light-dark"><span class="i-mdi-theme-light-dark"></span></label><div tabindex="1" class="dropdown-content z-[1] card card-compact p-2 shadow bg-primary text-primary-content" style="${ssrRenderStyle({ "width": "70vw" })}"><div class="card-body"><h3 class="card-title text-primary-content">${ssrInterpolate(unref(theme))}</h3><div class="rounded-box grid grid-cols-2 gap-4 sm:grid-cols-3 h-80 overflow-auto md:grid-cols-4 lg:grid-cols-5"><!--[-->`);
      ssrRenderList(themes, (item, index) => {
        _push(`<div class="border-base-content/20 hover:border-base-content/40 h-24 overflow-hidden w-34 rounded-lg border outline outline-2 outline-offset-2 outline-transparent"${ssrRenderAttr("data-set-theme", item)} data-act-class="!outline-base-content"><div${ssrRenderAttr("data-theme", item)} class="bg-base-100 text-base-content w-full cursor-pointer font-sans"><div class="grid grid-cols-5 grid-rows-3"><div class="bg-base-200 col-start-1 row-span-2 row-start-1"></div><div class="bg-base-300 col-start-1 row-start-3"></div><div class="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2"><div class="font-bold">${ssrInterpolate(item)}</div><div class="flex flex-wrap gap-1"><div class="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div class="text-primary-content text-sm font-bold">A</div></div><div class="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div class="text-secondary-content text-sm font-bold">A</div></div><div class="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div class="text-accent-content text-sm font-bold">A</div></div><div class="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div class="text-neutral-content text-sm font-bold">A</div></div></div></div></div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/select-theme.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "page-header",
  __ssrInlineRender: true,
  setup(__props) {
    const { headerMenu } = useAppConfig();
    const route = useRoute();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const app = config.app;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "page-header bg-base-300" }, _attrs))} data-v-42f6ee74><div class="flex-1" data-v-42f6ee74><div class="flex items-center cursor-pointer" data-v-42f6ee74><img${ssrRenderAttr("src", unref(app).logo)} class="h-8 mr-3"${ssrRenderAttr("alt", unref(app).title)} data-v-42f6ee74><span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white" data-v-42f6ee74>${ssrInterpolate(unref(app).title)}</span></div></div><div class="flex-none" data-v-42f6ee74><div class="flex items-center sm:order-2 md:hidden" data-v-42f6ee74>`);
      _push(ssrRenderComponent(_component_ClientOnly, {
        "fallback-tag": "span",
        fallback: "Loading comments..."
      }, {}, _parent));
      _push(`</div><div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" data-v-42f6ee74><ul class="menu menu-horizontal rounded-box" data-v-42f6ee74><!--[-->`);
      ssrRenderList(unref(headerMenu), (item, index) => {
        _push(`<li class="group" data-v-42f6ee74><span class="${ssrRenderClass(unref(route).path == `${unref(app).baseURL}${item.link}` ? "active" : "")}" data-v-42f6ee74>`);
        if (item.icon) {
          _push(`<span class="${ssrRenderClass(`${item.icon} text-xl`)}" data-v-42f6ee74></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(item.label)}</span></li>`);
      });
      _push(`<!--]--></ul>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div></div></nav>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/page-header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PageHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-42f6ee74"]]);

export { PageHeader as P };
//# sourceMappingURL=page-header-550163d8.mjs.map
