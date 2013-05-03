img-to-64
=========

A library/stand-alone script to convert images into base64 strings.
  

Install
-------

  npm install img-to-64

  
Usage
-----
```javascript
var i64 = require('img-to-64');

i64.getImageStrings({
  files: ['mike@128px.png', 'mike@256px.png'],
  css: true
}, function(err, b64strings) {
  if (err) {
    throw new Error('oh noeses, somethin is broken!');
  }
  b64strings.forEach(function(b64) {
    console.log(b64);
  });
});

```
  
Methods
-------
###getImageStrings(options, callback)###

The `options` object takes a `files` key with an **Array** value of file paths as its value. You can also just use the `file` key and pass a **String** path if you only have a single image to convert. The `options` object also takes an optional `css` key with a **Boolean** of whether to output CSS-ready strings of the format "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...".

The `callback` function is in the form of `function(error, ArrayOfStrings)`
  

Stand-alone
-----------
If you run from the command line, the script takes two [optional] arguments: a folder and an output file. If an ouput file is not provided, it defaults to `base64_images.txt`. If a source dir is not provided, it defaults to `.`.
  
For instance:

    ./img-to-64 /some/path/to/images base64images.txt

Will output to `base64images.txt` data like so:

    some_image_1.png : Rw0KGgoAAAANSU....

    some_image_2.png : EUgAAAAUA...
