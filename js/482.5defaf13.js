"use strict";(globalThis["webpackChunkxlsx"]=globalThis["webpackChunkxlsx"]||[]).push([[482],{4482:(e,l,t)=>{t.r(l),t.d(l,{default:()=>w});var s=t(9835),a=t(499),n=t(5880),o=t.n(n),r=t(4170);const i=e=>new Promise(((l,t)=>{const s=[];e.forEach((a=>{o().parse(a,{skipEmptyLines:"greedy",header:!0,error(e){console.log("Error: ",e),t(e)},complete(t){const a={};t.data.filter((e=>["1080","1084"].includes(e["Dest Channel Extension"]))).filter((e=>"RINGGROUP[6405]"==e["Action Type"])).forEach((e=>{const l=e["Unique ID"],t=e["Start Time"],s=e["Dest Channel Extension"].toString();a[l]||(a[l]={id:l}),a[l]["d"]&&r.ZP.getDateDiff(t,a[l]["d"],"minutes")>0||(a[l]["d"]=t),a[l][s]||(a[l][s]=e["Disposition"])})),Object.keys(a).forEach((e=>{a[e]["1080"]||(a[e]["1080"]="NO ANSWER",a[e]["l"]="1080"),a[e]["1084"]||(a[e]["1084"]="NO ANSWER",a[e]["l"]="1084")})),s.push(Object.values(a).filter((e=>!("BUSY"==e["1080"]&&"BUSY"==e["1084"])))),s.length==e.length&&l(s)}})}))})),c={class:"row justify-center"},u={class:"row justify-center"},p={__name:"TestPage",setup(e){const l=(0,a.iH)([]),t=(0,a.iH)([]);return(0,s.YP)((()=>l.value[0]),(async()=>{try{t.value=await i(l.value)}catch(e){console.log("Error: ",e)}})),(e,a)=>{const n=(0,s.up)("q-file"),o=(0,s.up)("q-table"),r=(0,s.up)("q-page");return(0,s.wg)(),(0,s.j4)(r,{class:"q-pt-lg q-px-sm"},{default:(0,s.w5)((()=>[(0,s._)("div",c,[(0,s.Wm)(n,{modelValue:l.value[0],"onUpdate:modelValue":a[0]||(a[0]=e=>l.value[0]=e),label:"تحميل الملف",accept:".csv",style:{width:"99px"},filled:""},null,8,["modelValue"])]),(0,s._)("div",u,[(0,s.Wm)(o,{rows:t.value[0],"rows-per-page-options":[0]},null,8,["rows"])])])),_:1})}}};var d=t(9885),h=t(9420),g=t(1),f=t(9984),m=t.n(f);const v=p,w=v;m()(p,"components",{QPage:d.Z,QFile:h.Z,QTable:g.Z})}}]);