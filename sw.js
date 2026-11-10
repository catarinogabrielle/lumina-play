/**
 * LUMINA PLAY - SERVICE WORKER
 * Cache e suporte a execução offline básica (PWA)
 */

const CACHE_NAME = 'lumina-play-v2';
const ASSETS_TO_CACHE = [
  './home.html',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/games-data.js',
  './js/audio-engine.js',
  './js/canvas-engine.js',
  './js/app.js',
  './assets/icons/lumina-icon.svg',
  './assets/icons/logo.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Estratégia Network First com Fallback para Cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
