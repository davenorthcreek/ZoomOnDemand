
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('ConfirmErrandController', ConfirmErrandController);

    /** @ngInject */
    ConfirmErrandController.$inject = ['$rootScope', '$state', '$scope', '$http', 'API_URL', 'toastr'];
    function ConfirmErrandController($rootScope, $state, $scope, $http, API_URL, toastr) {
      var vm = this;

      vm.submitErrand = function () {
        $scope.$broadcast('submitErrand');
      }

    }
})();