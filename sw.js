const CACHE_NAME = 'pwa-itaipu-v1';

// Lista de arquivos que devem ser cacheados para funcionar offline
const ASSETS_TO_CACHE = [
  '/',
  'index.html',
  'style.css',
  'manifest.json',
  'LogoItaipu.png' 
];

// Evento de Instalação
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Instalando e cacheando assets');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Evento de Ativação (Útil para limpar caches antigos quando você atualizar o app)
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

// Evento de Fetch (Recupera do cache ou busca na rede)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Retorna o arquivo do cache se existir, senão busca na rede
      return response || fetch(e.request);
    })
  );
});