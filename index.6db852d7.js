!function(){function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=e.parcelRequire6cf5;null==o&&((o=function(t){if(t in n)return n[t].exports;if(t in r){var e=r[t];delete r[t];var o={id:t,exports:{}};return n[t]=o,e.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){r[t]=e},e.parcelRequire6cf5=o),o.register("hKHmD",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t,e,n){e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n;return t}}));var i={};function a(t,e,n,r,o,i,a){try{var c=t[i](a),l=c.value}catch(t){return void n(t)}c.done?e(l):Promise.resolve(l).then(r,o)}Object.defineProperty(i,"__esModule",{value:!0}),i.default=function(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function c(t){a(i,r,o,c,l,"next",t)}function l(t){a(i,r,o,c,l,"throw",t)}c(void 0)}))}};var c={},l=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,n){return t[e]=n}}function s(t,e,n,r){var o=e&&e.prototype instanceof m?e:m,i=Object.create(o.prototype),a=new j(r||[]);return i._invoke=function(t,e,n){var r=f;return function(o,i){if(r===d)throw new Error("Generator is already running");if(r===h){if("throw"===o)throw i;return S()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=C(a,n);if(c){if(c===v)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===f)throw r=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=d;var l=u(t,e,n);if("normal"===l.type){if(r=n.done?h:p,l.arg===v)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(r=h,n.method="throw",n.arg=l.arg)}}}(t,n,a),i}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f="suspendedStart",p="suspendedYield",d="executing",h="completed",v={};function m(){}function g(){}function y(){}var w={};l(w,i,(function(){return this}));var b=Object.getPrototypeOf,_=b&&b(b(F([])));_&&_!==n&&r.call(_,i)&&(w=_);var L=y.prototype=m.prototype=Object.create(w);function x(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function n(o,i,a,c){var l=u(t[o],t,i);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==typeof f&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return n("throw",t,a,c)}))}c(l.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function C(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,C(t,n),"throw"===n.method))return v;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=u(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,v;var i=o.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,v):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,v)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function F(t){if(t){var n=t[i];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function n(){for(;++o<t.length;)if(r.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}return{next:S}}function S(){return{value:e,done:!0}}return g.prototype=y,l(L,"constructor",y),l(y,"constructor",g),g.displayName=l(y,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,l(t,c,"GeneratorFunction")),t.prototype=Object.create(L),t},t.awrap=function(t){return{__await:t}},x(E.prototype),l(E.prototype,a,(function(){return this})),t.AsyncIterator=E,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new E(s(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(L),l(L,c,"Generator"),l(L,i,(function(){return this})),l(L,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=F,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(k),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(r,o){return c.type="throw",c.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var l=r.call(a,"catchLoc"),s=r.call(a,"finallyLoc");if(l&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),k(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;k(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:F(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),v}},t}(c);try{regeneratorRuntime=l}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=l:Function("r","regeneratorRuntime = r")(l)}var s={};Object.defineProperty(s,"__esModule",{value:!0}),s.default=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),r.forEach((function(e){f.default(t,e,n[e])}))}return t};var u,f=(u=o("hKHmD"))&&u.__esModule?u:{default:u};var p={full:'<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path d="M13.852 15.8746C13.7336 15.875 13.6181 15.8381 13.5219 15.7691L9.00048 12.4911L4.47903 15.7691C4.38243 15.8392 4.26606 15.8767 4.14673 15.8762C4.0274 15.8758 3.91129 15.8374 3.81521 15.7667C3.71912 15.6959 3.64803 15.5964 3.61221 15.4826C3.57639 15.3688 3.5777 15.2465 3.61594 15.1335L5.37938 9.9103L0.809069 6.77612C0.710073 6.70831 0.635356 6.61062 0.595836 6.49732C0.556316 6.38402 0.554063 6.26105 0.589407 6.14638C0.624751 6.0317 0.695839 5.93134 0.792285 5.85995C0.888732 5.78856 1.00548 5.74988 1.12548 5.74956H6.76384L8.4654 0.513037C8.50205 0.399982 8.57358 0.301443 8.6697 0.231555C8.76583 0.161668 8.88163 0.124023 9.00048 0.124023C9.11932 0.124023 9.23512 0.161668 9.33125 0.231555C9.42738 0.301443 9.4989 0.399982 9.53555 0.513037L11.2371 5.75132H16.8755C16.9956 5.75126 17.1126 5.78967 17.2094 5.86093C17.3061 5.93218 17.3775 6.03254 17.413 6.1473C17.4486 6.26206 17.4465 6.38519 17.407 6.49866C17.3675 6.61213 17.2928 6.70998 17.1936 6.77788L12.6216 9.9103L14.384 15.1321C14.4125 15.2166 14.4205 15.3067 14.4074 15.395C14.3942 15.4832 14.3603 15.5671 14.3083 15.6396C14.2563 15.7122 14.1879 15.7713 14.1085 15.8122C14.0292 15.853 13.9413 15.8744 13.852 15.8746Z" fill="url(#paint0_linear_148_6975)"/>\n    <defs>\n    <linearGradient id="paint0_linear_148_6975" x1="2.62549" y1="1.24957" x2="13.8755" y2="16.2496" gradientUnits="userSpaceOnUse">\n    <stop stop-color="#F84119"/>\n    <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>\n    </linearGradient>\n    </defs>\n    </svg>',half:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6991)" stroke-linejoin="round"/>\n    <path d="M9 1.6875V12.7969L4.14844 16.3125L6.04688 10.6875L1.125 7.3125H7.17188L9 1.6875Z" fill="url(#paint1_linear_148_6991)"/>\n    <defs>\n    <linearGradient id="paint0_linear_148_6991" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">\n    <stop stop-color="#F84119"/>\n    <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>\n    </linearGradient>\n    <linearGradient id="paint1_linear_148_6991" x1="2.08688" y1="2.73251" x2="12.1506" y2="9.47748" gradientUnits="userSpaceOnUse">\n    <stop stop-color="#F84119"/>\n    <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>\n    </linearGradient>\n    </defs>\n    </svg>',empty:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6994)" stroke-linejoin="round"/>\n    <defs>\n    <linearGradient id="paint0_linear_148_6994" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">\n    <stop stop-color="#F84119"/>\n    <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>\n    </linearGradient>\n    </defs>\n    </svg>'},d="5b2561cb57ffa8e6a9098e26cf7f9cbf",h="https://api.themoviedb.org/3",v="https://image.tmdb.org/t/p/w500";["full","half","empty"].forEach((function(t){(new Image).src="/images/".concat(t,"Star.svg")}));var m={trending:"".concat(h,"/trending/movie/week?api_key=").concat(d),genres:"".concat(h,"/genre/movie/list?api_key=").concat(d),upcoming:"".concat(h,"/movie/upcoming?api_key=").concat(d)};function g(){return y.apply(this,arguments)}function y(){return y=t(i)(t(c).mark((function e(){var n,r,o,i,a,l,u,f,p=arguments;return t(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=p.length>0&&void 0!==p[0]?p[0]:["trending","genres"],r=p.length>1&&void 0!==p[1]?p[1]:3,e.prev=1,o=n.map((function(t){return fetch(m[t]).then((function(t){return t.json()}))})),e.next=5,Promise.all(o);case 5:return i=e.sent,console.log("Fetched Data:",i),a=Object.fromEntries(n.map((function(t,e){return[t,i[e]]}))),l={},a.genres&&(l=Object.fromEntries(a.genres.genres.map((function(t){return[t.id,t.name]})))),u=function(e,n){return e.slice(0,n).map((function(e){return t(s)({},e,{genre_names:e.genre_ids?e.genre_ids.map((function(t){return l[t]})).join(", "):""})}))},f={},a.trending&&(f.trendingMovies=u(a.trending.results,r)),a.upcoming&&(f.upcomingMovies=u(a.upcoming.results,1)[0]),e.abrupt("return",f);case 17:return e.prev=17,e.t0=e.catch(1),console.error("Error fetching data:",e.t0),e.abrupt("return",{});case 21:case"end":return e.stop()}}),e,null,[[1,17]])}))),y.apply(this,arguments)}function w(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=t.split(", ");return n.slice(0,e).join(", ")}function b(t){var e=t.title,n=t.genre_names,r=t.poster_path,o=t.release_date,i=t.vote_average,a=document.createElement("div");a.className="movie-head-poster",a.style.backgroundImage="url(".concat(v).concat(r,")");var c=w(n),l=new Date(o).getFullYear(),s=function(t){var e=Math.floor(t/2),n=t%2>=.5,r=5-e-(n?1:0),o=function(t){return p[t]};return"\n    ".concat(o("full").repeat(e),"\n    ").concat(n?o("half"):"","\n    ").concat(o("empty").repeat(r),"\n  ")}(i);return a.innerHTML='\n    <p class="movie-head-t-title">'.concat(e,'</p>\n    <div class="info-container">\n      <p class="movie-head-t-info">').concat(c," | ").concat(l,'</p>\n      <span class="star-rating">').concat(s,"</span>\n    </div>\n  "),a}function _(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#movie-container",n=document.querySelector(e);n.innerHTML="";var r=document.createDocumentFragment();t.forEach((function(t){return r.appendChild(b(t))})),n.appendChild(r),console.log("Added ".concat(t.length," movies to ").concat(e))}function L(t){if(t){var e=t.title,n=t.genre_names,r=t.poster_path,o=t.release_date,i=t.vote_average,a=t.vote_count,c=t.popularity,l=t.overview,s=new Date(o).toLocaleDateString("pl-PL",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,".");document.querySelectorAll(".upcoming-poster").forEach((function(t){t.style.backgroundImage="url(".concat(v).concat(r,")")})),document.querySelectorAll("#upcoming-movie-title-mobile, #upcoming-movie-title-tablet, #upcoming-movie-title-pc").forEach((function(t){t.textContent=e})),document.querySelectorAll("#release-date-home-mobile, #release-date-home-tablet, #release-date-home-pc").forEach((function(t){t.textContent=s,t.style.color="#F87719"})),document.querySelectorAll("#votes-home-mobile, #votes-home-tablet, #votes-home-pc").forEach((function(t){t.innerHTML='\n      <div class="votes-wrapper">\n        <div class="votes-wrapper-info">'.concat(i.toFixed(1),'</div>\n        <span>/</span>\n        <div class="votes-wrapper-info">').concat(a,"</div>\n      </div>\n    ")})),document.querySelectorAll("#popularity-home-mobile, #popularity-home-tablet, #popularity-home-pc").forEach((function(t){t.textContent=c.toFixed(1)})),document.querySelectorAll("#genre-home-mobile, #genre-home-tablet, #genre-home-pc").forEach((function(t){t.textContent=w(n)})),document.querySelectorAll(".about-home-info").forEach((function(t){t.textContent=l}))}}var x,E=(x=t(i)(t(c).mark((function e(){var n,r,o,i,a,l,s,u,f;return t(c).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return u=function(t){if(t){f();var e=document.createElement("h2");e.textContent=t.title,r.insertBefore(e,a);var i=document.createElement("table");i.className="table-move-info",i.innerHTML="\n      <tr>\n          <td><strong>Vote / Votes</strong></td>\n          <td>".concat(t.vote_average,"/").concat(t.vote_count,"</td>\n      </tr>\n      <tr>\n          <td><strong>Popularity</strong></td>\n          <td>").concat(t.popularity,"</td>\n      </tr>\n      <tr>\n          <td><strong>Genre</strong></td>\n          <td>").concat(t.genre_names,'</td>\n      </tr>\n      <tr>\n          <td><strong>About</strong></td>\n          <td></td>\n      </tr>\n      <tr>\n        <td colspan="2">').concat(t.overview,"</td>\n      </tr>\n    "),r.insertBefore(i,a);var c=document.createElement("img");c.className="modal-move-poster",c.src="https://image.tmdb.org/t/p/w500".concat(t.poster_path),c.alt="".concat(t.title," Poster"),o.insertBefore(c,r),n.style.display="block"}},f=function(){for(;r.firstChild!==a;)r.removeChild(r.firstChild);for(;o.firstChild!==r;)o.removeChild(o.firstChild)},n=document.getElementById("myModal"),document.querySelector(".modal-content"),r=document.querySelector(".movie-info"),o=document.querySelector(".modal-body"),i=document.getElementsByClassName("close")[0],a=document.getElementById("toggleLibrary"),l=document.querySelector("#movie-container"),t.next=11,g(["trending","genres"],3);case 11:s=t.sent.trendingMovies,l.addEventListener("click",(function(t){var e=t.target.closest(".movie-head-poster");if(e){var n=Array.from(l.children).indexOf(e);u(s[n])}})),i.onclick=function(){n.style.display="none",f()},window.onclick=function(t){t.target==n&&(n.style.display="none",f())},a.onclick=function(){"Add to my library"===a.innerText?a.innerText="Remove from my library":a.innerText="Add to my library"};case 18:case"end":return t.stop()}}),e)}))),function(){return x.apply(this,arguments)});E(),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#movie-container";document.addEventListener("DOMContentLoaded",t(i)(t(c).mark((function r(){var o,i,a;return t(c).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,console.log("Fetching movies..."),t.next=4,g(["trending","genres","upcoming"],e);case 4:o=t.sent,i=o.trendingMovies,a=o.upcomingMovies,console.log("Movies fetched:",i),console.log("Displaying movies..."),_(i,n),L(a),console.log("Movies should be displayed now"),t.next=17;break;case 14:t.prev=14,t.t0=t.catch(0),console.error("Failed to initialize:",t.t0);case 17:case"end":return t.stop()}}),r,null,[[0,14]])}))))}(3,"#movie-container")}();
//# sourceMappingURL=index.6db852d7.js.map
