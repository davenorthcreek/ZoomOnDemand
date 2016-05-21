
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('LoginController', LoginController);

    /** @ngInject */
    LoginController.$inject = ['$state', '$scope', 'toastr', '$rootScope'];
    function LoginController($state, $scope, toastr, $rootScope) {
        var vm = this;
        $rootScope.home = false;
       $scope.$on('auth:login-success', function (ev, data) {
           $rootScope.user = data;
           $rootScope.home = true;
            //  $state.go('app');
            $state.go('app.home');
        });
       $rootScope.$on('auth:validation-success', function (ev, reason) {
           $rootScope.home = true;
            $rootScope.user = reason;
            //  $state.go('app');
            $state.go('app.home');
        });
        $scope.$on('auth:login-error', function (ev, data) {
           return toastr.error(data.errors[0], 'Authentication failure', { timeOut: 7000 });
        });

    }
})();