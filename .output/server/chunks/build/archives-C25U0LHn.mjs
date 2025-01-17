import { _ as __nuxt_component_0 } from './nuxt-layout-BvRUML3s.mjs';
import { useSSRContext, defineComponent, withAsyncContext, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import _sfc_main$1 from './ProseImg-UDw7Et0R.mjs';
import { _ as _export_sfc, f as useRouter, q as queryContent, d as useSeoMeta, e as useNuxtApp } from './server.mjs';
import 'vue-router';
import './client-only-Bwxzq3Sq.mjs';
import '../nitro/nitro.mjs';
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
import 'unhead';
import '@unhead/shared';
import 'dayjs';
import 'dayjs/plugin/weekday.js';
import 'dayjs/plugin/advancedFormat.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';

const useDayjs = () => {
  const { $dayjs } = useNuxtApp();
  return $dayjs;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "archives",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const dayjs = useDayjs();
    const router = useRouter();
    let list = ([__temp, __restore] = withAsyncContext(() => queryContent("articles").only(["_path", "banner", "date", "description", "header", "tags", "img", "category", "title"]).limit(20).sort({ date: -1 }).find()), __temp = await __temp, __restore(), __temp);
    useSeoMeta({
      title: "\u5C0F\u4E66\u7AE5-\u5F52\u6863",
      ogTitle: "\u5C0F\u4E66\u7AE5-\u5F52\u6863",
      description: "\u6587\u7AE0\u5F52\u6863\uFF0C\u9762\u8BD5,codeing,javascript,Vue,React",
      ogDescription: "\u6587\u7AE0\u5F52\u6863\uFF0C\u9762\u8BD5,\u81EA\u7531\u5DE5\u4F5C,codeing,javascript,Vue,React",
      ogImage: "/img/logo.png",
      twitterCard: "summary_large_image"
    });
    const handleLink = (item) => router.push({ path: item._path });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container m-auto py-5" data-v-f4d4b4c5${_scopeId}><ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical" data-v-f4d4b4c5${_scopeId}><!--[-->`);
            ssrRenderList(unref(list), (item, index) => {
              _push2(`<li data-v-f4d4b4c5${_scopeId}>`);
              if (index > 0) {
                _push2(`<hr data-v-f4d4b4c5${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="timeline-middle" data-v-f4d4b4c5${_scopeId}><span class="i-mdi-clock-time-eight-outline" data-v-f4d4b4c5${_scopeId}></span></div><div class="${ssrRenderClass(`mb-10 ${index % 2 ? "md:text-end timeline-start" : "timeline-end"}`)}" data-v-f4d4b4c5${_scopeId}>`);
              if (item.date) {
                _push2(`<time class="font-mono italic" data-v-f4d4b4c5${_scopeId}>${ssrInterpolate(unref(dayjs)(item.date).format("YYYY-MM-DD"))}</time>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="card w-96 glass group cursor-pointer card-side bg-base-100 shadow hover:shadow-xl" data-v-f4d4b4c5${_scopeId}><figure class="w-40" data-v-f4d4b4c5${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                src: item.header,
                class: "md:h-60 max-h-32 w-40 object-cover",
                alt: item.title
              }, null, _parent2, _scopeId));
              _push2(`</figure><article class="flex-1 p-2 text-left" data-v-f4d4b4c5${_scopeId}><h2 class="text-lg font-semibold line-clamp-1" data-v-f4d4b4c5${_scopeId}>${ssrInterpolate(item.title)}</h2><p class="line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400" data-v-f4d4b4c5${_scopeId}>${ssrInterpolate(item.description)}</p></article></div></div><hr data-v-f4d4b4c5${_scopeId}></li>`);
            });
            _push2(`<!--]--></ul></div>`);
          } else {
            return [
              createVNode("div", { class: "container m-auto py-5" }, [
                createVNode("ul", { class: "timeline timeline-snap-icon max-md:timeline-compact timeline-vertical" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(list), (item, index) => {
                    return openBlock(), createBlock("li", {
                      key: index,
                      onClick: ($event) => handleLink(item)
                    }, [
                      index > 0 ? (openBlock(), createBlock("hr", { key: 0 })) : createCommentVNode("", true),
                      createVNode("div", { class: "timeline-middle" }, [
                        createVNode("span", { class: "i-mdi-clock-time-eight-outline" })
                      ]),
                      createVNode("div", {
                        class: `mb-10 ${index % 2 ? "md:text-end timeline-start" : "timeline-end"}`
                      }, [
                        item.date ? (openBlock(), createBlock("time", {
                          key: 0,
                          class: "font-mono italic"
                        }, toDisplayString(unref(dayjs)(item.date).format("YYYY-MM-DD")), 1)) : createCommentVNode("", true),
                        createVNode("div", { class: "card w-96 glass group cursor-pointer card-side bg-base-100 shadow hover:shadow-xl" }, [
                          createVNode("figure", { class: "w-40" }, [
                            createVNode(_sfc_main$1, {
                              src: item.header,
                              class: "md:h-60 max-h-32 w-40 object-cover",
                              alt: item.title
                            }, null, 8, ["src", "alt"])
                          ]),
                          createVNode("article", { class: "flex-1 p-2 text-left" }, [
                            createVNode("h2", { class: "text-lg font-semibold line-clamp-1" }, toDisplayString(item.title), 1),
                            createVNode("p", { class: "line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400" }, toDisplayString(item.description), 1)
                          ])
                        ])
                      ], 2),
                      createVNode("hr")
                    ], 8, ["onClick"]);
                  }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/archives.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const archives = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f4d4b4c5"]]);

export { archives as default };
//# sourceMappingURL=archives-C25U0LHn.mjs.map
