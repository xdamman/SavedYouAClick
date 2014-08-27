var env = process.env.NODE_ENV || 'development'
  , config = require('../config.'+env+'.json')
  , passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  ;

module.exports = function(server) {

  var User = server.models.User;

  passport.use(new TwitterStrategy({
      consumerKey: config.twitter.consumer_key,
      consumerSecret: config.twitter.consumer_secret,
      callbackURL: config.base_url+"/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
      User.findOrCreate(token, tokenSecret, profile, function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
    }
  ));

};
