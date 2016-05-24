
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('SignupController', SignupController);

    /** @ngInject */
    SignupController.$inject = ['$state', '$scope', 'toastr', '$rootScope'];
    function SignupController($state, $scope, toastr, $rootScope) {
        var vm = this;
        vm.waiting = false;
        $scope.$on('auth:registration-email-success', function (ev, data) {
            toastr.success('Your account has been successfully created.', 'Welcome ' + data.email);
            //  $state.go('login');
            vm.waiting = false;
            $rootScope.user = data;
            $state.go('app.home');
        });

        // event :  'auth:registration-email-error'
        $scope.$on('auth:registration-email-error', function (ev, data) {
            vm.waiting = false;
            var errors;
            errors = data.errors.full_messages.join('<br/>');
            return toastr.error(errors);
        });

    }
})();