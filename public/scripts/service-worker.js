var cacheName = "genesteamPWA";
var dataCacheName = "genesteaData";
var filesToCache = [
  '/',
  '/images/icon-128x128.png',
  '/images/icon-144x144.png',
  '/images/icon-152x152.png',
  '/images/icon-158x158.png',
  '/images/icon-192x192.png',
  '/images/icon-256x256.png',
  '/images/icon-512x512.png',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
  'https://fonts.googleapis.com/css?family=Open+Sans:300,300italic,400,400italic,600',
  '/stylesheets/main.css',
  '/scripts/website.js'
];
var urlBase = '/';

self.addEventListener('install', function(e){
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache){
      console.log('[ServiceWorker] Caching App Shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e){
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList){
      return Promise.all(keyList.map(function(key){
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache');
          return caches.delete(key);
        }
      }));
    })
  );
});

/*
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || new Response("Nothing in the cache for this request");
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
      fetch(event.request).catch( function(){
        return caches.match(event.request);
      }) 
  );
});

*/

self.addEventListener('fetch', function(e) {
  if (e.request.url.match(urlBase)) {
    e.respondWith(
      fetch(e.request)
        .then(function(response) {
          return caches.open(dataCacheName).then(function(cache) {
            cache.put(e.request.url, response.clone());
            console.log('[ServiceWorker] Fetched & Cached', e.request.url);
            return response;
          });
        })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        console.log('[ServiceWorker] Fetch Only', e.request.url);
        return response || fetch(e.request);
      })
    );
  }
});


