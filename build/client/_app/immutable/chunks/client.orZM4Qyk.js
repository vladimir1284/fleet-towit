import{b as w}from"./paths.zrnwqn2j.js";async function R(n,t,a){const{callbackUrl:o=window.location.href,redirect:e=!0}=t??{},c=n==="credentials",s=c||n==="email",i=w??"",d=`${`${i}/auth/${c?"callback":"signin"}/${n}`}?${new URLSearchParams(a)}`,h=await fetch(`${i}/auth/csrf`),{csrfToken:f}=await h.json(),r=await fetch(d,{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded","X-Auth-Return-Redirect":"1"},body:new URLSearchParams({...t,csrfToken:f,callbackUrl:o})}),l=await r.clone().json();if(e||!s){window.location.href=l.url??o,l.url.includes("#")&&window.location.reload();return}return r}async function b(n){const{callbackUrl:t=window.location.href}=n??{},a=w??"",o=await fetch(`${a}/auth/csrf`),{csrfToken:e}=await o.json(),s=(await(await fetch(`${a}/auth/signout`,{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded","X-Auth-Return-Redirect":"1"},body:new URLSearchParams({csrfToken:e,callbackUrl:t})})).json()).url??t;window.location.href=s,s.includes("#")&&window.location.reload()}export{R as a,b as s};
//# sourceMappingURL=client.orZM4Qyk.js.map