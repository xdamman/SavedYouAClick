module.exports = function(env) {

  var settings;

  if(env == 'production') {

    settings = {
        base_url: process.env.BASE_URL
      , mongodb: process.env.MONGODB
      , twitter: {
          consumer_key: process.env.TWITTER_CONSUMER_KEY
        , consumer_secret: process.env.TWITTER_CONSUMER_SECRET
      }
    };

  }
  else {
    settings = require('../config.'+env+'.json');
  }

  return settings;

};
