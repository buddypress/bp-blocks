!function(){"use strict";var e={n:function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,{a:r}),r},d:function(t,r){for(var c in r)e.o(r,c)&&!e.o(t,c)&&Object.defineProperty(t,c,{enumerable:!0,get:r[c]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.domReady,r=e.n(t);class c{constructor(){this.controls=document.querySelectorAll(".wp-block-bp-search-form"),this.increment=0}setForHtml(){this.controls.forEach((e=>{if(e.querySelector(".bp-search-label")){this.increment+=1;const t="bp-search-terms-"+this.increment;e.querySelector('[name="search-terms"]').setAttribute("id",t),e.querySelector(".bp-search-label").setAttribute("for",t)}}))}setRadioListeners(){this.controls.forEach((e=>{const t=e.querySelector('[name="search-terms"]');e.querySelectorAll('[name="search-which"]').forEach((e=>{e.addEventListener("click",(e=>{!0===e.target.checked&&t.setAttribute("placeholder",e.target.dataset.placeholder)}))}))}))}start(){this.setForHtml(),this.setRadioListeners()}}r()((()=>{document.querySelector("body").classList.contains("wp-admin")||(new c).start()}))}();