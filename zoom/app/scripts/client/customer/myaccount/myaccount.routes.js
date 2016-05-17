angular.module('zoomApp').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.myaccount', {
        url: '/myaccount',
        controller: 'MyAcoountController as vm',
        templateUrl: 'scripts/client/customer/myaccount/myaccount.html'
    })
});
