var mongoskin = require('mongoskin')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../config.'+env+'.json')
  ;

module.exports = function(server) {

  var db = mongoskin.db(config.mongodb, { native_parser:true});
  db.bind('users');

  server.db = db;
}
