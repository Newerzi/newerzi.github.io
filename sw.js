// Service Worker для кэширования
const CACHE_NAME = 'newerzi-cache-v1';
const urlsToCache = [
    '/',
    '/style.css',
    '/fonts/UNCAGE-SemiBold.otf',
    '/fonts/Manrope-Regular.otf',
    '/fonts/Manrope-SemiBold.otf',
    '/fonts/Manrope-Bold.otf',
    '/fonts/NeutralFace-Bold.otf',
    '/fonts/NeutralFace-Regular.otf'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
