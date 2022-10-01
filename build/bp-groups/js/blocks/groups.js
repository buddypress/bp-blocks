parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"jS06":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GROUP_STATI=exports.EXTRA_INFO=exports.AVATAR_SIZES=void 0;const{i18n:{__:e}}=wp,s=[{label:e("None","buddypress"),value:"none"},{label:e("Thumb","buddypress"),value:"thumb"},{label:e("Full","buddypress"),value:"full"}];exports.AVATAR_SIZES=s;const u={public:e("Public","buddypress"),private:e("Private","buddypress"),hidden:e("Hidden","buddypress")};exports.GROUP_STATI=u;const l=[{label:e("None","buddypress"),value:"none"},{label:e("Group's description","buddypress"),value:"description"},{label:e("Last time the group was active","buddypress"),value:"active"},{label:e("Amount of group members","buddypress"),value:"popular"}];exports.EXTRA_INFO=l;
},{}],"Ccmh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./constants");const{blockEditor:{InspectorControls:t,BlockControls:s},components:{Placeholder:r,PanelBody:a,SelectControl:o,ToggleControl:n,Button:l,Dashicon:i,Tooltip:d,ToolbarGroup:u,RangeControl:p},element:{createElement:c,Fragment:m,useState:g},i18n:{__:b,sprintf:y,_n:v},apiFetch:h,url:{addQueryArgs:_}}=wp,{blockComponents:{AutoCompleter:f},blockData:{isActive:A}}=bp,{reject:I,remove:k,sortBy:x}=lodash,C=t=>t&&t.status&&e.GROUP_STATI[t.status]?e.GROUP_STATI[t.status]:null,N=N=>{let{attributes:S,setAttributes:T,isSelected:G}=N;const P=A("groups","avatar"),{itemIDs:O,avatarSize:R,displayGroupName:D,extraInfo:w,layoutPreference:E,columns:B}=S,F=0!==O.length,[j,z]=g([]),L=[{icon:"text",title:b("List view","buddypress"),onClick:()=>T({layoutPreference:"list"}),isActive:"list"===E},{icon:"screenoptions",title:b("Grid view","buddypress"),onClick:()=>T({layoutPreference:"grid"}),isActive:"grid"===E}];let q,M="bp-block-groups avatar-"+R,Q=e.EXTRA_INFO;"grid"===E&&(M+=" is-grid columns-"+B,Q=e.EXTRA_INFO.filter(e=>"description"!==e.value));return F&&O.length!==j.length&&h({path:_("/buddypress/v1/groups",{populate_extras:!0,include:O})}).then(e=>{z(x(e,[e=>O.indexOf(e.id)]))}),j.length&&(q=j.map(e=>{let t=!1,s="group-content";return"list"===E&&"description"===w&&e.description&&e.description.rendered&&(t=!0,s="group-content has-description"),c("div",{key:"bp-group-"+e.id,className:s},G&&c(d,{text:b("Remove group","buddypress")},c(l,{className:"is-right",onClick:()=>(e=>{e&&-1!==O.indexOf(e)&&(z(I(j,["id",e])),T({itemIDs:k(O,t=>t!==e)}))})(e.id),label:b("Remove group","buddypress")},c(i,{icon:"no"}))),P&&"none"!==R&&c("div",{className:"item-header-avatar"},c("a",{href:e.link,target:"_blank"},c("img",{key:"avatar-"+e.id,className:"avatar",alt:y(b("Profile photo of %s","buddypress"),e.name),src:e.avatar_urls[R]}))),c("div",{className:"group-description"},D&&c("strong",null,c("a",{href:e.link,target:"_blank"},e.name)),t&&c("div",{className:"group-description-content",dangerouslySetInnerHTML:{__html:e.description.rendered}}),"active"===w&&e.last_activity&&e.last_activity_diff&&c("time",{dateTime:e.last_activity},y(b("Active %s","buddypress"),e.last_activity_diff)),"popular"===w&&e.total_member_count&&c("div",{className:"group-meta"},y(v("%1$d member","%1$d members",e.total_member_count,"buddypress"),e.total_member_count))))})),c(m,null,c(t,null,c(a,{title:b("Settings","buddypress"),initialOpen:!0},c(n,{label:b("Display the group's name","buddypress"),checked:!!D,onChange:()=>{T({displayGroupName:!D})},help:b(D?"Include the group's name.":"Toggle to include group's name.","buddypress")}),P&&c(o,{label:b("Avatar size","buddypress"),value:R,options:e.AVATAR_SIZES,help:b('Select "None" to disable the avatar.',"buddypress"),onChange:e=>{T({avatarSize:e})}}),c(o,{label:b("Group extra information","buddypress"),value:w,options:Q,help:b('Select "None" to show no extra information.',"buddypress"),onChange:e=>{T({extraInfo:e})}}),"grid"===E&&c(p,{label:b("Columns","buddypress"),value:B,onChange:e=>T({columns:e}),min:2,max:4,required:!0}))),c(s,null,c(u,{controls:L})),F&&c("div",{className:M},q),(G||0===O.length)&&c(r,{icon:F?"":"groups",label:F?"":b("BuddyPress Groups","buddypress"),instructions:b("Start typing the name of the group you want to add to the groups list.","buddypress"),className:0!==O.length?"is-appender":"is-large"},c(f,{component:"groups",objectQueryArgs:{show_hidden:!1,exclude:O},slugValue:C,ariaLabel:b("Group's name","buddypress"),placeholder:b("Enter Group's name here…","buddypress"),onSelectItem:e=>{let{itemID:t}=e;t&&-1===O.indexOf(t)&&T({itemIDs:[...O,parseInt(t,10)]})},useAvatar:P})))};var S=N;exports.default=S;
},{"./constants":"jS06"}],"jcTh":[function(require,module,exports) {
"use strict";var e=t(require("./groups/edit"));function t(e){return e&&e.__esModule?e:{default:e}}const{blocks:{registerBlockType:r},i18n:{__:s}}=wp;r("bp/groups",{title:s("Groups","buddypress"),description:s("BuddyPress Groups.","buddypress"),icon:{background:"#fff",foreground:"#d84800",src:"buddicons-groups"},category:"widgets",attributes:{itemIDs:{type:"array",items:{type:"integer"},default:[]},avatarSize:{type:"string",default:"full"},displayGroupName:{type:"boolean",default:!0},extraInfo:{type:"string",default:"none"},layoutPreference:{type:"string",default:"list"},columns:{type:"number",default:2}},edit:e.default});
},{"./groups/edit":"Ccmh"}]},{},["jcTh"], null)
//# sourceMappingURL=/bp-groups/js/blocks/groups.js.map