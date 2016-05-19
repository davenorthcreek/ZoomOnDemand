angular.module('zoomApp').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.payment', {
        url: '/payment',
        controller: 'PaymentController as vm',
        templateUrl: 'scripts/client/customer/payment/payment.html'
    })
});
