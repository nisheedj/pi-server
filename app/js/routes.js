/*global define*/
define(['./app'], function(app) {
  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
      .when('/',{
        controller:'HomeController',
        templateUrl:'partials/home.html'
      })
      .when('/voice-control',{
        controller:'VoiceController',
        templateUrl:'partials/voice-control.html'
      })
      .otherwise('/');
    }
  ]);
});