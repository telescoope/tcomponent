function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var t=e(require("immutability-helper")),a=e(require("slugify")),r=require("lodash"),s=e(require("currency.js")),n=require("react");function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function i(e,t){return void 0===t&&(t="_"),a(String(e),{replacement:t,remove:/[*+~.()'"!:@]/g,lower:!1})}exports.authReducer=function(e,a){switch(void 0===e&&(e={role:"",user:{},token:"",forgot_password:{},loading:!1}),a.type){case"DO_LOGIN":return t(e,{user:{$set:a.payload}});case"SET_LOADING_AUTH":return t(e,{loading:{$set:a.payload}});case"OAUTH_LOGIN":return t(e,{token:{$set:a.payload}});case"SET_ROLE":return t(e,{user:{$set:o({},e.user,{role:a.payload})}});case"DO_FORGOT_PASSWORD":return t(e,{forgot_password:{$set:a.payload}});case"DO_LOGOUT":return t(e,{user:{$set:{}},token:{$set:null}});default:return e}},exports.coreReducer=function(e,a){var r;void 0===e&&(e={message:"",message_title:"",message_tag:"",message_payload:{},loading:!1,validation:{},input:{},parameter:{},filter:{},modal:{},status:null,media_device:null});var s=a.payload||{},n=s.key,u=s.value,c={},p={},l=!1,d=[],_=[];switch(n=i(String(n),"_"),a.type){case"SET_MULTI_FILTER":return p=o({},e.filter,a.payload),t(e,{filter:{$set:p}});case"SET_FILTER":try{d=n.split("["),e.filter[d[0]]&&(l=!0)}catch(e){}try{var E,T,S,y;return _=n.match(/\[(\S+)\]/),l?t(e,{filter:(T={},T[d[0]]=(E={},E[String(_[1])]={$set:u},E),T)}):((S={})[String(_[1])]=u,t(e,{filter:(y={},y[d[0]]={$set:S},y)}))}catch(a){var f;return t(e,{filter:(f={},f[n]={$set:u},f)})}break;case"SET_MULTI_PARAMETER":return p=o({},e.parameter,a.payload),t(e,{parameter:{$set:p}});case"RESET_SELECTED":return Object.keys(e.parameter).map(function(t,a){"selected"!=t.substr(0,8)&&(c[t]=e.parameter[t])}),t(e,{parameter:{$set:c}});case"SET_PARAMETER":l=!1;try{d=n.split("["),e.parameter[d[0]]&&(l=!0)}catch(e){}try{var A,m,g,h;return _=n.match(/\[(\S+)\]/),l?t(e,{parameter:(m={},m[d[0]]=(A={},A[String(_[1])]={$set:u},A),m)}):((g={})[String(_[1])]=u,t(e,{parameter:(h={},h[d[0]]={$set:g},h)}))}catch(a){var v;return t(e,{parameter:(v={},v[n]={$set:u},v)})}break;case"SET_MULTI_INPUT":return p=o({},e.input,a.payload),t(e,{input:{$set:p}});case"SET_INPUT":l=!1;try{d=n.split("["),e.input[d[0]]&&(l=!0)}catch(e){}try{var O,$,L,N;return _=n.match(/\[(\S+)\]/),l?t(e,{input:($={},$[d[0]]=(O={},O[String(_[1])]={$set:u},O),$)}):((L={})[String(_[1])]=u,t(e,{input:(N={},N[d[0]]={$set:L},N)}))}catch(a){var I;return t(e,{input:(I={},I[n]={$set:u},I)})}break;case"SET_MESSAGE":return t(e,{message:{$set:a.payload}});case"SET_MESSAGE_TITLE":return t(e,{message_title:{$set:a.payload}});case"SET_MESSAGE_TAG":return t(e,{message_tag:{$set:a.payload}});case"SET_MESSAGE_PAYLOAD":return t(e,{message_payload:{$set:a.payload}});case"SET_MODAL":return t(e,{modal:(r={},r[n]={$set:u},r)});case"SET_LOADING":return t(e,{loading:{$set:a.payload}});case"RESET_VALIDATION_MESSAGE":return t(e,{message:{$set:""},validation:{$set:{}}});case"RESET_VALIDATION":return t(e,{loading:{$set:!1},validation:{$set:{}}});case"RESET_INPUT":return t(e,{input:{$set:{}}});case"SET_MEDIA_DEVICE":return t(e,{media_device:{$set:a.payload}});case"RESET_PARAMETER":return t(e,{parameter:{$set:{}}});case"RESET_FILTER":return t(e,{filter:{$set:{}}});case"SET_STATUS":return t(e,{status:{$set:a.payload}});case"SET_VALIDATION":return t(e,{validation:{$set:a.payload}});default:return e}},exports.defaultFilterData=function(e,t,a){var s=1,n=10,o="",u=[],c={};try{s=e[i("page_"+a,"_")],n=e[i("load_"+a,"_")],o=e[i("keyword_"+a,"_")]}catch(e){}Object.keys(e).map(function(e,r){var s=i("search_"+a+"_","_"),n=i("sort_"+a+"_","_");e.toLowerCase().substring(0,s.length)==s.toLowerCase()&&t.push(e.replace(s+"_","")),e.toLowerCase().substring(0,n.length)==n.toLowerCase()&&t.push(e.replace(n+"_",""))}),t=r.uniq(t);for(var p=0;p<t.length;p++){var l=t[p]||"";try{var d=e[i("search_"+a+"_"+l,"_")];r.isNull(d)||r.isUndefined(d)||(c[l]=d)}catch(e){}try{var _=e[i("sort_"+a+"_"+l,"_")];r.isNull(_)||r.isUndefined(_)||u.push({id:l,desc:"desc"==_})}catch(e){}}return{page:s||1,load:n||10,keyword:o||"",sorted:u||[],search:c||{}}},exports.fetchErrorDispatch=function(e,t,a){if(void 0===a&&(a=""),"NULL"!=(a=String(a).toUpperCase()))if(r.isEqual(a,"EXTRANET")||t({type:"SET_LOADING_"+a,payload:!1}),e.response){r.isEqual(a,"EXTRANET")||t({type:"SET_STATUS_"+a,payload:e.response.status}),t({type:"SET_STATUS",payload:e.response.status}),422==e.response.status&&t({type:"SET_VALIDATION",payload:e.response.data});try{e.response.data.message&&t({type:"SET_MESSAGE",payload:e.response.data.message})}catch(e){}try{e.response.data.data&&t({type:"SET_MESSAGE_PAYLOAD",payload:e.response.data.data})}catch(e){}try{"invalid_grant"==e.response.data.error&&t({type:"SET_MESSAGE",payload:"Email / Password salah"})}catch(e){}try{e.response.data.logout&&t({type:"DO_LOGOUT",payload:!0})}catch(e){}}else e.request&&t({type:"SET_MESSAGE",payload:"Terjadi kesalahan, silahkan dicoba kembali"})},exports.fetchSuccessDispatch=function(e,t,a){void 0===a&&(a=""),"NULL"!=(a=String(a).toUpperCase())&&(r.isEqual(a,"EXTRANET")||(t({type:"SET_STATUS_"+a,payload:e.status}),t({type:"SET_LOADING_"+a,payload:!1})))},exports.findArrayName=function(e,t){var a=null;try{var s=e.split("["),n=s[1].replace("]",""),o=s[0];a=r.isUndefined(t[o][n])||r.isNull(t[o][n])?null:t[o][n]}catch(s){a=r.isUndefined(t[e])||r.isNull(t[e])?null:t[e]}return a},exports.numberFormat=function(e,t){return void 0===t&&(t=""),s(Number(e),{symbol:t+" ",separator:".",decimal:",",precision:Number(e)%1!=0?2:0}).format()},exports.secureData=function(e){var t=new FormData;return r.isObject(e)&&Object.keys(e).map(function(a,s){if(r.isArray(e[a]))for(var n=function(s){r.isObject(e[a][s])?Object.keys(e[a][s]).map(function(n,o){r.isUndefined(e[a][s][n])||r.isNull(e[a][s][n])||t.append(a+"["+s+"]["+n+"]",e[a][s][n])}):r.isUndefined(e[a][s])||r.isNull(e[a][s])||t.append(a+"["+s+"]",e[a][s])},o=0;o<e[a].length;o++)n(o);else r.isObject(e[a])?Object.keys(e[a]).map(function(s,n){r.isUndefined(e[a][s])||r.isNull(e[a][s])||t.append(a+"["+s+"]",e[a][s])}):r.isUndefined(e[a])||r.isNull(e[a])||t.append(a,e[a]);return!0}),t},exports.setAuthHeader=function(e,t){void 0===t&&(t="multipart/form-data");var a=process.env.REACT_APP_API_TOKEN_TYPE,r=process.env.REACT_APP_API_ACCESS_TOKEN;try{a=e.token.token_type||"",r=e.token.access_token||""}catch(e){}return{Authorization:String(a+" "+r).trim(),"Content-Type":t}},exports.slug=i,exports.useDebounce=function(e,t,a){var r=n.useCallback(e,a);n.useEffect(function(){var e=setTimeout(function(){r()},t);return function(){clearTimeout(e)}},[r,t])};
//# sourceMappingURL=index.js.map
