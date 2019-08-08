self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open('tenPWA_v1').then(function (cache) {
      return cache.addAll([
        '/public/index.html'
      ]);
    })
  );
});

/* fetch */
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});