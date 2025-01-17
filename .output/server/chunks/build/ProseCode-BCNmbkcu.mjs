import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProseCode",
  __ssrInlineRender: true,
  props: {
    language: {
      type: String,
      default: null
    },
    class: {
      type: String,
      default: null
    },
    code: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: `py-3 my-2 overflow-auto rounded-md ${_ctx.$props.class}`
      }, _attrs))}><code>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</code></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ProseCode.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=ProseCode-BCNmbkcu.mjs.map
