var express = require('express')
  , env = process.env.NODE_ENV || 'development'
  , config = require('./config/settings')(env)
  , User = require('./models/user')
  ;

var server = express();

require('./config/mongodb')(server);
require('./config/models')(server);
require('./config/express')(server);
require('./config/passport')(server);
require('./config/routes')(server);


var port = process.env.PORT || 3000;
console.log("Server listening on port",port);
server.listen(port);
