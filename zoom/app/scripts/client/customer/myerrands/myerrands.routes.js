'use strict';

zoomApp.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.myerrands', {
      url: '/myerrands',
      controller: 'MyErrandsController as vm',
      templateUrl: 'scripts/client/customer/myerrands/myerrands.html'
    })
});
