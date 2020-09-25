//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'VuePopover',
  // vue component name
  props: {
    groupClass: {
      type: String,
      required: false
    },
    buttonClass: {
      type: String,
      required: false
    },
    position: {
      type: String,
      default: 'right-bottom'
    },
    showTriangle: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      popoverClass: 'popover-list'
    };
  },

  computed: {
    popoverPosition() {
      var pos = 'right';

      switch (this.position) {
        case 'right-bottom':
          pos = 'right: 0; bottom: 50px';
          break;

        case 'bottom':
          pos = 'right: 50%; bottom: 50px';
          break;
      }

      return pos;
    }

  },
  methods: {
    toggle() {
      if (this.popoverClass == 'popover-list') this.popoverClass = 'popover-list show';else this.popoverClass = 'popover-list';
    },

    close() {
      this.popoverClass = 'popover-list';
    }

  },
  watch: {
    $route() {
      this.close(); //close dropdown if view (route changes)
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['popover-group', _vm.groupClass]
  }, [_c('button', {
    class: ['popover-btn', _vm.buttonClass],
    on: {
      "click": function ($event) {
        $event.stopPropagation();
        return _vm.toggle($event);
      }
    }
  }, [_vm._t("button-content")], 2), _vm._v(" "), _c('div', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.close,
      expression: "close"
    }],
    class: _vm.popoverClass,
    style: _vm.popoverPosition
  }, [_vm.showTriangle ? _c('div', {
    staticClass: "triangle-container"
  }, [_c('div', {
    staticClass: "triangle-with-shadow"
  })]) : _vm._e(), _vm._v(" "), _vm._t("popover-content")], 2)]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-e496121e_0", {
    source: ".popover-group[data-v-e496121e]{position:relative;height:40px;position:relative;display:inline-block}.popover-group>button[data-v-e496121e]{align-items:center}.popover-list[data-v-e496121e]{position:absolute;min-width:310px;visibility:hidden;box-shadow:0 3px 6px 0 rgba(0,0,0,.16);background-color:var(--light-bg);border-radius:0 0 5px 5px;padding-bottom:16px;transition:opacity .5s;opacity:0;z-index:19999999999}.triangle-container[data-v-e496121e]{width:100%;display:flex;justify-content:flex-end;height:0}.triangle-with-shadow[data-v-e496121e]{width:32px;height:24px;position:relative;top:-24px;right:0;overflow:hidden;z-index:1}.triangle-with-shadow[data-v-e496121e]:after{content:\"\";position:absolute;width:20px;height:20px;background:#fff;transform:rotate(45deg);bottom:-10px;left:6px;box-shadow:0 3px 6px 0 rgba(0,0,0,.16)}.popover-list ul[data-v-e496121e]{list-style:none;padding:0;margin:0}.popover-list.show[data-v-e496121e]{visibility:visible;opacity:1}.popover-list .dropdown-option[data-v-e496121e]{padding:8px 24px}.popover-list .dropdown-option>a[data-v-e496121e]{color:var(--dark-text);display:block;cursor:pointer}.popover-list .dropdown-option>a[data-v-e496121e]:hover{text-decoration:none;color:var(--accent-orange)}.popover-list .dropdown-option>a[data-v-e496121e]{font-size:12px;line-height:1;color:var(--dark-text)}.popover-btn[data-v-e496121e]:active,.popover-btn[data-v-e496121e]:focus{border:none;outline:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-e496121e";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installVuePopover(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VuePopover', __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
