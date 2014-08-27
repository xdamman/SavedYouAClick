var passport = require('passport')
  , twitterlib = require('../lib/twitter')
  ;

module.exports = function(server) {

  // Redirect the user to Twitter for authentication.  When complete, Twitter
  // will redirect the user back to the application at
  //   /auth/twitter/callback
  server.get('/auth/twitter', passport.authenticate('twitter'));

  // Twitter will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  server.get('/auth/twitter/callback', function(req, res, next) { 
    passport.authenticate('twitter', 
    function(err, user, info){
        // This is the default destination upon successful login.
        var redirectUrl = '/account';

        if (err) { return next(err); }
        if (!user) { return res.redirect('/'); }

        // If we have previously stored a redirectUrl, use that, 
        // otherwise, use the default.
        if (req.session.redirectUrl) {
          redirectUrl = req.session.redirectUrl;
          req.session.redirectUrl = null;
        }
        req.logIn(user, function(err){
          if (err) { return next(err); }
        });
        res.redirect(redirectUrl);
      })(req, res, next);
  });
    

  server.post('/tweet', function(req, res) {
    if(!req.user) {
      console.log("No user");
      return res.send(new Error("Invalid user"));
    }

    var params = {
        text: req.param('text')
      , in_reply_to_status_id: req.param('in_reply_to_status_id')
      , imgurl: req.param('imgurl')
      , token: req.user.token
      , secret: req.user.secret
    };

    console.log("Posting ", params);

    twitterlib.tweet(params, function(e, response, body) {
      console.log("Response from twitter: ", body);
      res.render('tweetsent');
    });

  });

  server.get('/', function(req, res) {
   
    if(!req.user) {
      req.session.redirectUrl = req.url;
      res.render('signin');
    }
    else {

      var params = {
          url: req.param('url')
        , from: req.param('from')
        , text: req.param('text', '')
        , imgurl: req.param('imgurl')
      };
      console.log("Getting tweet for ", params.url);
      twitterlib.getTweetFromUserWithUrl(params.from, params.url, function(e, tweet) {
        if(tweet) {
          params.text += " RT @"+params.from+" "+tweet.text;
          params.in_reply_to_status_id = tweet.id;
        }

        params.text += " #SavedYouAClick";

        console.log("params: ", params);
        res.render('tweet', params);

      });
    }
  });

};
