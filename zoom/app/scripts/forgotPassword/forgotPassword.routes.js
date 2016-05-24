'use strict';
angular
      .module('zoomApp')
      .config(config);
function config($stateProvider, $urlRouterProvider, $locationProvider) {
 $stateProvider
    .state('forgotPassword', {

        url: '/forgotPassword',
        controller: 'ForgotPasswordController as vm',
        templateUrl: 'scripts/forgotPassword/forgotPassword.html'
    })
 
};
