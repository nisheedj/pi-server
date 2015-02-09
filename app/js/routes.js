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
      .when('/voice-wit-control-server',{
        controller:'VoiceWitServerController',
        templateUrl:'partials/voice-wit-control-server.html'
      })
      .when('/voice-wit-control-client',{
        controller:'VoiceWitClientController',
        templateUrl:'partials/voice-wit-control-client.html'
      })
      .otherwise('/');
    }
  ]);
});