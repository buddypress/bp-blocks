(()=>{"use strict";var e={n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var s in r)e.o(r,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:r[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.wp.domReady;var r=e.n(t);class s{constructor(){this.controls=document.querySelectorAll(".wp-block-bp-search-form"),this.increment=0}setForHtml(){this.controls.forEach((e=>{if(e.querySelector(".bp-search-label")){this.increment+=1;const t="bp-search-terms-"+this.increment;e.querySelector('[name="search-terms"]').setAttribute("id",t),e.querySelector(".bp-search-label").setAttribute("for",t)}}))}setRadioListeners(){this.controls.forEach((e=>{const t=e.querySelector('[name="search-terms"]');e.querySelectorAll('[name="search-which"]').forEach((e=>{e.addEventListener("click",(e=>{!0===e.target.checked&&t.setAttribute("placeholder",e.target.dataset.placeholder)}))}))}))}start(){this.setForHtml(),this.setRadioListeners()}}r()((()=>{document.querySelector("body").classList.contains("wp-admin")||(new s).start()}))})();