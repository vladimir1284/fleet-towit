import"./index.5brJxJeu.js";const d="modulepreload",m=function(a,i){return new URL(a,i).href},f={},w=function(i,l,c){let u=Promise.resolve();if(l&&l.length>0){const n=document.getElementsByTagName("link");u=Promise.all(l.map(e=>{if(e=m(e,c),e in f)return;f[e]=!0;const r=e.endsWith(".css"),h=r?'[rel="stylesheet"]':"";if(!!c)for(let s=n.length-1;s>=0;s--){const o=n[s];if(o.href===e&&(!r||o.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${h}`))return;const t=document.createElement("link");if(t.rel=r?"stylesheet":d,r||(t.as="script",t.crossOrigin=""),t.href=e,document.head.appendChild(t),r)return new Promise((s,o)=>{t.addEventListener("load",s),t.addEventListener("error",()=>o(new Error(`Unable to preload CSS for ${e}`)))})}))}return u.then(()=>i()).catch(n=>{const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=n,window.dispatchEvent(e),!e.defaultPrevented)throw n})};export{w as _};
//# sourceMappingURL=preload-helper.oPh3kAL_.js.map