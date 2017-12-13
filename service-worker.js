var cacheName = 'weatherPWA-step-6-1';
var dataCacheName = 'weatherData-v1'; // separate our applications data from the app shell. 

var filesToCache = [
    '/weather-PWA/',
    '/weather-PWA/index.html',
    '/weather-PWA/scripts/app.js',
    '/weather-PWA/styles/inline.css',
    '/weather-PWA/images/clear.png',
    '/weather-PWA/images/cloudy-scattered-showers.png',
    '/weather-PWA/images/cloudy.png',
    '/weather-PWA/images/fog.png',
    '/weather-PWA/images/ic_add_white_24px.svg',
    '/weather-PWA/images/ic_refresh_white_24px.svg',
    '/weather-PWA/images/partly-cloudy.png',
    '/weather-PWA/images/rain.png',
    '/weather-PWA/images/scattered-showers.png',
    '/weather-PWA/images/sleet.png',
    '/weather-PWA/images/snow.png',
    '/weather-PWA/images/thunderstorm.png',
    '/weather-PWA/images/wind.png'
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache); 
        })
    );
});
/**
 * This code ensures that your service worker updates its cache whenever any of the app shell files change. 
 * In order for this to work, you'd need to increment the cacheName variable at the top of your service worker file.
 */
self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim(); // essentially lets you activate the service worker faster.
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
    if (e.request.url.indexOf(dataUrl) > -1) {
        /*
        * When the request URL contains dataUrl, the app is asking for fresh
        * weather data. In this case, the service worker always goes to the
        * network and then caches the response. This is called the "Cache then
        * network" strategy:
        * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
        */
        e.respondWith(
            caches.open(dataCacheName).then(function(cache) {
                return fetch(e.request).then(function(response){
                    cache.put(e.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        /*
        * The app is asking for app shell files. In this scenario the app uses the
        * "Cache, falling back to the network" offline strategy:
        * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
        */
        e.respondWith(
            caches.match(e.request).then(function(response) {
                return response || fetch(e.request);
            })
        );
    }
});