if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const o=e=>n(e,i),u={module:{uri:i},exports:c,require:o};s[i]=Promise.all(t.map((e=>u[e]||o(e)))).then((e=>(a(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"1c2ec56b61bf7eb160fb4f4b3eaf7fdd"},{url:"/_next/static/chunks/0e5ce63c-ae62706588b4eb41.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/117-adb93c85e6d6f412.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/145-c5c1c05401e823e7.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/215.42ec50863802597b.js",revision:"42ec50863802597b"},{url:"/_next/static/chunks/374-e954afb87a44149a.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/53c13509-55e737bfb126b0ae.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/64-b981a77e76538af3.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/78-d39e6909854b3f2a.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/795d4814-588ae80662f98309.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/7cb1fa1f-2943c685993502a3.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/915-6f01a8e20748d3b8.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/app/_not-found/page-eb3b180e2964d882.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/app/dashboard/page-a448e990d9366545.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/app/layout-91104a159a6c4b1b.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/app/page-26b07d5cefebd1b6.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/app/scan/page-f0824815c9556adc.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/fd9d1056-3750f1c68fb99acb.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/main-5cae11e46907502a.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/main-app-fb2345a8515fff93.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-5186a26f9693067a.js",revision:"eC_XDFs2C4Mt01uWO4uBo"},{url:"/_next/static/css/1166fda004b11094.css",revision:"1166fda004b11094"},{url:"/_next/static/css/2b67d1633dc8a38f.css",revision:"2b67d1633dc8a38f"},{url:"/_next/static/eC_XDFs2C4Mt01uWO4uBo/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/eC_XDFs2C4Mt01uWO4uBo/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/_next/static/media/pmjay_logo-512.86913c9a.png",revision:"0fffcd0835ab55f1594a40edfedad2ea"},{url:"/icons/pmjay_logo-128.png",revision:"f8c32b656e201db53392d940f95ce318"},{url:"/icons/pmjay_logo-144.png",revision:"e601648a58879079dab0c6ced4140294"},{url:"/icons/pmjay_logo-152.png",revision:"c277fadd0d9be404704d67e811b2232e"},{url:"/icons/pmjay_logo-16.png",revision:"955db99331ec28cfb414a609520ceee2"},{url:"/icons/pmjay_logo-180.png",revision:"bcc8366f7952e2ac3376bf713d67322b"},{url:"/icons/pmjay_logo-192.png",revision:"74f906fb6d4582b173327d677acbb94b"},{url:"/icons/pmjay_logo-256.png",revision:"d52f963701168791f6a23d1e9863d0f6"},{url:"/icons/pmjay_logo-48.png",revision:"2919137587522331b3eb9a23964c29a0"},{url:"/icons/pmjay_logo-512.png",revision:"0fffcd0835ab55f1594a40edfedad2ea"},{url:"/icons/pmjay_logo-64.png",revision:"fb137be8840641c273a7e02b2b940d64"},{url:"/icons/pmjay_logo-72.png",revision:"ec696b36f63a59ccd047295bfd9da1d7"},{url:"/icons/pmjay_logo-96.png",revision:"a044bcf685fd544545b638c2380925a1"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
