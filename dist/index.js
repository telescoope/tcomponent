function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var t=e(require("immutability-helper")),a=e(require("slugify")),r=require("lodash"),s=require("react");function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function o(e,t){return void 0===t&&(t="_"),a(String(e),{replacement:t,remove:/[*+~.()'"!:@]/g,lower:!1})}exports.authReducer=function(e,a){switch(void 0===e&&(e={role:"",user:{},token:"",forgot_password:{},loading:!1}),a.type){case"DO_LOGIN":return t(e,{user:{$set:a.payload}});case"SET_LOADING_AUTH":return t(e,{loading:{$set:a.payload}});case"OAUTH_LOGIN":return t(e,{token:{$set:a.payload}});case"SET_ROLE":return t(e,{user:{$set:n({},e.user,{role:a.payload})}});case"DO_FORGOT_PASSWORD":return t(e,{forgot_password:{$set:a.payload}});case"DO_LOGOUT":return t(e,{user:{$set:{}},token:{$set:null}});default:return e}},exports.coreReducer=function(e,a){var r;void 0===e&&(e={message:"",message_title:"",message_tag:"",message_payload:{},loading:!1,validation:{},input:{},parameter:{},filter:{},modal:{},status:null,media_device:null});var s=a.payload||{},i=s.key,u=s.value,l={},p={},c=!1,d=[],_=[];switch(i=o(String(i),"_"),a.type){case"SET_MULTI_FILTER":return p=n({},e.filter,a.payload),t(e,{filter:{$set:p}});case"SET_FILTER":try{d=i.split("["),e.filter[d[0]]&&(c=!0)}catch(e){}try{var E,S,T,y;return _=i.match(/\[(\S+)\]/),c?t(e,{filter:(S={},S[d[0]]=(E={},E[String(_[1])]={$set:u},E),S)}):((T={})[String(_[1])]=u,t(e,{filter:(y={},y[d[0]]={$set:T},y)}))}catch(a){var f;return t(e,{filter:(f={},f[i]={$set:u},f)})}break;case"SET_MULTI_PARAMETER":return p=n({},e.parameter,a.payload),t(e,{parameter:{$set:p}});case"RESET_SELECTED":return Object.keys(e.parameter).map(function(t,a){"selected"!=t.substr(0,8)&&(l[t]=e.parameter[t])}),t(e,{parameter:{$set:l}});case"SET_PARAMETER":c=!1;try{d=i.split("["),e.parameter[d[0]]&&(c=!0)}catch(e){}try{var A,g,m,h;return _=i.match(/\[(\S+)\]/),c?t(e,{parameter:(g={},g[d[0]]=(A={},A[String(_[1])]={$set:u},A),g)}):((m={})[String(_[1])]=u,t(e,{parameter:(h={},h[d[0]]={$set:m},h)}))}catch(a){var v;return t(e,{parameter:(v={},v[i]={$set:u},v)})}break;case"SET_MULTI_INPUT":return p=n({},e.input,a.payload),t(e,{input:{$set:p}});case"SET_INPUT":c=!1;try{d=i.split("["),e.input[d[0]]&&(c=!0)}catch(e){}try{var O,$,L,N;return _=i.match(/\[(\S+)\]/),c?t(e,{input:($={},$[d[0]]=(O={},O[String(_[1])]={$set:u},O),$)}):((L={})[String(_[1])]=u,t(e,{input:(N={},N[d[0]]={$set:L},N)}))}catch(a){var I;return t(e,{input:(I={},I[i]={$set:u},I)})}break;case"SET_MESSAGE":return t(e,{message:{$set:a.payload}});case"SET_MESSAGE_TITLE":return t(e,{message_title:{$set:a.payload}});case"SET_MESSAGE_TAG":return t(e,{message_tag:{$set:a.payload}});case"SET_MESSAGE_PAYLOAD":return t(e,{message_payload:{$set:a.payload}});case"SET_MODAL":return t(e,{modal:(r={},r[i]={$set:u},r)});case"SET_LOADING":return t(e,{loading:{$set:a.payload}});case"RESET_VALIDATION_MESSAGE":return t(e,{message:{$set:""},validation:{$set:{}}});case"RESET_VALIDATION":return t(e,{loading:{$set:!1},validation:{$set:{}}});case"RESET_INPUT":return t(e,{input:{$set:{}}});case"SET_MEDIA_DEVICE":return t(e,{media_device:{$set:a.payload}});case"RESET_PARAMETER":return t(e,{parameter:{$set:{}}});case"RESET_FILTER":return t(e,{filter:{$set:{}}});case"SET_STATUS":return t(e,{status:{$set:a.payload}});case"SET_VALIDATION":return t(e,{validation:{$set:a.payload}});default:return e}},exports.defaultFilterData=function(e,t,a){var s=1,n=10,i="",u=[],l={};try{s=e[o("page_"+a,"_")],n=e[o("load_"+a,"_")],i=e[o("keyword_"+a,"_")]}catch(e){}Object.keys(e).map(function(e,r){var s=o("search_"+a+"_","_"),n=o("sort_"+a+"_","_");e.toLowerCase().substring(0,s.length)==s.toLowerCase()&&t.push(e.replace(s+"_","")),e.toLowerCase().substring(0,n.length)==n.toLowerCase()&&t.push(e.replace(n+"_",""))}),t=r.uniq(t);for(var p=0;p<t.length;p++){var c=t[p]||"";try{var d=e[o("search_"+a+"_"+c,"_")];r.isNull(d)||r.isUndefined(d)||(l[c]=d)}catch(e){}try{var _=e[o("sort_"+a+"_"+c,"_")];r.isNull(_)||r.isUndefined(_)||u.push({id:c,desc:"desc"==_})}catch(e){}}return{page:s||1,load:n||10,keyword:i||"",sorted:u||[],search:l||{}}},exports.fetchErrorDispatch=function(e,t,a){if(void 0===a&&(a=""),"NULL"!=(a=String(a).toUpperCase()))if(r.isEqual(a,"EXTRANET")||t({type:"SET_LOADING_"+a,payload:!1}),e.response){r.isEqual(a,"EXTRANET")||t({type:"SET_STATUS_"+a,payload:e.response.status}),t({type:"SET_STATUS",payload:e.response.status}),422==e.response.status&&t({type:"SET_VALIDATION",payload:e.response.data});try{e.response.data.message&&t({type:"SET_MESSAGE",payload:e.response.data.message})}catch(e){}try{e.response.data.data&&t({type:"SET_MESSAGE_PAYLOAD",payload:e.response.data.data})}catch(e){}try{"invalid_grant"==e.response.data.error&&t({type:"SET_MESSAGE",payload:"Email / Password salah"})}catch(e){}try{e.response.data.logout&&t({type:"DO_LOGOUT",payload:!0})}catch(e){}}else e.request&&t({type:"SET_MESSAGE",payload:"Terjadi kesalahan, silahkan dicoba kembali"})},exports.fetchSuccessDispatch=function(e,t,a){void 0===a&&(a=""),"NULL"!=(a=String(a).toUpperCase())&&(r.isEqual(a,"EXTRANET")||(t({type:"SET_STATUS_"+a,payload:e.status}),t({type:"SET_LOADING_"+a,payload:!1})))},exports.findArrayName=function(e,t){var a=null;try{var s=e.split("["),n=s[1].replace("]",""),o=s[0];a=r.isUndefined(t[o][n])||r.isNull(t[o][n])?null:t[o][n]}catch(s){a=r.isUndefined(t[e])||r.isNull(t[e])?null:t[e]}return a},exports.numberFormat=function(e,t){void 0===t&&(t="");var a="-"==String(e).substr(0,1),r=String(e).replace(/[^,\d]/g,"").toString().split(","),s=r[0].length%3,n=r[0].substr(0,s),o=r[0].substr(s).match(/\d{3}/gi);return o&&(n+=(s?".":"")+o.join(".")),t=a?"-"+t:t,(n=null!=r[1]?n+","+r[1]:n)?t+n:t+"0"},exports.secureData=function(e){var t=new FormData;return r.isObject(e)&&Object.keys(e).map(function(a,s){if(r.isArray(e[a]))for(var n=function(s){r.isObject(e[a][s])?Object.keys(e[a][s]).map(function(n,o){r.isUndefined(e[a][s][n])||r.isNull(e[a][s][n])||t.append(a+"["+s+"]["+n+"]",e[a][s][n])}):r.isUndefined(e[a][s])||r.isNull(e[a][s])||t.append(a+"["+s+"]",e[a][s])},o=0;o<e[a].length;o++)n(o);else r.isObject(e[a])?Object.keys(e[a]).map(function(s,n){r.isUndefined(e[a][s])||r.isNull(e[a][s])||t.append(a+"["+s+"]",e[a][s])}):r.isUndefined(e[a])||r.isNull(e[a])||t.append(a,e[a]);return!0}),t},exports.setAuthHeader=function(e,t){void 0===t&&(t="multipart/form-data");var a=process.env.REACT_APP_API_TOKEN_TYPE,r=process.env.REACT_APP_API_ACCESS_TOKEN;try{a=e.token.token_type||"",r=e.token.access_token||""}catch(e){}return{Authorization:String(a+" "+r).trim(),"Content-Type":t}},exports.slug=o,exports.useDebounce=function(e,t,a){var r=s.useCallback(e,a);s.useEffect(function(){var e=setTimeout(function(){r()},t);return function(){clearTimeout(e)}},[r,t])};
//# sourceMappingURL=index.js.map
