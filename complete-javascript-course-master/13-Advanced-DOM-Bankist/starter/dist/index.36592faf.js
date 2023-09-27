"use strict";const modal=document.querySelector(".modal"),overlay=document.querySelector(".overlay"),btnCloseModal=document.querySelector(".btn--close-modal"),btnsOpenModal=document.querySelectorAll(".btn--show-modal"),section1=document.querySelector("#section--1"),s1coords=section1.getBoundingClientRect(),nav=document.querySelector(".nav"),header=document.querySelector(".header__title"),headerCoords=header.getBoundingClientRect(),navLogo=document.querySelector(".nav__logo"),sections=document.querySelectorAll(".section"),imgTargets=document.querySelectorAll("img[data-src]"),dotContainer=document.querySelector(".dots"),openModal=function(e){e.preventDefault(),modal.classList.remove("hidden"),overlay.classList.remove("hidden")},closeModal=function(){modal.classList.add("hidden"),overlay.classList.add("hidden")};btnsOpenModal.forEach((e=>e.addEventListener("click",openModal))),btnCloseModal.addEventListener("click",closeModal),overlay.addEventListener("click",closeModal),document.addEventListener("keydown",(function(e){"Escape"!==e.key||modal.classList.contains("hidden")||closeModal()}));const link=document.querySelector(".nav__link--btn");console.log(link.href),console.log(link.getAttribute("href"));const learnMoreBtn=document.querySelector(".btn--scroll-to");learnMoreBtn.addEventListener("click",(function(){section1.scrollIntoView({behavior:"smooth"})}));const sectionTitle=document.querySelector(".section__title"),navLinks=document.querySelector(".nav__links"),mouseHover=function(e){if(e.preventDefault(),e.target.classList.contains("nav__link")){const t=e.target,o=t.closest(".nav").querySelectorAll(".nav__link");console.log(o),o.forEach((e=>{e!=t&&(e.style.opacity=this)}))}};navLinks.addEventListener("mouseover",mouseHover.bind(.5)),navLinks.addEventListener("mouseout",mouseHover.bind(1)),document.querySelector(".nav__links").addEventListener("click",(function(e){if(e.preventDefault(),e.target.classList.contains("nav__link")){const t=e.target.getAttribute("href");document.querySelector(t).scrollIntoView({behavior:"smooth"})}}));const tabs=document.querySelectorAll(".operations__tab"),tabsContainer=document.querySelector(".operations__tab-container"),tabsContent=document.querySelectorAll(".operations__content");tabsContainer.addEventListener("click",(function(e){tabs.forEach((e=>e.classList.remove("operations__tab--active"))),tabsContent.forEach((e=>e.classList.remove("operations__content--active"))),console.log(tabsContainer.children);const t=e.target.closest(".operations__tab");if(!t)return;const o=t.getAttribute("data-tab");console.log(o),t.classList.add("operations__tab--active"),tabsContent.forEach((e=>{e.classList.contains(`operations__content--${o}`)&&e.classList.add("operations__content--active")})),window.addEventListener("scroll",(function(){s1coords.top<window.scrollY?nav.classList.add("sticky"):nav.classList.remove("sticky")})),console.log(t)})),navLogo.addEventListener("click",(function(){header.scrollIntoView({behavior:"smooth"})}));const stickNav=e=>{const[t]=e;t.isIntersecting?nav.classList.remove("sticky"):nav.classList.add("sticky"),console.log(t.isIntersecting)},obsOptions={root:null,threshold:.4},observer=new IntersectionObserver(stickNav,obsOptions);observer.observe(header),sections.forEach((e=>{new IntersectionObserver((t=>{const[o]=t;o.isIntersecting&&e.classList.remove("section--hidden")}),{root:null,threshold:.2}).observe(e)}));const loadImg=e=>{const[t]=e;console.log(t),t.target.src=t.target.dataset.src,t.target.addEventListener("load",(function(){t.target.classList.remove("lazy-img")}))},imageObserver=new IntersectionObserver(loadImg,{root:null,threshold:0,rootMargin:"200px"});imgTargets.forEach((e=>imageObserver.observe(e)));const slider=document.querySelector(".slider"),slides=document.querySelectorAll(".slide"),btnLeft=document.querySelector(".slider__btn--left"),btnRight=document.querySelector(".slider__btn--right");slides.forEach(((e,t)=>e.style.transform=`translateX(${100*t}%)`));let counter=0;const changeSlide=function(e){counter=e,slides.forEach(((t,o)=>{t.style.transform=`translateX(${100*(o-e)}%)`,highlightDot(counter)}))};btnRight.addEventListener("click",(function(){counter===slides.length-1?counter=0:counter++,changeSlide(counter)})),btnLeft.addEventListener("click",(function(){0===counter?counter=slides.length-1:counter--,changeSlide(counter)})),document.addEventListener("keydown",(function(e){switch(e.key){case"ArrowRight":counter===slides.length-1?counter=0:counter++,changeSlide(counter);break;case"ArrowLeft":0===counter?counter=slides.length-1:counter--,changeSlide(counter),highlightDot(counter)}}));const createDots=function(){slides.forEach(((e,t)=>{dotContainer.insertAdjacentHTML("beforeend",`<button class="dots__dot" data-slide="${t}"></button>`)}))};slides.forEach(((e,t)=>{dotContainer.insertAdjacentHTML("beforeend",`<button class="dots__dot" data-slide="${t}"></button>`)})),dotContainer.addEventListener("click",(function(e){if(e.target.classList.contains("dots__dot")){const{slide:t}=e.target.dataset;changeSlide(t)}}));const highlightDot=function(e){dotContainer.querySelectorAll(".dots__dot").forEach((t=>{t.classList.remove("dots__dot--active");t.dataset.slide;document.querySelector(`.dots__dot[data-slide="${e}"]`).classList.add("dots__dot--active")}))};highlightDot(counter);
//# sourceMappingURL=index.36592faf.js.map
