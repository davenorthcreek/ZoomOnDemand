
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('CustomerController', CustomerController);

    /** @ngInject */
    CustomerController.$inject = ['$state', '$rootScope', '$scope', 'toastr', 'Restangular', '$auth'];
    function CustomerController($state, $rootScope, $scope, toastr, Restangular, $auth) {
        var vm = this;
         $auth.validateUser()
         .then(function (resp) {
            console.log('$rootScope.user', $rootScope.user);
             $rootScope.user = resp;
             })
         .catch(function (resp) {
             $state.go('login');
             $rootScope.user = {};
         });
        $rootScope.$on('auth:logout-success', function (ev) {
           $rootScope.user = {};
           $state.go('login');
          
        });
        $rootScope.$on('auth:logout-error', function (ev, reason) {
            toastr.error('logout failed because ' + reason.errors[0]);
       });
      //  $rootScope.$on('auth:validation-success', function (ev, reason) {
      //      alert('success2');
      //   $rootScope.user = reason;
      //});
    
      
    }
})();