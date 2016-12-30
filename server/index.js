var express= require('express');
var compression = require('compression');
var path = require('path');
var cors = require('cors');

var app = express();

console.log(path.join(__dirname,'static'));

var static_path = path.join(__dirname,'static');

app.enable('trust proxy');

app.use(compression());

app.use('/', express.static(static_path, {
    maxage: 604800
}));

var server = app.listen(process.env.PORT || 5000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Fablr assets from %s', static_path);
  console.log('Fablr app listening at http://%s:%s', host, port);

});