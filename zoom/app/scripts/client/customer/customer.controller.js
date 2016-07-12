
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('CustomerController', CustomerController);

    /** @ngInject */
    CustomerController.$inject = ['$state', '$rootScope', '$scope', 'toastr', 'Restangular', '$auth'];
    function CustomerController($state, $rootScope, $scope, toastr, Restangular, $auth) {
      var vm = this;
      $rootScope.$on('auth:logout-success', function (ev) {
        $rootScope.errand = {};
        $state.go('login');  
      });
    }
})();