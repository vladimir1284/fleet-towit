import{w as u}from"./index.XGR6uEzK.js";import{a as b}from"./paths.zrnwqn2j.js";const m="1705626746503",w="sveltekit:snapshot",I="sveltekit:scroll",S="sveltekit:states",T="sveltekit:pageurl",y="sveltekit:history",N="sveltekit:navigation",f={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},_=location.origin;function U(t){if(t instanceof URL)return t;let e=document.baseURI;if(!e){const n=document.getElementsByTagName("base");e=n.length?n[0].href:document.URL}return new URL(t,e)}function L(){return{x:pageXOffset,y:pageYOffset}}function c(t,e){return t.getAttribute(`data-sveltekit-${e}`)}const d={...f,"":f.hover};function h(t){let e=t.assignedSlot??t.parentNode;return e?.nodeType===11&&(e=e.host),e}function O(t,e){for(;t&&t!==e;){if(t.nodeName.toUpperCase()==="A"&&t.hasAttribute("href"))return t;t=h(t)}}function Y(t,e){let n;try{n=new URL(t instanceof SVGAElement?t.href.baseVal:t.href,document.baseURI)}catch{}const a=t instanceof SVGAElement?t.target.baseVal:t.target,r=!n||!!a||E(n,e)||(t.getAttribute("rel")||"").split(/\s+/).includes("external"),l=n?.origin===_&&t.hasAttribute("download");return{url:n,external:r,target:a,download:l}}function x(t){let e=null,n=null,a=null,r=null,l=null,s=null,o=t;for(;o&&o!==document.documentElement;)a===null&&(a=c(o,"preload-code")),r===null&&(r=c(o,"preload-data")),e===null&&(e=c(o,"keepfocus")),n===null&&(n=c(o,"noscroll")),l===null&&(l=c(o,"reload")),s===null&&(s=c(o,"replacestate")),o=h(o);function i(v){switch(v){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:d[a??"off"],preload_data:d[r??"off"],keepfocus:i(e),noscroll:i(n),reload:i(l),replace_state:i(s)}}function p(t){const e=u(t);let n=!0;function a(){n=!0,e.update(s=>s)}function r(s){n=!1,e.set(s)}function l(s){let o;return e.subscribe(i=>{(o===void 0||n&&i!==o)&&s(o=i)})}return{notify:a,set:r,subscribe:l}}function k(){const{set:t,subscribe:e}=u(!1);let n;async function a(){clearTimeout(n);try{const r=await fetch(`${b}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!r.ok)return!1;const s=(await r.json()).version!==m;return s&&(t(!0),clearTimeout(n)),s}catch{return!1}}return{subscribe:e,check:a}}function E(t,e){return t.origin!==_||!t.pathname.startsWith(e)}let g;function P(t){g=t.client}function V(t){return(...e)=>g[t](...e)}const G={url:p({}),page:p({}),navigating:u(null),updated:k()};export{y as H,N,T as P,I as S,S as a,w as b,x as c,G as d,f as e,O as f,Y as g,P as h,E as i,V as j,g as k,_ as o,U as r,L as s};
//# sourceMappingURL=singletons.LsHtuZJq.js.map
