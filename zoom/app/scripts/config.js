
(function () {
    'use strict';

    angular
      .module('zoomApp')
      .config(config);



    // @ngInject
    config.$inject = ['API_URL', '$authProvider', '$windowProvider', '$locationProvider', 'RestangularProvider'];
    function config(API_URL, $authProvider, $windowProvider, $locationProvider, RestangularProvider) {
        RestangularProvider.setBaseUrl(API_URL);
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
       var $window = $windowProvider.$get();
       var isMob = $window.cordova !== angular.undefined;
        $authProvider.configure(
          {
            apiUrl: API_URL,
            tokenValidationPath:     '/bclient_auth/validate_token',
            signOutUrl:              '/bclient_auth/sign_out',
            emailRegistrationPath:   '/bclient_auth',
            accountUpdatePath:       '/bclient_auth',
            accountDeletePath:       '/bclient_auth',
            confirmationSuccessUrl:  window.location.href,
            passwordResetPath:       '/bclient_auth/password',
            passwordUpdatePath:      '/bclient_auth/password',
            passwordResetSuccessUrl: window.location.href,
            emailSignInPath:         '/bclient_auth/sign_in',
            proxyIf: function () { $window.isOldIE(); },
            authProviderPaths: {
                github: '/auth/github',
                facebook: '/auth/facebook',
                google: '/auth/google_oauth2'
            },
            cookieOps: {
              path: "/",
              expires: 9999,
              expirationUnit: 'days',
              // domain: '.zoomerrands.com',
              secure: false
            },
            omniauthWindowType: isMob ? 'inAppBrowser' : 'newWindow',
            storage: isMob ? 'localStorage' : 'cookies'

          }
        );
    }

})();





