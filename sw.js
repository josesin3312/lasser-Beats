const CACHE_NAME = 'lasser-beats-inv-v2';
const ASSETS = [
  './',
  './index.html'
];

// Instalar el Service Worker y guardar la página en la memoria interna
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Guardando archivos en la memoria del dispositivo...');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activar el modo offline y tomar el control inmediatamente
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Responder usando la memoria interna si no hay conexión a internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => caches.match('./index.html'))
  );
});