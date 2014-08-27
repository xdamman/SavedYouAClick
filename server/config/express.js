var express = require('express')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , passport = require('passport')
  , session = require('express-session')
  , exphbs  = require('express-handlebars')
  , logger = require('express-logger')
  ;

module.exports = function(server) {

    server.use(logger({path:'logs/access.log'}));
    server.use('/public', express.static('public'));
    server.use('/public/bootstrap', express.static('node_modules/bootstrap/dist'));
    server.use(cookieParser());

    // parse application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({ extended: false }))

    server.use(bodyParser.json());
    server.use(session({ secret: '12312312807872' }));
    server.use(passport.initialize());
    server.use(passport.session());
    server.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
    server.set('view engine', '.hbs');

    passport.serializeUser(function(user, done) {
      console.log("Serializing user ", user);
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      console.log("deserializing user", id);
      server.models.User.findById(id, function(err, user) {
        done(err, user);
      });
    });
};
