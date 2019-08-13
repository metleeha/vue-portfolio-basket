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
      caches.match(e.request).then(function (r) {
        return r || fetch(e.request).then(function (response) {
          return caches.open("tenPWA_v1").then(function (cache) {
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  }else{
    fetch(e.request);
  }
});