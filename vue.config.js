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
  }
}

