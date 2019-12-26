exports.ids=[3],exports.modules={171:function(e,t,r){"use strict";r.r(t),r.d(t,"Headers",(function(){return $})),r.d(t,"Request",(function(){return M})),r.d(t,"Response",(function(){return H})),r.d(t,"FetchError",(function(){return d}));var o=r(8),n=r(16),s=r(9),i=r(132),u=r(57);const a=o.Readable,l=Symbol("buffer"),c=Symbol("type");class f{constructor(){this[c]="";const e=arguments[0],t=arguments[1],r=[];let o=0;if(e){const t=e,n=Number(t.length);for(let e=0;e<n;e++){const n=t[e];let s;s=n instanceof Buffer?n:ArrayBuffer.isView(n)?Buffer.from(n.buffer,n.byteOffset,n.byteLength):n instanceof ArrayBuffer?Buffer.from(n):n instanceof f?n[l]:Buffer.from("string"==typeof n?n:String(n)),o+=s.length,r.push(s)}}this[l]=Buffer.concat(r);let n=t&&void 0!==t.type&&String(t.type).toLowerCase();n&&!/[^\u0020-\u007E]/.test(n)&&(this[c]=n)}get size(){return this[l].length}get type(){return this[c]}text(){return Promise.resolve(this[l].toString())}arrayBuffer(){const e=this[l],t=e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength);return Promise.resolve(t)}stream(){const e=new a;return e._read=function(){},e.push(this[l]),e.push(null),e}toString(){return"[object Blob]"}slice(){const e=this.size,t=arguments[0],r=arguments[1];let o,n;o=void 0===t?0:t<0?Math.max(e+t,0):Math.min(t,e),n=void 0===r?e:r<0?Math.max(e+r,0):Math.min(r,e);const s=Math.max(n-o,0),i=this[l].slice(o,o+s),u=new f([],{type:arguments[2]});return u[l]=i,u}}function d(e,t,r){Error.call(this,e),this.message=e,this.type=t,r&&(this.code=this.errno=r.code),Error.captureStackTrace(this,this.constructor)}let h;Object.defineProperties(f.prototype,{size:{enumerable:!0},type:{enumerable:!0},slice:{enumerable:!0}}),Object.defineProperty(f.prototype,Symbol.toStringTag,{value:"Blob",writable:!1,enumerable:!1,configurable:!0}),d.prototype=Object.create(Error.prototype),d.prototype.constructor=d,d.prototype.name="FetchError";try{h=require("encoding").convert}catch(e){}const p=Symbol("Body internals"),b=o.PassThrough;function y(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.size;let s=void 0===n?0:n;var i=r.timeout;let u=void 0===i?0:i;null==e?e=null:g(e)?e=Buffer.from(e.toString()):w(e)||Buffer.isBuffer(e)||("[object ArrayBuffer]"===Object.prototype.toString.call(e)?e=Buffer.from(e):ArrayBuffer.isView(e)?e=Buffer.from(e.buffer,e.byteOffset,e.byteLength):e instanceof o||(e=Buffer.from(String(e)))),this[p]={body:e,disturbed:!1,error:null},this.size=s,this.timeout=u,e instanceof o&&e.on("error",(function(e){const r="AbortError"===e.name?e:new d(`Invalid response body while trying to fetch ${t.url}: ${e.message}`,"system",e);t[p].error=r}))}function m(){var e=this;if(this[p].disturbed)return y.Promise.reject(new TypeError(`body used already for: ${this.url}`));if(this[p].disturbed=!0,this[p].error)return y.Promise.reject(this[p].error);let t=this.body;if(null===t)return y.Promise.resolve(Buffer.alloc(0));if(w(t)&&(t=t.stream()),Buffer.isBuffer(t))return y.Promise.resolve(t);if(!(t instanceof o))return y.Promise.resolve(Buffer.alloc(0));let r=[],n=0,s=!1;return new y.Promise((function(o,i){let u;e.timeout&&(u=setTimeout((function(){s=!0,i(new d(`Response timeout while trying to fetch ${e.url} (over ${e.timeout}ms)`,"body-timeout"))}),e.timeout)),t.on("error",(function(t){"AbortError"===t.name?(s=!0,i(t)):i(new d(`Invalid response body while trying to fetch ${e.url}: ${t.message}`,"system",t))})),t.on("data",(function(t){if(!s&&null!==t){if(e.size&&n+t.length>e.size)return s=!0,void i(new d(`content size at ${e.url} over limit: ${e.size}`,"max-size"));n+=t.length,r.push(t)}})),t.on("end",(function(){if(!s){clearTimeout(u);try{o(Buffer.concat(r,n))}catch(t){i(new d(`Could not create Buffer from response body for ${e.url}: ${t.message}`,"system",t))}}}))}))}function g(e){return"object"==typeof e&&"function"==typeof e.append&&"function"==typeof e.delete&&"function"==typeof e.get&&"function"==typeof e.getAll&&"function"==typeof e.has&&"function"==typeof e.set&&("URLSearchParams"===e.constructor.name||"[object URLSearchParams]"===Object.prototype.toString.call(e)||"function"==typeof e.sort)}function w(e){return"object"==typeof e&&"function"==typeof e.arrayBuffer&&"string"==typeof e.type&&"function"==typeof e.stream&&"function"==typeof e.constructor&&"string"==typeof e.constructor.name&&/^(Blob|File)$/.test(e.constructor.name)&&/^(Blob|File)$/.test(e[Symbol.toStringTag])}function v(e){let t,r,n=e.body;if(e.bodyUsed)throw new Error("cannot clone body after it is used");return n instanceof o&&"function"!=typeof n.getBoundary&&(t=new b,r=new b,n.pipe(t),n.pipe(r),e[p].body=t,n=r),n}function T(e){return null===e?null:"string"==typeof e?"text/plain;charset=UTF-8":g(e)?"application/x-www-form-urlencoded;charset=UTF-8":w(e)?e.type||null:Buffer.isBuffer(e)?null:"[object ArrayBuffer]"===Object.prototype.toString.call(e)?null:ArrayBuffer.isView(e)?null:"function"==typeof e.getBoundary?`multipart/form-data;boundary=${e.getBoundary()}`:e instanceof o?null:"text/plain;charset=UTF-8"}function S(e){const t=e.body;return null===t?0:w(t)?t.size:Buffer.isBuffer(t)?t.length:t&&"function"==typeof t.getLengthSync&&(t._lengthRetrievers&&0==t._lengthRetrievers.length||t.hasKnownLength&&t.hasKnownLength())?t.getLengthSync():null}y.prototype={get body(){return this[p].body},get bodyUsed(){return this[p].disturbed},arrayBuffer(){return m.call(this).then((function(e){return e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}))},blob(){let e=this.headers&&this.headers.get("content-type")||"";return m.call(this).then((function(t){return Object.assign(new f([],{type:e.toLowerCase()}),{[l]:t})}))},json(){var e=this;return m.call(this).then((function(t){try{return JSON.parse(t.toString())}catch(t){return y.Promise.reject(new d(`invalid json response body at ${e.url} reason: ${t.message}`,"invalid-json"))}}))},text(){return m.call(this).then((function(e){return e.toString()}))},buffer(){return m.call(this)},textConverted(){var e=this;return m.call(this).then((function(t){return function(e,t){if("function"!=typeof h)throw new Error("The package `encoding` must be installed to use the textConverted() function");const r=t.get("content-type");let o,n,s="utf-8";r&&(o=/charset=([^;]*)/i.exec(r));n=e.slice(0,1024).toString(),!o&&n&&(o=/<meta.+?charset=(['"])(.+?)\1/i.exec(n));!o&&n&&(o=/<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(n),o&&(o=/charset=(.*)/i.exec(o.pop())));!o&&n&&(o=/<\?xml.+?encoding=(['"])(.+?)\1/i.exec(n));o&&(s=o.pop(),"gb2312"!==s&&"gbk"!==s||(s="gb18030"));return h(e,"UTF-8",s).toString()}(t,e.headers)}))}},Object.defineProperties(y.prototype,{body:{enumerable:!0},bodyUsed:{enumerable:!0},arrayBuffer:{enumerable:!0},blob:{enumerable:!0},json:{enumerable:!0},text:{enumerable:!0}}),y.mixIn=function(e){for(const t of Object.getOwnPropertyNames(y.prototype))if(!(t in e)){const r=Object.getOwnPropertyDescriptor(y.prototype,t);Object.defineProperty(e,t,r)}},y.Promise=global.Promise;const j=/[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/,O=/[^\t\x20-\x7e\x80-\xff]/;function E(e){if(e=`${e}`,j.test(e)||""===e)throw new TypeError(`${e} is not a legal HTTP header name`)}function P(e){if(e=`${e}`,O.test(e))throw new TypeError(`${e} is not a legal HTTP header value`)}function x(e,t){t=t.toLowerCase();for(const r in e)if(r.toLowerCase()===t)return r}const B=Symbol("map");class ${constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;if(this[B]=Object.create(null),e instanceof $){const t=e.raw(),r=Object.keys(t);for(const e of r)for(const r of t[e])this.append(e,r)}else if(null==e);else{if("object"!=typeof e)throw new TypeError("Provided initializer must be an object");{const t=e[Symbol.iterator];if(null!=t){if("function"!=typeof t)throw new TypeError("Header pairs must be iterable");const r=[];for(const t of e){if("object"!=typeof t||"function"!=typeof t[Symbol.iterator])throw new TypeError("Each header pair must be iterable");r.push(Array.from(t))}for(const e of r){if(2!==e.length)throw new TypeError("Each header pair must be a name/value tuple");this.append(e[0],e[1])}}else for(const t of Object.keys(e)){const r=e[t];this.append(t,r)}}}}get(e){E(e=`${e}`);const t=x(this[B],e);return void 0===t?null:this[B][t].join(", ")}forEach(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,r=C(this),o=0;for(;o<r.length;){var n=r[o];const s=n[0],i=n[1];e.call(t,i,s,this),r=C(this),o++}}set(e,t){t=`${t}`,E(e=`${e}`),P(t);const r=x(this[B],e);this[B][void 0!==r?r:e]=[t]}append(e,t){t=`${t}`,E(e=`${e}`),P(t);const r=x(this[B],e);void 0!==r?this[B][r].push(t):this[B][e]=[t]}has(e){return E(e=`${e}`),void 0!==x(this[B],e)}delete(e){E(e=`${e}`);const t=x(this[B],e);void 0!==t&&delete this[B][t]}raw(){return this[B]}keys(){return A(this,"key")}values(){return A(this,"value")}[Symbol.iterator](){return A(this,"key+value")}}function C(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"key+value";return Object.keys(e[B]).sort().map("key"===t?function(e){return e.toLowerCase()}:"value"===t?function(t){return e[B][t].join(", ")}:function(t){return[t.toLowerCase(),e[B][t].join(", ")]})}$.prototype.entries=$.prototype[Symbol.iterator],Object.defineProperty($.prototype,Symbol.toStringTag,{value:"Headers",writable:!1,enumerable:!1,configurable:!0}),Object.defineProperties($.prototype,{get:{enumerable:!0},forEach:{enumerable:!0},set:{enumerable:!0},append:{enumerable:!0},has:{enumerable:!0},delete:{enumerable:!0},keys:{enumerable:!0},values:{enumerable:!0},entries:{enumerable:!0}});const L=Symbol("internal");function A(e,t){const r=Object.create(k);return r[L]={target:e,kind:t,index:0},r}const k=Object.setPrototypeOf({next(){if(!this||Object.getPrototypeOf(this)!==k)throw new TypeError("Value of `this` is not a HeadersIterator");var e=this[L];const t=e.target,r=e.kind,o=e.index,n=C(t,r);return o>=n.length?{value:void 0,done:!0}:(this[L].index=o+1,{value:n[o],done:!1})}},Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));function R(e){const t=Object.assign({__proto__:null},e[B]),r=x(e[B],"Host");return void 0!==r&&(t[r]=t[r][0]),t}Object.defineProperty(k,Symbol.toStringTag,{value:"HeadersIterator",writable:!1,enumerable:!1,configurable:!0});const z=Symbol("Response internals"),U=n.STATUS_CODES;class H{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};y.call(this,e,t);const r=t.status||200,o=new $(t.headers);if(null!=e&&!o.has("Content-Type")){const t=T(e);t&&o.append("Content-Type",t)}this[z]={url:t.url,status:r,statusText:t.statusText||U[r],headers:o,counter:t.counter}}get url(){return this[z].url||""}get status(){return this[z].status}get ok(){return this[z].status>=200&&this[z].status<300}get redirected(){return this[z].counter>0}get statusText(){return this[z].statusText}get headers(){return this[z].headers}clone(){return new H(v(this),{url:this.url,status:this.status,statusText:this.statusText,headers:this.headers,ok:this.ok,redirected:this.redirected})}}y.mixIn(H.prototype),Object.defineProperties(H.prototype,{url:{enumerable:!0},status:{enumerable:!0},ok:{enumerable:!0},redirected:{enumerable:!0},statusText:{enumerable:!0},headers:{enumerable:!0},clone:{enumerable:!0}}),Object.defineProperty(H.prototype,Symbol.toStringTag,{value:"Response",writable:!1,enumerable:!1,configurable:!0});const _=Symbol("Request internals"),q=s.parse,F=s.format,I="destroy"in o.Readable.prototype;function D(e){return"object"==typeof e&&"object"==typeof e[_]}class M{constructor(e){let t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};D(e)?t=q(e.url):(t=e&&e.href?q(e.href):q(`${e}`),e={});let o=r.method||e.method||"GET";if(o=o.toUpperCase(),(null!=r.body||D(e)&&null!==e.body)&&("GET"===o||"HEAD"===o))throw new TypeError("Request with GET/HEAD method cannot have body");let n=null!=r.body?r.body:D(e)&&null!==e.body?v(e):null;y.call(this,n,{timeout:r.timeout||e.timeout||0,size:r.size||e.size||0});const s=new $(r.headers||e.headers||{});if(null!=n&&!s.has("Content-Type")){const e=T(n);e&&s.append("Content-Type",e)}let i=D(e)?e.signal:null;if("signal"in r&&(i=r.signal),null!=i&&!function(e){const t=e&&"object"==typeof e&&Object.getPrototypeOf(e);return!(!t||"AbortSignal"!==t.constructor.name)}(i))throw new TypeError("Expected signal to be an instanceof AbortSignal");this[_]={method:o,redirect:r.redirect||e.redirect||"follow",headers:s,parsedURL:t,signal:i},this.follow=void 0!==r.follow?r.follow:void 0!==e.follow?e.follow:20,this.compress=void 0!==r.compress?r.compress:void 0===e.compress||e.compress,this.counter=r.counter||e.counter||0,this.agent=r.agent||e.agent}get method(){return this[_].method}get url(){return F(this[_].parsedURL)}get headers(){return this[_].headers}get redirect(){return this[_].redirect}get signal(){return this[_].signal}clone(){return new M(this)}}function G(e){Error.call(this,e),this.type="aborted",this.message=e,Error.captureStackTrace(this,this.constructor)}y.mixIn(M.prototype),Object.defineProperty(M.prototype,Symbol.toStringTag,{value:"Request",writable:!1,enumerable:!1,configurable:!0}),Object.defineProperties(M.prototype,{method:{enumerable:!0},url:{enumerable:!0},headers:{enumerable:!0},redirect:{enumerable:!0},clone:{enumerable:!0},signal:{enumerable:!0}}),G.prototype=Object.create(Error.prototype),G.prototype.constructor=G,G.prototype.name="AbortError";const N=o.PassThrough,V=s.resolve;function Z(e,t){if(!Z.Promise)throw new Error("native promise missing, set fetch.Promise to your favorite alternative");return y.Promise=Z.Promise,new Z.Promise((function(r,s){const a=new M(e,t),l=function(e){const t=e[_].parsedURL,r=new $(e[_].headers);if(r.has("Accept")||r.set("Accept","*/*"),!t.protocol||!t.hostname)throw new TypeError("Only absolute URLs are supported");if(!/^https?:$/.test(t.protocol))throw new TypeError("Only HTTP(S) protocols are supported");if(e.signal&&e.body instanceof o.Readable&&!I)throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");let n=null;if(null==e.body&&/^(POST|PUT)$/i.test(e.method)&&(n="0"),null!=e.body){const t=S(e);"number"==typeof t&&(n=String(t))}n&&r.set("Content-Length",n),r.has("User-Agent")||r.set("User-Agent","node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"),e.compress&&!r.has("Accept-Encoding")&&r.set("Accept-Encoding","gzip,deflate");let s=e.agent;return"function"==typeof s&&(s=s(t)),r.has("Connection")||s||r.set("Connection","close"),Object.assign({},t,{method:e.method,headers:R(r),agent:s})}(a),c=("https:"===l.protocol?i:n).request,f=a.signal;let h=null;const p=function(){let e=new G("The user aborted a request.");s(e),a.body&&a.body instanceof o.Readable&&a.body.destroy(e),h&&h.body&&h.body.emit("error",e)};if(f&&f.aborted)return void p();const b=function(){p(),g()},y=c(l);let m;function g(){y.abort(),f&&f.removeEventListener("abort",b),clearTimeout(m)}f&&f.addEventListener("abort",b),a.timeout&&y.once("socket",(function(e){m=setTimeout((function(){s(new d(`network timeout at: ${a.url}`,"request-timeout")),g()}),a.timeout)})),y.on("error",(function(e){s(new d(`request to ${a.url} failed, reason: ${e.message}`,"system",e)),g()})),y.on("response",(function(e){clearTimeout(m);const t=function(e){const t=new $;for(const r of Object.keys(e))if(!j.test(r))if(Array.isArray(e[r]))for(const o of e[r])O.test(o)||(void 0===t[B][r]?t[B][r]=[o]:t[B][r].push(o));else O.test(e[r])||(t[B][r]=[e[r]]);return t}(e.headers);if(Z.isRedirect(e.statusCode)){const o=t.get("Location"),n=null===o?null:V(a.url,o);switch(a.redirect){case"error":return s(new d(`redirect mode is set to error: ${a.url}`,"no-redirect")),void g();case"manual":if(null!==n)try{t.set("Location",n)}catch(e){s(e)}break;case"follow":if(null===n)break;if(a.counter>=a.follow)return s(new d(`maximum redirect reached at: ${a.url}`,"max-redirect")),void g();const o={headers:new $(a.headers),follow:a.follow,counter:a.counter+1,agent:a.agent,compress:a.compress,method:a.method,body:a.body,signal:a.signal,timeout:a.timeout};return 303!==e.statusCode&&a.body&&null===S(a)?(s(new d("Cannot follow redirect with body being a readable stream","unsupported-redirect")),void g()):(303!==e.statusCode&&(301!==e.statusCode&&302!==e.statusCode||"POST"!==a.method)||(o.method="GET",o.body=void 0,o.headers.delete("content-length")),r(Z(new M(n,o))),void g())}}e.once("end",(function(){f&&f.removeEventListener("abort",b)}));let o=e.pipe(new N);const n={url:a.url,status:e.statusCode,statusText:e.statusMessage,headers:t,size:a.size,timeout:a.timeout,counter:a.counter},i=t.get("Content-Encoding");if(!a.compress||"HEAD"===a.method||null===i||204===e.statusCode||304===e.statusCode)return h=new H(o,n),void r(h);const l={flush:u.Z_SYNC_FLUSH,finishFlush:u.Z_SYNC_FLUSH};if("gzip"==i||"x-gzip"==i)return o=o.pipe(u.createGunzip(l)),h=new H(o,n),void r(h);if("deflate"!=i&&"x-deflate"!=i){if("br"==i&&"function"==typeof u.createBrotliDecompress)return o=o.pipe(u.createBrotliDecompress()),h=new H(o,n),void r(h);h=new H(o,n),r(h)}else{e.pipe(new N).once("data",(function(e){o=8==(15&e[0])?o.pipe(u.createInflate()):o.pipe(u.createInflateRaw()),h=new H(o,n),r(h)}))}})),function(e,t){const r=t.body;null===r?e.end():w(r)?r.stream().pipe(e):Buffer.isBuffer(r)?(e.write(r),e.end()):r.pipe(e)}(y,a)}))}Z.isRedirect=function(e){return 301===e||302===e||303===e||307===e||308===e},Z.Promise=global.Promise,t.default=Z}};