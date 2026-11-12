/* ZdrowaDieta — interakcje strony, menu, podgląd i koszyk. */
(function(){
 // Parametry kampanii (utm_*) pozostają w adresie, aby można było mierzyć źródła ruchu.
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
 const nav=document.getElementById("menu");const menuBtn=document.getElementById("menu-btn");
 const mobileMenuQuery=window.matchMedia("(max-width: 800px)");
 function syncMenuState(){
   const mobile=mobileMenuQuery.matches;
   const open=mobile&&nav.classList.contains("open");
   nav.inert=mobile&&!open;
   nav.setAttribute("aria-hidden",String(mobile&&!open));
   menuBtn.setAttribute("aria-expanded",String(open));
   menuBtn.setAttribute("aria-label",open?"Zamknij menu":"Otwórz menu");
 }
 const closeMenu=()=>{nav.classList.remove("open");syncMenuState()};
 menuBtn.addEventListener("click",()=>{nav.classList.toggle("open");syncMenuState()});
 syncMenuState();
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")){closeMenu();menuBtn.focus()}});
 document.addEventListener("click",e=>{if(nav.classList.contains("open")&&!nav.contains(e.target)&&!menuBtn.contains(e.target))closeMenu()});
 const top=document.querySelector(".site-header");let scrollAnim=0;
 function scrollToTarget(hash,update=true){const el=hash==="#"?document.body:document.getElementById(decodeURIComponent(hash.slice(1)));if(!el)return false;
 cancelAnimationFrame(scrollAnim);const offset=hash==="#"?0:top.getBoundingClientRect().height+18;const start=window.scrollY;const end=Math.max(0,start+el.getBoundingClientRect().top-offset);
 if(update&&location.hash!==hash)history.pushState(null,"",location.pathname+location.search+hash);
 if(reduced.matches){window.scrollTo(0,end);return true}
 const distance=end-start;const duration=Math.min(850,Math.max(390,Math.abs(distance)*.24));let init=null;
 function frame(time){if(init===null)init=time;const t=Math.min(1,(time-init)/duration);const ease=1-Math.pow(1-t,3);window.scrollTo(0,start+distance*ease);if(t<1)scrollAnim=requestAnimationFrame(frame)}
 scrollAnim=requestAnimationFrame(frame);return true
 }
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{if(e.button||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;const hash=a.getAttribute("href");if(scrollToTarget(hash)){e.preventDefault();closeMenu()}}));
 window.addEventListener("popstate",()=>{if(location.hash)scrollToTarget(location.hash,false)});
 const tabs=[...document.querySelectorAll('[role="tab"]')];
 function activateTab(tab){tabs.forEach(t=>{const chosen=t===tab;t.setAttribute("aria-selected",String(chosen));t.tabIndex=chosen?0:-1;document.getElementById("panel-"+t.dataset.panel).hidden=!chosen});}
 tabs.forEach((t,index)=>{t.addEventListener("click",()=>activateTab(t));t.addEventListener("keydown",e=>{let next;if(e.key==="ArrowRight")next=(index+1)%tabs.length;else if(e.key==="ArrowLeft")next=(index-1+tabs.length)%tabs.length;else if(e.key==="Home")next=0;else if(e.key==="End")next=tabs.length-1;else return;e.preventDefault();activateTab(tabs[next]);tabs[next].focus()})});
 const bar=document.getElementById("mobile-buy"),hero=document.querySelector(".hero"),offer=document.getElementById("oferta"),footer=document.querySelector(".footer");
 let barFrame=0;
 function updateBar(){
   if(barFrame)return;
   barFrame=requestAnimationFrame(()=>{
     barFrame=0;
     const small=innerWidth<=800;
     const heroPassed=hero.getBoundingClientRect().bottom<Math.min(110,innerHeight*.18);
     const offerRect=offer.getBoundingClientRect();
     const offerVisible=offerRect.top<innerHeight*.82&&offerRect.bottom>innerHeight*.12;
     const footerApproaching=footer.getBoundingClientRect().top<innerHeight-20;
     const cartOpen=document.body.classList.contains("cart-open");
     const visible=small&&heroPassed&&!offerVisible&&!footerApproaching&&!cartOpen;
     bar.classList.toggle("show",visible);
     bar.setAttribute("aria-hidden",String(!visible));
   });
 }
 addEventListener("scroll",updateBar,{passive:true});
 addEventListener("resize",()=>{closeMenu();updateBar()},{passive:true});
 updateBar();
 if(!reduced.matches&&"IntersectionObserver" in window){const els=[...document.querySelectorAll(".reveal")];document.documentElement.classList.add("motion");const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");io.unobserve(entry.target)}})},{threshold:.05,rootMargin:"0px 0px 50px 0px"});els.forEach(el=>io.observe(el))}
 // Koszyk dla jednego produktu; rzeczywistą płatność i dostawę obsługuje Naffy.
 const layer=document.getElementById("cart-layer");
 const dialog=document.getElementById("cart-dialog");
 const cartFilled=document.getElementById("cart-filled");
 const cartEmpty=document.getElementById("cart-empty");
 const cartSummary=document.getElementById("cart-summary");
 const counter=document.querySelectorAll("[data-cart-count]");
 let hasProduct=false;
 let previousFocus=null;
 const miniCart=document.getElementById("mini-cart");
 const miniCartClose=document.getElementById("mini-cart-close");
 const miniCartView=document.getElementById("mini-cart-view");
 const miniCartMessage=document.getElementById("mini-cart-message");
 let miniCartTimer=null;
 function hideMiniCart(){
   clearTimeout(miniCartTimer);
   miniCartTimer=null;
   miniCart.classList.remove("show");
   miniCart.setAttribute("aria-hidden","true");
 }
 function scheduleMiniCartClose(delay=4000){
   clearTimeout(miniCartTimer);
   miniCartTimer=setTimeout(hideMiniCart,delay);
 }
 function showMiniCart(alreadyAdded=false){
   miniCartMessage.textContent=alreadyAdded?"Ten e-book jest już w koszyku":"Dodano do koszyka";
   miniCart.classList.add("show");
   miniCart.setAttribute("aria-hidden","false");
   scheduleMiniCartClose();
 }
 miniCartClose.addEventListener("click",()=>{hideMiniCart();document.getElementById("add-to-cart").focus({preventScroll:true})});
 miniCartView.addEventListener("click",()=>{hideMiniCart();openCart()});
 miniCart.addEventListener("mouseenter",()=>clearTimeout(miniCartTimer));
 miniCart.addEventListener("mouseleave",()=>scheduleMiniCartClose(4000));
 miniCart.addEventListener("focusin",()=>clearTimeout(miniCartTimer));
 miniCart.addEventListener("focusout",event=>{if(!miniCart.contains(event.relatedTarget))scheduleMiniCartClose(4000)});
 document.addEventListener("keydown",event=>{if(event.key==="Escape"&&miniCart.classList.contains("show"))hideMiniCart()});
 function updateCart(){
   cartFilled.hidden=!hasProduct;
   cartEmpty.hidden=hasProduct;
   cartSummary.hidden=!hasProduct;
   counter.forEach(el=>{el.textContent=hasProduct?"1":"0"});
 }
 let cartCloseTimer=null;
 function finishCartClose(){
   if(layer.classList.contains("is-open"))return;
   clearTimeout(cartCloseTimer);
   cartCloseTimer=null;
   layer.hidden=true;
   document.body.classList.remove("cart-open");
   updateBar();
   if(previousFocus&&previousFocus.isConnected&&typeof previousFocus.focus==="function")previousFocus.focus({preventScroll:true});
   previousFocus=null;
 }
 dialog.addEventListener("transitionend",event=>{
   if(event.target===dialog&&event.propertyName==="transform"&&!layer.classList.contains("is-open"))finishCartClose();
 });
 function openCart(){
   hideMiniCart();
   if(layer.classList.contains("is-open"))return;
   clearTimeout(cartCloseTimer);
   cartCloseTimer=null;
   previousFocus=previousFocus||(miniCart.contains(document.activeElement)?document.getElementById("add-to-cart"):nav.contains(document.activeElement)?menuBtn:document.activeElement);
   closeMenu();
   layer.hidden=false;
   document.body.classList.add("cart-open");
   updateBar();
   updateCart();
   // Wywołaj przeliczenie stylów, aby animacja działała także przy pierwszym otwarciu.
   void dialog.offsetWidth;
   layer.classList.add("is-open");
   document.getElementById("cart-close").focus({preventScroll:true});
 }
 function closeCart(){
   if(layer.hidden||!layer.classList.contains("is-open"))return;
   layer.classList.remove("is-open");
   if(reduced.matches){finishCartClose();return}
   cartCloseTimer=setTimeout(finishCartClose,530);
 }
 document.querySelectorAll("[data-open-cart]").forEach(el=>el.addEventListener("click",openCart));
 document.getElementById("add-to-cart").addEventListener("click",event=>{const alreadyAdded=hasProduct;hasProduct=true;updateCart();showMiniCart(alreadyAdded);if(event.detail===0)miniCartView.focus({preventScroll:true})});
 document.getElementById("cart-remove").addEventListener("click",()=>{hideMiniCart();hasProduct=false;updateCart();document.getElementById("cart-browse").focus()});
 document.getElementById("cart-close").addEventListener("click",closeCart);
 document.getElementById("cart-backdrop").addEventListener("click",closeCart);
 document.getElementById("cart-browse").addEventListener("click",()=>{closeCart();document.getElementById("oferta").scrollIntoView({behavior:reduced.matches?"instant":"smooth",block:"start"})});
 document.addEventListener("keydown",event=>{
   if(layer.hidden)return;
   if(event.key==="Escape"){event.preventDefault();closeCart();return}
   if(event.key==="Tab"){
     const focusable=[...dialog.querySelectorAll('a[href],button:not([disabled])')].filter(el=>el.getClientRects().length>0);
     if(!focusable.length)return;
     const first=focusable[0],last=focusable[focusable.length-1];
     if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
     else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
   }
 });
 updateCart();
})();
