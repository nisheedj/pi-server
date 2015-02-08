var express = require('express');
var socket = require('socket.io');
var http = require('http');
var path = require('path');
var wav = require('wav');
var wit = require('node-wit');
var fs = require('fs');
var colors = require('colors/safe')

var WIT_ACCESS_TOKEN = 'U6FYZLGRE7PXKMB2IEE3QEXRIGKCE4GC';

var BinaryServer = require('binaryjs').BinaryServer;

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

  console.log(colors.green('A Client is connected!'));

  var bServer = BinaryServer({
    port: 9001
  });

  currentSocket.on('disconnect', function() {
    console.log(colors.red('Client is disconnected.'));
    bServer.close();
  });

  bServer.on('connection', function(client) {

    console.log(colors.green('Binary client connected!'));

    var fileWriter = new wav.FileWriter('voice.wav', {
      channels: 1,
      sampleRate: 48000,
      bitDepth: 16
    });

    fileWriter.on('end', function() {

      console.log(colors.yellow('Voice data write complete!'));
      console.log(colors.yellow('Transmitting voice data to wit.ai ...'));
      currentSocket.emit('witai_req', {
        msg: 'Voice is being processed'
      });

      var stream = fs.createReadStream('voice.wav');
      wit.captureSpeechIntent(WIT_ACCESS_TOKEN, stream, "audio/wav", function(err, res) {
        console.log(colors.yellow('Data recieved from wit.ai!'));
        if (err) {
          console.log(colors.red("Error: ", err));
        }
        console.log(JSON.stringify(res, null, " "));
        currentSocket.emit('witai_res', {
          msg: 'Voice processed',
          data: res
        });
      });
    });

    client.on('stream', function(stream, meta) {

      console.log(colors.yellow('Voice data stream start!'));
      stream.pipe(fileWriter);

      stream.on('end', function() {
        console.log(colors.yellow('Voice data stream end!'));
        fileWriter.end();
      });

    });

    client.on('close', function() {
      console.log(colors.red('Binary client closed!'));
    });

  });

});

server.listen(9000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log(colors.green('Example app listening at http://%s:%s'), host, port);
});