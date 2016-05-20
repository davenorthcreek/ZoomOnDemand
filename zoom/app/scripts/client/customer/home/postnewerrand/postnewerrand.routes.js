'use strict';

zoomApp.config(function ($stateProvider, $urlRouterProvider) {

 // $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('app.home.postnewerrand.select', {
        url: '',
        controller: 'ConfirmErrandController as vm',
        templateUrl: 'scripts/client/customer/home/postnewerrand/select/selecterrand.html'
    })
    .state('app.home.postnewerrand.details', {
        url: '/details',
        controller: 'ErrandDetailsController as vm',
        templateUrl: 'scripts/client/customer/home/postnewerrand/details/erranddetails.html'
    })
    .state('app.home.postnewerrand.confirm', {
        url: '/confirm',
        abstract: true,
        controller: 'ConfirmErrandController as vm',
        templateUrl: 'scripts/client/customer/home/postnewerrand/confirm/confirmerrand.html'
    })
});
