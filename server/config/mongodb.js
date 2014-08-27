var mongoskin = require('mongoskin')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../config/settings')(env)
  ;

module.exports = function(server) {

  var db = mongoskin.db(config.mongodb, { native_parser:true});
  db.bind('users');

  server.db = db;
}
