importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    workbox.setConfig({
        debug: true
    });

    const precacheController = new workbox.precaching.PrecacheController();


    precacheController.addToCacheList([{
        url: '/vendor.js',
        revision: 'abcd',
    }, {
        url: '/main.js',
        revision: '1234',
    }, {
        url: '/index.html',
        revision: '2342314'
    }]);

    self.addEventListener('install', (event) => {
        event.waitUntil(precacheController.install());
    });
    self.addEventListener('activate', (event) => {
        console.log('activate sw')
        event.waitUntil(precacheController.activate());
    });

    workbox.routing.registerRoute(
        // Cache image files.
        /.*\.(?:png|jpg|jpeg|svg|gif)/g,
        // Use the cache if it's available.
        new workbox.strategies.CacheFirst({
            // Use a custom cache name.
            cacheName: 'image-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images.
                    maxEntries: 20,
                    // Cache for a maximum of a week.
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                })
            ],
        })
    );
    workbox.routing.registerRoute(
        // Cache image files.
        '/',
        // Use the cache if it's available.
        new workbox.strategies.CacheFirst({
            // Use a custom cache name.
            cacheName: 'html-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images.
                    maxEntries: 20,
                    // Cache for a maximum of a week.
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                })
            ],
        })
    );


    /* self.addEventListener('fetch', function(e) {

        e.respondWith(
            caches.match(e.request).then(function(response) {
                console.log('response', response)
                return response || fetch(e.request);
            })
        );
    }); */

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}