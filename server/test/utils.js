var expect = require('chai').expect
  , utils = require('../lib/utils');

describe("utils", function() {

  it("get the final redirect url", function(done) {

    this.timeout(8000);
    var shorturl = "http://t.co/LrhBsjRkAC";
    var url = "http://www.wired.com/2014/08/absurd-creature-of-the-week-the-bird-that-builds-nests-so-huge-they-pull-down-trees/?mbid=social_twitter";
    utils.unshorten(shorturl, function(e, url) {
      expect(e).to.not.exist;
      expect(url).to.equal(url);
      done();
    });


  });

});

