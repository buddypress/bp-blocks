parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"IxO8":[function(require,module,exports) {
function e(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}module.exports=e;
},{}],"KEWx":[function(require,module,exports) {
"use strict";var e=t(require("@babel/runtime/helpers/defineProperty"));function t(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}function o(t){for(var o=1;o<arguments.length;o++){var n=null!=arguments[o]?arguments[o]:{};o%2?r(Object(n),!0).forEach(function(r){(0,e.default)(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var n=wp.blocks.registerBlockType,l=wp.element,a=l.createElement,i=l.Fragment,s=wp.i18n.__,d=wp.components,c=d.PanelBody,u=d.RangeControl,g=wp.blockEditor,b=g.RichText,p=g.getColorClassName,y=g.__experimentalGetGradientClass,f=g.InspectorControls,k=g.getColorObjectByColorValue,C=g.getColorObjectByAttributeValues,v=g.getGradientValueBySlug,O=g.getGradientSlugByValue,h=g.__experimentalPanelColorGradientSettings,x=wp.data.useSelect,m=lodash,w=m.identity,j=m.isEqual,B=m.isObject,P=m.pickBy,_=m.mapValues,S=0,V=50,R=5,G=function e(t){if(!B(t))return t;var r=P(_(t,e),w);return j(r,{})?void 0:r};n("bp/share-activity",{title:s("Share into activities","buddypress"),description:s("Action button to share the displayed post/page into user’s activity stream.","buddypress"),icon:"buddicons-activity",category:"buddypress",attributes:{text:{type:"string",default:s("Share into my Activities","buddypress")},borderRadius:{type:"number",default:R},style:{type:"object"},backgroundColor:{type:"string"},textColor:{type:"string"},gradient:{type:"string"}},supports:{multiple:!1,align:!0,lightBlockWrapper:!0},edit:function(t){var r,n=t.attributes,l=t.setAttributes,d=n.text,g=n.backgroundColor,m=n.textColor,w=n.gradient,j=n.borderRadius,B=n.style,P=h,_=p("background-color",g),A=y(w),E=p("color",m),D=x(function(e){return e("core/block-editor").getSettings()},[]),T=D.colors,N=D.gradients,q="wp-block-button__link",F={},I={text:"",background:"",gradient:""};B&&(B.color.text&&(I.text=B.color.text,F.color=B.color.text),B.color.background&&(I.background=B.color.background,F.backgroundColor=B.color.background),B.color.gradient&&(I.gradient=B.color.gradient,F.background=B.color.gradient)),(_||A||I.background||I.gradient)&&(q+=" has-background",_&&(q+=" "+_),A&&(q+=" "+A)),(E||I.text)&&(q+=" has-text-color",E&&(q+=" "+E)),r=w&&v?v(N,w):I.gradient;var M=function(t){return function(r){var n=k(T,r),a=t+"Color",i=n&&n.slug?n.slug:void 0,s=o({},B,{color:o({},I,(0,e.default)({},t,r))}),d=i||void 0,c=(0,e.default)({style:G(s)},a,d);l(c)}};return a(i,null,a("div",{className:"wp-block-button"},a(b,{placeholder:s("Add text","buddypress"),value:d,allowedFormats:["core/bold","core/italic"],onChange:function(e){return l({text:e})},className:q,style:o({borderRadius:j?j+"px":0},F)})),a(f,null,a(c,{title:s("Border settings","buddypress")},a(u,{value:j,label:s("Border radius","buddypress"),min:S,max:V,initialPosition:R,allowReset:!0,onChange:function(e){return l({borderRadius:e})}})),a(P,{title:s("Text Color","buddypress"),initialOpen:!1,settings:[{label:s("Text Color","buddypress"),onColorChange:M("text"),colorValue:C(T,m,I.text).color}]}),!!v&&a(P,{title:s("Background Color","buddypress"),initialOpen:!1,settings:[{label:s("Background Color","buddypress"),onColorChange:M("background"),colorValue:C(T,g,I.background).color,gradientValue:r,onGradientChange:function(e){var t,r=O(N,e);if(r){var n=o({},B,{color:o({},I,{gradient:void 0})});t={style:G(n),gradient:r}}else{var a=o({},B,{color:o({},I,{gradient:e})});t={style:G(a),gradient:void 0}}l(t)}}]}),!v&&a(P,{title:s("Background Color","buddypress"),initialOpen:!1,settings:[{label:s("Background Color","buddypress"),onColorChange:M("background"),colorValue:C(T,g,I.background).color}]})))}});
},{"@babel/runtime/helpers/defineProperty":"IxO8"}]},{},["KEWx"], null)