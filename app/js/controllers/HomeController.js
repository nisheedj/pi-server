/*global define*/
define(['./module'], function(controllerModule) {
  controllerModule.controller('HomeController', ['$scope',
    function($scope) {
      $scope.app = {};
      $scope.app.appName = 'Angular Pi Quad';
    }
  ]);
});