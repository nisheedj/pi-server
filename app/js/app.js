/*global define*/
define([
  'angular',
  'jquery',
  'socketio',
  'binaryjs',
  'angularroute',
  'angularsanitize',
  'angularanimate',
  'underscore',
  './modules'
], function(angular) {
  var piQuadApp = angular.module('piQuadApp', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    //'piQuadApp.filter',
    //'piQuadApp.provider',
    'piQuadApp.service',
    //'piQuadApp.directive',
    'piQuadApp.controller'
  ]);
  return piQuadApp;
});