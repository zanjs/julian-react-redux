var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');

var app = new express();
var port = process.env.PORT || 8300;

app.use(express.static(path.join(__dirname, 'build')));
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));

app.get("/*", function(req, res) {
  return res.sendFile(__dirname + '/build/index.html')
})

app.listen(port, function(err) {
  if (err) {
    console.error(err)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
