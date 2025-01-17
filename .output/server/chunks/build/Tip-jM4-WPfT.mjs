import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot as ssrRenderSlot$1 } from 'vue/server-renderer';
import { f as flatUnwrap } from './node-hwMnPqaI.mjs';

const ssrRenderSlot = (slots, name, props, fallbackRenderFn, push, parentComponent, slotScopeId) => {
  if (slots[name]) {
    return ssrRenderSlot$1({ ...slots, [name]: () => flatUnwrap(slots[name](), props == null ? undefined : props.unwrap) }, name, props, fallbackRenderFn, push, parentComponent, slotScopeId);
  }
  return ssrRenderSlot$1(slots, name, props, fallbackRenderFn, push, parentComponent, slotScopeId);
};
const _sfc_main = {
  __name: "Tip",
  __ssrInlineRender: true,
  props: ["type"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-2" }, _attrs))}><p class="type">${ssrInterpolate(__props.type)}</p>`);
      ssrRenderSlot(_ctx.$slots, "default", { unwrap: "p" }, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/Tip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=Tip-jM4-WPfT.mjs.map
