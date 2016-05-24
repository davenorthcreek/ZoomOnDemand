
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('CustomerController', CustomerController);

    /** @ngInject */
    CustomerController.$inject = ['$state', '$rootScope', '$scope', 'toastr', 'Restangular'];
    function CustomerController($state, $rootScope, $scope, toastr, Restangular) {
        var vm = this;
      
       $rootScope.$on('auth:logout-success', function (ev) {
           $state.go('login');
           $rootScope.home = false;
        });
       $rootScope.$on('auth:logout-error', function (ev, reason) {
            toastr.error('logout failed because ' + reason.errors[0]);
       });
       $rootScope.$on('auth:validation-success', function (ev, reason) {
         $rootScope.user = reason;
         $rootScope.home = true;
      });
    
      
    }
})();