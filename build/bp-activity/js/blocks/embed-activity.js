parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"OUZ9":[function(require,module,exports) {
function e(e){if(Array.isArray(e))return e}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"vKPt":[function(require,module,exports) {
function e(e,l){var r=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=r){var t,o,u=[],n=!0,a=!1;try{for(r=r.call(e);!(n=(t=r.next()).done)&&(u.push(t.value),!l||u.length!==l);n=!0);}catch(d){a=!0,o=d}finally{try{n||null==r.return||r.return()}finally{if(a)throw o}}return u}}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"NVR6":[function(require,module,exports) {
function e(e,o){(null==o||o>e.length)&&(o=e.length);for(var l=0,r=new Array(o);l<o;l++)r[l]=e[l];return r}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"UyFj":[function(require,module,exports) {
var r=require("./arrayLikeToArray.js");function e(e,t){if(e){if("string"==typeof e)return r(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?r(e,t):void 0}}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{"./arrayLikeToArray.js":"NVR6"}],"Rom6":[function(require,module,exports) {
function e(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"HETk":[function(require,module,exports) {
var e=require("./arrayWithHoles.js"),r=require("./iterableToArrayLimit.js"),o=require("./unsupportedIterableToArray.js"),t=require("./nonIterableRest.js");function u(u,s){return e(u)||r(u,s)||o(u,s)||t()}module.exports=u,module.exports.default=module.exports,module.exports.__esModule=!0;
},{"./arrayWithHoles.js":"OUZ9","./iterableToArrayLimit.js":"vKPt","./unsupportedIterableToArray.js":"UyFj","./nonIterableRest.js":"Rom6"}],"Sjre":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("@babel/runtime/helpers/slicedToArray"));function t(e){return e&&e.__esModule?e:{default:e}}var i=wp,r=i.element,n=r.createElement,o=r.Fragment,s=r.useState,l=i.i18n.__,a=i.components,d=a.Placeholder,u=a.Disabled,c=a.SandBox,p=a.Button,b=a.ExternalLink,m=a.Spinner,y=a.ToolbarGroup,v=a.ToolbarButton,h=i.compose.compose,f=i.data.withSelect,g=i.blockEditor,_=g.RichText,w=g.BlockControls,E=function(t){var i=t.attributes,r=t.setAttributes,a=t.isSelected,h=t.bpSettings,f=t.preview,g=t.fetching,E=i.url,k=i.caption,S=h.embedScriptURL,x=l("BuddyPress Activity URL","buddypress"),P=s(E),L=(0,e.default)(P,2),N=L[0],R=L[1],B=s(!E),T=(0,e.default)(B,2),U=T[0],A=T[1],C=n(w,null,n(y,null,n(v,{icon:"edit",title:l("Edit URL","buddypress"),onClick:function(e){e&&e.preventDefault(),A(!0)}})));return U?n(d,{icon:"buddicons-activity",label:x,className:"wp-block-embed",instructions:l("Paste the link to the activity content you want to display on your site.","buddypress")},n("form",{onSubmit:function(e){e&&e.preventDefault(),A(!1),r({url:N})}},n("input",{type:"url",value:N||"",className:"components-placeholder__input","aria-label":x,placeholder:l("Enter URL to embed here…","buddypress"),onChange:function(e){return R(e.target.value)}}),n(p,{isPrimary:!0,type:"submit"},l("Embed","buddypress"))),n("div",{className:"components-placeholder__learn-more"},n(b,{href:l("https://codex.buddypress.org/activity-embeds/")},l("Learn more about activity embeds","buddypress")))):g?n("div",{className:"wp-block-embed is-loading"},n(m,null),n("p",null,l("Embedding…","buddypress"))):f&&f.x_buddypress&&"activity"===f.x_buddypress?n(o,null,!U&&C,n("figure",{className:"wp-block-embed is-type-bp-activity"},n("div",{className:"wp-block-embed__wrapper"},n(u,null,n(c,{html:f&&f.html?f.html:"",scripts:[S]}))),(!_.isEmpty(k)||a)&&n(_,{tagName:"figcaption",placeholder:l("Write caption…","buddypress"),value:k,onChange:function(e){return r({caption:e})},inlineToolbar:!0}))):n(o,null,C,n(d,{icon:"buddicons-activity",label:x},n("p",{className:"components-placeholder__error"},l("The URL you provided is not a permalink to a public BuddyPress Activity. Please use another URL.","buddypress"))))},k=h([f(function(e,t){var i=t.attributes.url,r=e("core/editor").getEditorSettings(),n=e("core"),o=n.getEmbedPreview,s=n.isRequestingEmbedPreview,l=!!i&&o(i),a=!!i&&s(i);return{bpSettings:r.bp.activity||{},preview:l,fetching:a}})])(E),S=k;exports.default=S;
},{"@babel/runtime/helpers/slicedToArray":"HETk"}],"zmBI":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=wp,t=e.blockEditor.RichText,a=e.element.createElement,r=function(e){var r=e.attributes,i=r.url,c=r.caption;return i?a("figure",{className:"wp-block-embed is-type-bp-activity"},a("div",{className:"wp-block-embed__wrapper"},"\n".concat(i,"\n")),!t.isEmpty(c)&&a(t.Content,{tagName:"figcaption",value:c})):null},i=r;exports.default=i;
},{}],"hBDw":[function(require,module,exports) {
"use strict";var t=i(require("./embed-activity/edit")),e=i(require("./embed-activity/save"));function i(t){return t&&t.__esModule?t:{default:t}}var r=wp,s=r.i18n.__,d=r.blocks.registerBlockType;d("bp/embed-activity",{title:s("Embed an activity","buddypress"),description:s("Add a block that displays the activity content pulled from this or other community sites.","buddypress"),icon:{background:"#fff",foreground:"#d84800",src:"buddicons-activity"},category:"buddypress",attributes:{url:{type:"string"},caption:{type:"string",source:"html",selector:"figcaption"}},supports:{align:!0},edit:t.default,save:e.default});
},{"./embed-activity/edit":"Sjre","./embed-activity/save":"zmBI"}]},{},["hBDw"], null)
//# sourceMappingURL=/bp-activity/js/blocks/embed-activity.js.map