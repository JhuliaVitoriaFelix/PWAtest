const CACHE_NAME = 'pwa-itaipu-v3';

const ASSETS_TO_CACHE = [
  '/',
  'index.html',
  'tutorial.html', // <-- Adicionado aqui!
  'style.css',
  'manifest.json',
  'Images/LogoItaipu.png' 
];


self.addEventListener('install', (e) => {
  console.log('[Service Worker] Instalando e cacheando assets');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Service Worker] Removendo cache antigo', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Retorna o arquivo do cache se existir, senão busca na rede
      return response || fetch(e.request);
    })
  );
});