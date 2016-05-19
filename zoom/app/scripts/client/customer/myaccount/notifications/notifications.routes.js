angular.module('zoomApp').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.myaccount.notifications', {
        url: '/notifications',
        controller: 'NotificationsController as vm',
        templateUrl: 'scripts/client/customer/myaccount/notifications/notifications.html'
    })
});
