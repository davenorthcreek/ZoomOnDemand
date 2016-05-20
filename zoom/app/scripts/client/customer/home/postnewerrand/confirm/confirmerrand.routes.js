'use strict';

zoomApp.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.home.postnewerrand.confirm.usehours', {
        url: '/usehours',
        controller: 'UseHoursController as vm',
        templateUrl: 'scripts/client/customer/home/postnewerrand/confirm/usehours/usehours.html'
    })
    .state('app.home.postnewerrand.confirm.creditcard', {
        url: '/creditcard',
        controller: 'CreditCardController as vm',
        templateUrl: 'scripts/client/customer/home/postnewerrand/confirm/creditcard/creditcard.html'
    })
});
