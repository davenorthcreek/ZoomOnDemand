
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
        if (!validateErrand()) return;
        
        $rootScope.errand.confirmed = true;
        if ($rootScope.user.escrow_hour.hoursavail < 1) {
          toastr.warning('You need an hour credit at least for posting new errand.', 'Please purchase hours', {timeOut: 15000});
          $state.go('app.payment');
          return;
        }
        if ($rootScope.user.escrow_hour.escrowavail < $rootScope.errand.funds) {
          toastr.warning('You need to add funds for purchasing something.', 'Please add funds', {timeOut: 15000});
          $state.go('app.payment');
          return;
        }

        if (Object.keys($rootScope.errand).length) {
          $rootScope.errand.submitted = true;
          $http.post(API_URL + '/client/tasks', {task: $rootScope.errand})
          .then(function(data) {
            toastr.success('Your errand has posted.<br>You will now be directed to errands in progress.', {allowHtml: true, toastClass: 'toast-center', onHidden: function() {
              $rootScope.errand = {};
              $rootScope.errand.task_uploads = {};
              $state.go('app.home.errandsprogress', {errand_id: data.data.id});
            }});
          }, function(data) {
            if (data.data && data.data.alert) {
              toastr.warning(data.data.alert);
            } else {
              toastr.warning("error");
            }
            $rootScope.errand.submitted = false;
          });
        }

      }

      vm.order = function () {
        if (!validateErrand()) return;

        $rootScope.errand.confirmed = true;
        $state.go('app.payment');
      }

      function validateErrand() {
        if (!$rootScope.errand.type_id) {
          toastr.warning('Please select type of errand');
          $state.go('app.home.postnewerrand.select');
          return false;          
        }
        if (!$rootScope.errand.zoom_office_id) {
          toastr.warning('Please select service location');
          $state.go('app.home.postnewerrand.select');
          return false;                    
        }
        if ($rootScope.errand.type.name == 'Delivery') {
          if (!$rootScope.errand.pick_up_address) {
            toastr.warning('Please input pick up location');
            $state.go('app.home.postnewerrand.details');
            return false;                      
          }
          if (!$rootScope.errand.address) {
            toastr.warning('Please input drop off location');
            $state.go('app.home.postnewerrand.details');
            return false;                      
          }
        } else {
          if (!$rootScope.errand.address) {
            toastr.warning('Please input errand location');
            $state.go('app.home.postnewerrand.details');
            return false;                      
          }          
        }
        return true;
      }
    }
})();