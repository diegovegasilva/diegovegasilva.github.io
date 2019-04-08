importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    workbox.setConfig({
        debug: true
    });


    workbox.precaching.precacheAndRoute(
        [
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          '/es2015-polyfills.c5dd28b362270c767b34.js',
          '/favicon.ico',
          '/main.b754c0233c2135dc635b.js',
          '/polyfills.8bbb231b43165d65d357.js',
          '/runtime.26209474bfa8dc87a77c.js',
          '/styles.46363facf1f6f9b17322.css',
            {
                url: '/index.html',
                revision: '2342315445'
            }
        ]
    );



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