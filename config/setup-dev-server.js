/**
 * Setup webpack-dev-middleware and webpack-hot-middleware.
 * Rebuild SSR bundle on src files change.
 * 
 * @param {Object} app Express application 
 * @param {Function} onServerBundleReady Callback
 */
const setupDevServer = (app, onServerBundleReady) => {
    const webpack = require('webpack');
    const MFS = require('memory-fs');
    const path = require('path');
    const clientConfig = require('./webpack.client.config');
    const serverConfig = require('./webpack.server.config');

    // additional client entry for hot reload
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];

    const clientCompiler = webpack(clientConfig);

    // setup dev middleware
    app.use(require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        serverSideRender: true,
        logLevel: 'silent'
    }));

    // setup hot middleware
    app.use(require('webpack-hot-middleware')(clientCompiler));

    // watch src files and rebuild SSR bundle
    global.console.log('Building SSR bundle...');
    const serverCompiler = webpack(serverConfig);
    const mfs = new MFS();

    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (error, stats) => {
        if (error) throw error;
        
        global.console.log(
            `${stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false,
            })}\n\n`
        );

        if (stats.hasErrors()) {
            console.error(stats.compilation.errors);
            throw new Error(stats.compilation.errors);
        }

        // read bundle generated by vue-ssr-webpack-plugin        
        const bundle = JSON.parse(
            mfs.readFileSync(path.join(clientConfig.output.path, 'vue-ssr-server-bundle.json'), 'utf-8')
        );
        onServerBundleReady(bundle);
    });
};

module.exports = setupDevServer;