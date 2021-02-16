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

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'public/service-worker.js',
      // ...other Workbox options...
    }
  }
}

