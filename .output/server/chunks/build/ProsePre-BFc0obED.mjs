import { defineComponent, ref, unref, mergeProps, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs } from 'vue/server-renderer';
import _sfc_main$1 from './Mermaid-DbFfxkk9.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProsePre",
  __ssrInlineRender: true,
  props: {
    class: {
      type: String,
      default: null
    },
    code: {
      type: String,
      default: ""
    },
    language: {
      type: String,
      default: null
    },
    filename: {
      type: String,
      default: null
    },
    highlights: {
      type: Array,
      default: () => []
    },
    meta: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const isMermaid = ref(props.language === "mermaid");
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(isMermaid)) {
        _push(ssrRenderComponent(_sfc_main$1, mergeProps({
          class: _ctx.$props.class,
          code: props.code
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<pre${ssrRenderAttrs(mergeProps({
          class: _ctx.$props.class
        }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</pre>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ProsePre.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=ProsePre-BFc0obED.mjs.map
