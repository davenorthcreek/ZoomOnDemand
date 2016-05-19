'use strict';

zoomApp.config(function ($stateProvider, $urlRouterProvider) {

 // $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('app.posterrand', {
      url: '/posterrand',
      abstract: true,
      controller: 'PostErrandController',
      templateUrl: 'scripts/client/customer/posterrand/posterrand.html'
    })
    .state('app.posterrand.select', {
        url: '',
        controller: 'ConfirmErrandController as vm',
        templateUrl: 'scripts/client/customer/posterrand/select/selecterrand.html'
    })
    .state('app.posterrand.details', {
        url: '/details',
        controller: 'ErrandDetailsController as vm',
        templateUrl: 'scripts/client/customer/posterrand/details/erranddetails.html'
    })
    .state('app.posterrand.confirm', {
        url: '/confirm',
        controller: 'ConfirmErrandController as vm',
        templateUrl: 'scripts/client/customer/posterrand/confirm/confirmerrand.html'
    })
});
