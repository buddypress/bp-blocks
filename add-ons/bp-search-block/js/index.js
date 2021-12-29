parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"FTDv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SEARCH_OPTIONS=void 0;const{i18n:{_x:e,__:r}}=wp,c=[{label:e("Activities","search form","bp-search-block"),value:"activity",placeholder:r("Search activities","bp-search-block")},{label:e("Members","search form","bp-search-block"),value:"members",placeholder:r("Search members","bp-search-block")},{label:e("Groups","search form","bp-search-block"),value:"groups",placeholder:r("Search groups","bp-search-block")},{label:e("Blogs","search form","bp-search-block"),value:"blogs",placeholder:r("Search blogs","bp-search-block")},{label:e("Posts","search form","bp-search-block"),value:"posts",placeholder:r("Search posts","bp-search-block")}];exports.SEARCH_OPTIONS=c;
},{}],"p3Z2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const{components:{CheckboxControl:e,Disabled:t},element:{createElement:o,useState:l}}=wp,n=({label:n,option:c,checked:a,onChecked:r,defaultOption:s})=>{const[d,u]=l(),p=o(e,{label:n,checked:d||a,onChange:e=>(e=>{r(c,e),u(e)})(e)});return c===s?o(t,null,p):p};var c=n;exports.default=c;
},{}],"Hd2t":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const{components:{RadioControl:e},element:{createElement:t,useState:o}}=wp,n=({selected:n,options:s,onSelected:r})=>{const[l,c]=o(n);return t(e,{selected:l||n,options:s,onChange:e=>(e=>{r(e),c(e)})(e)})};var s=n;exports.default=s;
},{}],"sbuQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./constants"),t=o(require("./option-checkbox")),a=o(require("./options-radiogroup"));function o(e){return e&&e.__esModule?e:{default:e}}const{find:l}=lodash,{blockEditor:{InspectorControls:c,RichText:s,useBlockProps:r},components:{PanelBody:n,ToggleControl:b},element:{createElement:i,Fragment:p},i18n:{__:h}}=wp,{blockData:{isActive:u}}=bp,d=({attributes:o,setAttributes:d})=>{const k=r(),{activeOptions:_,placeholder:f,action:v,label:m,useLabel:g,buttonText:O,useIcon:x,defaultOption:N}=o,S=(e,t)=>{let a=_;(a=t?[e,...a]:a.filter(t=>t!==e)).sort(),d({activeOptions:a})},C=e.SEARCH_OPTIONS.filter(e=>"posts"===e.value||u(e.value)).map((e,a)=>i(t.default,{key:"option__"+a,label:e.label,checked:-1!==_.indexOf(e.value),option:e.value,onChecked:S,defaultOption:N})),I=e.SEARCH_OPTIONS.filter(e=>-1!==_.indexOf(e.value));return i(p,null,i(c,null,i(n,{title:h("Search options","bp-search-block"),initialOpen:!0},C),i(n,{title:h("Display options","bp-search-block"),initialOpen:!1},i(b,{label:h("Show the search label","bp-search-block"),checked:!!g,onChange:()=>{d({useLabel:!g})},help:h(g?"Display a label over the search field.":"Toggle to display a label over the search field.","bp-search-block")}),i(b,{label:h("Use a Search Icon","bp-search-block"),checked:!!x,onChange:()=>{d({useIcon:!x})},help:h(x?"Use a search icon instead of the search button text.":"Toggle to use a search icon instead of the search button text.","bp-search-block")}))),i("div",k,i("form",{action:v,method:"post"},g&&i(s,{tagname:"label",className:"bp-search-label","aria-label":h("Label text","bp-search-block"),placeholder:h("Add label…","bp-search-block"),withoutInteractiveFormatting:!0,value:m,onChange:e=>d({label:e})}),i("div",{className:"bp-block-search__inside-wrapper"},i("input",{type:"search",className:"bp-block-search__input",name:"search-terms",placeholder:f}),x&&i("button",{type:"button",className:"wp-block-search__button bp-search-button bp-block-search__icon-button has-icon"},i("div",{class:"bp-search-block-icon"})),!x&&i(s,{tagname:"button",className:"wp-block-search__button bp-search-button","aria-label":h("Button text","bp-search-block"),placeholder:h("Add text…","bp-search-block"),withoutInteractiveFormatting:!0,value:O,onChange:e=>d({buttonText:e})})),i("div",{className:"bp-block-search-for__wrapper"},i("strong",{className:"bp-block-search-for__label"},h("Search for:","bp-search-block")),i("div",{className:"bp-block-search-for__options"},i(a.default,{selected:N,options:I,onSelected:t=>{const a=l(e.SEARCH_OPTIONS,["value",t]);d({defaultOption:t,placeholder:a.placeholder})}}))))))};var k=d;exports.default=k;
},{"./constants":"FTDv","./option-checkbox":"p3Z2","./options-radiogroup":"Hd2t"}],"wP5f":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./constants");const{blockEditor:{RichText:a,useBlockProps:t},element:{createElement:c},i18n:{__:l}}=wp,s=({attributes:s})=>{const o=t.save(),{label:r,useLabel:b,buttonText:p,useIcon:n,placeholder:i,activeOptions:u,defaultOption:h,action:_}=s,d=e.SEARCH_OPTIONS.filter(e=>-1!==u.indexOf(e.value));let m=[];return d.forEach((e,a)=>{let t=!1;e.value===h&&(t="checked"),m.push(c("li",{key:"bp-search-option__"+a},c("label",null,c("input",{type:"radio",name:"search-which",value:e.value,"data-placeholder":e.placeholder,checked:t}),e.label)))}),c("div",o,c("form",{action:_,method:"post"},b&&c(a.Content,{tagName:"label",value:r,className:"bp-search-label"}),c("div",{className:"bp-block-search__inside-wrapper"},c("input",{type:"search",className:"bp-block-search__input",name:"search-terms",placeholder:i}),n&&c("button",{type:"submit",className:"wp-block-search__button bp-search-button bp-block-search__icon-button has-icon"},c("div",{class:"bp-search-block-icon"})),!n&&c(a.Content,{tagName:"button",type:"submit",value:p,className:"wp-block-search__button bp-search-button"})),c("div",{className:"bp-block-search-for__wrapper"},c("strong",{className:"bp-block-search-for__label"},l("Search for:","bp-search-block")),c("ul",{className:"bp-block-search-for__options"},m))))};var o=s;exports.default=o;
},{"./constants":"FTDv"}],"rets":[function(require,module,exports) {
module.exports={$schema:"https://schemas.wp.org/trunk/block.json",apiVersion:2,name:"bp/search-form",title:"Community Search",category:"buddypress",icon:"search",description:"A Block to search for posts, sites, activities, members or groups from any post, page or widget of your BuddyPress powered community site!",keywords:["BuddyPress","search","community"],version:"1.0.0",textdomain:"bp-search-block",attributes:{label:{type:"string",source:"html",selector:".bp-search-label",default:"Search"},useLabel:{type:"boolean",default:!0},buttonText:{type:"string",source:"html",selector:".bp-search-button",default:"Search"},useIcon:{type:"boolean",default:!1},placeholder:{type:"string",default:""},activeOptions:{type:"array",default:["posts"]},defaultOption:{type:"string",default:"posts"},action:{type:"string",default:""}},supports:{align:!0},editorScript:"file:js/index.js",viewScript:"file:js/view.js",editorStyle:"file:css/index.css",style:"file:css/style.css"};
},{}],"lyDq":[function(require,module,exports) {
"use strict";var e=o(require("./search-form/edit")),t=o(require("./search-form/save")),r=o(require("../block.json"));function o(e){return e&&e.__esModule?e:{default:e}}const{blocks:{registerBlockType:s},element:{createElement:a},i18n:{__:c}}=wp;s(r.default,{title:c("Community Search","bp-search-block"),description:c("A Block to search for posts, sites, activities, members or groups from any post, page or widget of your BuddyPress powered community site!","bp-search-block"),icon:{background:"#fff",foreground:"#d84800",src:"search"},attributes:{label:{type:"string",source:"html",selector:".bp-search-label",default:c("Search","bp-search-block")},useLabel:{type:"boolean",default:!0},buttonText:{type:"string",source:"html",selector:".bp-search-button",default:c("Search","bp-search-block")},useIcon:{type:"boolean",default:!1},placeholder:{type:"string",default:c("Search posts","bp-search-block")},activeOptions:{type:"array",default:["posts"]},defaultOption:{type:"string",default:"posts"},action:{type:"string",default:window.bpSearchFormAction||""}},edit:e.default,save:t.default});
},{"./search-form/edit":"sbuQ","./search-form/save":"wP5f","../block.json":"rets"}]},{},["lyDq"], null)
//# sourceMappingURL=/bp-search-block/js/index.js.map