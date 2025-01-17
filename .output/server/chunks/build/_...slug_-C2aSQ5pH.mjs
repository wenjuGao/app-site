import { _ as __nuxt_component_0 } from './nuxt-layout-BvRUML3s.mjs';
import { _ as __nuxt_component_0$1 } from './client-only-Bwxzq3Sq.mjs';
import _sfc_main$5 from './ContentRenderer-CCXOBWb1.mjs';
import _sfc_main$6 from './ContentRendererMarkdown-DMZ1pHoD.mjs';
import { useSSRContext, defineComponent, ref, withAsyncContext, withCtx, createVNode, unref, toDisplayString, openBlock, createBlock, createCommentVNode, mergeProps } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { g as useRoute, q as queryContent, b as useContent, d as useSeoMeta, _ as _export_sfc, f as useRouter } from './server.mjs';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import _sfc_main$4 from './ProseImg-UDw7Et0R.mjs';
import 'vue-router';
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
import 'property-information';
import './node-hwMnPqaI.mjs';
import 'unhead';
import '@unhead/shared';
import 'dayjs';
import 'dayjs/plugin/weekday.js';
import 'dayjs/plugin/advancedFormat.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';

const _sfc_main$3 = {
  __name: "twikoo-comment",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "tcomment" }, _attrs))}></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/twikoo-comment.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "toc-menu",
  __ssrInlineRender: true,
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "w-full box-border" }, _attrs))} data-v-79f9635a><!--[-->`);
      ssrRenderList(props.list, (item, key) => {
        _push(`<li data-v-79f9635a><a${ssrRenderAttr("href", `#${item.id}`)}${ssrRenderAttr("data-value", item.id)} class="${ssrRenderClass(`toc-item ${item.depth <= 2 ? "font-semibold" : ""}`)}" data-v-79f9635a>${ssrInterpolate(item.text)}</a>`);
        if (item.children && item.children.length) {
          _push(ssrRenderComponent(tocMenu, {
            list: item.children,
            style: `width:calc(100% - 20px);`
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/toc-menu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const tocMenu = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-79f9635a"]]);
const _imports_0 = publicAssetsURL("/img/empty.png");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "empty-card",
  __ssrInlineRender: true,
  props: {
    emptyText: {
      type: String,
      default: "woos! \u672A\u67E5\u8BE2\u5230\u4F60\u8981\u67E5\u770B\u7684\u5185\u5BB9"
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "empty" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "image", {}, () => {
        _push(`<img class="w-28 h-28"${ssrRenderAttr("src", _imports_0)}>`);
      }, _push, _parent);
      _push(`<div class="mt-8 gray-400 text-sm">${ssrInterpolate(props.emptyText)}</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/empty-card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const handleLink = (link, router) => router.push(link);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const doc = ref({});
    const result = ([__temp, __restore] = withAsyncContext(() => queryContent("articles").where({
      _path: route.path
    }).findOne()), __temp = await __temp, __restore(), __temp);
    if (Array.isArray(result)) {
      doc.value = result.find((i) => i._path === route.path) || {};
    } else {
      doc.value = result || {};
    }
    const { next, prev, page, toc } = useContent();
    useSeoMeta({
      title: page.title,
      ogTitle: page.title,
      description: page.description,
      ogDescription: page.description,
      ogImage: "/img/logo.png",
      twitterCard: "summary_large_image"
    });
    const handleClick = (url) => handleLink(url, useRouter());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_0$1;
      const _component_ContentRenderer = _sfc_main$5;
      const _component_ContentRendererMarkdown = _sfc_main$6;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="px-1.5 md:container md:m-auto pb-24"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ClientOnly, { "fallback-tag": "div" }, {
              fallback: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-full min-h-64 flex justify-center items-center"${_scopeId2}><div class="text-center"${_scopeId2}><span className="loading loading-ring loading-lg"${_scopeId2}></span><article class="prose"${_scopeId2}><p${_scopeId2}> \u52A0\u8F7D\u4E2D\u8BF7\u7A0D\u540E... </p></article></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-full min-h-64 flex justify-center items-center" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("span", { className: "loading loading-ring loading-lg" }),
                        createVNode("article", { class: "prose" }, [
                          createVNode("p", null, " \u52A0\u8F7D\u4E2D\u8BF7\u7A0D\u540E... ")
                        ])
                      ])
                    ])
                  ];
                }
              })
            }, _parent2, _scopeId));
            _push2(`</main>`);
          } else {
            return [
              createVNode("main", { class: "px-1.5 md:container md:m-auto pb-24" }, [
                createVNode(_component_ClientOnly, { "fallback-tag": "div" }, {
                  fallback: withCtx(() => [
                    createVNode("div", { class: "w-full min-h-64 flex justify-center items-center" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("span", { className: "loading loading-ring loading-lg" }),
                        createVNode("article", { class: "prose" }, [
                          createVNode("p", null, " \u52A0\u8F7D\u4E2D\u8BF7\u7A0D\u540E... ")
                        ])
                      ])
                    ])
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_ContentRenderer, { value: unref(doc) }, {
                      empty: withCtx(() => [
                        createVNode(_sfc_main$1)
                      ]),
                      default: withCtx(() => [
                        createVNode("article", { class: "relative isolate flex justify-center lg:px-2 lg:pt-10 pt-4 lg:overflow-visible" }, [
                          createVNode("div", { class: "grow md:pr-2 lg:pr-4 overflow-auto box-content" }, [
                            createVNode("h1", { class: "mt-2 lg:text-3xl md::text-2xl text-xl font-bold tracking-tight break-all sm:text-4xl" }, toDisplayString(unref(doc).title), 1),
                            unref(doc).header ? (openBlock(), createBlock(_sfc_main$4, {
                              key: 0,
                              class: "mt-6 object-cover min-h-20 max-h-80 max-w-full m-auto",
                              src: unref(doc).header,
                              alt: unref(doc).title
                            }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                            unref(doc).description ? (openBlock(), createBlock("p", {
                              key: 1,
                              innerHTML: unref(doc).description.replace(/\\n/g, "<br/>"),
                              class: "mt-6 text-md rounded-xl break-all text-left bg-base-200 p-2 leading-8"
                            }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                            createVNode("div", { class: "article-content mt-6 mb-6 light:text-accent-content article leading-7 break-all" }, [
                              createVNode(_component_ContentRendererMarkdown, { value: unref(doc) }, null, 8, ["value"])
                            ]),
                            createVNode("div", { class: "divider" }),
                            unref(prev) || unref(next) ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: "grid md:grid-cols-2 grid-cols-1 md:gap-2"
                            }, [
                              unref(prev) ? (openBlock(), createBlock("div", {
                                key: 0,
                                onClick: ($event) => handleClick(unref(prev)._path),
                                class: "cursor-pointer link-page dark:bg-slate-800 dark:highlight-white/5 mr-auto"
                              }, [
                                createVNode(_sfc_main$4, {
                                  class: "!w-28 h-28 rounded-bl shadow-lg",
                                  src: unref(prev).header,
                                  alt: unref(prev).title
                                }, null, 8, ["src", "alt"]),
                                createVNode("div", { class: "w-full flex-1 pl-2" }, [
                                  createVNode("div", { class: "text-slate-900 font-medium text-sm sm:text-base truncate dark:text-slate-200" }, " \u4E0A\u4E00\u7BC7 "),
                                  createVNode("div", { class: "text-slate-500 font-medium text-sm sm:text-base leading-tight truncate dark:text-slate-400" }, toDisplayString(unref(prev).title), 1)
                                ])
                              ], 8, ["onClick"])) : createCommentVNode("", true),
                              unref(next) ? (openBlock(), createBlock("div", {
                                key: 1,
                                onClick: ($event) => handleClick(unref(next)._path),
                                class: "cursor-pointer link-page dark:bg-slate-800 dark:highlight-white/5 ml-auto"
                              }, [
                                createVNode(_sfc_main$4, {
                                  class: "!w-28 h-28 rounded-bl shadow-lg",
                                  src: unref(next).header,
                                  alt: unref(next).title
                                }, null, 8, ["src", "alt"]),
                                createVNode("div", { class: "w-full flex-1 pl-2" }, [
                                  createVNode("div", { class: "text-slate-900 font-medium text-sm sm:text-base truncate dark:text-slate-200" }, " \u4E0B\u4E00\u7BC7 "),
                                  createVNode("div", { class: "text-slate-500 font-medium text-sm sm:text-base leading-tight truncate dark:text-slate-400" }, toDisplayString(unref(next).title), 1)
                                ])
                              ], 8, ["onClick"])) : createCommentVNode("", true)
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "mt-20" }, [
                              createVNode(_sfc_main$3)
                            ])
                          ]),
                          createVNode("div", { class: "toc menu sticky top-20" }, [
                            createVNode(tocMenu, {
                              list: unref(toc) ? unref(toc).links : []
                            }, null, 8, ["list"])
                          ])
                        ])
                      ]),
                      _: 1
                    }, 8, ["value"])
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/articles/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-C2aSQ5pH.mjs.map
