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
self.addEventListener('fetch', function (e) {
  var req = e.request.clone();
  if (req.clone().method == "GET") {
    e.respondWith(
      caches.match(req.clone()).then(function (r) {
        return r || fetch(req.clone()).then(function (response) {
          return caches.open("tenPWA_v1").then(function (cache) {
            cache.put(req.clone(), response.clone());
            return response;
          });
        });
      })
    );
  } 
});