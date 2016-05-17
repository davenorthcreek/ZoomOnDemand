zoomApp.config(function ($stateProvider, $urlRouterProvider) {

 // $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'MainController',
      templateUrl: 'scripts/main/main.html'
    })
});
