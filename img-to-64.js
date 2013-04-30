#!usr/bin/env node

var dir = process.argv[2] || './';
var output = process.argv[3] || 'base64_images.txt';

var fs = require('fs');
var path = require('path');
var util = require('util');

var imgExtensions = ['bmp', 'gif', 'jpe', 'jpg', 'jpeg', 'png', 'tif', 'tiff'];

if (require.main === module) {
  main();  
}

function main() {
  walkDirForImages(dir, function(err, files) {
    if (err) {
      util.error('Failed to read image files from ' + dir);
    }
    writeImagesToFile(dir, files);
  });
}


module.exports.getImageStrings = function(options, callback) {
  options = options || {};
  var files = options.files;
  var css = options.css || false;

  if (!files) {
    return callback(null, '');
  }

  if (!Array.isArray(files)) {
    files = [ files ];
  }

  var strings = [];
  var counter = 0;

  files.forEach(function(file) {
    getImageString(file, function(err, imageString) {
      if (err) {
        return callback(err, strings);
      }

      if (css) {
        imageString = getCSSFormat(imageString, getFileExt(file));
      }

      strings.push(imageString);
      if (++counter === files.length) {
        callback(null, strings);
      }
    });
  });
}


function getCSSFormat(imageString, ext) {
  return util.format('data:image/%s;base64,%s', ext, imageString);
}


function getFileExt(file) {
  return file.split('.').pop();
}


function getImageString(file, callback) {
  fs.readFile(file, function(err, bits) {
    if (err) {
      return callback(err);
    }
    callback(null, (new Buffer(bits).toString('base64')));
  });
}


function walkDirForImages(dir, callback) {
  fs.readdir(dir, function(err, files) {
    if (err) {
      return callback(err);
    }

    imgFiles = [];
    files.forEach(function(file) {
      if (imgExtensions.indexOf(getFileExt(file)) !== -1) {
        imgFiles.push(file);
      }
    });
    callback(null, imgFiles);
  });
}


function writeImagesToFile(dir, images) {
  images.forEach(function(file) {
    var image = path.join(dir, file);
    getImageString(image, function(err, imageString) {
      imageString = util.format('%s : %s\n\n', file, imageString);
      fs.appendFileSync(output, imageString);
    });
  });
}
