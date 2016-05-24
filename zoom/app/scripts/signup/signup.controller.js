
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('SignupController', SignupController);

    /** @ngInject */
    SignupController.$inject = ['$state', '$scope', 'toastr', '$rootScope'];
    function SignupController($state, $scope, toastr, $rootScope) {
        var vm = this;
      
        $scope.$on('auth:registration-email-success', function (ev, data) {
            toastr.success('Your account has been successfully created.', 'Welcome ' + user.email);
          //  $rootScope.user = user;
          //  $rootScope.home = true;
            $state.go('login');
        });

        // event :  'auth:registration-email-error'
        $scope.$on('auth:registration-email-error', function (ev, data) {
            var errors;
            errors = data.errors.full_messages.join('<br/>');
            return toastr.error(errors);
        });

    }
})();