const cacheName = `v2`;

/////INSTALL SERVICE WORKER/////

self.addEventListener(`install`, (e) => {
  // console.log(`Service worker installed`);
});

/////ACTIVATE SERVICE WORKER/////

self.addEventListener(`activate`, (e) => {
  // console.log(`ServiceWorker: activated`);
  /////REMOVE OLD CACHE/////
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            // console.log(`Service worker: Clearing old cache`);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

/////FETCH CACHE/////

self.addEventListener(`fetch`, (e) => {
  // console.log(`Service Worker: Fetching`);
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        /////CLONE OF RESPONSE/////
        const resClone = res.clone();
        /////OPEN CACHE/////
        caches.open(cacheName).then((cache) => {
          /////ADD RESPONSE TO CACHE/////
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
