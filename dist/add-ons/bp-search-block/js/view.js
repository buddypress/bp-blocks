(()=>{"use strict";var e,r={178:(e,r,t)=>{const o=window.wp.domReady;var s=t.n(o);class a{constructor(){this.controls=document.querySelectorAll(".wp-block-bp-search-form"),this.increment=0}setForHtml(){this.controls.forEach((e=>{if(e.querySelector(".bp-search-label")){this.increment+=1;const r="bp-search-terms-"+this.increment;e.querySelector('[name="search-terms"]').setAttribute("id",r),e.querySelector(".bp-search-label").setAttribute("for",r)}}))}setRadioListeners(){this.controls.forEach((e=>{const r=e.querySelector('[name="search-terms"]');e.querySelectorAll('[name="search-which"]').forEach((e=>{e.addEventListener("click",(e=>{!0===e.target.checked&&r.setAttribute("placeholder",e.target.dataset.placeholder)}))}))}))}start(){this.setForHtml(),this.setRadioListeners()}}s()((()=>{document.querySelector("body").classList.contains("wp-admin")||(new a).start()}))}},t={};function o(e){var s=t[e];if(void 0!==s)return s.exports;var a=t[e]={exports:{}};return r[e](a,a.exports,o),a.exports}o.m=r,e=[],o.O=(r,t,s,a)=>{if(!t){var c=1/0;for(h=0;h<e.length;h++){for(var[t,s,a]=e[h],n=!0,l=0;l<t.length;l++)(!1&a||c>=a)&&Object.keys(o.O).every((e=>o.O[e](t[l])))?t.splice(l--,1):(n=!1,a<c&&(c=a));if(n){e.splice(h--,1);var i=s();void 0!==i&&(r=i)}}return r}a=a||0;for(var h=e.length;h>0&&e[h-1][2]>a;h--)e[h]=e[h-1];e[h]=[t,s,a]},o.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return o.d(r,{a:r}),r},o.d=(e,r)=>{for(var t in r)o.o(r,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},o.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e={217:0,936:0};o.O.j=r=>0===e[r];var r=(r,t)=>{var s,a,[c,n,l]=t,i=0;if(c.some((r=>0!==e[r]))){for(s in n)o.o(n,s)&&(o.m[s]=n[s]);if(l)var h=l(o)}for(r&&r(t);i<c.length;i++)a=c[i],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(h)},t=globalThis.webpackChunkbp_blocks=globalThis.webpackChunkbp_blocks||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})();var s=o.O(void 0,[936],(()=>o(178)));s=o.O(s)})();