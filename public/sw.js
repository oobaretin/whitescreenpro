const cacheName = "whitescreen-v2";

const SHELL = ["/"];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key)),
      ),
    ),
  );
  self.clients.claim();
});

/** Network-first for navigations; stale-while-revalidate for static assets. */
self.addEventListener("fetch", (evt) => {
  if (evt.request.method !== "GET") return;

  const url = new URL(evt.request.url);
  const isNavigation =
    evt.request.mode === "navigate" ||
    evt.request.destination === "document";
  const isNextAsset =
    url.pathname.startsWith("/_next/") || url.pathname.startsWith("/static/");

  if (isNavigation) {
    evt.respondWith(
      fetch(evt.request)
        .then((response) => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(cacheName).then((cache) => cache.put(evt.request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(evt.request).then((cached) => cached || caches.match("/")),
        ),
    );
    return;
  }

  if (isNextAsset) {
    evt.respondWith(
      caches.match(evt.request).then((cached) => {
        const network = fetch(evt.request)
          .then((response) => {
            if (response.status === 200) {
              const clone = response.clone();
              caches.open(cacheName).then((cache) => cache.put(evt.request, clone));
            }
            return response;
          })
          .catch(() => cached);

        return cached || network;
      }),
    );
    return;
  }

  // Other same-origin assets: stale-while-revalidate
  if (url.origin === self.location.origin) {
    evt.respondWith(
      caches.match(evt.request).then((cached) => {
        const network = fetch(evt.request)
          .then((response) => {
            if (response.status === 200) {
              const clone = response.clone();
              caches.open(cacheName).then((cache) => cache.put(evt.request, clone));
            }
            return response;
          })
          .catch(() => cached);

        return cached || network;
      }),
    );
  }
});
