parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"IxO8":[function(require,module,exports) {
function e(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}module.exports=e;
},{}],"KEWx":[function(require,module,exports) {
"use strict";var e=t(require("@babel/runtime/helpers/defineProperty"));function t(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}function o(t){for(var o=1;o<arguments.length;o++){var n=null!=arguments[o]?arguments[o]:{};o%2?r(Object(n),!0).forEach(function(r){(0,e.default)(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var n=wp.blocks.registerBlockType,l=wp.element,i=l.createElement,a=l.Fragment,s=wp.i18n.__,c=wp.components,u=c.PanelBody,d=c.RangeControl,b=wp.blockEditor,p=b.RichText,g=b.getColorClassName,y=b.__experimentalGetGradientClass,f=b.InspectorControls,m=b.getColorObjectByColorValue,v=b.getColorObjectByAttributeValues,x=b.getGradientValueBySlug,C=b.getGradientSlugByValue,O=b.__experimentalPanelColorGradientSettings,k=wp.data.useSelect,h=lodash,w=h.identity,j=h.isEqual,P=h.isObject,B=h.pickBy,_=h.mapValues,S=0,R=50,V=5,A=function e(t){if(!P(t))return t;var r=B(_(t,e),w);return j(r,{})?void 0:r};n("bp/share-activity",{title:s("Share into activities","buddypress"),description:s("Action button to share the displayed post/page into user’s activity stream.","buddypress"),icon:"buddicons-activity",category:"buddypress",attributes:{text:{type:"string",default:s("Share into my Activities","buddypress")},borderRadius:{type:"number",default:V},style:{type:"object"},backgroundColor:{type:"string"},textColor:{type:"string"},gradient:{type:"string"}},supports:{multiple:!1,align:!0,lightBlockWrapper:!0},edit:function(t){var r=t.attributes,n=t.setAttributes,l=r.text,c=r.backgroundColor,b=r.textColor,x=r.gradient,C=r.borderRadius,h=r.style,w=O,j=g("background-color",c),P=(y(x),g("color",b)),B=k(function(e){return e("core/block-editor").getSettings()},[]),_=B.colors,E=(B.gradients,"wp-block-button__link"),G={},D={text:"",background:""};h&&h.color&&(h.color.text&&(D.text=h.color.text,G.color=h.color.text),h.color.background&&(D.background=h.color.background,G.backgroundColor=h.color.background)),j&&(E+=" has-background "+j),P&&(E+=" has-text-color "+P);var T;return i(a,null,i("div",{className:"wp-block-button"},i(p,{placeholder:s("Add text","buddypress"),value:l,allowedFormats:["core/bold","core/italic"],onChange:function(e){return n({text:e})},className:E,style:o({borderRadius:C?C+"px":0},G)})),i(f,null,i(u,{title:s("Border settings","buddypress")},i(d,{value:C,label:s("Border radius","buddypress"),min:S,max:R,initialPosition:V,allowReset:!0,onChange:function(e){return n({borderRadius:e})}})),i(w,{title:s("Text Color","buddypress"),initialOpen:!1,settings:[{label:s("Text Color"),onColorChange:(T="text",function(t){var r=m(_,t),l=T+"Color",i=r&&r.slug?r.slug:void 0,a=o({},h,{color:o({},D,(0,e.default)({},T,t))}),s=i||void 0,c=(0,e.default)({style:A(a)},l,s);n(c)}),colorValue:v(_,b,D.text).color}]})))}});
},{"@babel/runtime/helpers/defineProperty":"IxO8"}]},{},["KEWx"], null)
