const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./uhW2miwt.js","./MNmVBGFI.js","./entry.6NIWEqGV.css","./D4hctl2G.js","./Dpj49AOJ.js","./BKfJhwww.js","./DyjMr9xt.js","./LoadingCircle.nhjdfyFj.css","./OrderForm.DYVZ0ajR.css","./DE76j8ks.js","./CtIEdkqi.js"])))=>i.map(i=>d[i]);
import{_ as V,r as w,a as F,c as A,b as p,o as c,d as e,e as D,f as $,g as u,t as h,F as P,h as O,n as y,w as b,v as S,i as E,j as T,u as C,k as I,m as M,l as B,p as j,s as N,q as z,x as U,S as q,y as H}from"./MNmVBGFI.js";import G from"./Dpj49AOJ.js";import J from"./DyjMr9xt.js";function L(l){if(l===null||l==="")return!0;if(typeof l=="object"){for(let s in l)if(L(l[s]))return!0}return!1}const K={class:"grid gap-8 lg:grid-cols-2"},Q={class:"relative overflow-hidden rounded-2xl shadow-xl"},W=["src"],X={class:"relative grid grid-rows-[auto_auto_auto] gap-1 bg-white rounded-2xl shadow-xl h-full w-full p-4 md:p-6 lg:p-8"},Y={class:"relative text-3xl font-bold text-gray-900"},Z={class:"relative flex flex-col flex-wrap w-full gap-4 py-8"},ee={class:"relative w-[inherit] py-4"},te={class:"flex flex-row flex-wrap justify-center items-center gap-6 bg-gray-50"},se=["value"],le={class:"p-4 text-center font-semibold text-lg text-blue-700 uppercase"},oe={class:"py-4"},ie={class:"flex flex-row flex-wrap justify-center items-center gap-6 bg-gray-50"},ae=["value"],ne={class:"p-4 text-center font-semibold text-lg text-blue-700 uppercase"},re={class:"flex flex-col gap-4 justify-center self-end sm:flex-row"},ce={class:"flex flex-[3] justify-center sm:justify-end items-center text-2xl font-semibold text-blue-700 lg:flex-[2]"},ue=["disabled"],de={__name:"ProductSlider",props:{json:Object},setup(l){const s=I(()=>j(()=>import("./uhW2miwt.js"),__vite__mapDeps([0,1,2]),import.meta.url)),v=I(()=>j(()=>import("./D4hctl2G.js"),__vite__mapDeps([3,1,2,4,5,6,7,8]),import.meta.url)),a=w(!1),n=w(0),d=w(!1),t=F({delivery:null,wishes:null}),o=l,f=()=>{var r;(r=o.json.images)!=null&&r.length&&(n.value=(n.value+1)%o.json.images.length)},g=()=>{var r;(r=o.json.images)!=null&&r.length&&(n.value=(n.value-1+o.json.images.length)%o.json.images.length)},_=A(()=>{var r;return((r=o.json.images)==null?void 0:r[n.value])??"../placeholder.jpg"}),R=()=>{if(L(t)){d.value=!0,setTimeout(()=>{d.value=!1},500);return}t.productTitle=o.json.productTitle,t.price=o.json.price,a.value=!0};return(r,m)=>{const x=G;return c(),p(P,null,[e("div",K,[e("div",Q,[e("img",{src:_.value,loading:"lazy",alt:"Картинка",class:"w-auto h-full object-center object-cover"},null,8,W),e("button",{onClick:g,class:"absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm transition hover:bg-white/30 active:scale-90 active:bg-black/10"},[u(x,{name:"material-symbols:arrow-back-2-rounded",class:"w-6 h-6 text-white"})]),e("button",{onClick:f,class:"absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm transition hover:bg-white/30 active:scale-90 active:bg-black/10"},[u(x,{name:"material-symbols:play-arrow-rounded",class:"w-6 h-6 text-white"})])]),e("div",X,[e("h1",Y,h(l.json.productTitle),1),e("div",Z,[e("div",ee,[e("h2",null,h(l.json.badges.delivery.title),1),e("div",te,[(c(!0),p(P,null,O(l.json.badges.delivery.options.slice(0,4),i=>(c(),p("label",{key:i,class:y(["relative flex flex-1 justify-center bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105",{"blur-sm hover:blur-0":t.delivery!=null&&t.delivery!=i,"badges--trigger":d.value&&t.delivery==null}])},[b(e("input",{type:"radio",name:"delivery",value:i,class:"hidden","onUpdate:modelValue":m[0]||(m[0]=k=>t.delivery=k)},null,8,se),[[S,t.delivery]]),e("span",le,h(i),1),b(u(x,{name:"stash:check-circle",class:"absolute -top-2 -right-2 w-10 h-10 text-green-600"},null,512),[[E,t.delivery===i]])],2))),128))])]),e("div",oe,[e("h2",null,h(l.json.badges.wishes.title),1),e("div",ie,[(c(!0),p(P,null,O(l.json.badges.wishes.options.slice(0,4),i=>(c(),p("label",{key:i,class:y(["relative flex flex-1 justify-center bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105",{"blur-sm hover:blur-0":t.wishes!=null&&t.wishes!=i,"badges--trigger":d.value&&t.wishes==null}])},[b(e("input",{type:"radio",name:"wishes",value:i,class:"hidden","onUpdate:modelValue":m[1]||(m[1]=k=>t.wishes=k)},null,8,ae),[[S,t.wishes]]),e("span",ne,h(i),1),b(u(x,{name:"stash:check-circle",class:"absolute -top-2 -right-2 w-10 h-10 text-green-600"},null,512),[[E,t.wishes===i]])],2))),128))])])]),e("div",re,[e("div",ce,h(l.json.price)+" ₽ ",1),e("button",{onClick:R,class:"flex-[7] bg-blue-600 text-white py-3 rounded-lg transition text-xl uppercase hover:bg-blue-700 disabled:bg-black lg:flex-[8]",disabled:d.value}," Купить ",8,ue)])])]),a.value?(c(),D(B(C(s)),{key:0},{default:T(()=>[u(C(v),M(t,{"onUpdate:isModalOpen":m[2]||(m[2]=i=>a.value=i)}),null,16)]),_:1})):$("",!0)],64)}}},pe=V(de,[["__scopeId","data-v-623b28da"]]),ve={class:"flex w-full rounded-t-lg bg-white shadow-lg"},me={class:"relative rounded-b-lg bg-white px-6 py-4 shadow-lg min-h-[130px]"},he={__name:"ProductTabs",props:{description:{type:String},specification:{type:String}},setup(l){const s=w(""),v={desc:()=>j(()=>import("./DE76j8ks.js"),__vite__mapDeps([9,1,2]),import.meta.url),specs:()=>j(()=>import("./CtIEdkqi.js"),__vite__mapDeps([10,1,2]),import.meta.url)},a={},n=N(null);z(()=>{s.value="desc"});const d=A(()=>s.value==="desc"?l.description:l.specification);return U(s,async t=>{if(a[t])n.value=a[t];else{const o=I(()=>new Promise(f=>{setTimeout(async()=>{var _;const g=await((_=v[t])==null?void 0:_.call(v));a[t]=g.default,f(g.default)},2e3)}));n.value=a[t]=o}}),(t,o)=>(c(),p("div",null,[e("div",ve,[e("button",{onClick:o[0]||(o[0]=f=>s.value="desc"),class:y(["relative flex-1 px-4 py-3 text-sm font-medium uppercase border-b-2 transition-all duration-500 ease-in-out",s.value==="desc"?"desc--active":"desc--inactive text-gray-200 hover:text-black"])}," Описание ",2),e("button",{onClick:o[1]||(o[1]=f=>s.value="specs"),class:y(["relative flex-1 px-4 py-3 text-sm font-medium uppercase border-b-2 transition-all duration-500 ease-in-out",s.value==="specs"?"specs--active":"specs--inactive text-gray-200 hover:text-black"])}," Характеристики ",2)]),e("div",me,[s.value.length>0?(c(),D(q,{key:s.value},{default:T(()=>[u(C(n),{data:d.value},null,8,["data"])]),fallback:T(()=>[u(J)]),_:1})):$("",!0)])]))}},fe=V(he,[["__scopeId","data-v-9c4e9a50"]]),ge={class:"relative grid grid-rows-[1fr_auto] gap-4"},_e={__name:"index",setup(l){const s={productTitle:"Какие-то крокодилы",description:"Какое-то описание",specification:"Какая-то спека",price:"1999",images:["../public/product_imgs/img1.jpg","../public/product_imgs/img2.jpg","../public/product_imgs/img3.jpg"],badges:{delivery:{title:"Доставка",options:["Домой","На работу","Сразу в зоопарк"]},wishes:{title:"Подарок",options:["Аквариум","Курицы","Бинты","Намордник"]}},availability:"В наличии"};return H({title:s.productTitle,meta:[{name:"description",content:s.description}]}),(v,a)=>(c(),p("div",ge,[u(pe,{json:s}),u(fe,{description:s.description,specification:s.specification},null,8,["description","specification"])]))}},ye=Object.freeze(Object.defineProperty({__proto__:null,default:_e},Symbol.toStringTag,{value:"Module"}));export{ye as i,L as o};
