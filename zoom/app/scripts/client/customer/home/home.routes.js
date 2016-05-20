'use strict';

zoomApp.config(function ($stateProvider, $urlRouterProvider) {

 // $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('app.home', {
      url: '/home',
      abstract: true,
      controller: 'HomeController',
      templateUrl: 'scripts/client/customer/home/home.html'
    })
    .state('app.home.postnewerrand', {
        url: '',
        abstract: true,
        controller: 'PostNewErrandController as vm',
        templateUrl: 'scripts/client/customer/home/postnewerrand/postnewerrand.html'
    })
    .state('app.home.errandsprogress', {
        url: '/errandsprogress',
        controller: 'ErrandsProgressController as vm',
        templateUrl: 'scripts/client/customer/home/errandsprogress/errandsprogress.html'
    })
    .state('app.home.myhours', {
        url: '/myhours',
        controller: 'MyHoursController as vm',
        templateUrl: 'scripts/client/customer/home/myhours/myhours.html'
    })
});
