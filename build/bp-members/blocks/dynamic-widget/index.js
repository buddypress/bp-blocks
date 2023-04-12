(()=>{"use strict";var e={n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var l in r)e.o(r,l)&&!e.o(t,l)&&Object.defineProperty(t,l,{enumerable:!0,get:r[l]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.wp.blocks,r=window.wp.element,l=window.wp.blockEditor,n=window.wp.components,s=window.wp.i18n,a=window.wp.serverSideRender;var o=e.n(a);const i=window.bp.blockData,d=[{label:(0,s.__)("Newest","buddypress"),value:"newest"},{label:(0,s.__)("Active","buddypress"),value:"active"},{label:(0,s.__)("Popular","buddypress"),value:"popular"}],m=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"bp/dynamic-members","title":"Dynamic Members List","category":"widgets","icon":"groups","description":"A dynamic list of recently active, popular, and newest members.","keywords":["BuddyPress","members","community"],"textdomain":"buddypress","attributes":{"title":{"type":"string","default":"Members"},"maxMembers":{"type":"number","default":5},"memberDefault":{"type":"string","default":"active"},"linkTitle":{"type":"boolean","default":false}},"supports":{"align":true},"editorScript":"file:index.js","style":"file:index.css"}');(0,t.registerBlockType)(m,{icon:{background:"#fff",foreground:"#d84800",src:"groups"},edit:e=>{let{attributes:t,setAttributes:a}=e;const m=(0,l.useBlockProps)(),{title:u,maxMembers:b,memberDefault:c,linkTitle:p}=t,w=(0,i.isActive)("friends")?d:d.filter((e=>"popular"!==e.value));return(0,r.createElement)("div",m,(0,r.createElement)(l.InspectorControls,null,(0,r.createElement)(n.PanelBody,{title:(0,s.__)("Settings","buddypress"),initialOpen:!0},(0,r.createElement)(n.TextControl,{label:(0,s.__)("Title","buddypress"),value:u,onChange:e=>{a({title:e})}}),(0,r.createElement)(n.RangeControl,{label:(0,s.__)("Max members to show","buddypress"),value:b,onChange:e=>a({maxMembers:e}),min:1,max:10,required:!0}),(0,r.createElement)(n.SelectControl,{label:(0,s.__)("Default members to show","buddypress"),value:c,options:w,onChange:e=>{a({memberDefault:e})}}),(0,r.createElement)(n.ToggleControl,{label:(0,s.__)("Link block title to Members directory","buddypress"),checked:!!p,onChange:()=>{a({linkTitle:!p})}}))),(0,r.createElement)(n.Disabled,null,(0,r.createElement)(o(),{block:"bp/dynamic-members",attributes:t})))}})})();