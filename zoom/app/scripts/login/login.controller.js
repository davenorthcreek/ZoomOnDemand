
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('LoginController', LoginController);

    /** @ngInject */
    LoginController.$inject = ['$state', '$scope'];
    function LoginController($state, $scope) {
        // var vm = this;        

        // event handlers
        // event 'auth:login-success'
        $scope.$on('auth:login-success', function () {
            // toastr.success('Welcome ' + user.email);
            $state.go('app');
        });

        // event 'auth:login-error'
        $scope.$on('auth:login-error', function (ev, data) {
            alert("on error");
           // return toastr.error(data.errors[0], 'Authentication failure', { timeOut: 7000 });
        });

    }
})();