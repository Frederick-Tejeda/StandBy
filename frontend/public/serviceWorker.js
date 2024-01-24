const CACHE_NAME = "version-1"
const urlsToCache = ["index.html", "offline.html"]

this.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log(' ')
            return cache.addAll(urlsToCache)
        })
    )
})

this.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(() => {
            return fetch(e.request).catch(() => caches.match('offline.html'))
        })
    )
})

this.addEventListener('active', (e) => {
    const cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)
    e.waitUntil(caches.keys().then((cacheNames) => Promise.all(
        cacheNames.map(cacheName => {
            if(!cacheWhiteList.includes(cacheName)){
                return caches.delete(cacheName)
            }
        })
    )))
})