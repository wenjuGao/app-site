import { _ as __nuxt_component_0 } from './nuxt-layout-BvRUML3s.mjs';
import _sfc_main$1 from './ProseImg-UDw7Et0R.mjs';
import { defineComponent, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { f as useRouter, d as useSeoMeta } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const list = [
      {
        label: "\u65F6\u949F",
        url: "clock",
        img: "/img/laboratory/clock.jpg",
        description: "\u65F6\u949F\u65F6\u949F\u65F6\u949F\u65F6\u949F\u65F6\u949F\u65F6\u949F\u65F6\u949F"
      },
      {
        label: "\u623F\u8D37\u8BA1\u7B97\u5668",
        url: "interest-rate",
        img: "/img/laboratory/interest-rate.jpg",
        description: "\u623F\u8D37\u8BA1\u7B97\u5668\u623F\u8D37\u8BA1\u7B97\u5668\u623F\u8D37\u8BA1\u7B97\u5668\u623F\u8D37\u8BA1\u7B97\u5668\u623F\u8D37\u8BA1\u7B97\u5668\u623F\u8D37\u8BA1\u7B97\u5668"
      },
      {
        label: "\u56FE\u7247\u8F6Cbase64",
        url: "img-to-base64",
        img: "/img/laboratory/img-base.jpg",
        description: "\u56FE\u7247\u8F6Cbase64\u56FE\u7247\u8F6Cbase64\u56FE\u7247\u8F6Cbase64\u56FE\u7247\u8F6Cbase64\u56FE\u7247\u8F6Cbase64"
      },
      {
        label: "base64\u52A0\u89E3\u5BC6",
        url: "base64",
        img: "/img/laboratory/base64.jpg",
        description: "base64\u52A0\u89E3\u5BC6base64\u52A0\u89E3\u5BC6base64\u52A0\u89E3\u5BC6base64\u52A0\u89E3\u5BC6"
      },
      {
        label: "JSON\u683C\u5F0F\u5316",
        url: "json",
        img: "/img/laboratory/json.jpg",
        description: "JSON\u683C\u5F0F\u5316JSON\u683C\u5F0F\u5316JSON\u683C\u5F0F\u5316"
      },
      {
        label: "\u8F6C\u7801\u89E3\u7801",
        url: "encode-decode",
        img: "/img/laboratory/decode.jpg",
        description: "\u8F6C\u7801\u89E3\u7801\u8F6C\u7801\u89E3\u7801\u8F6C\u7801\u89E3\u7801"
      }
    ];
    const handleLink = (item) => {
      router.push(`//img/laboratory/${item.url}`);
    };
    useSeoMeta({
      title: "Codeing \u5B9E\u9A8C\u5BA4",
      ogTitle: "Codeing \u5B9E\u9A8C\u5BA4",
      description: "\u524D\u7AEF\u5F00\u53D1,\u5168\u804C\u5F00\u53D1,\u81EA\u7531\u5DE5\u4F5C,codeing,javascript,Vue,React",
      ogDescription: "\u524D\u7AEF\u5F00\u53D1,\u5168\u804C\u5F00\u53D1,\u81EA\u7531\u5DE5\u4F5C,codeing,javascript,Vue,React",
      ogImage: "/img/logo.png",
      twitterCard: "summary_large_image"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_ProseImg = _sfc_main$1;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container pb-24 m-auto"${_scopeId}><article class="prose w-full max-w-full py-10"${_scopeId}><h1${_scopeId}>Codeing \u5B9E\u9A8C\u5BA4</h1><p${_scopeId}> \u4E00\u4E9BIdea\uFF0C\u6837\u5F0F\u6216\u8005\u903B\u8F91\u6216\u8005\u6548\u679C\u7684\u6700\u5C0F\u5B9E\u73B0\uFF0C\u4E5F\u5305\u542B\u6574\u7406\u9047\u5230\u7684\u6709\u610F\u601D\u7684Idea\u3002\u5F53\u7136\u4E5F\u53EF\u4EE5\u57FA\u4E8E\u67D0\u4E2AIdea\u5B9E\u73B0\u4E2A\u4EBA\u5546\u4E1A\u9879\u76EE\uFF0C\u4E5F\u671F\u5F85\u5C0F\u4F19\u4F34\u7684\u52A0\u5165\u4E00\u8D77\u5FEB\u4E50coding\u3002 </p></article><div class="py-10"${_scopeId}><div class="grid md:grid-cols-4 sm:grid-cols-2 sm:gap-2 md:gap-4 gap-3 grid-cols-1"${_scopeId}><!--[-->`);
            ssrRenderList(list, (item) => {
              _push2(`<div className="bg-secondary-content cursor-pointer rounded w-full shadow-xl"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ProseImg, {
                src: item.img,
                class: `h-48 w-full object-cover rounded`,
                alt: item.label
              }, null, _parent2, _scopeId));
              _push2(`<div className="card-body py-2 px-2"${_scopeId}><div class="my-2"${_scopeId}><p className="text-lg font-medium"${_scopeId}>${ssrInterpolate(item.label)}</p></div><p className="text-sm font-thin"${_scopeId}>${ssrInterpolate(item.description)}</p></div></div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container pb-24 m-auto" }, [
                createVNode("article", { class: "prose w-full max-w-full py-10" }, [
                  createVNode("h1", null, "Codeing \u5B9E\u9A8C\u5BA4"),
                  createVNode("p", null, " \u4E00\u4E9BIdea\uFF0C\u6837\u5F0F\u6216\u8005\u903B\u8F91\u6216\u8005\u6548\u679C\u7684\u6700\u5C0F\u5B9E\u73B0\uFF0C\u4E5F\u5305\u542B\u6574\u7406\u9047\u5230\u7684\u6709\u610F\u601D\u7684Idea\u3002\u5F53\u7136\u4E5F\u53EF\u4EE5\u57FA\u4E8E\u67D0\u4E2AIdea\u5B9E\u73B0\u4E2A\u4EBA\u5546\u4E1A\u9879\u76EE\uFF0C\u4E5F\u671F\u5F85\u5C0F\u4F19\u4F34\u7684\u52A0\u5165\u4E00\u8D77\u5FEB\u4E50coding\u3002 ")
                ]),
                createVNode("div", { class: "py-10" }, [
                  createVNode("div", { class: "grid md:grid-cols-4 sm:grid-cols-2 sm:gap-2 md:gap-4 gap-3 grid-cols-1" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(list, (item) => {
                      return createVNode("div", {
                        key: item.url,
                        onClick: ($event) => handleLink(item),
                        className: "bg-secondary-content cursor-pointer rounded w-full shadow-xl"
                      }, [
                        createVNode(_component_ProseImg, {
                          src: item.img,
                          class: `h-48 w-full object-cover rounded`,
                          alt: item.label
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", { className: "card-body py-2 px-2" }, [
                          createVNode("div", { class: "my-2" }, [
                            createVNode("p", { className: "text-lg font-medium" }, toDisplayString(item.label), 1)
                          ]),
                          createVNode("p", { className: "text-sm font-thin" }, toDisplayString(item.description), 1)
                        ])
                      ], 8, ["onClick"]);
                    }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/laboratory/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-zm2IUFV2.mjs.map
