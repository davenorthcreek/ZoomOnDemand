
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('ForgotPasswordController', ForgotPasswordController);

    /** @ngInject */
    ForgotPasswordController.$inject = ['$state', '$scope', 'toastr', '$rootScope'];
    function ForgotPasswordController($state, $scope, toastr, $rootScope) {
        var vm = this;
        vm.waiting = false;
        //event 'auth:password-reset-request-success'
        $scope.$on('auth:password-reset-request-success', function (ev, params) {
            vm.waiting = false;
            return toastr.success('Password reset instructions have been sent to  ' + params.email);
        });

        //event 'auth:password-reset-request-success'
        $scope.$on('auth:password-reset-request-error', function (ev, data) {
            vm.waiting = false;
            return toastr.error('Error: ' + (data.errors).toString());
        });

        //event 'auth:password-reset-request-success'
        $scope.$on('auth:password-reset-confirm-success', function () {
            vm.waiting = false;
            $state.go('login');
        });

        //event 'auth:password-reset-request-error'
        $scope.$on('auth:password-reset-confirm-error', function () {
            vm.waiting = false;
            return toastr.error('Unable to verify your account. Please try again.');
        });
    }
})();