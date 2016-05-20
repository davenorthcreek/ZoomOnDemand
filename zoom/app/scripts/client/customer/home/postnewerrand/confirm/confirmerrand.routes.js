'use strict';

zoomApp.config(function ($stateProvider, $urlRouterProvider) {

 // $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('app.home.postnewerrand.confirm.usehours', {
        url: '',
        controller: 'UseHoursController as vm',
        templateUrl: 'scripts/client/customer/home/postnewerrand/confirm/usehours/usehours.html'
    })
    .state('app.home.postnewerrand.confirm.creditcard', {
        url: '/details',
        controller: 'CreditCardController as vm',
        templateUrl: 'scripts/client/customer/home/postnewerrand/confirm/creditcard/creditcard.html'
    })
});
