import { defineComponent, useSlots, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "G6Chart",
  __ssrInlineRender: true,
  props: {
    height: {
      type: String,
      default: "h-32"
    },
    container: {
      type: Object,
      default: {}
    },
    data: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    useSlots();
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-2 border bg-white dark:bg-black dark:border-gray-700 rounded" }, _attrs))}><div class="${ssrRenderClass(`w-full ${__props.height}`)}"></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/G6Chart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=G6Chart-CJLwtvGc.mjs.map
