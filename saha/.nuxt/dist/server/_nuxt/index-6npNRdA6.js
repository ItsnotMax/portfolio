import { defineComponent, ref, computed, mergeProps, useSSRContext, shallowRef, toRef, getCurrentInstance, onServerPrefetch, unref, withCtx, openBlock, createBlock, Fragment, renderList, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { b as useNuxtApp, e as asyncDataDefaults, f as createError, c as useRuntimeConfig } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FolderTree",
  __ssrInlineRender: true,
  props: {
    folders: {
      type: Object,
      required: true
    },
    activeId: {
      type: Number || null
    }
  },
  emits: ["select", "foldersIdShow"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const foldersIdShow = ref(null);
    const isActive = computed(() => props.activeId === props.folders.id);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FolderTree = _sfc_main$2;
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "w-[fit-content]" }, _attrs))}><div class="flex gap-4 items-center"><button class="${ssrRenderClass([{
        "text-green-500": isActive.value,
        "cursor-not-allowed": __props.folders.children.length === 0
      }, "cursor-pointer"])}">${ssrInterpolate(__props.folders.name)}</button><button class="${ssrRenderClass([{ "text-green-500": isActive.value }, "cursor-pointer text-[10px] p-2 bg-amber-400 rounded-lg"])}">${ssrInterpolate(__props.activeId && __props.activeId === __props.folders.id ? "Отменить" : "Выбрать")}</button></div>`);
      if (foldersIdShow.value === props.folders.id && __props.folders.children.length > 0) {
        _push(`<ul class="flex flex-col py-3 gap-2 px-5"><!--[-->`);
        ssrRenderList(__props.folders.children, (child) => {
          _push(ssrRenderComponent(_component_FolderTree, {
            key: child.id,
            folders: child,
            activeId: __props.activeId,
            onSelect: ($event) => emit("select", $event)
          }, null, _parent));
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FolderTree.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ModalWindow",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    }
  },
  emits: ["update:closeWindow"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center z-[9999] inset-0 bg-[rgba(0,0,0,0.3)] fixed" }, _attrs))}><div class="relative cursor-default w-[60vw] h-[80vh] bg-[rgb(255,255,255)] p-[1vw] border-8 border-gray-500 rounded-[1rem] shadow-[0_0_15px_10px_rgba(255,255,255,0.3)]"><h5>${ssrInterpolate(props.title)}:</h5>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<button class="absolute bottom-3 right-3 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-6"> Закрыть </button></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ModalWindow.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a, _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  const handler = !import.meta.prerender || !((_a = nuxtApp.ssrContext) == null ? void 0 : _a._sharedPrerenderCache) ? _handler : () => {
    const value = nuxtApp.ssrContext._sharedPrerenderCache.get(key);
    if (value) {
      return value;
    }
    const promise = Promise.resolve().then(() => nuxtApp.runWithContext(_handler));
    nuxtApp.ssrContext._sharedPrerenderCache.set(key, promise);
    return promise;
  };
  const getDefault = () => asyncDataDefaults.value;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = options.server ?? true;
  options.default = options.default ?? getDefault;
  options.getCachedData = options.getCachedData ?? getDefaultCachedData;
  options.lazy = options.lazy ?? false;
  options.immediate = options.immediate ?? true;
  options.deep = options.deep ?? asyncDataDefaults.deep;
  options.dedupe = options.dedupe ?? "cancel";
  const initialCachedData = options.getCachedData(key, nuxtApp);
  const hasCachedData = initialCachedData != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_b = nuxtApp.payload._errors)[key] ?? (_b[key] = asyncDataDefaults.errorValue);
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref(hasCachedData ? initialCachedData : options.default()),
      pending: ref(!hasCachedData),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle"),
      _default: options.default
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  delete asyncData._default;
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer(opts.dedupe ?? options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial || nuxtApp.isHydrating && opts._initial !== false) {
      const cachedData = opts._initial ? initialCachedData : options.getCachedData(key, nuxtApp);
      if (cachedData != null) {
        return Promise.resolve(cachedData);
      }
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = asyncDataDefaults.errorValue;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    if (nuxtApp._asyncDataPromises[key]) {
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const isModalOpen = ref(false);
    const activeFolderId = ref(null);
    const onDisplay = ref(null);
    const { data: foldersData } = useAsyncData(
      "mockFolders",
      () => {
        return $fetch(config.public.getURL);
      }
    );
    const closeModal = (close) => {
      isModalOpen.value = close;
    };
    const handleSelect = (folder) => {
      activeFolderId.value = folder.id;
      onDisplay.value = folder.folder;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FolderTree = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center h-screen" }, _attrs))}><button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"> Открыть </button>`);
      if (!isModalOpen.value && onDisplay.value) {
        _push(`<div> Вы выбрали: <div><div>ID: ${ssrInterpolate(onDisplay.value.id)}</div><div>Папка: ${ssrInterpolate(onDisplay.value.name)}</div>`);
        if (onDisplay.value.children.length > 0) {
          _push(`<div> Вложенные папки: ${ssrInterpolate(onDisplay.value.children)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (isModalOpen.value) {
        _push(ssrRenderComponent(_sfc_main$1, {
          "onUpdate:closeWindow": closeModal,
          title: "Выберите папку"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(foldersData)) {
                _push2(`<ul class="flex flex-col overflow-scroll h-full not-scrollbar pl-5 py-1 gap-y-1 not-allocated"${_scopeId}><!--[-->`);
                ssrRenderList(unref(foldersData), (parent) => {
                  _push2(ssrRenderComponent(_component_FolderTree, {
                    key: parent.id,
                    folders: parent,
                    activeId: activeFolderId.value,
                    onSelect: handleSelect
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]--></ul>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(foldersData) ? (openBlock(), createBlock("ul", {
                  key: 0,
                  class: "flex flex-col overflow-scroll h-full not-scrollbar pl-5 py-1 gap-y-1 not-allocated"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(foldersData), (parent) => {
                    return openBlock(), createBlock(_component_FolderTree, {
                      key: parent.id,
                      folders: parent,
                      activeId: activeFolderId.value,
                      onSelect: handleSelect
                    }, null, 8, ["folders", "activeId"]);
                  }), 128))
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-6npNRdA6.js.map
