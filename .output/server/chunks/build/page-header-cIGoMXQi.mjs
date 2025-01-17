import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, unref, withCtx, createVNode, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import { _ as _export_sfc, g as useRoute, F as defineStore, t as useState, G as useRequestHeaders, a as useRuntimeConfig } from './server.mjs';
import { u as useAppConfig } from './config-GqaW2bTo.mjs';

const _imports_0 = publicAssetsURL("/img/logo.png");
const useAppStore = defineStore("app", () => {
  const lang = ref("zh_cn");
  const pin = ref(false);
  const setLang = (val) => {
    lang.value = val;
  };
  const setPin = (val) => {
    pin.value = val;
  };
  return {
    lang,
    setLang,
    pin,
    setPin
  };
});
const useLocale = () => useState("locale", () => useDefaultLocale().value);
const useDefaultLocale = (fallback = "en-US") => {
  var _a;
  const locale = ref(fallback);
  {
    const reqLocale = (_a = useRequestHeaders()["accept-language"]) == null ? undefined : _a.split(",")[0];
    if (reqLocale) {
      locale.value = reqLocale;
    }
  }
  return locale;
};
const useLocales = () => {
  const locale = useLocale();
  const locales = ref([
    {
      "value": "en-US",
      "__name": "English",
      "__flag": "\u{1F1EC}\u{1F1E7}"
    },
    {
      "value": "zh-CN",
      "__name": "\u4E2D\u6587",
      "__flag": "\u{1F1E8}\u{1F1F3}"
    }
  ]);
  if (!locales.value.some((i) => i.value === locale.value)) {
    locales.value.unshift({
      "value": locale.value,
      __name: "",
      __flag: ""
    });
  }
  return locales;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "page-header",
  __ssrInlineRender: true,
  setup(__props) {
    useLocales();
    useLocale();
    const { headerMenu } = useAppConfig();
    const route = useRoute();
    const config = useRuntimeConfig();
    const app = config.app;
    const appStore = useAppStore();
    const pin = computed(() => appStore.pin);
    const pageClass = computed(() => {
      if (pin.value) {
        return "page-header pin-header";
      }
      return "page-header unpin-header";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: unref(pageClass),
        key: unref(pageClass)
      }, _attrs))} data-v-043836ea><div class="container mx-auto my-1" data-v-043836ea><div class="flex-1" data-v-043836ea><div class="flex items-center cursor-pointer" data-v-043836ea><img${ssrRenderAttr("src", _imports_0)} class="md:h-8 h-6 mr-3"${ssrRenderAttr("alt", unref(app).title)} data-v-043836ea></div></div><div class="flex-none" data-v-043836ea><div class="flex items-center sm:order-2 md:hidden" data-v-043836ea>`);
      _push(ssrRenderComponent(_component_ClientOnly, {
        "fallback-tag": "span",
        fallback: "Loading"
      }, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ww-full h-full flex justify-center items-center" data-v-043836ea${_scopeId}><span className="loading loading-ring loading-lg" data-v-043836ea${_scopeId}></span></div>`);
          } else {
            return [
              createVNode("div", { class: "ww-full h-full flex justify-center items-center" }, [
                createVNode("span", { className: "loading loading-ring loading-lg" })
              ])
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" data-v-043836ea><ul class="menu p-0 menu-horizontal rounded-box" data-v-043836ea><!--[-->`);
      ssrRenderList(unref(headerMenu), (item, index) => {
        _push(`<li class="${ssrRenderClass(unref(route).path == `${unref(app).baseURL}${item.link}` ? "active group" : "group")}" data-v-043836ea>`);
        if (item.icon) {
          _push(`<span class="${ssrRenderClass(`${item.icon} text-2xl`)}" data-v-043836ea></span>`);
        } else {
          _push(`<!---->`);
        }
        if (!item.icon || !unref(pin)) {
          _push(`<!--[-->${ssrInterpolate(item.label)}<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
      _push(ssrRenderComponent(_component_ClientOnly, {
        "fallback-tag": "span",
        fallback: "Loading"
      }, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ww-full h-full flex justify-center items-center" data-v-043836ea${_scopeId}><span className="loading loading-ring loading-lg" data-v-043836ea${_scopeId}></span></div>`);
          } else {
            return [
              createVNode("div", { class: "ww-full h-full flex justify-center items-center" }, [
                createVNode("span", { className: "loading loading-ring loading-lg" })
              ])
            ];
          }
        })
      }, _parent));
      _push(`<div class="mx-3 p-1 flex cursor-pointer" data-v-043836ea><div class="${ssrRenderClass(`${unref(pin) ? "i-mdi-pin-outline" : "i-mdi-pin-off-outline"}  w-6 h-6`)}" data-v-043836ea></div></div></div></div></div></nav>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/page-header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const PageHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-043836ea"]]);

export { PageHeader as P };
//# sourceMappingURL=page-header-cIGoMXQi.mjs.map
