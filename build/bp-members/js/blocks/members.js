parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"XfJI":[function(require,module,exports) {
function r(r){if(Array.isArray(r)){for(var e=0,n=new Array(r.length);e<r.length;e++)n[e]=r[e];return n}}module.exports=r;
},{}],"OMTj":[function(require,module,exports) {
function t(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}module.exports=t;
},{}],"wFNi":[function(require,module,exports) {
function e(){throw new TypeError("Invalid attempt to spread non-iterable instance")}module.exports=e;
},{}],"Fhqp":[function(require,module,exports) {
var r=require("./arrayWithoutHoles"),e=require("./iterableToArray"),a=require("./nonIterableSpread");function o(o){return r(o)||e(o)||a()}module.exports=o;
},{"./arrayWithoutHoles":"XfJI","./iterableToArray":"OMTj","./nonIterableSpread":"wFNi"}],"OUZ9":[function(require,module,exports) {
function r(r){if(Array.isArray(r))return r}module.exports=r;
},{}],"vKPt":[function(require,module,exports) {
function t(t,r){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var e=[],o=!0,n=!1,l=void 0;try{for(var i,a=t[Symbol.iterator]();!(o=(i=a.next()).done)&&(e.push(i.value),!r||e.length!==r);o=!0);}catch(u){n=!0,l=u}finally{try{o||null==a.return||a.return()}finally{if(n)throw l}}return e}}module.exports=t;
},{}],"Rom6":[function(require,module,exports) {
function t(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}module.exports=t;
},{}],"HETk":[function(require,module,exports) {
var r=require("./arrayWithHoles"),e=require("./iterableToArrayLimit"),i=require("./nonIterableRest");function t(t,a){return r(t)||e(t,a)||i()}module.exports=t;
},{"./arrayWithHoles":"OUZ9","./iterableToArrayLimit":"vKPt","./nonIterableRest":"Rom6"}],"gr8I":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AVATAR_SIZES=void 0;var e=wp,l=e.i18n.__,u=[{label:l("None","buddypress"),value:"none"},{label:l("Thumb","buddypress"),value:"thumb"},{label:l("Full","buddypress"),value:"full"}];exports.AVATAR_SIZES=u;
},{}],"PZSE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=n(require("@babel/runtime/helpers/toConsumableArray")),t=n(require("@babel/runtime/helpers/slicedToArray")),s=require("./constants");function n(e){return e&&e.__esModule?e:{default:e}}var a=wp,r=a.blockEditor.InspectorControls,l=a.components,i=l.Placeholder,o=l.PanelBody,u=l.SelectControl,d=l.ToggleControl,p=l.Button,m=a.compose.compose,b=a.data.withSelect,c=a.element,y=c.createElement,g=c.Fragment,h=c.useState,v=a.i18n.__,f=a.apiFetch,S=a.url.addQueryArgs,C=bp.blockComponents.AutoCompleter,I=function(e){return e&&e.mention_name?e.mention_name:null},A=function(n){var a,l=n.attributes,p=n.setAttributes,m=n.bpSettings,b=(n.bpMembers,m.isAvatarEnabled),c=m.isMentionEnabled,A=m.isCoverImageEnabled,M=l.itemIDs,_=l.avatarSize,k=l.displayMentionSlug,E=l.displayUserName,D=l.displayCoverImage,N=0!==M.length,T=h([]),P=(0,t.default)(T,2),x=P[0],q=P[1];N&&M.length!==x.length&&f({path:S("/buddypress/v1/members",{include:M})}).then(function(e){q(e)}),x.length&&(a=x.map(function(e){return y("div",{key:"bp-member-"+e.id,className:"bp-members-block-list"},b&&y("img",{key:"avatar-"+e.id,className:"user-avatar",alt:"",src:e.avatar_urls[_]}),y("span",null,e.name))}));return y(g,null,y(r,null,y(o,{title:v("Settings","buddypress"),initialOpen:!0},y(d,{label:v("Display Profile button","buddypress"),checked:!!E,onChange:function(){p({displayUserName:!E})},help:v(E?"Include the user's display name.":"Toggle to include user's display name.","buddypress")}),c&&y(d,{label:v("Display Mention slug","buddypress"),checked:!!k,onChange:function(){p({displayMentionSlug:!k})},help:v(k?"Include the user's mention name under their display name.":"Toggle to display the user's mention name under their display name.","buddypress")}),b&&y(u,{label:v("Avatar size","buddypress"),value:_,options:s.AVATAR_SIZES,help:v('Select "None" to disable the avatar.',"buddypress"),onChange:function(e){p({avatarSize:e})}}),A&&y(d,{label:v("Display Cover Image","buddypress"),checked:!!D,onChange:function(){p({displayCoverImage:!D})},help:v(D?"Include the user's cover image over their display name.":"Toggle to display the user's cover image over their display name.","buddypress")}))),a,y(i,{icon:N?"":"groups",label:N?"":v("BuddyPress Members","buddypress"),instructions:v("Start typing the name of the member you want to add to the members list.","buddypress"),className:0!==M.length?"is-appender":"is-large"},y(C,{component:"members",slugValue:I,ariaLabel:v("Member's username","buddypress"),placeholder:v("Enter Member's username here…","buddypress"),onSelectItem:function(t){var s=t.itemID;-1===M.indexOf(s)&&s&&p({itemIDs:[].concat((0,e.default)(M),[parseInt(s,10)])})},useAvatar:b})))},M=m([b(function(e){return{bpSettings:e("core/editor").getEditorSettings().bp.members||{}}})])(A),_=M;exports.default=_;
},{"@babel/runtime/helpers/toConsumableArray":"Fhqp","@babel/runtime/helpers/slicedToArray":"HETk","./constants":"gr8I"}],"XEHU":[function(require,module,exports) {
"use strict";var e=t(require("./members/edit"));function t(e){return e&&e.__esModule?e:{default:e}}var r=wp,s=r.blocks.registerBlockType,a=r.i18n.__;s("bp/members",{title:a("Members","buddypress"),description:a("BuddyPress Members.","buddypress"),icon:"groups",category:"buddypress",attributes:{itemIDs:{type:"array",items:{type:"integer"},default:[]},avatarSize:{type:"string",default:"full"},displayMentionSlug:{type:"boolean",default:!0},displayUserName:{type:"boolean",default:!0},displayCoverImage:{type:"boolean",default:!0}},edit:e.default});
},{"./members/edit":"PZSE"}]},{},["XEHU"], null)