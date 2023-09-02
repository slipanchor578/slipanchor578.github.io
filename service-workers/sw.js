const CACHENAME = "myCache";
const CACHEVERSION = 1;
const CACHEKEY = `${CACHENAME}:${CACHEVERSION}`;
const CACHEFILES = [
    "./index.html",
    "./index.js",
    "./index.css"
].map(path => new URL(path, self.registration.scope).pathname);
function isTargetFile(url) {
    return CACHEFILES.indexOf(new URL(url).pathname) >= 0;
}
async function installHandler() {
    const cache = await caches.open(CACHEKEY);
    return cache.addAll(CACHEFILES);
}
async function activatehandler() {
    const cacheList = await caches.keys();
    const activeCacheList = cacheList.map((cacheName) => {
        if (!CACHEKEY.includes(cacheName)) {
            return caches.delete(cacheName);
        }
    });
    return Promise.all([...activeCacheList, self.clients.claim()]);
}
async function fetchHandler(event) {
    const cache = await caches.open(CACHEKEY);
    const cachedContents = await cache.match(event.request);
    if (cachedContents)
        return cachedContents;
    const response = await fetch(event.request);
    if (isTargetFile(event.request.url) && response.ok) {
        cache.put(event.request, response.clone());
    }
    return response;
}
self.addEventListener("install", (event) => {
    event.waitUntil(installHandler());
});
self.addEventListener("activate", async (event) => {
    event.waitUntil(activatehandler());
});
self.addEventListener("fetch", (event) => {
    event.respondWith(fetchHandler(event));
});