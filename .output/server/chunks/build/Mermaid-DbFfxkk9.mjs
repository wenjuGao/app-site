import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "Mermaid",
  __ssrInlineRender: true,
  props: {
    code: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    ref(false);
    const props = __props;
    const decodedCode = computed(() => props.code);
    ref(null);
    const isDiagramLoading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<figure${ssrRenderAttrs(mergeProps({
        ref: "root",
        class: "mermaid-container"
      }, _attrs))}><pre class="${ssrRenderClass({
        "opacity-0": unref(isDiagramLoading)
      })}">${ssrInterpolate(unref(decodedCode))}</pre></figure>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/Mermaid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=Mermaid-DbFfxkk9.mjs.map
