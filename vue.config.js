require = require('esm')(module);
const allRoutes = require('./src/routerRepo/router')
const routes = allRoutes.default.options.routes
module.exports = {
  publicPath: '/',
  pluginOptions: {
    sitemap: {
      // baseURL:'http://localhost:8080',
      hashMode: false,
      baseURL: 'https://amsstudio.me',
      routes,
    }
  },
  pwa: {
    name: 'AMS-STUDIO',
    themeColor: '#ff8429',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    icons: [
      {
        src: "/src/assets/pwa_icons/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "App Icon",
      },
      {
        src: "/src/assets/pwa_icons/384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "App Icon",
      },
      {
        src: "/src/assets/pwa_icons/256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "App Icon",
      },
      {
        src: "/src/assets/pwa_icons/192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "App Icon",
      },
      {
        src: "/src/assets/pwa_icons/144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "App Icon",
      },
      {
        src: "/src/assets/pwa_icons/96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "App Icon",
      },
      {
        src: "/src/assets/pwa_icons/48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "App Icon",
      },
    ],
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'public/service-worker.js',
      // ...other Workbox options...
    }
  }
}

