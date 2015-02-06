define(['./module', 'underscore'], function(serviceModule, _) {
  serviceModule.factory('VoiceService', ['VoiceLanguages',
    function(VoiceLanguages) {

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

      return {
        getLanguages: _getLanguages,
        getDialects: _getDialects,
        speechSupport: _isSpeechSupported,
        defaultLanguage: 6,
        defaultDialect: 'en-IN',
        recognition: _recoginitionInstance()
      };
    }
  ]);
});