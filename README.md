img-to-64
=========

A library/stand-alone script to convert images into base64 strings.
  

Todo
----

* Provide a node.js stream interface to pipe in data and pipe out strings
* Tests


Install
-------

  npm install img-to-64

  
Usage
-----
```javascript
var i64 = require('img-to-64');

i64.getImageStrings({
  files: 'mike@128px.png',
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

The `options` object takes a `files` key with either a **string** or **Array** of file paths as its value. The `options` object also takes an optional `css` key with a **Boolean** of whether to output CSS-ready strings of the format "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...".

The `callback` function is in the form of `function(error, ArrayOfStrings)`
  

Stand-alone
-----------
If you run from the command line, the script takes two [optional] arguments: a folder and an output file. If an ouput file is not provided, it defaults to `base64_images.txt`. If a source dir is not provided, it defaults to `./`.
  
For instance:

  ./img-to-64.js /some/path/to/images base64images.txt

Will output to `base64images.txt` data like so:

  some_image_1.png : Rw0KGgoAAAANSU....

  some_image_2.png : EUgAAAAUA...
