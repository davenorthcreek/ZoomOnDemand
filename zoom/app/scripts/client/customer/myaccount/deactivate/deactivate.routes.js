angular.module('zoomApp').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.myaccount.deactivate', {
        url: '/deactivate',
        controller: 'DeactivateController as vm',
        templateUrl: 'scripts/client/customer/myaccount/deactivate/deactivate.html'
    })
});
