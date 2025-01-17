import { _ as __nuxt_component_0 } from './nuxt-layout-BvRUML3s.mjs';
import { defineComponent, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { d as useSeoMeta } from './server.mjs';
import 'vue-router';
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
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "\u5C0F\u4E66\u7AE5-\u5173\u4E8E\u6211",
      ogTitle: "\u5C0F\u4E66\u7AE5-\u5173\u4E8E\u6211",
      description: "\u524D\u7AEF\u5F00\u53D1,\u5168\u804C\u5F00\u53D1,\u81EA\u7531\u5DE5\u4F5C,codeing,javascript,Vue,React",
      ogDescription: "\u524D\u7AEF\u5F00\u53D1,\u5168\u804C\u5F00\u53D1,\u81EA\u7531\u5DE5\u4F5C,codeing,javascript,Vue,React",
      ogImage: "/img/logo.png",
      twitterCard: "summary_large_image"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="container m-auto"${_scopeId}></section>`);
          } else {
            return [
              createVNode("section", { class: "container m-auto" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=about-BP7ZoPV8.mjs.map
