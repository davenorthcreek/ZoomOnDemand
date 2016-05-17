angular.module('zoomApp').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.myaccount.resetpassword', {
        url: '/resetpassword',
        controller: 'ResetPasswordController as vm',
        templateUrl: 'scripts/client/customer/myaccount/resetPassword/resetpassword.html'
    })
});
