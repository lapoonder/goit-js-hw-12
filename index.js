import{a as y,i as f,S as B}from"./assets/vendor-DeexXyb9.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();y.defaults.baseURL="https://pixabay.com";async function p(s,e,i){return(await y.get("/api/",{params:{key:"47257785-d72a0dbe5696a4dd8bfb23e2a",q:`${s}`,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:`${i}`,page:`${e}`}})).data}const C="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgBrZXtEcIgDIZTzp5/3URHcSPpJLpBXcVd+FPwiqQt1y+SUNv3DuUkvA+0SQQg5Jx7WOt8zsBYyudEmXsPuijg3bbtB1ipa/jQYQ+UZVmBpHjyprEvyBTGSjf52zwbssdchBxhTkI4c2vtTTJMxcwgw6RObZReXDycMSYBcTWuQX/6RqcMQpCmIOPNHbG30SKAgkjmU8AJBJ3PpQ5GOO2KCYVFGEaFa9J+EbCEDIAsc5SCTCkFPjWXlHWD2Jvw5MNP2b1HBEzN42OZvhMRwmURly1cCvfrszSlC41PxR6SKjQs3g4Qg6z9PpdBxsitIhWDXrPDcZCtWplHHQEhzY+AiOZ7IJz5qg5iWygK/wjfFwD+T18pdfXe37e0j07jTeTBPZYfWztI8097RKsAAAAASUVORK5CYII=",v="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEdSURBVHgBtVQLEcIwDH04mAMqAQmTgIQ6YA6Yg+FgOBgOJgEJwwE4CBn3xnK7dT/Ku8tdeSkvaV9WYAVEJNPw+AdUuJAeBWJCBR2FS40L1w6xoGKVRsNCicZTo0YMtHfOjr3hMnIpfgU7b0b4O3MJtkL/fLad8jSe65S5HFtgjeXvo5milFxFPxzWghPznZZAAbfJcCOWG+4wLEA+H3JLCjRDY82VtdgbPpHAIITET8OxNLkPRvjO8GxO3LGbEgtPZnI1/UimCpTW2IBIhXBzLQrMbMixEZOGd8eXiZkW86EF8uPvlIy8NwFxWbHPd4RbMmZLC3Bv/TVc+vfGYQZzV2T29e8UFyUiQzWv7Sl2NCTFf/DY8Wo84uOlcXsDUIAXQjLWiKQAAAAASUVORK5CYII=";f.settings({timeout:5e3,resetOnHover:!0,icon:"material-icons",animateInside:!1,transitionIn:"fadeIn",transitionOut:"fadeOut",position:"topRight",titleColor:"#fff",titleLineHeight:"24",backgroundColor:"#ef4040",progressBarColor:"#b51b1b",messageColor:"#fff",messageSize:"16",messageLineHeight:"24"});const h=new B(".gallery a",{captionsData:"alt",captionDelay:250,captionClass:"imageTitle"});function g(s){f.error({class:"error_message",iconUrl:`${C}`,message:s})}function L(s){f.info({class:"caution_message",iconUrl:`${v}`,message:s})}function I(s){return s.map(({webformatURL:i,largeImageURL:a,tags:t,likes:r,views:n,comments:S,downloads:w})=>`<li class="gallery-item">
        <div class="image_prev">
  <a class="gallery-link" href="${a}">
    <img class="gallery-image"
      src="${i}"
      alt="${t}" />
  </a>
  </div>
  <div class="img_info">
  <ul class="information_list">
  <li>Likes</li>
  <li>${r}</li>
  </ul>
    <ul class="information_list">
  <li>Views</li>
  <li>${n}</li>
  </ul>
    <ul class="information_list">
  <li>Comments</li>
  <li>${S}</li>
  </ul>
    <ul class="information_list">
  <li>Downloads</li>
  <li>${w}</li>
  </ul>
  </div>
</li>
`).join("")}const b=document.querySelector(".search-image-form"),O=document.querySelector(".search-img"),u=document.querySelector(".gallery"),o=document.querySelector(".loader"),c=document.querySelector(".load-more"),d=15;let A="",l=1,m=0;b.addEventListener("submit",P);function P(s){s.preventDefault(),A=O.value.trim(),b.reset(),A.length?(l=1,u.innerHTML="",c.style.display="none",o.style.display="block",p(A,l,d).then(e=>{const{totalHits:i,hits:a}=e;if(a.length>0)return m=Math.ceil(i/d),I(a);throw"Sorry, there are no images matching your search query. Please try again!"}).then(e=>{o.style.display="none",u.innerHTML=e,m>1&&(c.style.display="flex"),h.refresh()}).catch(e=>{g(e),o.style.display="none"})):g("Sorry, search query cannot be empty!")}c.addEventListener("click",E);function E(s){l+=1,o.style.display="block",p(A,l,d).then(e=>{const{hits:i}=e;if(i.length>0)return I(i);throw"Sorry, there are no images matching your search query. Please try again!"}).then(e=>{o.style.display="none",u.insertAdjacentHTML("beforeend",e),h.refresh();const i=document.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:i,behavior:"smooth"})}).catch(e=>{g(e),c.style.display="none",o.style.display="none"}),l===m&&(c.style.display="none",L("We're sorry, but you've reached the end of search results."))}
//# sourceMappingURL=index.js.map
