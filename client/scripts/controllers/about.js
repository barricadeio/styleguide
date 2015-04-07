'use strict';

/**
 * @ngdoc function
 * @name styleguideApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the styleguideApp
 */
angular.module('styleguideApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
