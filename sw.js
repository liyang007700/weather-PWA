/**
 * @author LiEric
 * @desc runtime cacheing image, css, js resources
 * DOC @ https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network
 *       https://developers.google.com/web/tools/workbox/reference-docs/prerelease/workbox.strategies
 */


importScripts('https://unpkg.com/workbox-sw@2.0.3/build/importScripts/workbox-sw.dev.v2.0.3.js');

var workboxSW = new workboxSW({clientsClaim: true});

/**
 * Intercept Resource：m.qiyipic.com
 * strategy：StaleWhileRevalidate
 * cacheLifeTime: 24 hours
 */

workboxSW.router.registerRoute(
    /^m\.qiyipic/,
    workboxSW.strategies.cacheFirst({
        cacheName: 'm.qiyipic.com',
        cacheExpiration: {
            maxEntries: 50,
            maxAgeSeconds: 24 * 60 * 60,
        }
    })
);

/**
 * Intercept Resource：pic0~9.qiyipic.com
 * strategy：catchFirst
 * cacheLifeTime: 24 hours
 */

workboxSW.router.registerRoute(
    /^pic/,
    workboxSW.strategies.catchFirst({
        cacheName: 'pic0~9.qiyipic.com',
        cacheExpiration: {
            maxEntries: 100,
            maxAgeSeconds: 24 * 60 * 60,
        }
    })
);

/**
 * Intercept Resource：www.qiyipic.com
 * strategy：StaleWhileRevalidate
 * cacheLifeTime: 24 hours
 */

workboxSW.router.registerRoute(
    /^www\.qiyipic/,
    workboxSW.strategies.staleWhileRevalidate({
        cacheName: 'www.qiyipic.com',
        cacheExpiration: {
            maxEntries: 20,
            maxAgeSeconds: 24 * 60 * 60,
        }
    })
);

/**
 * Intercept Resource：static.iqiyi.com
 * strategy：catchFirst
 * cacheLifeTime: 24 hours
 */

workboxSW.router.registerRoute(
    /^static\.iqiyi/,
    workboxSW.strategies.catchFirst({
        cacheName: 'static.iqiyi.com',
        cacheExpiration: {
            maxEntries: 20,
            maxAgeSeconds: 24 * 60 * 60,
        }
    })
);

/**
 * Intercept Resource：static.g.iqiyi.com
 * strategy：catchFirst
 * cacheLifeTime: 24 hours
 */

workboxSW.router.registerRoute(
    /^static\.g\.iqiyi/,
    workboxSW.strategies.catchFirst({
        cacheName: 'static.g.iqiyi.com',
        cacheExpiration: {
            maxEntries: 10,
            maxAgeSeconds: 24 * 60 * 60,
        }
    })
);

/**
 * Intercept Resource：cooksdk.js
 * strategy：StaleWhileRevalidate
 * cacheLifeTime: 7 days
 */
workboxSW.router.registerRoute(
    /^security/,
    workboxSW.strategies.staleWhileRevalidate({
        cacheName: 'secure',
        cacheExpiration: {
            maxEntries: 1,
            maxAgeSeconds: 7 * 24 * 60 * 60,
        }
    })
);
/**
 * Intercept Resource：beacon.js
 * strategy：StaleWhileRevalidate
 * cacheLifeTime: 7 days
 */
workboxSW.router.registerRoute(
    /^b\.scorecardresearch/,
    workboxSW.strategies.staleWhileRevalidate({
        cacheName: 'beacon',
        cacheExpiration: {
            maxEntries: 1,
            maxAgeSeconds: 7 * 24 * 60 * 60,
        }
    })
);

/**
 * Intercept Resource：clipboard.min.js
 * strategy：StaleWhileRevalidate
 * cacheLifeTime: 7 days
 */
workboxSW.router.registerRoute(
    'https://cdn.jsdelivr.net/npm/clipboard@1/dist/clipboard.min.js',
    workboxSW.strategies.staleWhileRevalidate({
        cacheName: 'beacon',
        cacheExpiration: {
            maxEntries: 1,
            maxAgeSeconds: 7 * 24 * 60 * 60,
        }
    })
);