parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"TmUL":[function(require,module,exports) {
var e=wp.blocks.registerBlockType,t=wp.element,n=t.createElement,l=t.Fragment,s=wp.components,a=s.Placeholder,r=s.Disabled,o=s.PanelBody,i=s.SelectControl,d=s.ToggleControl,u=s.Toolbar,p=s.ToolbarButton,b=wp.blockEditor,m=b.InspectorControls,y=b.BlockControls,c=wp.data.withSelect,g=wp.compose.compose,h=wp.editor.ServerSideRender,v=wp.i18n.__,f=bp.blockComponents.AutoCompleter,S=[{label:v("None","buddypress"),value:"none"},{label:v("Thumb","buddypress"),value:"thumb"},{label:v("Full","buddypress"),value:"full"}],C=function(e){return e&&e.mention_name?e.mention_name:null},I=function(e){var t=e.attributes,s=e.setAttributes,b=e.bpSettings,c=b.isAvatarEnabled,g=b.isMentionEnabled,I=b.isCoverImageEnabled,k=t.avatarSize,w=t.displayMentionSlug,M=t.displayActionButton,B=t.displayCoverImage;return t.itemID?n(l,null,n(y,null,n(u,null,n(p,{icon:"edit",title:v("Select another member","buddypress"),onClick:function(){s({itemID:0})}}))),n(m,null,n(o,{title:v("Settings","buddypress"),initialOpen:!0},n(d,{label:v("Display Profile button","buddypress"),checked:!!M,onChange:function(){s({displayActionButton:!M})},help:v(M?"Include a link to the user's profile page under their display name.":"Toggle to display a link to the user's profile page under their display name.","buddypress")}),c&&n(i,{label:v("Avatar size","buddypress"),value:k,options:S,help:v('Select "None" to disable the avatar.',"buddypress"),onChange:function(e){s({avatarSize:e})}}),I&&n(d,{label:v("Display Cover Image","buddypress"),checked:!!B,onChange:function(){s({displayCoverImage:!B})},help:v(B?"Include the user's cover image over their display name.":"Toggle to display the user's cover image over their display name.","buddypress")}),g&&n(d,{label:v("Display Mention slug","buddypress"),checked:!!w,onChange:function(){s({displayMentionSlug:!w})},help:v(w?"Include the user's mention name under their display name.":"Toggle to display the user's mention name under their display name.","buddypress")}))),n(r,null,n(h,{block:"bp/member",attributes:t}))):n(a,{icon:"admin-users",label:v("BuddyPress Member","buddypress"),instructions:v("Start typing the name of the member you want to feature into this post.","buddypress")},n(f,{component:"members",slugValue:C,ariaLabel:v("Member's username","buddypress"),placeholder:v("Enter Member's username here…","buddypress"),onSelectItem:s,useAvatar:c}))},k=g([c(function(e){return{bpSettings:e("core/editor").getEditorSettings().bp.members||{}}})])(I);e("bp/member",{title:v("Member","buddypress"),description:v("BuddyPress Member.","buddypress"),icon:"admin-users",category:"buddypress",attributes:{itemID:{type:"integer",default:0},avatarSize:{type:"string",default:"full"},displayMentionSlug:{type:"boolean",default:!0},displayActionButton:{type:"boolean",default:!0},displayCoverImage:{type:"boolean",default:!0}},edit:k});
},{}]},{},["TmUL"], null)