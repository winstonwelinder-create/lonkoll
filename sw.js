const cacheName = 'min-lon-v3';
const files = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(files)));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).catch(async () => {
    const cache = await caches.open(cacheName);
    return await cache.match(event.request) || (event.request.mode === 'navigate' && await cache.match('./index.html')) || Response.error();
  }));
});
