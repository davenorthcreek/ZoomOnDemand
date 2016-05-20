'use strict';

zoomApp.config(function ($stateProvider, $urlRouterProvider) {

$urlRouterProvider.when('/app/home/postnewerrand/confirm','/app/home/postnewerrand/confirm/usehours');
$urlRouterProvider.when('/app/home/postnewerrand/confirm/','/app/home/postnewerrand/confirm/usehours');

  $stateProvider
    .state('app.home.postnewerrand.select', {
        url: '/select',
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
        controller: 'ConfirmErrandController as vm',
        templateUrl: 'scripts/client/customer/home/postnewerrand/confirm/confirmerrand.html'
    })
});
