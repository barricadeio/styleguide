'use strict';

/**
 * @ngdoc overview
 * @name styleguideApp
 * @description
 * # styleguideApp
 *
 * Main module of the application.
 */
angular
  .module('styleguideApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/intro.html',
        controller: 'IntroCtrl'
      })
      .when('/styles', {
        templateUrl: 'views/styles.html',
        controller: 'StylesCtrl'
      })
      .when('/assets', {
        templateUrl: 'views/assets.html',
        controller: 'AssetsCtrl'
      })
      .when('/voice', {
        templateUrl: 'views/voice.html',
        controller: 'VoiceCtrl'
      })
      .when('/sink', {
        templateUrl: 'views/sink.html',
        controller: 'SinkCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
