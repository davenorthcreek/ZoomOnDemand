
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
            var toastr_object = toastr.success('Thank you for creating your Zoom Errands account!<br><br>Please click on the link sent to your email to complete the activation process.<br><small>Check your spam folder if not in inbox.</small>', 
                {
                    allowHtml: true, 
                    toastClass: 'toast-center', 
                    timeOut: 0,
                    extendedTimeOut: 0,
                    onHidden: function() {
                        window.location.href = 'http://zoomerrands.com'
                    }
                }
            );
            setTimeout(function() {
                toastr_object.scope.close(true);
            }, 15000);

            vm.waiting = false;
        });

        // event :  'auth:registration-email-error'
        $scope.$on('auth:registration-email-error', function (ev, data) {
            vm.waiting = false;
            var errors;
            errors = data.errors.full_messages.join('<br/>');
            return toastr.error(errors);
        });

        $scope.$on('auth:login-success', function(ev, user) 
        {
            toastr.success('Welcome ' + user.email);
            $rootScope.errand = {};
            $state.go('app.home');            
        });

    }
})();