'use strict';

angular.module('zoomApp').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
   $stateProvider
   .state('signup', {
       url: '/signup',
       controller: 'SignupController as vm',
       templateUrl: 'scripts/signup/signup.html'
   })

});

angular.module('zoomApp').run(function ($state, $rootScope, toastr) {
    var cleanupfunc1 = $rootScope.$on('auth:oauth-registration', function (ev, user) {
        toastr.success('Your account has been successfully created through facebook.', 'Welcome ' + user.email);
        $rootScope.home = true;
        $state.go('app.home');
    });

    $rootScope.$on('$destroy', cleanupfunc1);



    var cleanupfunc2 = $rootScope.$on('auth:email-confirmation-success', function (ev, user) {
        toastr.success('Your account has been successfully created.', 'Welcome ' + user.email);
        $state.go('app.home');
    });
    $rootScope.$on('$destroy', cleanupfunc2);

    var cleanupfunc3 = $rootScope.$on('auth:email-confirmation-error', function () {
        toastr.error('Request a password reset to verify your identify.', 'Unable to confirm your account.');
    });
    $rootScope.$on('$destroy', cleanupfunc3);

   
    var cleanupfunc6 = $rootScope.$on('auth:session-expired', function () {
        toastr.wanning('Session has expired. Please log in.');
        $state.go('login');
    });
    $rootScope.$on('$destroy', cleanupfunc6);


});