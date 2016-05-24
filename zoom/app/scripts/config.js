
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
        $authProvider.configure([
          {
              default: {
                  apiUrl: API_URL,
                  proxyIf: function () { $window.isOldIE(); },
                  authProviderPaths: {
                      github: '/auth/github',
                      facebook: '/auth/facebook',
                      google: '/auth/google_oauth2'
                  },
                  omniauthWindowType: isMob ? 'inAppBrowser' : 'newWindow',
                  storage: isMob ? 'localStorage' : 'cookies'
              }
          }, {
              provider: {
                  apiUrl: API_URL,
                  proxyIf: function () { $window.isOldIE(); },
                  signOutUrl: '/client_auth/sign_out',
                  emailSignInPath: '/client_auth/sign_in',
                  emailRegistrationPath: '/client_auth',
                  accountUpdatePath: '/client_auth',
                  accountDeletePath: '/client_auth',
                  passwordResetPath: '/client_auth/password',
                  passwordUpdatePath: '/client_auth/password',
                  tokenValidationPath: '/client_auth/validate_token',
                  authProviderPaths: {
                      github: '/client_auth/github',
                      facebook: '/client_auth/facebook',
                      google: '/client_auth/google_oauth2'
                  }
              }
          }
        ]);
    }
  
})();





