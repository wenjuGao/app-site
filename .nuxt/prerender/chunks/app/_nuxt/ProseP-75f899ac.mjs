import { ssrRenderAttrs, ssrRenderSlot } from 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+vue@3.3.4/node_modules/vue/server-renderer/index.mjs';
import { useSSRContext } from 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+vue@3.3.4/node_modules/vue/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<p${ssrRenderAttrs(_attrs)}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</p>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/registry.npmjs.org+@nuxt+content@2.7.2_rollup@3.28.1/node_modules/@nuxt/content/dist/runtime/components/Prose/ProseP.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProseP = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { ProseP as default };
//# sourceMappingURL=ProseP-75f899ac.mjs.map
