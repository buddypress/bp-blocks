!function(){"use strict";var e=window.wp.blocks,t=window.wp.i18n,a=window.wp.element,l=window.lodash,c=window.wp.blockEditor,o=window.wp.components,r=window.bp.blockData;const s=[{label:(0,t._x)("Activities","search form","bp-search-block"),value:"activity",requiredFeature:"",placeholder:(0,t.__)("Search activities","bp-search-block")},{label:(0,t._x)("Members","search form","bp-search-block"),value:"members",requiredFeature:"",placeholder:(0,t.__)("Search members","bp-search-block")},{label:(0,t._x)("Groups","search form","bp-search-block"),value:"groups",requiredFeature:"",placeholder:(0,t.__)("Search groups","bp-search-block")},{label:(0,t._x)("Blogs","search form","bp-search-block"),value:"blogs",requiredFeature:"sites_directory",placeholder:(0,t.__)("Search blogs","bp-search-block")},{label:(0,t._x)("Posts","search form","bp-search-block"),value:"posts",placeholder:(0,t.__)("Search posts","bp-search-block")}];var n=e=>{let{label:t,option:l,checked:c,onChecked:r,defaultOption:s}=e;const[n,b]=(0,a.useState)(),p=(0,a.createElement)(o.CheckboxControl,{label:t,checked:n||c,onChange:e=>(e=>{r(l,e),b(e)})(e)});return l===s?(0,a.createElement)(o.Disabled,null,p):p},b=e=>{let{selected:t,options:l,onSelected:c}=e;const[r,s]=(0,a.useState)(t);return(0,a.createElement)(o.RadioControl,{selected:r||t,options:l,onChange:e=>(e=>{c(e),s(e)})(e)})},p=JSON.parse('{"apiVersion":2,"name":"bp/search-form","title":"Community Search","category":"widgets","icon":"search","description":"A Block to search for posts, sites, activities, members or groups from any post, page or widget of your BuddyPress powered community site!","keywords":["BuddyPress","search","community"],"textdomain":"bp-search-block","attributes":{"label":{"type":"string","source":"html","selector":".bp-search-label","default":"Search"},"useLabel":{"type":"boolean","default":true},"buttonText":{"type":"string","source":"html","selector":".bp-search-button","default":"Search"},"useIcon":{"type":"boolean","default":false},"placeholder":{"type":"string","default":""},"activeOptions":{"type":"array","default":["posts"]},"defaultOption":{"type":"string","default":"posts"},"action":{"type":"string","default":""}},"supports":{"align":true},"editorScript":"file:index.js","script":"file:view.js","editorStyle":"file:index.css","style":"file:view.css"}');(0,e.registerBlockType)(p,{title:(0,t.__)("Community Search","bp-search-block"),description:(0,t.__)("A Block to search for posts, sites, activities, members or groups from any post, page or widget of your BuddyPress powered community site!","bp-search-block"),icon:{background:"#fff",foreground:"#d84800",src:"search"},attributes:{label:{type:"string",source:"html",selector:".bp-search-label",default:(0,t.__)("Search","bp-search-block")},useLabel:{type:"boolean",default:!0},buttonText:{type:"string",source:"html",selector:".bp-search-button",default:(0,t.__)("Search","bp-search-block")},useIcon:{type:"boolean",default:!1},placeholder:{type:"string",default:(0,t.__)("Search posts","bp-search-block")},activeOptions:{type:"array",default:["posts"]},defaultOption:{type:"string",default:"posts"},action:{type:"string",default:window.bpSearchFormAction||""}},edit:e=>{let{attributes:p,setAttributes:i}=e;const h=(0,c.useBlockProps)(),{activeOptions:u,placeholder:d,action:m,label:_,useLabel:k,buttonText:f,useIcon:g,defaultOption:y}=p,v=(e,t)=>{let a=u;a=t?[e,...a]:a.filter((t=>t!==e)),a.sort(),i({activeOptions:a})},w=s.filter((e=>"posts"===e.value||(0,r.isActive)(e.value,e.requiredFeature))).map(((e,t)=>(0,a.createElement)(n,{key:"option__"+t,label:e.label,checked:-1!==u.indexOf(e.value),option:e.value,onChecked:v,defaultOption:y}))),E=s.filter((e=>-1!==u.indexOf(e.value)));return(0,a.createElement)(a.Fragment,null,(0,a.createElement)(c.InspectorControls,null,(0,a.createElement)(o.PanelBody,{title:(0,t.__)("Search options","bp-search-block"),initialOpen:!0},w),(0,a.createElement)(o.PanelBody,{title:(0,t.__)("Display options","bp-search-block"),initialOpen:!1},(0,a.createElement)(o.ToggleControl,{label:(0,t.__)("Show the search label","bp-search-block"),checked:!!k,onChange:()=>{i({useLabel:!k})},help:k?(0,t.__)("Display a label over the search field.","bp-search-block"):(0,t.__)("Toggle to display a label over the search field.","bp-search-block")}),(0,a.createElement)(o.ToggleControl,{label:(0,t.__)("Use a Search Icon","bp-search-block"),checked:!!g,onChange:()=>{i({useIcon:!g})},help:g?(0,t.__)("Use a search icon instead of the search button text.","bp-search-block"):(0,t.__)("Toggle to use a search icon instead of the search button text.","bp-search-block")}))),(0,a.createElement)("div",h,(0,a.createElement)("form",{action:m,method:"post"},k&&(0,a.createElement)(c.RichText,{tagname:"label",className:"bp-search-label","aria-label":(0,t.__)("Label text","bp-search-block"),placeholder:(0,t.__)("Add label…","bp-search-block"),withoutInteractiveFormatting:!0,value:_,onChange:e=>i({label:e})}),(0,a.createElement)("div",{className:"bp-block-search__inside-wrapper"},(0,a.createElement)("input",{type:"search",className:"bp-block-search__input",name:"search-terms",placeholder:d}),!!g&&(0,a.createElement)("button",{type:"button",className:"wp-block-search__button button bp-search-button bp-block-search__icon-button has-icon"},(0,a.createElement)("div",{className:"bp-search-block-icon"},(0,a.createElement)("span",{className:"screen-reader-text"},(0,t.__)("Search","bp-search-block")))),!g&&(0,a.createElement)(c.RichText,{tagname:"button",className:"wp-block-search__button button bp-search-button","aria-label":(0,t.__)("Button text","bp-search-block"),placeholder:(0,t.__)("Add text…","bp-search-block"),withoutInteractiveFormatting:!0,value:f,onChange:e=>i({buttonText:e})})),(0,a.createElement)("div",{className:"bp-block-search-for__wrapper"},(0,a.createElement)("strong",{className:"bp-block-search-for__label"},(0,t.__)("Search for:","bp-search-block")),(0,a.createElement)("div",{className:"bp-block-search-for__options"},(0,a.createElement)(b,{selected:y,options:E,onSelected:e=>{const t=(0,l.find)(s,["value",e]);i({defaultOption:e,placeholder:t.placeholder})}}))))))},save:e=>{let{attributes:l}=e;const o=c.useBlockProps.save(),{label:r,useLabel:n,buttonText:b,useIcon:p,placeholder:i,activeOptions:h,defaultOption:u,action:d}=l,m=s.filter((e=>-1!==h.indexOf(e.value)));let _=[];return m.forEach(((e,t)=>{let l=!1;e.value===u&&(l="checked"),_.push((0,a.createElement)("li",{key:"bp-search-option__"+t},(0,a.createElement)("label",null,(0,a.createElement)("input",{type:"radio",name:"search-which",value:e.value,"data-placeholder":e.placeholder,checked:l}),e.label)))})),(0,a.createElement)("div",o,(0,a.createElement)("form",{action:d,method:"post"},n&&(0,a.createElement)(c.RichText.Content,{tagName:"label",value:r,className:"bp-search-label"}),(0,a.createElement)("div",{className:"bp-block-search__inside-wrapper"},(0,a.createElement)("input",{type:"search",className:"bp-block-search__input",name:"search-terms",placeholder:i}),!!p&&(0,a.createElement)("button",{type:"submit",className:"wp-block-search__button button bp-search-button bp-block-search__icon-button has-icon"},(0,a.createElement)("div",{className:"bp-search-block-icon"},(0,a.createElement)("span",{className:"bp-screen-reader-text"},(0,t.__)("Search","bp-search-block")))),!p&&(0,a.createElement)(c.RichText.Content,{tagName:"button",type:"submit",value:b,className:"wp-block-search__button button bp-search-button"})),(0,a.createElement)("div",{className:"bp-block-search-for__wrapper"},(0,a.createElement)("strong",{className:"bp-block-search-for__label"},(0,t.__)("Search for:","bp-search-block")),(0,a.createElement)("ul",{className:"bp-block-search-for__options"},_))))}})}();