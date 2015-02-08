define(['./module'], function(controllerModule) {
  controllerModule.controller('VoiceController', ['$scope', 'VoiceService',
    function($scope, VoiceService) {

      $scope.title = 'Pi Quad Voice Controls';
      $scope.isSpeechSupported = VoiceService.speechSupport();

      if ($scope.isSpeechSupported === true) {
        $scope.selectedLanguage = VoiceService.defaultLanguage;
        $scope.selectedDialect = VoiceService.defaultDialect;

        $scope.languages = VoiceService.getLanguages();
        $scope.dialects = VoiceService.getDialects(VoiceService.defaultLanguage);

        $scope.recognition = VoiceService.recognition;
        $scope.recognizing = false;

        $scope.toggleRecognizing = function(toggle) {
          $scope.recognizing = toggle;
          $scope.$apply();
        };

        $scope.resetRecognizing = function() {
          $scope.recognition.stop();
          $scope.recognizing = false;
          $scope.$apply();
        };

        $scope.recognition.onstart = function(event) {
          console.log('Speech Recognition Started');
        };

        $scope.recognition.onend = function(event) {
          console.log('Speech Recognition Ended');
          $scope.toggleRecognizing(false);
        };

        $scope.recognition.onerror = function(event) {
          if (event.error === 'aborted') {
            console.log('Speech Recognition Aborted');
          }
        };

        $scope.recognition.onresult = function(event) {
          console.log(event.type, event.results[0]);
          if (event.results[0].isFinal === true) {
            $scope.recognition.abort();
            $scope.recognizing = false;
            $scope.$apply();
          }
          angular.element('#pi-quad-voice-input').text(event.results[0][0].transcript);
        };

        $scope.toggleRecognition = function() {
          if ($scope.recognizing === true) {
            $scope.recognition.stop();
            $scope.recognizing = false;
          } else {
            $scope.recognition.lang = $scope.selectedDialect;
            $scope.recognition.start();
            $scope.recognizing = true;
          }
          return;
        };

        var deregisterLanguageWatch = $scope.$watch('selectedLanguage', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            $scope.dialects = VoiceService.getDialects(newValue);
            if ($scope.dialects.length === 1) {
              $scope.selectedDialect = $scope.dialects[0].value;
            } else {
              $scope.selectedDialect = null;
            }
            $scope.recognition.abort();
            angular.element('#pi-quad-voice-input').text('');
            $scope.$emit('PiQuadApp:LanguageChanged', newValue);
          }
        }, true);

        var deregisterDialectWatch = $scope.$watch('selectedDialect', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            $scope.recognition.abort();
            angular.element('#pi-quad-voice-input').text('');
            $scope.$emit('PiQuadApp:DialectChanged', newValue);
          }
        });

        $scope.$on('$destroy', function() {
          deregisterLanguageWatch();
          deregisterDialectWatch();
        });
      }
    }
  ]);
});