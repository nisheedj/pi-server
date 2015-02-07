define(['./module', 'underscore'], function(serviceModule, _) {
  serviceModule.factory('VoiceService', ['VoiceLanguages',
    function(VoiceLanguages) {

      var _constriants = {
        audio: true,
        video: false
      };

      var _webRecorder = function(recorder, socketStream) {

        var _float32ToInt16 = function(buffer) {
          var l = buffer.length;
          var buf = new Int16Array(l);
          while (l--) {
            buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
          }
          return buf.buffer;
        };

        var _initializeWebRecorder = function(stream) {
          var audioContext = new window.AudioContext();
          var audioInput = audioContext.createMediaStreamSource(stream);
          var audioBuffer = 4096;
          // create a javascript node
          var recorder = audioContext.createScriptProcessor(audioBuffer, 1, 1);
          // specify the processing function
          recorder.onaudioprocess = _webRecorderProcess;
          // connect stream to our recorder
          audioInput.connect(recorder);
          // connect our recorder to the previous destination
          recorder.connect(audioContext.destination);
        };

        var _webRecorderProcess = function(e) {
          var left = e.inputBuffer.getChannelData(0);
          socketStream.write(_float32ToInt16(left));
        };

        var _errorWebRecorder = function(error) {
          console.log(error);
        };

        if (_isGetUserMediaSupported()) {
          navigator.getUserMedia(_constriants, _initializeWebRecorder, _errorWebRecorder);
        }
        return false;
      };

      var _recoginitionInstance = function() {
        var recognition = false;
        if (_isSpeechSupported() === true) {
          recognition = new webkitSpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = true;
        }
        return recognition;
      };

      var _getLanguages = function() {
        var languagesFinal = [];
        var languages = _.map(VoiceLanguages, function(language) {
          return language[0];
        });
        _.each(languages, function(lang, i) {
          languagesFinal.push({
            value: i,
            label: lang
          });
        });
        return languagesFinal;
      };

      var _getDialects = function(languageIndex) {
        var dialectsFinal = [];
        var selectedLanguage = _.find(VoiceLanguages, function(language, index) {
          return index === languageIndex;
        });
        var dialectsArray = _.reject(selectedLanguage, function(item, index) {
          return index === 0;
        });
        _.each(dialectsArray, function(dialect, i) {
          dialectsFinal.push({
            value: dialect[0],
            label: dialect[1]
          });
        });
        return dialectsFinal;
      };

      var _isSpeechSupported = function() {
        return ('webkitSpeechRecognition' in window && 'webkitAudioContext' in window);
      };

      var _isGetUserMediaSupported = function() {
        navigator.getUserMedia = (navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia);
        return navigator.getUserMedia;
      };

      return {
        getLanguages: _getLanguages,
        getDialects: _getDialects,
        speechSupport: _isSpeechSupported,
        defaultLanguage: 6,
        defaultDialect: 'en-IN',
        recognition: _recoginitionInstance(),
        webRecorder: _webRecorder
      };
    }
  ]);
});