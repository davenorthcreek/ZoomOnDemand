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
  'angularPayments',
  'angucomplete-alt',
  'ngFileUpload',
  'uiSwitch',
  'ui.bootstrap',
  'ipCookie',
  'google.places',
  'infinite-scroll',
  'zoomAppDirectives',
  "pickadate",
  "timepickerPop"
]);

zoomApp.constant('moment', moment);
