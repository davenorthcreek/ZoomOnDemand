
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('LoginController', LoginController);

    /** @ngInject */
    LoginController.$inject = ['$state', '$scope', 'toastr', '$rootScope'];
    function LoginController($state, $scope, toastr, $rootScope) {
        var vm = this;
        vm.waiting = false;
        $rootScope.errand = {};
        $scope.$on('auth:login-success', function (ev, data) {
          vm.waiting = false;
          $state.go('app.home');
        });
        $rootScope.$on('auth:validation-success', function (ev, reason) {
          $state.go('app.home');
        });
        $scope.$on('auth:login-error', function (ev, data) {
          vm.waiting = false;
          return toastr.error(data.errors[0], 'Authentication failure', { timeOut: 7000 });
        });

    }
})();