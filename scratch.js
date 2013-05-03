var i64 = require('./img-to-64');

i64.getImageStrings({
  files: 'mike@128px.png',
  css: true
}, function(err, strings) {
  console.log(strings);
});