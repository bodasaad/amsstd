
if (workbox) {
  console.log(`Workbox is loaded`);

  workbox.precaching.precacheAndRoute(self.__precacheManifest);

}
else {
  console.log(`Workbox didn't load`);
}

// const filesToCache = [
//   '/',
//   'src/assets/css/classes.css',
//   './index.html',

// ];

// const staticCacheName = 'pages-cache-v1';

// self.addEventListener('install', event => {
//   console.log('Attempting to install service worker and cache static assets');
//   event.waitUntil(
//     caches.open(staticCacheName)
//       .then(cache => {
//         return cache.addAll(filesToCache);
//       })
//   );
// });