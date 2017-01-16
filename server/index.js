var express= require('express');
var compression = require('compression');
var path = require('path');
var cors = require('cors');

var app = express();

var static_path = path.join(__dirname,'static');

app.use(compression());
app.use(cors());
app.options('*',cors());
app.disable('etag');

app.use('/', express.static(static_path, {
    maxage: 604800
}));

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

var server = app.listen(process.env.PORT || 5000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Fablr assets from %s', static_path);
  console.log('Fablr app listening at http://%s:%s', host, port);

});