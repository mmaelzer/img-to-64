var assert = require('assert');
var fs = require('fs');
var path = require('path');

var i64 = require('../img-to-64');
var testImage = path.join(__dirname, 'sprite.png');
var testImageAsB64 = new Buffer(fs.readFileSync(testImage)).toString('base64');
var testDateUri = "data:image/png;base64";

describe('img-to-64', function() {
  describe('#getImageStrings()', function() {
    it("should take a path to an image file and return a base64 string of the image", function(done) {
      var options = { file: testImage };
      i64.getImageStrings(options, function(err, b64) {
        assert.equal(testImageAsB64, b64);
        done();
      });
    });
    it("should return a css-ready string when requested", function(done) {
      var options = { 
        file: testImage,
        css: true
      };
      i64.getImageStrings(options, function(err, b64) {
        assert.equal(testDateUri, b64.split(',').shift());
        assert.equal(testImageAsB64, b64.split(',').pop());
        done();
      });
    });
    it("should take an array of paths to images and return an array of strings", function(done) {
      var options = { 
        files: [testImage, testImage, testImage]
      };
      i64.getImageStrings(options, function(err, b64s) {
        assert.ok(Array.isArray(b64s));
        b64s.forEach(function(b64) {
          assert.equal(testImageAsB64, b64);
        });
        done();
      });
    });
  });
});