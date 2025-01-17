import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { useSSRContext, defineComponent, unref } from 'vue';
import { ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc, a as useRuntimeConfig } from './server.mjs';
import { P as PageHeader } from './page-header-cIGoMXQi.mjs';
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
import 'vue-router';
import 'dayjs';
import 'dayjs/plugin/weekday.js';
import 'dayjs/plugin/advancedFormat.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import './config-GqaW2bTo.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "page-footer",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const app = config.app;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><footer class="py-10 border-t mt-20 page-footer" data-v-093260d9><div class="container m-auto" data-v-093260d9><div class="text-base-content px-4 md:px-0 footer items-end justify-between" data-v-093260d9><div class="flex" data-v-093260d9><img${ssrRenderAttr("src", unref(app).footLogo)} class="h-24 mr-3"${ssrRenderAttr("alt", unref(app).title)} data-v-093260d9><p class="flex-1" data-v-093260d9>${ssrInterpolate(unref(app).description)}</p></div></div></div></footer><footer class="footer py-4 text-base-content page-footer" data-v-093260d9><div class="container px-4 md:px-0 justify-between flex flex-wrap m-auto" data-v-093260d9><aside class="items-center grid-flow-col" data-v-093260d9><p class="leading-10" data-v-093260d9> Powered by <a class="ink link-info mr-2" href="https://nuxt.com" data-v-093260d9>Nuxtjs</a><a class="ink link-info" href="https://tailwindcss.com" data-v-093260d9>tailwindcss</a><a class="ink link-info" href="https://tailwindcss.com" data-v-093260d9>Typescript</a></p></aside><nav class="md:place-self-center md:justify-self-end" data-v-093260d9><div class="site-num" data-v-093260d9><span id="busuanzi_container_site_pv" class="site-pv site-item" data-v-093260d9><span class="site-label" data-v-093260d9><span class="i-mdi-chart-multiple" data-v-093260d9></span> \u8BBF\u95EE\u91CF </span><em id="busuanzi_value_site_pv" data-v-093260d9></em></span><span id="busuanzi_container_site_uv" class="site-uv site-item" data-v-093260d9><span class="site-label" data-v-093260d9><span class="i-mdi-cursor-default-click-outline" data-v-093260d9></span> \u8BBF\u5BA2\u91CF </span><em id="busuanzi_value_site_uv" data-v-093260d9></em></span><span id="busuanzi_container_page_pv" class="page-pv site-item" data-v-093260d9><span class="site-label" data-v-093260d9><span class="i-mdi-chart-timeline-variant-shimmer" data-v-093260d9></span> \u672C\u9875\u8BBF\u5BA2 </span><em id="busuanzi_value_page_pv" data-v-093260d9></em></span></div></nav></div></footer><footer class="footer footer-center p-4 page-footer text-base-content" data-v-093260d9><div class="container m-auto" data-v-093260d9><aside data-v-093260d9><p data-v-093260d9>Copyright \xA9 2024 - All right reserved by wenjugao\u2019blog</p> \u7696ICP\u590720001994\u53F7 </aside></div></footer><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/page-footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const PageFooter = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-093260d9"]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(PageHeader, null, null, _parent));
      _push(`<main class="px-4 md:px-0 default-main" data-v-c4f16813>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(PageFooter, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c4f16813"]]);

export { _default as default };
//# sourceMappingURL=default-BvsRRTeT.mjs.map
