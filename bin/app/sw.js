/* eslint-disable */

console.log(`${new Date()}: Service Worker is loaded`);

// Set cache name for multiple projects.
// @see https://developers.google.com/web/tools/workbox/modules/workbox-core
workbox.core.setCacheNameDetails({
  prefix: "starter-react-flux",
  suffix: "v1",
  precache: "install-time",
  runtime: "run-time",
  googleAnalytics: "ga"
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// Enable google analytics for offline
// @see https://developers.google.com/web/tools/workbox/modules/workbox-google-analytics
// workbox.googleAnalytics.initialize();

workbox.precaching.precacheAndRoute(self.__precacheManifest);

// Cache Google Fonts
workbox.routing.registerRoute(
  "https://fonts.googleapis.com/(.*)",
  new workbox.strategies.CacheFirst({
    cacheName: "google-fonts",
    cacheableResponse: { statuses: [0, 200] }
  })
);

// Static content from Google
workbox.routing.registerRoute(
  /.*(?:gstatic)\.com.*$/,
  new workbox.strategies.CacheFirst({
    cacheName: "google-static"
  })
);

// Cache any images which are included the extention list
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "image-content",
    cacheableResponse: { statuses: [0, 200] }
  })
);

// Cache any JavaScript and CSS which are included the extention list
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "static-resources",
    cacheableResponse: { statuses: [0, 200] }
  })
);

// Cache any HTTP Content
workbox.routing.registerRoute(
  /^http.*/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "http-content",
    cacheableResponse: { statuses: [0, 200] }
  }),
  "GET"
);
