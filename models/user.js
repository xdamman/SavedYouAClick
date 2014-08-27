module.exports = function(server) {

  var db = server.db;

  return { 
    findById: function(id, cb) {
      db.users.findOne({id:id}, cb);
    },

    findOrCreate: function(token, secret, profile, cb) {
      var user = { id: profile.id, username: profile.username, token: token, secret: secret, profile: profile };
      db.users.update({id:profile.id}, user, { upsert:true }, function(err, rows, rawResult) {
        cb(err, user);
      });
    }
  }
}
