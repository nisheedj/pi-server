var express = require('express');
var socket = require('socket.io');
var http = require('http');
var path = require('path');

var app = express();
var server = http.Server(app);
var io = socket(server);

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


io.on('connection', function(cuurentSocket) {
  console.log('A Client is connected');
  cuurentSocket.on('disconnect', function() {
    console.log('Client is disconnected');
  });
});

server.listen(9000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
});