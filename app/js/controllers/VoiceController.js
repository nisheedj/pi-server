define(['./module'], function(controllerModule) {
  controllerModule.controller('VoiceController', ['$scope', 'VoiceService',
    function($scope, VoiceService) {
      console.log(VoiceService.getLanguages(),VoiceService.getDialect(6,2));
      $scope.title = 'Pi Quad Voice Controls';
    }
  ]);
});