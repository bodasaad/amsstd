const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();

app.use(logger('dev'));

app.get('/api', (req, res) => res.send('Hello World!'));
app.use(history({
  verbose: true
}));
app.use('/', express.static(path.join(__dirname, 'dist')));

var port = process.env.PORT || 8080;
app.listen(port);
console.log('server started '+ port);