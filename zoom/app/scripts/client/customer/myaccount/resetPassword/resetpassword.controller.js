
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('ResetPasswordController', ResetPasswordController);

    /** @ngInject */
    ResetPasswordController.$inject = ['$state', '$scope', 'toastr'];
    function ResetPasswordController($state, $scope, toastr) {
        var vm = this;
        vm.form = {};
        $scope.$on('auth:password-reset-request-success', function (ev, data) {
            toastr.success("Password reset instructions were sent to " + data.email);
            vm.form = {}
        });
        $scope.$on('auth:password-reset-request-error', function (ev, resp) {
            toastr.error("Password reset request failed: " + resp.errors[0]);
        });
      
    }
})();