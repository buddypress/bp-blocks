parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"DIzr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=wp,t=e.blockEditor.InspectorControls,i=e.components,l=i.Disabled,n=i.PanelBody,a=i.RangeControl,o=i.SelectControl,s=i.TextControl,r=e.editor.ServerSideRender,u=e.element,d=u.Fragment,p=u.createElement,c=e.i18n.__,b=bp,m=b.blockData,v=m.currentPostId,y=m.activityTypes,x=function(e){var i=e.attributes,u=e.setAttributes,b=i.postId,m=i.maxActivities,x=i.type,f=i.title,C=v(),g=y();return!b&&C&&u({postId:C}),p(d,null,p(t,null,p(n,{title:c("Settings","buddypress"),initialOpen:!0,className:"bp-latest-activities"},p(s,{label:c("Title","buddypress"),value:f,onChange:function(e){u({title:e})}}),p(a,{label:c("Maximum amount to display","buddypress"),value:m,onChange:function(e){return u({maxActivities:e})},min:1,max:10,required:!0}),p(o,{multiple:!0,label:c("Type","buddypress"),value:x,options:g,onChange:function(e){u({type:e})}}))),p(l,null,p(r,{block:"bp/latest-activities",attributes:i})))},f=x;exports.default=f;
},{}],"yqpU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=wp,e=t.blocks.createBlock,a={from:[{type:"block",blocks:["core/legacy-widget"],isMatch:function(t){var e=t.idBase,a=t.instance;return!(null==a||!a.raw)&&"bp_latest_activities"===e},transform:function(t){var a=t.instance;return e("bp/latest-activities",{title:a.raw.title,maxActivities:a.raw.max,type:a.raw.type})}}]},r=a;exports.default=r;
},{}],"q3eE":[function(require,module,exports) {
"use strict";var t=i(require("./latest-activities/edit")),e=i(require("./latest-activities/transforms"));function i(t){return t&&t.__esModule?t:{default:t}}var s=wp,r=s.blocks.registerBlockType,a=s.i18n.__;r("bp/latest-activities",{title:a("Latest Activities","buddypress"),description:a("Display the latest updates of the post author (when used into a page or post), of the displayed user (when viewing their profile) or of your community.","buddypress"),icon:{background:"#fff",foreground:"#d84800",src:"buddicons-activity"},category:"buddypress",attributes:{title:{type:"string",default:a("Latest updates","buddypress")},maxActivities:{type:"number",default:5},type:{type:"array",default:["activity_update"]},postId:{type:"number",default:0}},edit:t.default,transforms:e.default});
},{"./latest-activities/edit":"DIzr","./latest-activities/transforms":"yqpU"}]},{},["q3eE"], null)