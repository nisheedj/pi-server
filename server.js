var express = require('express');
var socket = require('socket.io');
var http = require('http');
var path = require('path');
var wav = require('wav');
var BinaryServer = require('binaryjs').BinaryServer;
var bServer = BinaryServer({
  port: 9001
});

var app = express();
var server = http.Server(app);
var io = socket(server);

/*Set static resources*/
app.use('/css', express.static(path.join(__dirname, 'app', 'css')));
app.use('/js', express.static(path.join(__dirname, 'app', 'js')));
app.use('/img', express.static(path.join(__dirname, 'app', 'img')));
app.use('/fonts', express.static(path.join(__dirname, 'app', 'fonts')));
app.use('/partials', express.static(path.join(__dirname, 'app', 'partials')));

/*Base index file*/
app.get('/', function(req, res) {
  res.sendFile('index.html', {
    root: __dirname + '/app/'
  });
});


io.on('connection', function(currentSocket) {
  console.log('A Client is connected');

  var fileWriter = null;

  currentSocket.on('disconnect', function() {
    console.log('Client is disconnected');
    if (fileWriter != null) {
      fileWriter.end();
    }
  });

});

server.listen(9000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
});

bServer.on('connection', function(client) {
  console.log('Binary JS Connected');

  var fileWriter = new wav.FileWriter('voice.wav', {
    channels: 1,
    sampleRate: 48000,
    bitDepth: 16
  });

  client.on('stream', function(stream, meta) {
    console.log('new stream');
    stream.pipe(fileWriter);

    stream.on('end', function() {
      console.log('stream end');
      fileWriter.end();
    });
  });

});