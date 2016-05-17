
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('CustomerController', CustomerController);

    /** @ngInject */
    CustomerController.$inject = ['$state', '$rootScope', '$scope'];
    function CustomerController($state, $rootScope, $scope) {
        // var vm = this;   
       $rootScope.$on('auth:logout-success', function (ev) {
           $state.go('login');
        });
        $rootScope.$on('auth:logout-error', function (ev, reason) {
            alert('logout failed because ' + reason.errors[0]);
        });
    }
})();