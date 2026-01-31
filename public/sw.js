const cacheName = 'whitescreen-v1';

// Shell / entry for Next.js app (SPA)
const assets = [
  '/',
];

// Install: cache core assets
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(assets))
  );
  self.skipWaiting();
});

// Fetch: serve from cache, fallback to network (cache-first for repeat visits)
self.addEventListener('fetch', (evt) => {
  if (evt.request.method !== 'GET') return;
  evt.respondWith(
    caches.match(evt.request).then((cached) => {
      if (cached) return cached;
      return fetch(evt.request).then((response) => {
        const clone = response.clone();
        if (response.status === 200 && evt.request.url.startsWith(self.location.origin)) {
          caches.open(cacheName).then((cache) => cache.put(evt.request, clone));
        }
        return response;
      });
    })
  );
});

// Activate: remove old caches
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});
