const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DTC_s6Wn.js","./B-kpSgWc.js","./entry.DsQ3rH2m.css","./C46o1lsD.js","./LoadingCircle.nhjdfyFj.css","./D6x7ny-f.js"])))=>i.map(i=>d[i]);
import{r as m,x as z,c as Y,z as M,b as x,o as d,d as s,e as W,f as j,w as R,A as G,F as A,g as O,u as I,k as S,j as H,h as C,B as P,t as T,T as J,p as L,q as N,i as B,n as K,C as Q,D as X}from"./B-kpSgWc.js";import U from"./gtdD-JZR.js";import{g as $,u as F,a as D}from"./FNXZQt7w.js";import Z from"./C46o1lsD.js";const ee=window.setInterval,te={class:"relative w-full max-w-lg"},ie={class:"flex items-center py-2 flex-col sm:gap-4 sm:border-b sm:border-teal-500 sm:flex-row sm:visible"},re={key:0,class:"absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-20"},se=["onClick"],le={class:"relative flex justify-start items-center gap-1"},ae={class:"flex items-center font-semibold text-sm sm:text-base md:text-lg text-blue-700 mr-3"},oe={class:"font-thin text-gray-500 text-xs sm:text-sm md:text-base"},ne={class:"text-gray-500 ml-2 text-xs sm:text-sm md:text-base"},ce={key:1,class:"absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 p-4 text-center text-gray-500 text-sm sm:text-base md:text-lg z-10"},de={class:"flex items-center justify-center h-full relative mx-auto"},ue={class:"absolute z-0"},pe={class:"flex items-center justify-center bg-black/60 p-4 rounded-lg z-10"},me={class:"w-full mx-4 text-base sm:text-xl md:text-2xl font-bold text-white tracking-wide uppercase text-center sm:w-[450px]"},ve=100,fe={__name:"ProductSearch",setup(V){const o=S(()=>L(()=>import("./DTC_s6Wn.js"),__vite__mapDeps([0,1,2]),import.meta.url)),u=S(()=>L(()=>import("./C46o1lsD.js"),__vite__mapDeps([3,1,2,4]),import.meta.url)),y=S(()=>L(()=>import("./D6x7ny-f.js"),__vite__mapDeps([5,1,2]),import.meta.url)),l=m(""),f=m(!1),i=m(!1),n=m($()),a=m($()),g=m(""),w=m(""),v=m(window.innerWidth);let b=null,_=null;z(f,c=>{c?(g.value="Загружаю страницу",_=ee(()=>{n.value=$(),a.value=$()},600)):clearInterval(_)}),z(g,c=>{c==="Загружаю страницу"?setTimeout(()=>{g.value="Пытаюсь поймать"},1e3):c==="Пытаюсь поймать"&&setTimeout(()=>{g.value=`${l.value}: слишком быстрый`,i.value=!0,setTimeout(()=>{i.value=!1,l.value="",f.value=!1},2e3)},1e3)}),z(l,c=>{clearTimeout(b),b=setTimeout(()=>{w.value=c},ve)});const k=Y(()=>{if(w.value.length<2)return[];const c=w.value.toLowerCase();return Object.entries(E).filter(([r])=>r.includes(c)).slice(0,5).map(([r,e])=>({name:r,...e}))});M(()=>{clearInterval(_),clearTimeout(b)});const E={"собака весёлая":{id:1,price:24999},"собака грустная":{id:1,price:23999},"собака подозрительная":{id:1,price:25999},"кошка наглая":{id:2,price:19999},"кошка загадочная":{id:2,price:21999},"кошка непонятная":{id:2,price:22999},"попугай болтливый":{id:3,price:7999},"попугай молчаливый":{id:3,price:6999},"попугай философский":{id:3,price:9999},"варан голодный":{id:46,price:21999},"варан ленивый":{id:46,price:22999},"варан подозрительный":{id:46,price:23999},"тигрёнок бешеный":{id:36,price:999999},"тигрёнок сонный":{id:36,price:1099999},"тигрёнок вредный":{id:36,price:1199999},"альпака белоснежная":{id:27,price:59999},"альпака смущённая":{id:27,price:61999},"альпака чё такая дерзкая":{id:27,price:63999},"змея притворяющаяся шнурком":{id:16,price:15999},"змея задумчивая":{id:16,price:17999},"змея с хитрым планом":{id:16,price:18999},"крыса деловая":{id:14,price:3499},"крыса вредная":{id:14,price:2999},"крыса тайный агент":{id:14,price:1999},"паук-птицеед слишком большой":{id:21,price:13999},"паук-птицеед подозрительный":{id:21,price:11999},"паук-птицеед не ваш друг":{id:21,price:10999},"енот карманный вор":{id:31,price:24999},"енот несёт какую-то фигню":{id:31,price:26999},"енот главный тут":{id:31,price:22999},"какаду скандальный":{id:48,price:39999},"какаду надменный":{id:48,price:41999},"какаду мечтает о свободе":{id:48,price:43999},"ара слишком громкий":{id:50,price:59999},"ара в плохом настроении":{id:50,price:61999},"ара философ":{id:50,price:62999},"обезьяна планирующая":{id:45,price:74999},"обезьяна не доверяет вам":{id:45,price:77999},"обезьяна вынашивает заговор":{id:45,price:79999},"ленивец ещё спит":{id:47,price:67999},"ленивец задумался о смысле жизни":{id:47,price:68999},"ленивец слишком медленный":{id:47,price:69999},"капибара пофигистичная":{id:29,price:54999},"капибара тусовщица":{id:29,price:56999},"капибара слишком умиротворённая":{id:29,price:58999},"кенгуру с пакетом":{id:30,price:79999},"кенгуру без пакета":{id:30,price:81999},"кенгуру в сомнении":{id:30,price:83999},"выдра деловая":{id:32,price:28999},"выдра наглая":{id:32,price:30999},"выдра в шоке":{id:32,price:31999},"павлин с завышенной самооценкой":{id:28,price:18999},"павлин на расслабоне":{id:28,price:19999},"павлин уверенный в себе":{id:28,price:20999},"лиса хитрющая":{id:42,price:39999},"лиса строит планы":{id:42,price:41999},"лиса притворяется кошкой":{id:42,price:42999},"морская свинка с секретом":{id:15,price:6999},"морская свинка философ":{id:15,price:7199},"морская свинка запуталась":{id:15,price:7399},"осёл упрямый":{id:26,price:44999},"осёл задумчивый":{id:26,price:45999},"осёл подозрительный":{id:26,price:46999},"пингвин в костюме":{id:43,price:59999},"пингвин бизнесмен":{id:43,price:60999},"пингвин в отпуске":{id:43,price:61999},"енот воришка":{id:31,price:24999},"енот бандит":{id:31,price:25999},"енот под прикрытием":{id:31,price:26999},"ленивец слишком ленивый":{id:47,price:67999},"ленивец задумался":{id:47,price:68999},"ленивец, который не хочет вставать":{id:47,price:69999},"мангуст в боевой готовности":{id:38,price:22999},"мангуст с амбициями":{id:38,price:23999},"мангуст не понял шутку":{id:38,price:24999},"хамелеон, который не смог слиться с фоном":{id:35,price:15999},"хамелеон, который перепутал цвет":{id:35,price:16999},"хамелеон в депрессии":{id:35,price:17999},"тигрёнок в сапогах":{id:36,price:999999},"тигрёнок в сомнениях":{id:36,price:1e6},"тигрёнок, который не рычит, а пищит":{id:36,price:1000001},"медведь-интроверт":{id:40,price:999999},"медведь после зимней спячки":{id:40,price:1e6},"медведь, который заказывает мёд на AliExpress":{id:40,price:1000001},"обезьяна, которая знает секреты":{id:45,price:74999},"обезьяна, которая что-то затеяла":{id:45,price:76999}};return(c,r)=>{const e=U;return d(),x(A,null,[s("div",te,[s("div",ie,[R(s("input",{onInput:r[0]||(r[0]=(...t)=>c.search&&c.search(...t)),"onUpdate:modelValue":r[1]||(r[1]=t=>l.value=t),class:"appearance-none border-none w-full text-gray-700 p-4 sm:py-2 sm:px-3 leading-tight focus:outline-none bg-gray-100 rounded-t-lg sm:rounded-none text-lg md:text-xl sm:bg-transparent sm:border sm:border-gray-300",type:"text",placeholder:"Начните поиск","aria-label":"start searching"},null,544),[[G,l.value]]),s("button",{onClick:r[2]||(r[2]=t=>f.value=l.value.length>0&&k.value.length>0),class:"flex-shrink-0 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 text-lg md:text-xl border-4 text-white py-1 px-2 rounded-b-lg sm:rounded w-full sm:w-auto",type:"button"}," Найти "),s("button",{onClick:r[3]||(r[3]=t=>l.value=""),class:"flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-lg md:text-xl py-1 px-2 rounded w-full sm:w-auto",type:"button"}," Стереть ")]),k.value.length?(d(),x("ul",re,[(d(!0),x(A,null,O(k.value,t=>(d(),x("li",{onClick:p=>l.value=t.name.toLowerCase(),key:t.id,class:"flex justify-between px-4 py-3 text-gray-800 hover:bg-gray-100 hover:text-opacity-80 cursor-pointer transition-all"},[s("div",le,[s("div",ae,T(t.name.toUpperCase()),1),s("div",oe," id:"+T(t.id),1)]),s("span",ne,T(t.price)+"₽ ",1)],8,se))),128))])):j("",!0),l.value.length>=2&&k.value.length===0?(d(),x("div",ce," Ничего не найдено ")):j("",!0)]),(d(),W(J,{to:"body"},[f.value?(d(),W(I(o),{key:0,bgTransparent:!0},{default:H(()=>[s("div",de,[s("div",ue,[C(I(u),{width:v.value>=640?"150":"100",height:v.value>=640?"150":"100",borderWidth:v.value>=640?"6":"3"},null,8,["width","height","borderWidth"])]),s("div",pe,[C(e,{name:"svg-spinners:3-dots-move",class:"w-12 h-12 transition-colors duration-[600ms]",style:P({color:n.value})},null,8,["style"]),s("span",me,T(g.value),1),C(e,{ref:"dotsRightAnimate",name:"svg-spinners:3-dots-move ",class:"w-12 h-12 transition-colors duration-[600ms]",style:P({color:a.value})},null,8,["style"])])]),i.value?(d(),W(I(y),{key:0,text:"Пссс. Покупай крокодила!"})):j("",!0)]),_:1})):j("",!0)]))],64)}}},ge={class:"relative w-full"},he={class:"absolute w-full h-full flex justify-between gap-9 top-1/2 -translate-y-1/2 px-3 sm:px-8 z-[100] pointer-events-none"},xe=["disabled"],be=["disabled"],_e=["href"],ye=["src","alt"],we={__name:"AdvCarousel",setup(V){const o=[{src:"../store/adv/img1.jpg",alt:"Image 1"},{src:"../store/adv/img2.jpg",alt:"Image 2"},{src:"../store/adv/img3.jpg",alt:"Image 3"},{src:"../store/adv/img1.jpg",alt:"Image 4"},{src:"../store/adv/img2.jpg",alt:"Image 5"},{src:"../store/adv/img3.jpg",alt:"Image 6"},{src:"../store/adv/img2.jpg",alt:"Image 7"},{src:"../store/adv/img3.jpg",alt:"Image 8"},{src:"../store/adv/img1.jpg",alt:"Image 9"},{src:"../store/adv/img1.jpg",alt:"Image 10"}],u=F("screenWidth"),y=m(null),l=m(null),f=m(!1),i=m(u.value>=1024?3:1),n=D.timeline();let a=null;const g=r=>{Array.from(r).forEach((e,t)=>{D.set(e,{...w(t)})})};N(()=>{setTimeout(()=>{f.value=!0},1e3),g(l.value)}),z(u,()=>{i.value=u.value>=1024?3:1,g(l.value)});const w=r=>{const e=Math.abs(r-i.value);return e===0?{scale:(u.value>=1024,2),opacity:1,zIndex:9999,filter:"blur(0px)"}:e===1?{scale:u.value>=1024?1:.75,opacity:.9,zIndex:10,filter:"blur(2px)"}:e===2?{scale:.75,opacity:.75,zIndex:0,filter:"blur(4px)"}:e===3?{scale:.5,opacity:.6,zIndex:-10,filter:"blur(8px)"}:{scale:.25,opacity:.5,zIndex:-20,filter:"blur(16px)"}},v=(r,e,t=.5)=>{const p=D.timeline();return n.isActive()||n.clear(),p.to(y.value,{x:`+=${r}`,duration:t,ease:"linear"}),Array.from(e).forEach((h,q)=>{p.to(h,{...w(q),duration:t,ease:"linear"},"<")}),p},b=(r,e,t=2)=>{let p=0;return r.getChildren().forEach(h=>{h.progress()===0&&(p+=1,h.kill())}),p/(e.length+t)},_=r=>{const e=r[0];return e?e.offsetWidth:0},k=()=>{const r=_(l.value);if(i.value<=0)return;const e=1;if(a==null&&(a=e),e!==a){const t=b(n,o);i.value=i.value-e*t,a=e}i.value-=1,n.add(v(r,l.value),">")},E=()=>{const r=_(l.value);if(i.value>=o.length-1)return;const e=-1;if(a==null&&(a=e),e!==a){const t=b(n,o);i.value=i.value-e*t,a=e}i.value+=1,n.add(v(-r,l.value),">")};function c(r){const e=_(l.value);if(e===0)return;const t=r.deltaY>0?-1:1;if(a==null&&(a=t),t!==a){const p=b(n,o);i.value=i.value-t*p,a=t}i.value>0&&i.value<o.length-1?(i.value=i.value-t,n.add(v(t*e,l.value),">")):i.value===0&&t===-1?(i.value=i.value-t,n.add(v(-e,l.value),">")):i.value===o.length-1&&t===1&&(i.value=i.value-t,n.add(v(e,l.value),">"))}return(r,e)=>{const t=U;return d(),x("div",ge,[e[0]||(e[0]=s("div",{class:"relative w-full"},[s("h2",{class:"text-xl font-bold text-blue-700 px-4 py-6 shadow-sm uppercase sm:mb-16"}," Вас также может заинтересовать: ")],-1)),s("div",{class:"relative w-full h-fit overflow-x-clip not-scrollbar",onWheel:Q(c,["prevent"])},[R(s("div",he,[s("button",{onClick:k,type:"button",class:"w-1/6 text-left rounded-2xl pointer-events-auto bg-gradient-to-r active:from-black/10 active:to-transparent disabled:invisible",disabled:i.value===0},[C(t,{name:"streamline:interface-arrows-button-right-arrow-right-keyboard",class:"rotate-180 w-10 h-10 text-[white]"})],8,xe),s("button",{onClick:E,type:"button",class:"w-1/6 text-right rounded-2xl pointer-events-auto bg-gradient-to-l active:from-black/10 active:to-transparent disabled:invisible",disabled:i.value===o.length-1},[C(t,{name:"streamline:interface-arrows-button-right-arrow-right-keyboard",class:"w-10 h-10 text-[white]"})],8,be)],512),[[B,I(u)<1024]]),R(s("div",{ref_key:"carousel",ref:y,class:"relative w-full flex items-center py-12"},[(d(),x(A,null,O(o,(p,h)=>s("a",{href:h===i.value?"/portfolio/store/":null,key:h,ref_for:!0,ref_key:"carouselItems",ref:l,class:K(["flex items-center",[I(u)>=1024?"min-w-[calc((100%/7))]":"min-w-[calc((100%/3))]",h===i.value?"pointer":null]])},[s("img",{src:p.src,alt:p.alt,loading:"lazy",class:"rounded-lg object-cover select-none"},null,8,ye)],10,_e)),64))],512),[[B,f.value]]),f.value?j("",!0):(d(),W(Z,{key:0}))],32)])}}},ke={class:"flex justify-center p-6 sm:pt-10"},Ie={class:"flex justify-center p-6 sm:py-12 2xl:max-w-screen-2xl"},Ce={class:"flex justify-center items-center h-auto px-6 py-4 sm:pt-6 sm:pb-20 sm:mb-16"},ze={__name:"default",setup(V){const o=F("screenWidth",()=>window.innerWidth),u=()=>{o.value=window.innerWidth};return N(()=>{window.addEventListener("resize",u)}),M(()=>{window.removeEventListener("resize",u)}),(y,l)=>(d(),x(A,null,[s("header",ke,[C(fe)]),s("main",Ie,[X(y.$slots,"default")]),s("footer",Ce,[(d(),W(we,{key:I(o)}))])],64))}};export{ze as default};
