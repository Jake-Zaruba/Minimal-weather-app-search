const cacheName = `v1`;
const cacheAssets = [`index.html`, `style.css`, `script.js`, `/img`];

/////INSTALL SERVICE WORKER/////

self.addEventListener(`install`, (e) => {
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log(`Service Worker: Caching Files`);
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

/////ACTIVATE SERVICE WORKER/////

self.addEventListener(`activate`, (e) => {
  console.log(`ServiceWorker: activated`);
  /////REMOVE OLD CACHE/////
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log(`Service worker: Clearing old cache`);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

/////FETCH CACHE/////

self.addEventListener(`fetch`, (e) => {
  console.log(`Service Worker: Fetching`);
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
