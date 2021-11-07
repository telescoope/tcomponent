import e from"immutability-helper";import t from"slugify";import{isUndefined as a,isNull as r,isEqual as s,isObject as n,isArray as o,uniq as p}from"lodash";import c from"currency.js";import{useCallback as i,useEffect as u}from"react";function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function _(e,a){return void 0===a&&(a="_"),t(String(e),{replacement:a,remove:/[*+~.()'"!:@]/g,lower:!1})}function d(t,a){var r;void 0===t&&(t={message:"",message_title:"",message_tag:"",message_payload:{},loading:!1,validation:{},input:{},parameter:{},filter:{},modal:{},status:null,media_device:null});var s=a.payload||{},n=s.key,o=s.value,p={},c={},i=!1,u=[],d=[];switch(n=_(String(n),"_"),a.type){case"SET_MULTI_FILTER":return c=l({},t.filter,a.payload),e(t,{filter:{$set:c}});case"SET_FILTER":try{u=n.split("["),t.filter[u[0]]&&(i=!0)}catch(e){}try{var E,T,S,y;return d=n.match(/\[(\S+)\]/),i?e(t,{filter:(T={},T[u[0]]=(E={},E[String(d[1])]={$set:o},E),T)}):((S={})[String(d[1])]=o,e(t,{filter:(y={},y[u[0]]={$set:S},y)}))}catch(a){var m;return e(t,{filter:(m={},m[n]={$set:o},m)})}break;case"SET_MULTI_PARAMETER":return c=l({},t.parameter,a.payload),e(t,{parameter:{$set:c}});case"RESET_SELECTED":return Object.keys(t.parameter).map(function(e,a){"selected"!=e.substr(0,8)&&(p[e]=t.parameter[e])}),e(t,{parameter:{$set:p}});case"SET_PARAMETER":i=!1;try{u=n.split("["),t.parameter[u[0]]&&(i=!0)}catch(e){}try{var A,f,g,v;return d=n.match(/\[(\S+)\]/),i?e(t,{parameter:(f={},f[u[0]]=(A={},A[String(d[1])]={$set:o},A),f)}):((g={})[String(d[1])]=o,e(t,{parameter:(v={},v[u[0]]={$set:g},v)}))}catch(a){var h;return e(t,{parameter:(h={},h[n]={$set:o},h)})}break;case"SET_MULTI_INPUT":return c=l({},t.input,a.payload),e(t,{input:{$set:c}});case"SET_INPUT":i=!1;try{u=n.split("["),t.input[u[0]]&&(i=!0)}catch(e){}try{var O,$,L,I;return d=n.match(/\[(\S+)\]/),i?e(t,{input:($={},$[u[0]]=(O={},O[String(d[1])]={$set:o},O),$)}):((L={})[String(d[1])]=o,e(t,{input:(I={},I[u[0]]={$set:L},I)}))}catch(a){var R;return e(t,{input:(R={},R[n]={$set:o},R)})}break;case"SET_MESSAGE":return e(t,{message:{$set:a.payload}});case"SET_MESSAGE_TITLE":return e(t,{message_title:{$set:a.payload}});case"SET_MESSAGE_TAG":return e(t,{message_tag:{$set:a.payload}});case"SET_MESSAGE_PAYLOAD":return e(t,{message_payload:{$set:a.payload}});case"SET_MODAL":return e(t,{modal:(r={},r[n]={$set:o},r)});case"SET_LOADING":return e(t,{loading:{$set:a.payload}});case"RESET_VALIDATION_MESSAGE":return e(t,{message:{$set:""},validation:{$set:{}}});case"RESET_VALIDATION":return e(t,{loading:{$set:!1},validation:{$set:{}}});case"RESET_INPUT":return e(t,{input:{$set:{}}});case"SET_MEDIA_DEVICE":return e(t,{media_device:{$set:a.payload}});case"RESET_PARAMETER":return e(t,{parameter:{$set:{}}});case"RESET_FILTER":return e(t,{filter:{$set:{}}});case"SET_STATUS":return e(t,{status:{$set:a.payload}});case"SET_VALIDATION":return e(t,{validation:{$set:a.payload}});default:return t}}function E(t,a){switch(void 0===t&&(t={role:"",user:{},token:"",forgot_password:{},loading:!1}),a.type){case"DO_LOGIN":return e(t,{user:{$set:a.payload}});case"SET_LOADING_AUTH":return e(t,{loading:{$set:a.payload}});case"OAUTH_LOGIN":return e(t,{token:{$set:a.payload}});case"SET_ROLE":return e(t,{user:{$set:l({},t.user,{role:a.payload})}});case"DO_FORGOT_PASSWORD":return e(t,{forgot_password:{$set:a.payload}});case"DO_LOGOUT":return e(t,{user:{$set:{}},token:{$set:null}});default:return t}}function T(e,t){var s=null;try{var n=e.split("["),o=n[1].replace("]",""),p=n[0];s=a(t[p][o])||r(t[p][o])?null:t[p][o]}catch(n){s=a(t[e])||r(t[e])?null:t[e]}return s}function S(e,t,a){if(void 0===a&&(a=""),"NULL"!=(a=String(a).toUpperCase()))if(s(a,"EXTRANET")||t({type:"SET_LOADING_"+a,payload:!1}),e.response){s(a,"EXTRANET")||t({type:"SET_STATUS_"+a,payload:e.response.status}),t({type:"SET_STATUS",payload:e.response.status}),422==e.response.status&&t({type:"SET_VALIDATION",payload:e.response.data});try{e.response.data.message&&t({type:"SET_MESSAGE",payload:e.response.data.message})}catch(e){}try{e.response.data.data&&t({type:"SET_MESSAGE_PAYLOAD",payload:e.response.data.data})}catch(e){}try{"invalid_grant"==e.response.data.error&&t({type:"SET_MESSAGE",payload:"Email / Password salah"})}catch(e){}try{e.response.data.logout&&t({type:"DO_LOGOUT",payload:!0})}catch(e){}}else e.request&&t({type:"SET_MESSAGE",payload:"Terjadi kesalahan, silahkan dicoba kembali"})}function y(e,t,a){void 0===a&&(a=""),"NULL"!=(a=String(a).toUpperCase())&&(s(a,"EXTRANET")||(t({type:"SET_STATUS_"+a,payload:e.status}),t({type:"SET_LOADING_"+a,payload:!1})))}function m(e,t){return void 0===t&&(t=""),c(Number(e),{symbol:t+" ",separator:".",decimal:",",precision:Number(e)%1!=0?2:0}).format()}function A(e){var t=new FormData;return n(e)&&Object.keys(e).map(function(s,p){if(o(e[s]))for(var c=function(o){n(e[s][o])?Object.keys(e[s][o]).map(function(n,p){a(e[s][o][n])||r(e[s][o][n])||t.append(s+"["+o+"]["+n+"]",e[s][o][n])}):a(e[s][o])||r(e[s][o])||t.append(s+"["+o+"]",e[s][o])},i=0;i<e[s].length;i++)c(i);else n(e[s])?Object.keys(e[s]).map(function(n,o){a(e[s][n])||r(e[s][n])||t.append(s+"["+n+"]",e[s][n])}):a(e[s])||r(e[s])||t.append(s,e[s]);return!0}),t}function f(e,t){void 0===t&&(t="multipart/form-data");var a=process.env.REACT_APP_API_TOKEN_TYPE,r=process.env.REACT_APP_API_ACCESS_TOKEN;try{a=e.token.token_type||"",r=e.token.access_token||""}catch(e){}return{Authorization:String(a+" "+r).trim(),"Content-Type":t}}function g(e,t,a){var r=i(e,a);u(function(){var e=setTimeout(function(){r()},t);return function(){clearTimeout(e)}},[r,t])}function v(e,t,s){var n=1,o=10,c="",i=[],u={};try{n=e[_("page_"+s,"_")],o=e[_("load_"+s,"_")],c=e[_("keyword_"+s,"_")]}catch(e){}Object.keys(e).map(function(e,a){var r=_("search_"+s+"_","_"),n=_("sort_"+s+"_","_");e.toLowerCase().substring(0,r.length)==r.toLowerCase()&&t.push(e.replace(r+"_","")),e.toLowerCase().substring(0,n.length)==n.toLowerCase()&&t.push(e.replace(n+"_",""))}),t=p(t);for(var l=0;l<t.length;l++){var d=t[l]||"";try{var E=e[_("search_"+s+"_"+d,"_")];r(E)||a(E)||(u[d]=E)}catch(e){}try{var T=e[_("sort_"+s+"_"+d,"_")];r(T)||a(T)||i.push({id:d,desc:"desc"==T})}catch(e){}}return{page:n||1,load:o||10,keyword:c||"",sorted:i||[],search:u||{}}}export{E as authReducer,d as coreReducer,v as defaultFilterData,S as fetchErrorDispatch,y as fetchSuccessDispatch,T as findArrayName,m as numberFormat,A as secureData,f as setAuthHeader,_ as slug,g as useDebounce};
//# sourceMappingURL=index.modern.js.map
