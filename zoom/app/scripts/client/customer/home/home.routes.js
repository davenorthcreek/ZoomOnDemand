'use strict';

zoomApp.config(function ($stateProvider, $urlRouterProvider) {

$urlRouterProvider.when('/app/home','/app/home/postnewerrand/select');
$urlRouterProvider.when('/app/home/','/app/home/postnewerrand/select');
$urlRouterProvider.when('/app/home/postnewerrand','/app/home/postnewerrand/select');
$urlRouterProvider.when('/app/home/postnewerrand/','/app/home/postnewerrand/select');

  $stateProvider
    .state('app.home', {
      url: '/home',
      controller: 'HomeController',
      templateUrl: 'scripts/client/customer/home/home.html'
    })
    .state('app.home.postnewerrand', {
        url: '/postnewerrand',
        controller: 'PostNewErrandController as vm',
        templateUrl: 'scripts/client/customer/home/postnewerrand/postnewerrand.html'
    })
    .state('app.home.errandsprogress', {
        url: '/errandsprogress',
        controller: 'ErrandsProgressController as vm',
        templateUrl: 'scripts/client/customer/home/errandsprogress/errandsprogress.html',
        params: {errand_id: null}
    })
    .state('app.home.myhours', {
        url: '/myhours',
        controller: 'MyHoursController as vm',
        templateUrl: 'scripts/client/customer/home/myhours/myhours.html'
    })
});
