import { _ as __nuxt_component_0$1 } from './nuxt-layout-BvRUML3s.mjs';
import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { useSSRContext, defineComponent, ref, withAsyncContext, mergeProps, withCtx, createVNode, unref, reactive } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, q as queryContent, f as useRouter, d as useSeoMeta } from './server.mjs';
import { u as useAppConfig } from './config-GqaW2bTo.mjs';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import 'vue-router';
import 'unhead';
import '@unhead/shared';
import 'dayjs';
import 'dayjs/plugin/weekday.js';
import 'dayjs/plugin/advancedFormat.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'qiniu';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "page-banner",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const loading = ref(true);
    [__temp, __restore] = withAsyncContext(() => queryContent("articles").only(["_path", "banner", "date", "description", "header", "tags", "img", "category", "title"]).sort({ date: -1 }).where({ banner: true }).limit(5).find()), __temp = await __temp, __restore();
    loading.value = false;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(ssrRenderComponent(_component_ClientOnly, mergeProps({
        "fallback-tag": "span",
        fallback: "Loading"
      }, _attrs), {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="skeleton w-full h-full min-h-52 rounded-box my-3" data-v-9f8fe3cb${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "skeleton w-full h-full min-h-52 rounded-box my-3" })
            ];
          }
        })
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/page-banner.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : undefined;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-9f8fe3cb"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "list-item",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useRouter();
    const list = ([__temp, __restore] = withAsyncContext(() => queryContent("articles").only(["_path", "banner", "date", "description", "header", "tags", "img", "category", "title"]).sort({ date: -1 }).find()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "list-item-container" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(list), (item, index2) => {
        _push(`<div class="card mb-3 group border-solid cursor-pointer transition-all border md:card-side bg-base-100 shadow hover:shadow-xl">`);
        _push(ssrRenderComponent(_component_ClientOnly, {
          "fallback-tag": "span",
          fallback: "Loading"
        }, {
          fallback: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="skeleton w-full h-full min-h-40 md:max-w-[180px] md:min-w-[120px]"${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { class: "skeleton w-full h-full min-h-40 md:max-w-[180px] md:min-w-[120px]" })
              ];
            }
          })
        }, _parent));
        _push(`<div class="card-body flex-1 p-4"><h2 class="card-title line-clamp-1 break-all">${ssrInterpolate(item.title)}</h2><p class="text-gray-700 line-clamp-2 dark:text-gray-300">${ssrInterpolate(item.description)}</p><div class="px-6 card-actions justify-end py-4"><!--[-->`);
        ssrRenderList(item.tags, (tag, key) => {
          _push(`<!--[-->`);
          if (key < 4) {
            _push(`<span class="badge cursor-pointer">#${ssrInterpolate(tag)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/list-item.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined;
};
const _sfc_main$3 = {
  __name: "my-card",
  __ssrInlineRender: true,
  setup(__props) {
    const { myInfo } = useAppConfig();
    reactive({
      tags: 0,
      categories: 0,
      totals: 0
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card my-card bg-base-100 overflow-hidden shadow-2xl rounded-2xl" }, _attrs))}><svg class="absolute w-0 h-0"><clipPath id="my-clip-path" clipPathUnits="objectBoundingBox" stroke="white" stroke-width="2"><path d="M0.001,0.031 C0.001,0.014,0.026,0.001,0.055,0.001 H0.492 C0.506,0.001,0.52,0.004,0.53,0.009 L0.61,0.052 C0.62,0.057,0.634,0.06,0.649,0.06 H0.947 C0.977,0.06,1,0.074,1,0.091 V0.971 C1,0.987,0.977,1,0.947,1 H0.055 C0.026,1,0.001,0.987,0.001,0.971 V0.031"></path></clipPath></svg><figure><img${ssrRenderAttr("src", unref(myInfo).bgImg)} class="h-40 object-cover w-full"></figure><div class="card-body card-message"><div class="avatar"><div class="w-24 m-auto rounded-full"><img lass="mask mask-decagon"${ssrRenderAttr("src", unref(myInfo).avatar)}></div></div><h2 class="card-title text-lg justify-center mt-3">${ssrInterpolate(unref(myInfo).name)}</h2><p class="break-all mt-3 chat-footer opacity-50">${ssrInterpolate(unref(myInfo).desc)}</p><div class="flex flex-row justify-between mt-6"></div>`);
      if (unref(myInfo) && unref(myInfo).links && unref(myInfo).links.length) {
        _push(`<!--[--><div class="divider m-0"></div><div class="flex flex-row justify-between mt-3"><!--[-->`);
        ssrRenderList(unref(myInfo).links, (item, index2) => {
          _push(`<a${ssrRenderAttr("title", item.label)}${ssrRenderAttr("href", item.link)} target="_blank" class="w-7 h-7" rel="noopener noreferrer"><img${ssrRenderAttr("src", item.img)}${ssrRenderAttr("alt", item.label)} class="object-cover w-7 h-7"></a>`);
        });
        _push(`<!--]--></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/my-card.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined;
};
const _imports_0 = publicAssetsURL("/img/my-wechat.png");
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card w-full bg-base-100 shadow-xl" }, _attrs))}><div class="card-body p-4 pt-2"><h4 class="card-title text-lg"><span class="i-mdi-wechat"></span> \u5FAE\u4FE1\u516C\u4F17\u53F7\u53F7 </h4><div class="divider m-0 h-0.5"></div><img${ssrRenderAttr("src", _imports_0)} class="w-full" alt="" srcset=""></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/we-chat.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const weChat = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "home-side",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`<div class="mt-4">`);
      _push(ssrRenderComponent(weChat, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home-side.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "\u5C0F\u4E66\u7AE5",
      ogTitle: "\u5C0F\u4E66\u7AE5",
      description: "\u524D\u7AEF\u5F00\u53D1,\u5168\u804C\u5F00\u53D1,\u81EA\u7531\u5DE5\u4F5C,codeing,javascript,Vue,React",
      ogDescription: "\u524D\u7AEF\u5F00\u53D1,\u5168\u804C\u5F00\u53D1,\u81EA\u7531\u5DE5\u4F5C,codeing,javascript,Vue,React",
      ogImage: "/img/logo.png",
      twitterCard: "summary_large_image"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0$1;
      const _component_page_banner = __nuxt_component_1;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container pb-24 m-auto" data-v-37e89888${_scopeId}>`);
            _push2(ssrRenderComponent(_component_page_banner, null, null, _parent2, _scopeId));
            _push2(`<div class="flex mt-5 flex-row" data-v-37e89888${_scopeId}><div class="flex-1 pb-20" data-v-37e89888${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, null, null, _parent2, _scopeId));
            _push2(`</div><div class="right-side h-fit hidden md:block w-72 pl-4" data-v-37e89888${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container pb-24 m-auto" }, [
                createVNode(_component_page_banner),
                createVNode("div", { class: "flex mt-5 flex-row" }, [
                  createVNode("div", { class: "flex-1 pb-20" }, [
                    createVNode(_sfc_main$4)
                  ]),
                  createVNode("div", { class: "right-side h-fit hidden md:block w-72 pl-4" }, [
                    createVNode(_sfc_main$1)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-37e89888"]]);

export { index as default };
//# sourceMappingURL=index-2g03QGd8.mjs.map
