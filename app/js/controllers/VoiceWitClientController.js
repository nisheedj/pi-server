define(['./module', 'underscore', 'wit'], function(controllerModule, _, Wit) {
  controllerModule.controller('VoiceWitClientController', ['$scope',
    function($scope) {
      console.log(Wit);
      $scope.mic = new Wit.Microphone(angular.element('#microphone')[0]);

      $scope.recording = false;

      angular.element('#error').hide();

      var info = function(msg) {
        angular.element('#info').html('<strong>Status:</strong> ' + msg);
      };

      var error = function(msg) {
        if (msg === '') {
          angular.element('#error').hide();
        } else {
          angular.element('#error').show();
        }
        angular.element('#error').html('<strong>Error:</strong> ' + msg);
      };

      $scope.mic.onready = function() {
        info('Microphone is ready to record');
      };

      $scope.mic.onaudiostart = function() {
        info('Recording started');
        error('');
      };

      $scope.mic.onaudioend = function() {
        info('Recording stopped, processing started');
      };

      $scope.mic.onresult = function(intent, entities) {
        console.log(intent, entities);
      };
      $scope.mic.onerror = function(err) {
        error(err);
      };

      $scope.mic.onconnecting = function() {
        info('Microphone is connecting');
      };

      $scope.mic.ondisconnected = function() {
        info('Microphone is not connected');
      };

      $scope.mic.connect('Y46WUITFXVJEIJKQRQ2DX65JVO5GW4QL');

      $scope.toggleMic = function(e) {
        if ($scope.recording === false) {
          $scope.mic.start();
        } else {
          $scope.mic.stop();
        }
        $scope.recording = !$scope.recording;
      };

    }
  ]);
});