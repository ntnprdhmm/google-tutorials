var cacheName = 'myApp-cache';
var dataCacheName = 'myAppData';
var filesToCache = [
    '',
    'index.html',
    'scripts/app.js',
    'styles/inline.css',
    'images/clear.png',
    'images/cloudy-scattered-showers.png',
    'images/cloudy.png',
    'images/fog.png',
    'images/ic_add_white_24px.svg',
    'images/ic_refresh_white_24px.svg',
    'images/partly-cloudy.png',
    'images/rain.png',
    'images/scattered-showers.png',
    'images/sleet.png',
    'images/snow.png',
    'images/thunderstorm.png',
    'images/wind.png'
];

// open the cache and add our files
self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

// purge the cache
self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                console.log('[ServiceWorker] Removing old cache', key);
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

// look at our cache
self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    var dataUrl = 'https://publicdata-weather.firebaseio.com/';
    if (e.request.url.indexOf(dataUrl) === 0) {
        e.respondWith(
          fetch(e.request)
            .then(function(response) {
              return caches.open(dataCacheName).then(function(cache) {
                cache.put(e.request.url, response.clone());
                console.log('[ServiceWorker] Fetched&Cached Data');
                return response;
              });
            })
        );
    } else {
        e.respondWith(
            caches.match(e.request).then(function(response) {
                return response || fetch(e.request);
            })
        );
    }
});
