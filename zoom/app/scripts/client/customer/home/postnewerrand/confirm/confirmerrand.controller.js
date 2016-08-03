
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('ConfirmErrandController', ConfirmErrandController);

    /** @ngInject */
    ConfirmErrandController.$inject = ['$rootScope', '$state', '$scope', '$http', 'API_URL', 'toastr'];
    function ConfirmErrandController($rootScope, $state, $scope, $http, API_URL, toastr) {
      var vm = this;
      $rootScope.errand.submitted = false;

      vm.submitErrand = function () {
        if (!$rootScope.errand.type_id) {
          toastr.warning('Please select type of errand');
          $state.go('app.home.postnewerrand.select');
          return;          
        }
        if (!$rootScope.errand.zoom_office_id) {
          toastr.warning('Please select service location');
          $state.go('app.home.postnewerrand.select');
          return;                    
        }
        if ($rootScope.errand.type.name == 'Delivery') {
          if (!$rootScope.errand.pick_up_address) {
            toastr.warning('Please input pick up location');
            $state.go('app.home.postnewerrand.details');
            return;                      
          }
          if (!$rootScope.errand.address) {
            toastr.warning('Please input drop off location');
            $state.go('app.home.postnewerrand.details');
            return;                      
          }
        } else {
          if (!$rootScope.errand.address) {
            toastr.warning('Please input errand location');
            $state.go('app.home.postnewerrand.details');
            return;                      
          }          
        }
        $scope.$broadcast('submitErrand');
      }

    }
})();