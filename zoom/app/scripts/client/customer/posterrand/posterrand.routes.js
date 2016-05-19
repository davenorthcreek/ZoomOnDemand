'use strict';

zoomApp.config(function ($stateProvider, $urlRouterProvider) {

 // $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('app.home', {
      url: '/home',
      controller: 'PostErrandController',
      templateUrl: 'scripts/client/customer/posterrand/posterrand.html'
    })
});
