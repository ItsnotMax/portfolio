import { useSSRContext, ref, withAsyncContext, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, defineComponent, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderTeleport, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import { u as useHead } from './index-CCqbQxu4.mjs';
import { u as useFetch, a as useAsyncData } from './fetch-CGGzF4w1.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-lXYBLBCx.mjs';
import { gsap } from 'gsap';
import { _ as _export_sfc } from './server.mjs';
import '@unhead/shared';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import 'vue-router';

const _sfc_main$7 = {
  __name: "ModalWindow",
  __ssrInlineRender: true,
  emits: ["update:isModalOpen"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "reset-btn flex justify-center items-center z-[9999] inset-0 bg-[rgba(0,0,0,0.3)] fixed" }, _attrs))}><div class="w-[40vw] h-[50vh] bg-[rgb(255,255,255)] p-[1vw] border-8 border-gray-500 rounded-[1rem] shadow-[0_0_15px_10px_rgba(255,255,255,0.3)]">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ModalWindow.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "LinkAnimation",
  __ssrInlineRender: true,
  props: {
    imagesList: Array,
    CutenessTimeText: String
  },
  setup(__props) {
    const CutenessTimeTextAnimation = ref();
    const timelineShow = gsap.timeline({ paused: true });
    const timelineHidden = gsap.timeline({ paused: true });
    const props = __props;
    const showCutenessTime = () => {
      timelineShow.clear();
      timelineHidden.clear();
      timelineShow.play();
      CutenessTimeTextAnimation.value.forEach((letter, index) => {
        if (letter.textContent == " ")
          return;
        timelineShow.fromTo(
          letter,
          { opacity: 0, top: "-50%", rotation: -180 },
          { opacity: 1, top: 0, rotation: 0, scale: 3, duration: 0.2, delay: 0.01, ease: "linear" }
        );
      });
    };
    const hiddenCutenessTime = () => {
      const reversedArray = [...CutenessTimeTextAnimation.value].reverse();
      timelineShow.clear();
      timelineHidden.clear();
      reversedArray.forEach((letter, index) => {
        const opacity = parseFloat(letter.style.opacity);
        if (opacity >= 0.3) {
          timelineHidden.to(letter, { opacity: 0, top: "50%", rotate: 70, scale: 1, duration: 0.2, delay: 0.01, ease: "linear" });
        }
      });
      timelineHidden.play();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(ssrRenderComponent(_component_nuxt_link, mergeProps({
        href: "/time-for-cuteness",
        onMouseenter: showCutenessTime,
        onMouseleave: hiddenCutenessTime,
        class: "overflow-hidden border border-none rounded-[1.5rem] flex items-start relative"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="flex min-w-full h-full max-h-[inherit]"${_scopeId}><!--[-->`);
            ssrRenderList(props.imagesList, (path, index) => {
              _push2(`<li class="flex-1 transition-all duration-500 hover:flex-grow-[4] max-h-[inherit]"${_scopeId}><img${ssrRenderAttr("src", path)} alt="cuteness" class="w-full h-full object-cover max-h-[inherit]"${_scopeId}></li>`);
            });
            _push2(`<!--]--></ul><div class="absolute inset-0 flex items-center justify-center pointer-events-none xl:gap-x-8"${_scopeId}><!--[-->`);
            ssrRenderList(props.CutenessTimeText, (letter) => {
              _push2(`<div class="cute-char opacity-0 text-orange-500 relative"${_scopeId}>${ssrInterpolate(letter)}</div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("ul", { class: "flex min-w-full h-full max-h-[inherit]" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(props.imagesList, (path, index) => {
                  return openBlock(), createBlock("li", {
                    class: "flex-1 transition-all duration-500 hover:flex-grow-[4] max-h-[inherit]",
                    key: index
                  }, [
                    createVNode("img", {
                      src: path,
                      alt: "cuteness",
                      class: "w-full h-full object-cover max-h-[inherit]"
                    }, null, 8, ["src"])
                  ]);
                }), 128))
              ]),
              createVNode("div", { class: "absolute inset-0 flex items-center justify-center pointer-events-none xl:gap-x-8" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(props.CutenessTimeText, (letter) => {
                  return openBlock(), createBlock("div", { class: "cute-char opacity-0 text-orange-500 relative" }, toDisplayString(letter), 1);
                }), 256))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LinkAnimation.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 bg-white shadow-lg rounded-lg mt-2 mb-5" }, _attrs))}><div class="mb-2"><h5 class="text-xl font-bold text-gray-800 3xl:text-[1.5rem]">\u0418\u043C\u044F:</h5><p class="text-gray-700 text-[1rem] 3xl:text-[1.5rem]">\u041C\u0430\u043A\u0441\u0438\u043C, \u0430\u043A\u0442\u0438\u0432\u043D\u043E \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u044E\u0441\u044C \u0432\u043E \u0444\u0440\u043E\u043D\u0442\u0435\u043D\u0434\u0435.</p></div><div class="mb-2"><h5 class="text-xl font-bold text-gray-800 3xl:text-[1.5rem]">\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u043E:</h5><p class="text-gray-700 text-[1rem] 3xl:text-[1.5rem]">\u0418\u0449\u0443 \u043F\u0440\u043E\u0435\u043A\u0442\u044B \u0432 \u0441\u0444\u0435\u0440\u0435 \u0432\u0435\u0431-\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C Vue.js \u0438 TypeScript.</p></div><div class="mb-2"><h5 class="text-xl font-bold text-gray-800 3xl:text-[1.5rem]">\u0426\u0435\u043B\u044C:</h5><p class="text-gray-700 text-[1rem] 3xl:text-[1.5rem]">\u0420\u0430\u0437\u0432\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u0432 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0432\u0435\u0431-\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438.</p></div><div class="mb-2"><h5 class="text-xl font-bold text-gray-800 3xl:text-[1.5rem]">\u0418\u043D\u0442\u0435\u0440\u0435\u0441\u044B:</h5><p class="text-gray-700 text-[1rem] 3xl:text-[1.5rem]">\u0412\u0438\u0434\u0435\u043E\u0438\u0433\u0440\u044B, \u0431\u0430\u0441\u0441\u0435\u0439\u043D, \u0447\u0442\u0435\u043D\u0438\u0435 (\u041A\u0438\u043D\u0433, \u041F\u0440\u0430\u0442\u0447\u0435\u0442\u0442), \u0441\u043A\u0432\u043E\u0448 \u0438 \u0431\u0430\u0434\u043C\u0438\u043D\u0442\u043E\u043D.</p></div><div class="mb-2"><h5 class="text-xl font-bold text-gray-800 3xl:text-[1.5rem]">\u041F\u0440\u0435\u0434\u043F\u043E\u0447\u0438\u0442\u0430\u044E:</h5><p class="text-gray-700 text-[1rem] 3xl:text-[1.5rem]">\u041D\u0435\u0444\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043E\u0431\u0449\u0435\u043D\u0438\u0435. \u0424\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0443\u0431\u0438\u0432\u0430\u044E\u0442 \u043B\u0438\u0447\u043D\u043E\u0441\u0442\u044C. </p></div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Cutaway.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Cutaway = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CV",
  __ssrInlineRender: true,
  props: {
    isShowCV: { type: Boolean }
  },
  setup(__props) {
    ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg absolute inset-0 m-auto" }, _attrs))}><header class="text-center mb-8"><h1 class="text-4xl font-bold text-gray-800">\u041F\u0440\u0438\u0432\u0435\u0442, \u044F \u041C\u0430\u043A\u0441 \u2013 Frontend-\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A</h1></header><main><section class="mb-8"><h2 class="text-3xl font-semibold text-gray-700 mb-4">\u041E\u0431\u043E \u043C\u043D\u0435</h2><p class="text-lg text-gray-600 mb-4">\u042F \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u044E\u0441\u044C \u043D\u0430 \u0444\u0440\u043E\u043D\u0442\u0435\u043D\u0434-\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u0438 \u0430\u043A\u0442\u0438\u0432\u043D\u043E \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u044E\u0441\u044C \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u043C\u0438 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u044F\u043C\u0438. \u041C\u043D\u0435 \u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u0438 \u0438\u043D\u043D\u043E\u0432\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0432\u0435\u0431-\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F, \u0438 \u044F \u043C\u043D\u0435 \u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F \u0431\u044B\u0442\u044C \u0447\u0430\u0441\u0442\u044C\u044E \u043A\u043E\u043C\u0430\u043D\u0434\u044B.</p><ul class="list-disc list-inside text-lg text-gray-600"><li class="mb-3"><strong class="font-semibold">\u0412 \u0434\u0430\u043D\u043D\u044B\u0439 \u043C\u043E\u043C\u0435\u043D\u0442:</strong> \u0423\u0433\u043B\u0443\u0431\u043B\u044F\u044E \u0441\u0432\u043E\u0438 \u0437\u043D\u0430\u043D\u0438\u044F \u0432 Vue 3 \u0438 TypeScript.</li><li><strong class="font-semibold">\u041D\u0430\u0432\u044B\u043A\u0438:</strong></li><li>Vue 3 (\u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u044B, \u0440\u043E\u0443\u0442\u0438\u043D\u0433, \u0434\u0438\u0440\u0435\u043A\u0442\u0438\u0432\u044B) + Pinia</li><li>JavaScript ES6+ (\u043A\u043B\u0430\u0441\u0441\u044B, \u043F\u0440\u043E\u043C\u0438\u0441\u044B, \u043C\u043E\u0434\u0443\u043B\u0438)</li><li>TypeScript</li><li>HTML5, CSS3, SCSS (Flexbox, Grid, \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438)</li><li>\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438 JS (JQuery, GSAP)</li><li>RESTful API (fetch, Axios)</li><li>\u0421\u0438\u0441\u0442\u0435\u043C\u044B \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044F \u0432\u0435\u0440\u0441\u0438\u0439 (Git)</li><li>Figma (\u043C\u0430\u043A\u0435\u0442\u044B)</li><li>Local Storage, IndexedDB</li><li>Python</li></ul></section><section class="mb-8"><h2 class="text-3xl font-semibold text-gray-700 mb-4">\u041C\u043E\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u044B</h2><ul class="list-disc list-inside text-lg text-gray-600"><li><strong class="font-semibold">Bookshelf App:</strong> SPA \u043D\u0430 \u0431\u0430\u0437\u0435 Vue 3 \u0438 Pinia \u0434\u043B\u044F \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u044F \u043A\u043D\u0438\u0433.</li><li><strong class="font-semibold">CRM-\u0441\u0438\u0441\u0442\u0435\u043C\u0430:</strong> Vue 3 \u0441 \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0435\u0439 RESTful API.</li><li><strong class="font-semibold">React SPA:</strong> \u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043E \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C FakeAPI.</li><li><strong class="font-semibold">\u0410\u0434\u0430\u043F\u0442\u0438\u0432\u043D\u044B\u0439 \u0434\u0438\u0437\u0430\u0439\u043D:</strong> \u0420\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u044B \u0441\u043B\u043E\u0436\u043D\u044B\u0435 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438 \u043D\u0430 CSS \u0438 JavaScript.</li></ul><p class="mt-4 text-lg text-gray-600">\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u043C\u043E\u0439 GitHub: <a href="https://github.com/ItsnotMax/portfolio" target="_blank" class="text-blue-500 hover:underline">\u041F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E</a></p></section><section><h2 class="text-3xl font-semibold text-gray-700 mb-4">\u0426\u0435\u043B\u0438</h2><ul class="list-disc list-inside text-lg text-gray-600 mb-6"><li><strong class="font-semibold">\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u043E\u0441\u0442:</strong> \u0421\u0442\u0440\u0435\u043C\u043B\u044E\u0441\u044C \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u0432 \u0432\u0435\u0431-\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435, \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u044F \u0437\u043D\u0430\u043D\u0438\u044F JavaScript, TypeScript, Vue.js \u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439 \u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 \u0432\u0435\u0431-\u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432.</li><li><strong class="font-semibold">\u041A\u043E\u043C\u0430\u043D\u0434\u043D\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430:</strong> \u0413\u043E\u0442\u043E\u0432 \u0432\u043D\u0435\u0441\u0442\u0438 \u0432\u043A\u043B\u0430\u0434 \u0432 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B \u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0432 \u0434\u0438\u043D\u0430\u043C\u0438\u0447\u043D\u043E\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u0435.</li><li><strong class="font-semibold">\u041D\u0435\u043F\u0440\u0435\u0440\u044B\u0432\u043D\u043E\u0435 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435:</strong> \u0421\u0442\u0440\u0435\u043C\u043B\u044E\u0441\u044C \u0443\u0447\u0438\u0442\u044C\u0441\u044F \u0443 \u043E\u043F\u044B\u0442\u043D\u044B\u0445 \u043A\u043E\u043B\u043B\u0435\u0433 \u0438 \u0440\u0430\u0441\u0442\u0438 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E.</li></ul></section><section><h2 class="text-3xl font-semibold text-gray-700 mb-4">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</h2><ul class="flex justify-evenly text-lg text-gray-600 mb-8"><li>\u{1F4E7} Email: <a href="mailto:makc.9393@gmail.com" class="text-blue-500 hover:underline">makc.9393@gmail.com</a></li><li>\u{1F4F1} Telegram: <a href="https://t.me/UshiLolika" target="_blank" class="text-blue-500 hover:underline">@UshiLolika</a></li></ul></section></main></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CV.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "CutawayAnimation",
  __ssrInlineRender: true,
  props: {
    CVText: String
  },
  setup(__props) {
    ref([]);
    const isOpenCutaway = ref(false);
    ref();
    const showCV = ref(false);
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div style="${ssrRenderStyle(isOpenCutaway.value ? null : { display: "none" })}" class="reset-btn py-[0.5rem] px-[2rem] border border-black rounded-[1.5rem] flex flex-col items-start bg-white z-10">`);
      _push(ssrRenderComponent(Cutaway, {
        class: { "opacity-0": isOpenCutaway.value }
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        class: ["overflow-scroll not-scrollbar not-allocated", { "opacity-0": !isOpenCutaway.value }],
        style: showCV.value ? null : { display: "none" },
        isShowCV: showCV.value
      }, null, _parent));
      _push(`</div><div class="py-[0.5rem] px-[2rem] border border-black rounded-[1.5rem] flex flex-col items-start bg-white box">`);
      _push(ssrRenderComponent(Cutaway, {
        class: { "opacity-0": isOpenCutaway.value }
      }, null, _parent));
      _push(`<div class="reset-btn btn flex items-center justify-center"><!--[-->`);
      ssrRenderList(props.CVText, (letter, index) => {
        _push(`<div class="char opacity-0">${ssrInterpolate(letter)}</div>`);
      });
      _push(`<!--]--></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CutawayAnimation.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "MainBtn",
  __ssrInlineRender: true,
  props: {
    btnText: String
  },
  emits: ["update:isModalOpen"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({ class: "reset-btn pulse-button hvr-bounce-to-bottom" }, _attrs))} data-v-795e7de9>${ssrInterpolate(props.btnText)}</button>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MainBtn.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MainBtn = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-795e7de9"]]);
const _sfc_main$1 = {
  __name: "Carousel",
  __ssrInlineRender: true,
  props: {
    carouselData: Array
  },
  setup(__props) {
    const props = __props;
    const start = ref(1);
    const finish = ref(props.carouselData.length);
    ref(null);
    ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex w-[100%] h-[100%] relative cursor-default" }, _attrs))} data-v-f63589db><ul class="flex justify-start relative w-[100%] h-[100%] overflow-x-hidden overflow-y-scroll not-scrollbar" data-v-f63589db><!--[-->`);
      ssrRenderList(__props.carouselData, (element, index) => {
        _push(`<li class="min-w-[100%] bg-slate-50 relative p-4" data-v-f63589db><h5 class="text-[3rem] font-semibold text-gray-800 mb-2" data-v-f63589db>${ssrInterpolate(element.title)}</h5><p class="mb-8 text-[1.5rem] text-gray-600" data-v-f63589db>${ssrInterpolate(element.description)}</p>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: element.link,
          target: "_blank",
          rel: "noopener noreferrer",
          class: "text-[1.5rem] inline-block bg-blue-500 text-white border border-blue-700 rounded px-4 py-2 hover:bg-blue-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u0421\u0441\u044B\u043B\u043A\u0430 `);
            } else {
              return [
                createTextVNode(" \u0421\u0441\u044B\u043B\u043A\u0430 ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
      if (start.value != 1) {
        _push(`<button type="button" class="reset-btn absolute arrow--left" data-v-f63589db></button>`);
      } else {
        _push(`<!---->`);
      }
      if (start.value != finish.value) {
        _push(`<button type="button" class="reset-btn absolute arrow--right" data-v-f63589db></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Carousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Carousel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f63589db"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "\u0412\u0438\u0437\u0438\u0442\u043A\u0430"
    });
    const imagesList = ref();
    const isModalOpen = ref(false);
    const { data: carouselData } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/links`, "$PslAyef5YX")), __temp = await __temp, __restore(), __temp);
    [__temp, __restore] = withAsyncContext(async () => useAsyncData("items", async () => {
      try {
        const response = await fetch("/api/cuteness");
        const data = await response.json();
        imagesList.value = Array.from(data).slice(1, 4);
      } catch (error) {
        imagesList.value = [];
      }
      return;
    })), __temp = await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalWindow = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid bg-white border border-black rounded-[1.5rem] shadow-[0px_0px_0.75rem_0.25rem_rgba(0,_0,_0,_0.5)] p-[2vw] gap-[2rem] text-[2rem] md:p-[1vw] md:gap-[1rem] md:text-[1rem] lg:p-[1.5vw] lg:gap-[1.5rem] lg:text-[1.5rem] xl:p-[2vw] xl:gap-[2rem] xl:text-[2rem] 2xl:p-[3vw] 2xl:gap-[3rem] 2xl:text-[2.5rem] bg-[linear-gradient(to_top,_#8C5A77,_#4A6DAF)]" }, _attrs))}><div class="flex justify-center items-center relative">`);
      _push(ssrRenderComponent(MainBtn, {
        btnText: "\u0421\u043F\u0438\u0441\u043E\u043A \u0440\u0430\u0431\u043E\u0442",
        isModalOpen: isModalOpen.value,
        "onUpdate:isModalOpen": ($event) => isModalOpen.value = $event
      }, null, _parent));
      _push(`</div><div class="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-[2rem] text-[1.333rem] md:text-[1rem] lg:text-[1.25rem] xl:text-[1.5rem] xl:grid-rows-[441px] 2xl:text-[1.75rem] 2xl:grid-cols-[repeat(2,_minmax(200px,_1fr))] 3xl:grid-rows-[500px]">`);
      _push(ssrRenderComponent(_sfc_main$3, { CVText: "\u0420\u0435\u0437\u044E\u043C\u0435" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$6, {
        CutenessTimeText: "\u041C\u0438\u043B\u0430\u0445\u0430",
        imagesList: imagesList.value
      }, null, _parent));
      _push(`</div>`);
      if (isModalOpen.value) {
        ssrRenderTeleport(_push, (_push2) => {
          _push2(ssrRenderComponent(_component_ModalWindow, {
            isModalOpen: isModalOpen.value,
            "onUpdate:isModalOpen": ($event) => isModalOpen.value = $event
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(Carousel, { carouselData: unref(carouselData) }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(Carousel, { carouselData: unref(carouselData) }, null, 8, ["carouselData"])
                ];
              }
            }),
            _: 1
          }, _parent));
        }, "body", false, _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BncAO-Qx.mjs.map
