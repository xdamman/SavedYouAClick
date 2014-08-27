var utils = require('./utils')
  , twitter = require('twitter')
  , async = require('async')
  , request = require('request')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../config/settings')(env)
  ;
  
var twit = new twitter(config.twitter);

module.exports = {

  tweet: function(params, cb) {

    var form, r;
    var endpoint = (params.imgurl) ? "update_with_media" : "update";

    var oauth = {
        consumer_key: config.twitter.consumer_key
      , consumer_secret: config.twitter.consumer_secret
      , token: params.token || config.twitter.access_token_key
      , token_secret: params.secret || config.twitter.access_token_secret
    };

    r = request.post("https://api.twitter.com/1.1/statuses/"+endpoint+".json", {oauth: oauth, json:true}, cb);
    form = r.form();
    form.append('status', params.text);

    if(params.in_reply_to_status_id)
      form.append('in_reply_to_status_id', params.in_reply_to_status_id);

    r.on('error', function(e) {
      console.error("Error while sending the tweet: ", e);
      return cb(e);
    });

    if(params.imgurl)
      form.append('media[]', request(params.imgurl));

    return;

  },

  getTweetFromUserWithUrl: function(handle, url, cb) {

    twit.getUserTimeline({screen_name: handle, include_rts:1, count:3}, function(tweets) {

      console.log("length: ", tweets.length);

      async.forEach(tweets, function(tweet, done) {
        if(tweet.entities && tweet.entities.urls) {
          var shortUrl = tweet.entities.urls[0].expanded_url;
          utils.unshorten(shortUrl, function(err, originalUrl) {
            console.log("Url found: ", originalUrl);
            if(originalUrl==url) { console.log("Tweet found: ", tweet.text); return cb(null, tweet); }
            done();
          });
        }
        else {
          done();
        }
      }, cb);

    });

  }

};
