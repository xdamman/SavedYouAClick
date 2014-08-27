var expect = require('chai').expect
  , twitterlib = require('../lib/twitter');

describe("twitter", function() {

  it.only("sends a tweet", function(done) {
    twitterlib.tweet({
        text: "Test tweet 2"
      // , imgurl: "http://www.wired.com/wp-content/uploads/images_blogs/business/2014/03/uber-insurance-inline-660x440.jpg"
      , token: "35481152-SgUeXJUAsHs9G6kHeaeNzAWPAhVV7vyvz6H2xjzdJ"
      , secret: "ib2b5G7G8TedauYsR2piZlDr1xAWVC2A7ZITIganqEgNX"
    }, function(e, res, body) {
      expect(e).to.not.exist;
      done();
    });
  });

  it("finds the original tweet that tweeted the link", function(done) {

    this.timeout(15000);

    var handle = "wired";
    var url = "http://www.wired.com/2014/08/apple-awkward-future/?mbid=social_twitter";
    var tweetid_str = '502962193055625218';
    twitterlib.getTweetFromUserWithUrl(handle,url, function(e, tweet) {
      expect(e).to.not.exist;
      expect(tweet.id_str).to.equal(tweetid_str);
      console.log("tweet: ", tweet);
      done();
    });


  });

});
