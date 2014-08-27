var request = require('request')
  , http = require('follow-redirects').http
  , urlLibrary = require('url');


var cache = {};

module.exports = { 

  unshorten: function(shortUrl, cb) {
    if(cache[shortUrl]) return cb(null, cache[shortUrl]);

    request.head(shortUrl, function(err, res, body) {
      var url = res.request.uri.href;
      cache[shortUrl] = url;
      cb(err, url);
    });
  }

}
