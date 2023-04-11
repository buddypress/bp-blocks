(()=>{"use strict";const e=window.wp.i18n,t=window.bp.dynamicWidgetBlock;class s extends t.dynamicWidgetBlock{loop(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"active";const i=super.useTemplate("bp-friends-item"),d=document.querySelector("#"+s);let n="";t&&t.length?t.forEach((t=>{if("active"===r&&t.last_activity)
/* translators: %s: a human time diff. */
t.extra=(0,e.sprintf)((0,e.__)("Active %s","buddypress"),t.last_activity.timediff);else if("popular"===r&&t.total_friend_count){const s=parseInt(t.total_friend_count,10);t.extra=0===s?(0,e.__)("No friends","buddypress"):1===s?(0,e.__)("1 friend","buddypress"):(0,e.sprintf)((0,e.__)("%s friends","buddypress"),t.total_friend_count)}else"newest"===r&&t.registered_since&&(
/* translators: %s is time elapsed since the registration date happened */
t.extra=(0,e.sprintf)((0,e.__)("Registered %s","buddypress"),t.registered_since))
/* translators: %s: member name */;t.avatar_alt=(0,e.sprintf)((0,e.__)("Profile picture of %s","buddypress"),t.name),n+=i(t)})):n='<div class="widget-error">'+(0,e.__)("Sorry, no members were found.","buddypress")+"</div>",d.innerHTML=n}start(){this.blocks.forEach(((e,t)=>{const{selector:s}=e,{type:r}=e.query_args,i=document.querySelector("#"+s).closest(".bp-dynamic-block-container");super.getItems(r,t),i.querySelectorAll(".item-options a").forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault(),e.target.closest(".item-options").querySelector(".selected").classList.remove("selected"),e.target.classList.add("selected");const s=e.target.getAttribute("data-bp-sort");s!==this.blocks[t].query_args.type&&super.getItems(s,t)}))}))}))}}const r=new s(window.bpFriendsSettings||{},window.bpFriendsBlocks||{});"loading"===document.readyState?document.addEventListener("DOMContentLoaded",r.start()):r.start()})();