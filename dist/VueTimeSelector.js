!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("vue-timeselector",[],t):"object"==typeof exports?exports["vue-timeselector"]=t():e["vue-timeselector"]=t()}(window,function(){return function(e){var t={};function i(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=e,i.c=t,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=5)}([function(e,t,i){"use strict";i.r(t);var r=i(1),n=i.n(r);for(var s in r)"default"!==s&&function(e){i.d(t,e,function(){return r[e]})}(s);t.default=n.a},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={name:"timeselector",props:{value:{type:[String,Date]},id:{type:String},placeholder:{type:String},name:{type:String},required:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},displayHours:{type:Boolean,default:!0},displayMinutes:{type:Boolean,default:!0},displaySeconds:{type:Boolean,default:!1},separator:{type:String,default:":"},initialView:{type:Boolean,default:!1},padTime:{type:Boolean,default:!1},displayFormat:{type:String},returnFormat:{type:String},h24:{type:Boolean,default:!0},utc:{type:Boolean,default:!1},interval:{type:Object,default:function(){return{h:1,m:10,s:10}}},highlight:{type:Object,default:function(){return{h:null,m:null,s:null,ampm:null}}},disable:{type:Object,default:function(){return{h:null,m:null,s:null,ampm:null}}}},data:function(){return{pickerState:{selected:{hour:null,minute:null,second:null,ampm:null},time:new Date,isClosed:!0,isPristine:!0},formater:["HH","H","hh","h","kk","k","mm","m","ss","s","a"],longHourCount:24,shortHourCount:12,minCount:60,secCount:60}},computed:{picker:function(){return{hour:this.value?this.utc?this.value.getUTCHours():this.value.getHours():0,minute:this.value?this.utc?this.value.getUTCMinutes():this.value.getMinutes():0,second:this.value?this.utc?this.value.getUTCSeconds():this.value.getSeconds():0,ampm:this.h24?null:this.value?this.value.getHours()>12?"PM":"AM":null}},hoursLength:function(){return this.h24?this.longHourCount:this.shortHourCount},displayRules:function(){var e=this;return{HH:function(){return e.pad(e.picker.hour,!0)},H:function(){return e.picker.hour},kk:function(){return e.pad(0===e.picker.hour?e.picker.hour+1:e.picker.hour,!0)},k:function(){return 0===e.picker.hour?e.picker.hour+1:e.picker.hour},hh:function(){return e.h24?e.pad(e.picker.hour>12?12-(0===e.picker.hour?e.picker.hour+1:e.picker.hour):0===e.picker.hour?e.picker.hour+1:e.picker.hour,!0):e.pad(0===e.picker.hour?e.picker.hour+1:e.picker.hour,!0)},h:function(){return e.h24&&e.picker.hour>12?12-(0===e.picker.hour?e.picker.hour+1:e.picker.hour):0===e.picker.hour?e.picker.hour+1:e.picker.hour},mm:function(){return e.pad(e.picker.minute,!0)},m:function(){return e.picker.minute.toString()},ss:function(){return e.pad(e.picker.second,!0)},s:function(){return e.picker.second.toString()},a:function(){return e.picker.hour>=12?"PM":"AM"}}},time:function(){if(!this.h24&&null!==this.picker.ampm){var e=parseInt(this.picker.hour,10);switch(this.picker.ampm){case"AM":this.picker.hour=e>=12?e-12:e;break;case"PM":this.picker.hour=e<=12?e+12:e}}if(-1===this.picker.hour&&-1===this.picker.minute)return"";this.pickerState.time.setHours(this.picker.hour,this.picker.minute,this.picker.second);var t=this.value?this.value:new Date;return this.utc?new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),this.picker.hour,this.picker.minute,this.picker.second)):new Date(this.pickerState.time)}},methods:{pad:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.padTime||t?e.toString().padStart(2,"0"):e},timeFormated:function(e){var t=this;if(this.placeholder&&this.pickerState.isPristine)return this.placeholder;if("displayFormat"===e&&!this.displayFormat)return(this.displayHours?this.pad(this.picker.hour):"")+(this.displayMinutes&&this.displayHours?this.separator+this.pad(this.picker.minute):this.displayMinutes?this.pad(this.picker.minute):"")+(this.displaySeconds?this.separator+this.pad(this.picker.second):"")+(this.h24?"":this.picker.hour>=12?" AM":" PM");var i=this[e];return this.formater.forEach(function(e){void 0!==t.displayRules[e]&&(i=(i=i.replace(new RegExp("".concat(e,"(?!])"),"g"),t.displayRules[e]())).replace(new RegExp("\\[".concat(e,"\\]"),"g"),e))}),i},timeCount:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:60;return Array.apply(null,{length:i}).map(Number.call,function(t){return i<60?e.h24?t:t+1:t}).filter(function(e){return e%t==0}).map(function(t){return e.pad(t)})},selectTime:function(e,t,i){this.disabled||this.getState(e,"disable",t)?this.$emit("selectedDisabled"):(this.pickerState.isPristine=!1,this.picker[e]=i.target.textContent,this.pickerState.selected[e]=t,this.$emit("selected".concat(e.charAt(0).toUpperCase()+e.slice(1)),this.picker[e]),this.returnFormat&&this.$emit("formatedTime",this.timeFormated("returnFormat")),this.$emit("input",this.time))},clearTime:function(){this.pickerState.isPristine=!0,this.pickerState.selected.hour=-1,this.pickerState.selected.minute=-1,this.pickerState.selected.second=-1,this.pickerState.selected.ampm=null,this.picker.hour=0,this.picker.minute=0,this.picker.second=0,this.picker.ampm="AM",this.close(),this.$emit("input",""),this.$emit("cleared")},togglePicker:function(){this.disabled||(this.pickerState.isClosed=!this.pickerState.isClosed,this.pickerState.isClosed?this.$emit("closed",this.$el):this.$emit("opened",this.$el))},close:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;null===e?!this.pickerState.isClosed&&this.togglePicker():this.$el.contains(e.target)||this.$el===e.target||this.pickerState.isClosed||this.togglePicker()},getState:function(e,t,i){var r=this;if(this[t][e.charAt(0)]){var n=parseInt(i,10);return this[t][e.charAt(0)].map(function(t){t instanceof Date&&"[object Date]"===Object.prototype.toString.call(t)&&(t="hour"===e?t.getHours():"minute"===e?t.getMinutes():t.getSeconds());var i=isNaN(n)?t:parseInt(t,10);return!1===r.h24&&i>12?i-12:i}).indexOf(n)>=0}}},watch:{value:function(){this.picker.hour=this.value?this.utc?this.value.getUTCHours():this.value.getHours():0,this.picker.minute=this.value?this.utc?this.value.getUTCMinutes():this.value.getMinutes():0,this.picker.second=this.value?this.utc?this.value.getUTCSeconds():this.value.getSeconds():0,this.pickerState.isPristine||(this.pickerState.selected.hour=this.h24?this.picker.hour:this.picker.hour>12?this.picker.hour-12:this.picker.hour,this.pickerState.selected.minute=this.picker.minute,this.pickerState.selected.second=this.picker.second,this.pickerState.selected.ampm=this.h24?null:this.picker.hour>12?"PM":"AM",this.pickerState.time=this.value)}},created:function(){var e,t=this;if(!this.h24&&this.value){var i=e=this.utc?this.value.getUTCHours():this.value.getHours();this.pickerState.selected.ampm=i<=12?"AM":"PM",this.picker.ampm=i<=12?"AM":"PM",this.picker.hour=i>=12?i-12:i}null!==this.value&&["hour","minute","second"].forEach(function(e){return t.pickerState.selected[e]=t.picker[e]&&t.pad(t.picker[e])}),!this.h24&&this.value&&(this.picker.hour=e),(!this.h24&&this.highlight.h&&this.highlight.h.length>0||this.disable.h&&this.disable.h.length>0)&&console.warn('You shouldn\'t use h24="false" with highlight or disable hour props. It may cause AM-PM confusion or limitation due to multiple hours selected.'),this.initialView&&this.togglePicker(),window.addEventListener("click",this.close)},beforeDestroy:function(){window.removeEventListener("click",this.close)}};t.default=r},function(e,t,i){var r=i(7);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,i(9).default)("72252727",r,!1,{})},function(e,t,i){"use strict";var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"vtimeselector"},[i("input",{staticClass:"vtimeselector__input",class:{"vtimeselector__input--is-open":!e.pickerState.isClosed},attrs:{type:"text",readonly:"readonly",autocomplete:"off",id:e.id,disabled:e.disabled,required:e.required,name:e.name},domProps:{value:e.timeFormated("displayFormat")},on:{click:e.togglePicker}}),e._v(" "),i("div",{staticClass:"vtimeselector__clear",on:{click:e.clearTime}},[e._t("clear-ico",[i("span",{staticClass:"vtimeselector__clear__ico"},[e._v("x")])])],2),e._v(" "),i("div",{staticClass:"vtimeselector__box",class:{"vtimeselector__box--is-closed":e.pickerState.isClosed}},[e.displayHours?i("ul",{staticClass:"vtimeselector__box__list vtimeselector__box__list--hours"},[i("li",{staticClass:"vtimeselector__box__head"},[e._t("hours",[e._v("HH")])],2),e._v(" "),e._l(e.timeCount(e.interval.h,e.hoursLength),function(t,r){return i("li",{key:r,staticClass:"vtimeselector__box__item vtimeselector__box__item--hours",class:{"timeselector__box__item--is-selected":e.pickerState.selected.hour==t,"timeselector__box__item--is-highlighted":e.getState("hour","highlight",t),"timeselector__box__item--is-disabled":e.getState("hour","disable",t)},on:{click:function(i){return e.selectTime("hour",t,i)}}},[e._v(e._s(t))])})],2):e._e(),e._v(" "),e.displayMinutes?i("ul",{staticClass:"vtimeselector__box__list vtimeselector__box__list--minutes"},[i("li",{staticClass:"vtimeselector__box__head"},[e._t("minutes",[e._v("mm")])],2),e._v(" "),e._l(e.timeCount(e.interval.m),function(t,r){return i("li",{key:r,staticClass:"vtimeselector__box__item vtimeselector__box__item--minutes",class:{"timeselector__box__item--is-selected":e.pickerState.selected.minute==t,"timeselector__box__item--is-highlighted":e.getState("minute","highlight",t),"timeselector__box__item--is-disabled":e.getState("minute","disable",t)},on:{click:function(i){return e.selectTime("minute",t,i)}}},[e._v(e._s(t))])})],2):e._e(),e._v(" "),e.displaySeconds?i("ul",{staticClass:"vtimeselector__box__list vtimeselector__box__list--seconds"},[i("li",{staticClass:"vtimeselector__box__head"},[e._t("seconds",[e._v("ss")])],2),e._v(" "),e._l(e.timeCount(e.interval.s),function(t,r){return i("li",{key:r,staticClass:"vtimeselector__box__item vtimeselector__box__item--seconds",class:{"timeselector__box__item--is-selected":e.pickerState.selected.second==t,"timeselector__box__item--is-highlighted":e.getState("second","highlight",t),"timeselector__box__item--is-disabled":e.getState("second","disable",t)},on:{click:function(i){return e.selectTime("second",t,i)}}},[e._v(e._s(t))])})],2):e._e(),e._v(" "),e.h24?e._e():i("ul",{staticClass:"vtimeselector__box__list vtimeselector__box__list--ampm"},[i("li",{staticClass:"vtimeselector__box__head"},[e._t("ampm",[e._v("AM / PM")])],2),e._v(" "),i("li",{staticClass:"vtimeselector__box__item vtimeselector__box__item--ampm",class:{"timeselector__box__item--is-selected":"AM"===e.pickerState.selected.ampm},on:{click:function(t){return e.selectTime("ampm","AM",t)}}},[e._v("AM")]),e._v(" "),i("li",{staticClass:"vtimeselector__box__item vtimeselector__box__item--ampm",class:{"timeselector__box__item--is-selected":"PM"===e.pickerState.selected.ampm},on:{click:function(t){return e.selectTime("ampm","PM",t)}}},[e._v("PM")])])])])},n=[];r._withStripped=!0,i.d(t,"a",function(){return r}),i.d(t,"b",function(){return n})},function(e,t,i){"use strict";function r(e,t,i,r,n,s,o,c){var l,a="function"==typeof e?e.options:e;if(t&&(a.render=t,a.staticRenderFns=i,a._compiled=!0),r&&(a.functional=!0),s&&(a._scopeId="data-v-"+s),o?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},a._ssrRegister=l):n&&(l=c?function(){n.call(this,this.$root.$options.shadowRoot)}:n),l)if(a.functional){a._injectStyles=l;var u=a.render;a.render=function(e,t){return l.call(t),u(e,t)}}else{var h=a.beforeCreate;a.beforeCreate=h?[].concat(h,l):[l]}return{exports:e,options:a}}i.d(t,"a",function(){return r})},function(e,t,i){"use strict";i.r(t);var r=i(3),n=i(0);for(var s in n)"default"!==s&&function(e){i.d(t,e,function(){return n[e]})}(s);i(6);var o=i(4),c=Object(o.a)(n.default,r.a,r.b,!1,null,null,null);c.options.__file="src/VueTimeSelector.vue",t.default=c.exports},function(e,t,i){"use strict";var r=i(2);i.n(r).a},function(e,t,i){(e.exports=i(8)(!1)).push([e.i,"\n.vtimeselector {\n  position: relative;\n  font-family: sans-serif;\n}\n.vtimeselector__input {\n  width: 100%;\n  box-sizing: border-box;\n}\n.vtimeselector__clear {\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  right: 0;\n  width: 20px;\n  height: 100%;\n  cursor: pointer;\n}\n.vtimeselector__clear__ico {\n  display: inline-block;\n  width: 100%;\n  text-align: center;\n  vertical-align: middle;\n  color: #a5a5a5;\n}\n.vtimeselector__clear:hover .vtimeselector__clear__ico{\n  color: black;\n}\n.vtimeselector__box {\n  position: absolute;\n  display: flex;\n  left: 0;\n  top: 100%;\n  width: 100%;\n  height: 10em;\n  background: white;\n  z-index: 999;\n}\n.vtimeselector__box--is-closed { display: none;\n}\n.vtimeselector__box__item { cursor: pointer;\n}\n.vtimeselector__box__list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  flex: 1;\n  text-align: center;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.vtimeselector__box__list + .vtimeselector__box__list {\n  border-left: 1px solid #ffffff;\n}\n.vtimeselector__box__head {\n  color: #a5a5a5;\n  font-size: .8em;\n  padding: .8em 0 .4em;\n}\n.vtimeselector__box__item {\n  padding: .4em 0;\n  font-size: 1em;\n}\n.vtimeselector__box__item:not(.timeselector__box__item--is-disabled):not(.timeselector__box__item--is-selected):hover {\n  background: #d3d3d3;\n}\n.timeselector__box__item--is-highlighted { background: #5b64f7;\n}\n.timeselector__box__item--is-selected {\n  background: #05cfb5;\n  color: #ffffff;\n}\n.timeselector__box__item--is-disabled {\n  cursor: auto;\n  background: #f5f5f5;\n  color: #a5a5a5;\n}\n",""])},function(e,t,i){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var i=function(e,t){var i=e[1]||"",r=e[3];if(!r)return i;if(t&&"function"==typeof btoa){var n=(o=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),s=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[i].concat(s).concat([n]).join("\n")}var o;return[i].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+i+"}":i}).join("")},t.i=function(e,i){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},n=0;n<this.length;n++){var s=this[n][0];null!=s&&(r[s]=!0)}for(n=0;n<e.length;n++){var o=e[n];null!=o[0]&&r[o[0]]||(i&&!o[2]?o[2]=i:i&&(o[2]="("+o[2]+") and ("+i+")"),t.push(o))}},t}},function(e,t,i){"use strict";function r(e,t){for(var i=[],r={},n=0;n<t.length;n++){var s=t[n],o=s[0],c={id:e+":"+n,css:s[1],media:s[2],sourceMap:s[3]};r[o]?r[o].parts.push(c):i.push(r[o]={id:o,parts:[c]})}return i}i.r(t),i.d(t,"default",function(){return m});var n="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!n)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var s={},o=n&&(document.head||document.getElementsByTagName("head")[0]),c=null,l=0,a=!1,u=function(){},h=null,d="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function m(e,t,i,n){a=i,h=n||{};var o=r(e,t);return _(o),function(t){for(var i=[],n=0;n<o.length;n++){var c=o[n];(l=s[c.id]).refs--,i.push(l)}t?_(o=r(e,t)):o=[];for(n=0;n<i.length;n++){var l;if(0===(l=i[n]).refs){for(var a=0;a<l.parts.length;a++)l.parts[a]();delete s[l.id]}}}}function _(e){for(var t=0;t<e.length;t++){var i=e[t],r=s[i.id];if(r){r.refs++;for(var n=0;n<r.parts.length;n++)r.parts[n](i.parts[n]);for(;n<i.parts.length;n++)r.parts.push(v(i.parts[n]));r.parts.length>i.parts.length&&(r.parts.length=i.parts.length)}else{var o=[];for(n=0;n<i.parts.length;n++)o.push(v(i.parts[n]));s[i.id]={id:i.id,refs:1,parts:o}}}}function f(){var e=document.createElement("style");return e.type="text/css",o.appendChild(e),e}function v(e){var t,i,r=document.querySelector("style["+d+'~="'+e.id+'"]');if(r){if(a)return u;r.parentNode.removeChild(r)}if(p){var n=l++;r=c||(c=f()),t=b.bind(null,r,n,!1),i=b.bind(null,r,n,!0)}else r=f(),t=function(e,t){var i=t.css,r=t.media,n=t.sourceMap;r&&e.setAttribute("media",r);h.ssrId&&e.setAttribute(d,t.id);n&&(i+="\n/*# sourceURL="+n.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");if(e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}.bind(null,r),i=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else i()}}var g,k=(g=[],function(e,t){return g[e]=t,g.filter(Boolean).join("\n")});function b(e,t,i,r){var n=i?"":r.css;if(e.styleSheet)e.styleSheet.cssText=k(t,n);else{var s=document.createTextNode(n),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(s,o[t]):e.appendChild(s)}}}])});