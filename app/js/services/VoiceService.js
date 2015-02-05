define(['./module', 'underscore'], function(serviceModule, _) {
  serviceModule.factory('VoiceService', ['VoiceLanguages',
    function(VoiceLanguages) {
      var _getLanguages = function() {
        return _.map(VoiceLanguages, function(language) {
          return language[0];
        });
      };
      var _getDialects = function(languageIndex) {
        var selectedLanguage = _.find(VoiceLanguages, function(language, index) {
          return index === languageIndex;
        });
        return _.reject(selectedLanguage, function(item, index) {
          return index === 0;
        });
      };

      var _selectedDialect = function(languageIndex, languageDialectIndex) {
        var dialects = _getDialects(languageIndex);
        return dialects[languageDialectIndex];
      };

      return {
        getLanguages: _getLanguages,
        getDialects: _getDialects,
        getDialect: _selectedDialect,
        defaultLanguage: 6,
        defaultDialect: 2
      };
    }
  ]);
});