
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
        $scope.$on('auth:password-change-success', function (ev, data) {
            toastr.success("Password has been changed");
            vm.form = {}
        });
        $scope.$on('auth:password-change-error', function (ev, resp) {
            toastr.error(resp.errors.full_messages[0]);      
        });
    }
})();