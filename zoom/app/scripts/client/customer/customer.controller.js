
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('CustomerController', CustomerController);

    /** @ngInject */
    CustomerController.$inject = ['$state', '$rootScope', '$scope', 'toastr'];
    function CustomerController($state, $rootScope, $scope, toastr) {
        // var vm = this;   
       $rootScope.$on('auth:logout-success', function (ev) {
           $state.go('login');
        });
        $rootScope.$on('auth:logout-error', function (ev, reason) {
            toastr.error('logout failed because ' + reason.errors[0]);
        });
    }
})();