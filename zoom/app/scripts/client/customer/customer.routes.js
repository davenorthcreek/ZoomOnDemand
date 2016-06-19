angular.module('zoomApp').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
        url: '/app',
        controller: 'CustomerController as vm',
        templateUrl: 'scripts/client/customer/customer.html',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }                
        }
    })
});
