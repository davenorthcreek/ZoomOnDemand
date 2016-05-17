
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('ResetPasswordController', ResetPasswordController);

    /** @ngInject */
    ResetPasswordController.$inject = ['$state', '$scope'];
    function ResetPasswordController($state, $scope) {
        // var vm = this;        
        $scope.$on('auth:password-reset-request-success', function (ev, data) {
            alert("Password reset instructions were sent to " + data.email);
        });
        $scope.$on('auth:password-reset-request-error', function (ev, resp) {
            alert("Password reset request failed: " + resp.errors[0]);
        });
      
    }
})();