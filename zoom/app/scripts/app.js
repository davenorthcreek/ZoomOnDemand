'use strict';

/**
 * @ngdoc overview
 * @name zoomApp
 * @description
 * # zoomApp
 *
 * Main module of the application.
 */
var zoomApp = angular.module('zoomApp', [
  'ngResource',
  'ui.router',
  'ngSanitize',
  'ui.bootstrap.datetimepicker',
  'ng-token-auth',
  'toastr',
  'restangular',
  'angularPayments'
]);

zoomApp.constant('moment', moment);
