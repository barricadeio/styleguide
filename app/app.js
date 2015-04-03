'use strict';

var app = angular.module('app', [
  'ngCookies', 'ngResource', 'ngSanitize', 'ngAnimate', 'ui.router', 'restangular', 'zeroclipboard', 'mm.foundation', 'puElasticInput'
]);

// configure routing
app.config(function ($httpProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $httpProvider.interceptors.push('authInterceptor');
});

// configures clipboard
app.config(function (uiZeroclipConfigProvider) {
  uiZeroclipConfigProvider.setZcConf({
    swfPath: '../assets/external/ZeroClipboard.swf'
  });
});
