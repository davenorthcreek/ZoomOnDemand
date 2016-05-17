angular.module('zoomApp').config(function ($stateProvider, $urlRouterProvider) {
 $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('login', {
        url: '/login',
        controller: 'LoginController as vm',
      templateUrl: 'scripts/login/login.html'
    })
});
