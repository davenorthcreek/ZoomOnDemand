angular.module('zoomApp').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.myaccount.paymentHistory', {
        url: '/paymentHistory',
        controller: 'PaymentHistoryController as vm',
        templateUrl: 'scripts/client/customer/myaccount/paymentHistory/paymentHistory.html'
    })
});
