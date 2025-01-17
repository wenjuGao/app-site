import _sfc_main$1 from './ContentSlot-7wg_687p.mjs';
import { defineComponent, getCurrentInstance, useSlots, computed, useSSRContext } from 'vue';
import './node-hwMnPqaI.mjs';

const _sfc_main = defineComponent({
  name: "Markdown",
  extends: _sfc_main$1,
  setup(props) {
    const { parent } = getCurrentInstance();
    const { between, default: fallbackSlot } = useSlots();
    const tags = computed(() => {
      if (typeof props.unwrap === "string") {
        return props.unwrap.split(" ");
      }
      return ["*"];
    });
    return {
      fallbackSlot,
      tags,
      between,
      parent
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@nuxt+content@2.13.4_nuxt@3.15.2_rollup@3.29.5_vue@3.5.13/node_modules/@nuxt/content/dist/runtime/components/Markdown.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=Markdown-BrEgL4JX.mjs.map
