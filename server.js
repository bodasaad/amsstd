// const express = require('express');
// const path = require('path');
// const history = require('connect-history-api-fallback');

// const app = express();

// app.use(logger('dev'));

// app.use('/', express.static(path.join(__dirname, 'dist')));
server.use('/dist', express.static(path.join(__dirname, './dist')));

// var port = process.env.PORT || 8080;
// app.listen(port);
// console.log('server started '+ port);

//server.js
const express = require('express');
const server = express();
const fs = require('fs');
const path = require('path');
//obtain bundle
const bundle =  require('./dist/server.bundle.js');
//get renderer from vue server renderer
const renderer = require('vue-server-renderer').createRenderer({
  //set template
  template: fs.readFileSync('./index.html', 'utf-8')
});


//start server
server.get('*', (req, res) => { 
    
  bundle.default({ url: req.url }).then((app) => {    
    //context to use as data source
    //in the template for interpolation
    const context = {
      title: 'Vue JS - Server Render',
      meta: `
        <meta description="vuejs server side render">
      `
    };

    renderer.renderToString(app, context, function (err, html) {   
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Internal Server Error')
        }
      } else {
        res.end(html)
      }
    });        
  }, (err) => {
    console.log(err);
  });  
});  

server.listen(8080);