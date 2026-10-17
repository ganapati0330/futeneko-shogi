// フテ猫しょうぎ Service Worker
var CACHE='futeneko-shogi-v5';
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(['./','./index.html']);}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp);});return r;}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match('./index.html');});}));});
