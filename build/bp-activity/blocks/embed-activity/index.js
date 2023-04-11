(()=>{"use strict";const e=window.wp.blocks,t=window.wp.element,i=window.wp.blockEditor,r=window.wp.components,a=window.wp.compose,n=window.wp.data,s=window.wp.i18n,c=window.bp.blockData,l=(0,a.compose)([(0,n.withSelect)(((e,t)=>{const{url:i}=t.attributes,{getEmbedPreview:r,isRequestingEmbedPreview:a}=e("core");return{preview:!!i&&r(i),fetching:!!i&&a(i)}}))])((e=>{let{attributes:a,setAttributes:n,isSelected:l,preview:o,fetching:d}=e;const p=(0,i.useBlockProps)(),{url:m,caption:u}=a,b=(0,s.__)("BuddyPress Activity URL","buddypress"),[y,w]=(0,t.useState)(m),[v,E]=(0,t.useState)(!m),h=(0,t.createElement)(i.BlockControls,null,(0,t.createElement)(r.ToolbarGroup,null,(0,t.createElement)(r.ToolbarButton,{icon:"edit",title:(0,s.__)("Edit URL","buddypress"),onClick:e=>{e&&e.preventDefault(),E(!0)}})));return v?(0,t.createElement)("div",p,(0,t.createElement)(r.Placeholder,{icon:"buddicons-activity",label:b,className:"wp-block-embed",instructions:(0,s.__)("Paste the link to the activity content you want to display on your site.","buddypress")},(0,t.createElement)("form",{onSubmit:e=>{e&&e.preventDefault(),E(!1),n({url:y})}},(0,t.createElement)("input",{type:"url",value:y||"",className:"components-placeholder__input","aria-label":b,placeholder:(0,s.__)("Enter URL to embed here…","buddypress"),onChange:e=>w(e.target.value)}),(0,t.createElement)(r.Button,{variant:"primary",type:"submit"},(0,s.__)("Embed","buddypress"))),(0,t.createElement)("div",{className:"components-placeholder__learn-more"},(0,t.createElement)(r.ExternalLink,{href:(0,s.__)("https://codex.buddypress.org/activity-embeds/","buddypress")},(0,s.__)("Learn more about activity embeds","buddypress"))))):d?(0,t.createElement)("div",{className:"wp-block-embed is-loading"},(0,t.createElement)(r.Spinner,null),(0,t.createElement)("p",null,(0,s.__)("Embedding…","buddypress"))):o&&o.x_buddypress&&"activity"===o.x_buddypress?(0,t.createElement)("div",p,!v&&h,(0,t.createElement)("figure",{className:"wp-block-embed is-type-bp-activity"},(0,t.createElement)("div",{className:"wp-block-embed__wrapper"},(0,t.createElement)(r.Disabled,null,(0,t.createElement)(r.SandBox,{html:o&&o.html?o.html:"",scripts:[c.embedScriptURL]}))),(!i.RichText.isEmpty(u)||l)&&(0,t.createElement)(i.RichText,{tagName:"figcaption",placeholder:(0,s.__)("Write caption…","buddypress"),value:u,onChange:e=>n({caption:e}),inlineToolbar:!0}))):(0,t.createElement)("div",p,h,(0,t.createElement)(r.Placeholder,{icon:"buddicons-activity",label:b},(0,t.createElement)("p",{className:"components-placeholder__error"},(0,s.__)("The URL you provided is not a permalink to a public BuddyPress Activity. Please use another URL.","buddypress"))))})),o=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"bp/embed-activity","title":"Embed an activity","category":"embed","icon":"buddicons-activity","description":"Add a block that displays the activity content pulled from this or other community sites.","keywords":["BuddyPress","activity","community"],"textdomain":"buddypress","attributes":{"url":{"type":"string"},"caption":{"type":"string","source":"html","selector":"figcaption"}},"supports":{"align":true},"editorScript":"file:index.js","style":"file:index.css"}');(0,e.registerBlockType)(o,{icon:{background:"#fff",foreground:"#d84800",src:"buddicons-activity"},edit:l,save:e=>{let{attributes:r}=e;const a=i.useBlockProps.save({className:"wp-block-embed is-type-bp-activity"}),{url:n,caption:s}=r;return n?(0,t.createElement)("figure",a,(0,t.createElement)("div",{className:"wp-block-embed__wrapper"},`\n${n}\n`),!i.RichText.isEmpty(s)&&(0,t.createElement)(i.RichText.Content,{tagName:"figcaption",value:s})):null}})})();