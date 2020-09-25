'use strict';Object.defineProperty(exports,'__esModule',{value:true});//
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
  data: function data() {
    return {
      popoverClass: 'popover-list'
    };
  },
  computed: {
    popoverPosition: function popoverPosition() {
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
    toggle: function toggle() {
      if (this.popoverClass == 'popover-list') this.popoverClass = 'popover-list show';else this.popoverClass = 'popover-list';
    },
    close: function close() {
      this.popoverClass = 'popover-list';
    }
  },
  watch: {
    $route: function $route() {
      this.close(); //close dropdown if view (route changes)
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['popover-group', _vm.groupClass]
  }, [_vm._ssrNode("<button" + _vm._ssrClass(null, ['popover-btn', _vm.buttonClass]) + " data-v-e496121e>", "</button>", [_vm._t("button-content")], 2), _vm._ssrNode(" "), _c('div', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.close,
      expression: "close"
    }],
    class: _vm.popoverClass,
    style: _vm.popoverPosition
  }, [_vm._ssrNode((_vm.showTriangle ? "<div class=\"triangle-container\" data-v-e496121e><div class=\"triangle-with-shadow\" data-v-e496121e></div></div>" : "<!---->") + " "), _vm._t("popover-content")], 2)], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-e496121e_0", {
    source: ".popover-group[data-v-e496121e]{position:relative;height:40px;position:relative;display:inline-block}.popover-group>button[data-v-e496121e]{align-items:center}.popover-list[data-v-e496121e]{position:absolute;min-width:310px;visibility:hidden;box-shadow:0 3px 6px 0 rgba(0,0,0,.16);background-color:var(--light-bg);border-radius:0 0 5px 5px;padding-bottom:16px;transition:opacity .5s;opacity:0;z-index:19999999999}.triangle-container[data-v-e496121e]{width:100%;display:flex;justify-content:flex-end;height:0}.triangle-with-shadow[data-v-e496121e]{width:32px;height:24px;position:relative;top:-24px;right:0;overflow:hidden;z-index:1}.triangle-with-shadow[data-v-e496121e]:after{content:\"\";position:absolute;width:20px;height:20px;background:#fff;transform:rotate(45deg);bottom:-10px;left:6px;box-shadow:0 3px 6px 0 rgba(0,0,0,.16)}.popover-list ul[data-v-e496121e]{list-style:none;padding:0;margin:0}.popover-list.show[data-v-e496121e]{visibility:visible;opacity:1}.popover-list .dropdown-option[data-v-e496121e]{padding:8px 24px}.popover-list .dropdown-option>a[data-v-e496121e]{color:var(--dark-text);display:block;cursor:pointer}.popover-list .dropdown-option>a[data-v-e496121e]:hover{text-decoration:none;color:var(--accent-orange)}.popover-list .dropdown-option>a[data-v-e496121e]{font-size:12px;line-height:1;color:var(--dark-text)}.popover-btn[data-v-e496121e]:active,.popover-btn[data-v-e496121e]:focus{border:none;outline:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-e496121e";
/* module identifier */

var __vue_module_identifier__ = "data-v-e496121e";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installVuePopover(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VuePopover', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;