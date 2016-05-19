
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('DeactivateController', DeactivateController);

    /** @ngInject */
    DeactivateController.$inject = ['$state', '$scope', 'toastr'];
    function DeactivateController($state, $scope, toastr) {
        // var vm = this;  
        $scope.$on('auth:account-destroy-success', function (ev) {
            toastr.success("Your account has been successfully destroyed!");
            $state.go('login');
        });
        $scope.$on('auth:account-destroy-error', function (ev, reason) {
            toastr.error("Account deletion failed: " + reason.errors[0]);
        });

    }
})();