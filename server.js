var express = require('express');
var path = require('path');
var app = express();

/*Set static resources*/
app.use('/css', express.static(path.join(__dirname, 'app', 'css')));
app.use('/js', express.static(path.join(__dirname, 'app', 'js')));
app.use('/img', express.static(path.join(__dirname, 'app', 'img')));
app.use('/fonts', express.static(path.join(__dirname, 'app', 'fonts')));

/*Base index file*/
app.get('/', function(req, res) {
  res.sendFile('index.html', {
    root: __dirname + '/app/'
  });
});

var server = app.listen(9000, function() {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});