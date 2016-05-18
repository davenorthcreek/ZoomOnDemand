angular.module('zoomApp').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.profile', {
        url: '/profile',
        controller: 'ProfileController as vm',
        templateUrl: 'scripts/client/customer/profile/profile.html'
    })
});
