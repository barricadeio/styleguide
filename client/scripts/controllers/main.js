'use strict';

/**
 * @ngdoc function
 * @name styleguideApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the styleguideApp
 */
angular.module('styleguideApp')
  .controller('IntroCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
