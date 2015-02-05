define(['./module', 'socketio'], function(controllerModule, io) {
  controllerModule.controller('PiQuadController', ['$scope',
    function($scope) {
      console.log('PiQuadController Active...');
      $scope.socket = io();
    }
  ]);
});