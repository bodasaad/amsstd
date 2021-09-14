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
    workboxPluginMode: 'GenerateSW',
    themeColor: '#ff9445',
    workboxOptions: {
      swDest: 'service-worker.js',
      cacheId: 'pwa-sample',
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://connpass\.com/api/v1/event/'),
          handler: 'networkFirst',
          options: {
            cacheName: 'api',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24
            },
            fetchOptions: {
              mode: 'cors',
            },
            matchOptions: {
              ignoreSearch: true,
            },
          }
        }
      ],
      exclude: [/\.map$/, /_redirects/], //this fixed it.

    }
  }
}

