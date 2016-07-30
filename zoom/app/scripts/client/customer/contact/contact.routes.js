angular.module('zoomApp').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.contact', {
        url: '/contact',
        controller: 'ContactController as vm',
        templateUrl: 'scripts/client/customer/contact/contact.html'
    })
});
