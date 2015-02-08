define(['./module', 'binaryjs'], function(controllerModule, BinaryClient) {
  controllerModule.controller('VoiceWitController', ['$scope', '$rootScope', 'VoiceService',
    function($scope, $rootScope, VoiceService) {

      $scope.recording = false;
      var stream = null;
      var client = null;

      $scope.socket.on('witai_req', function(data) {
        angular.element('.pi-icon-microphone').addClass('pi-microphone-loading');
      });

      $scope.socket.on('witai_res', function(data) {
        console.log(data);
        angular.element('.pi-icon-microphone').removeClass('pi-microphone-loading');
      });


      $scope.micToggle = function(e) {
        if ($scope.recording === false) {
          client = new BinaryClient('ws://localhost:9001');
          client.on('open', function() {
            stream = client.createStream();
            VoiceService.webRecorder(stream);
          });
        } else {
          angular.element(e.target).removeClass('pi-icon-microphone-record');
          VoiceService.disconnectRecorder();
          stream.end();
        }
        $scope.recording = !$scope.recording;
        $rootScope.$emit('PiQuadApp:ToggleRecording', $scope.recording);
        return;
      };

      $rootScope.$on('PiQuadApp:NLP_START', function(e) {
        angular.element('.pi-icon-microphone').addClass('pi-icon-microphone-record');
      });

      $rootScope.$on('PiQuadApp:NLP_STOP', function(e) {
        angular.element('.pi-icon-microphone').removeClass('pi-icon-microphone-record');
      });
    }
  ]);
});