import{d as S,r as g,i as R,t as d,v,x as f,J as O,y as b,K as k,L as F,M as P,N as x,O as T,P as E,a as j,Q as D,R as z,S as W,T as H,U,E as q,V as $,W as K,X as I,I as L,Y as J,B as Q,A as X,q as Y}from"./DxfNcVlh.js";const G={class:"w-[fit-content]"},Z={class:"flex gap-4 items-center"},A={key:0,class:"flex flex-col py-3 gap-2 px-5"},V=S({__name:"FolderTree",props:{folders:{type:Object,required:!0},activeId:{type:Number||null}},emits:["select","foldersIdShow"],setup(t,{emit:r}){const a=r,o=t,e=g(null),s=R(()=>o.activeId===o.folders.id),m=h=>{e.value=e.value===h?null:h,a("foldersIdShow",e.value)},w=()=>{a("select",s.value?{id:null,folders:null}:{id:o.folders.id,folder:o.folders})};return(h,i)=>{const y=V;return d(),v("li",G,[f("div",Z,[f("button",{onClick:i[0]||(i[0]=n=>m(t.folders.id)),class:O(["cursor-pointer",{"text-green-500":s.value,"cursor-not-allowed":t.folders.children.length===0}])},b(t.folders.name),3),f("button",{onClick:w,class:O(["cursor-pointer text-[10px] p-2 bg-amber-400 rounded-lg",{"text-green-500":s.value}])},b(t.activeId&&t.activeId===t.folders.id?"Отменить":"Выбрать"),3)]),e.value===o.folders.id&&t.folders.children.length>0?(d(),v("ul",A,[(d(!0),v(k,null,F(t.folders.children,n=>(d(),P(y,{key:n.id,folders:n,activeId:t.activeId,onSelect:i[1]||(i[1]=_=>a("select",_))},null,8,["folders","activeId"]))),128))])):x("",!0)])}}}),ee={class:"flex justify-center items-center z-[9999] inset-0 bg-[rgba(0,0,0,0.3)] fixed"},te=S({__name:"ModalWindow",props:{title:{type:String,required:!0}},emits:["update:closeWindow"],setup(t,{emit:r}){const a=t,o=r,e=()=>{o("update:closeWindow",!1)};return(s,m)=>(d(),v("div",ee,[f("div",{onClick:m[0]||(m[0]=E(()=>{},["stop"])),class:"relative cursor-default w-[60vw] h-[80vh] bg-[rgb(255,255,255)] p-[1vw] border-8 border-gray-500 rounded-[1rem] shadow-[0_0_15px_10px_rgba(255,255,255,0.3)]"},[f("h5",null,b(a.title)+":",1),T(s.$slots,"default"),f("button",{class:"absolute bottom-3 right-3 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-6",onClick:e}," Закрыть ")])]))}}),ae=t=>t==="defer"||t===!1;function se(...t){var B;const r=typeof t[t.length-1]=="string"?t.pop():void 0;typeof t[0]!="string"&&t.unshift(r);let[a,o,e={}]=t;if(typeof a!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof o!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");const s=j(),m=o,w=()=>D.value,h=()=>s.isHydrating?s.payload.data[a]:s.static.data[a];e.server=e.server??!0,e.default=e.default??w,e.getCachedData=e.getCachedData??h,e.lazy=e.lazy??!1,e.immediate=e.immediate??!0,e.deep=e.deep??D.deep,e.dedupe=e.dedupe??"cancel";const i=e.getCachedData(a,s),y=i!=null;if(!s._asyncData[a]||!e.immediate){(B=s.payload._errors)[a]??(B[a]=D.errorValue);const c=e.deep?g:z;s._asyncData[a]={data:c(y?i:e.default()),pending:g(!y),error:W(s.payload._errors,a),status:g("idle"),_default:e.default}}const n={...s._asyncData[a]};delete n._default,n.refresh=n.execute=(c={})=>{if(s._asyncDataPromises[a]){if(ae(c.dedupe??e.dedupe))return s._asyncDataPromises[a];s._asyncDataPromises[a].cancelled=!0}if(c._initial||s.isHydrating&&c._initial!==!1){const u=c._initial?i:e.getCachedData(a,s);if(u!=null)return Promise.resolve(u)}n.pending.value=!0,n.status.value="pending";const p=new Promise((u,l)=>{try{u(m(s))}catch(C){l(C)}}).then(async u=>{if(p.cancelled)return s._asyncDataPromises[a];let l=u;e.transform&&(l=await e.transform(u)),e.pick&&(l=re(l,e.pick)),s.payload.data[a]=l,n.data.value=l,n.error.value=D.errorValue,n.status.value="success"}).catch(u=>{if(p.cancelled)return s._asyncDataPromises[a];n.error.value=K(u),n.data.value=I(e.default()),n.status.value="error"}).finally(()=>{p.cancelled||(n.pending.value=!1,delete s._asyncDataPromises[a])});return s._asyncDataPromises[a]=p,s._asyncDataPromises[a]},n.clear=()=>ne(s,a);const _=()=>n.refresh({_initial:!0}),N=e.server!==!1&&s.payload.serverRendered;{const c=L();if(c&&!c._nuxtOnBeforeMountCbs){c._nuxtOnBeforeMountCbs=[];const l=c._nuxtOnBeforeMountCbs;H(()=>{l.forEach(C=>{C()}),l.splice(0,l.length)}),U(()=>l.splice(0,l.length))}N&&s.isHydrating&&(n.error.value||i!=null)?(n.pending.value=!1,n.status.value=n.error.value?"error":"success"):c&&(s.payload.serverRendered&&s.isHydrating||e.lazy)&&e.immediate?c._nuxtOnBeforeMountCbs.push(_):e.immediate&&_();const p=J();if(e.watch){const l=q(e.watch,()=>n.refresh());p&&$(l)}const u=s.hook("app:data:refresh",async l=>{(!l||l.includes(a))&&await n.refresh()});p&&$(u)}const M=Promise.resolve(s._asyncDataPromises[a]).then(()=>n);return Object.assign(M,n),M}function ne(t,r){r in t.payload.data&&(t.payload.data[r]=void 0),r in t.payload._errors&&(t.payload._errors[r]=D.errorValue),t._asyncData[r]&&(t._asyncData[r].data.value=void 0,t._asyncData[r].error.value=D.errorValue,t._asyncData[r].pending.value=!1,t._asyncData[r].status.value="idle"),r in t._asyncDataPromises&&(t._asyncDataPromises[r]&&(t._asyncDataPromises[r].cancelled=!0),t._asyncDataPromises[r]=void 0)}function re(t,r){const a={};for(const o of r)a[o]=t[o];return a}const le={class:"flex flex-col items-center justify-center h-screen"},oe={key:0},ie={key:0},ce={key:0,class:"flex flex-col overflow-scroll h-full not-scrollbar pl-5 py-1 gap-y-1 not-allocated"},ue=S({__name:"index",setup(t){const r=Y(),a=g(!1),o=g(null),e=g(null),{data:s}=se("mockFolders",()=>$fetch(r.public.getURL)),m=()=>{a.value=!0},w=i=>{a.value=i},h=i=>{o.value=i.id,e.value=i.folder};return(i,y)=>{const n=V;return d(),v("div",le,[f("button",{class:"bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700",onClick:m}," Открыть "),!a.value&&e.value?(d(),v("div",oe,[y[0]||(y[0]=Q(" Вы выбрали: ")),f("div",null,[f("div",null,"ID: "+b(e.value.id),1),f("div",null,"Папка: "+b(e.value.name),1),e.value.children.length>0?(d(),v("div",ie," Вложенные папки: "+b(e.value.children),1)):x("",!0)])])):x("",!0),a.value?(d(),P(te,{key:1,"onUpdate:closeWindow":w,title:"Выберите папку"},{default:X(()=>[I(s)?(d(),v("ul",ce,[(d(!0),v(k,null,F(I(s),_=>(d(),P(n,{key:_.id,folders:_,activeId:o.value,onSelect:h},null,8,["folders","activeId"]))),128))])):x("",!0)]),_:1})):x("",!0)])}}});export{ue as default};
