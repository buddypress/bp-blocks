parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"gOka":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TYPES=void 0;var e=wp,s=e.i18n.__,l=[{label:s("Newest","buddypress"),value:"newest"},{label:s("Active","buddypress"),value:"active"},{label:s("Popular","buddypress"),value:"popular"}];exports.TYPES=l;
},{}],"z0p7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./constants"),t=wp,n=t.blockEditor.InspectorControls,l=t.components,r=l.Disabled,o=l.PanelBody,i=l.RangeControl,s=l.SelectControl,a=l.TextControl,u=l.ToggleControl,b=t.editor.ServerSideRender,d=t.element,c=d.Fragment,m=d.createElement,p=t.i18n.__,f=bp,v=f.blockData.isActive,g=function(t){var l=t.attributes,d=t.setAttributes,f=l.title,g=l.maxMembers,y=l.memberDefault,C=l.linkTitle,k=v("friends")?e.TYPES:e.TYPES.filter(function(e){return"popular"!==e.value});return m(c,null,m(n,null,m(o,{title:p("Settings","buddypress"),initialOpen:!0},m(a,{label:p("Title","buddypress"),value:f,onChange:function(e){d({title:e})}}),m(i,{label:p("Max members to show","buddypress"),value:g,onChange:function(e){return d({maxMembers:e})},min:1,max:10,required:!0}),m(s,{label:p("Default members to show","buddypress"),value:y,options:k,onChange:function(e){d({memberDefault:e})}}),m(u,{label:p("Link block title to Members directory","buddypress"),checked:!!C,onChange:function(){d({linkTitle:!C})}}))),m(r,null,m(b,{block:"bp/dynamic-members",attributes:l})))},y=g;exports.default=y;
},{"./constants":"gOka"}],"IxO8":[function(require,module,exports) {
function e(e,o,r){return o in e?Object.defineProperty(e,o,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[o]=r,e}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"qfGr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("@babel/runtime/helpers/defineProperty"));function r(e){return e&&e.__esModule?e:{default:e}}var t=wp,a=t.blocks.createBlock,l={from:[{type:"block",blocks:["core/legacy-widget"],isMatch:function(e){var r=e.idBase,t=e.instance;return!(null==t||!t.raw)&&"bp_core_members_widget"===r},transform:function(r){var t,l=r.instance;return a("bp/dynamic-members",(t={title:l.raw.title,maxMembers:l.raw.max_members,memberDefault:l.raw.member_default},(0,e.default)(t,"memberDefault",l.raw.member_default),(0,e.default)(t,"linkTitle",l.raw.link_title),t))}}]},i=l;exports.default=i;
},{"@babel/runtime/helpers/defineProperty":"IxO8"}],"Znbi":[function(require,module,exports) {
"use strict";var e=t(require("./dynamic-members/edit")),r=t(require("./dynamic-members/transforms"));function t(e){return e&&e.__esModule?e:{default:e}}var s=wp,d=s.blocks.registerBlockType,i=s.i18n.__;d("bp/dynamic-members",{title:i("Dynamic Members List","buddypress"),description:i("A dynamic list of recently active, popular, and newest members.","buddypress"),icon:{background:"#fff",foreground:"#d84800",src:"groups"},category:"buddypress",attributes:{title:{type:"string",default:i("Members","buddypress")},maxMembers:{type:"number",default:5},memberDefault:{type:"string",default:"active"},linkTitle:{type:"boolean",default:!1}},edit:e.default,transforms:r.default});
},{"./dynamic-members/edit":"z0p7","./dynamic-members/transforms":"qfGr"}]},{},["Znbi"], null)