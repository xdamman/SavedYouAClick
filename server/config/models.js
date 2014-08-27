module.exports = function(server) {
  server.models = {};
  server.models.User = require('../models/user')(server);
}
