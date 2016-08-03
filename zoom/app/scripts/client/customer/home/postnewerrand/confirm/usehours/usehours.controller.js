
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('UseHoursController', UseHoursController);

    /** @ngInject */
    UseHoursController.$inject = ['$rootScope', '$state', '$scope', '$http', 'API_URL', 'toastr'];
    function UseHoursController($rootScope, $state, $scope, $http, API_URL, toastr) {
      var vm = this;        

      if (!$rootScope.errand.funds) {
        $rootScope.errand.funds = 0;
      }

      $scope.$on('submitErrand', function() {
        if ($rootScope.user.escrow_hour.hoursavail < 1) {
          toastr.warning('Please add hour');
          $state.go('app.home.postnewerrand.confirm.creditcard');
          return;
        }
        if ($rootScope.user.escrow_hour.escrowavail < $rootScope.errand.funds) {
          toastr.warning('Please add funds');
          $state.go('app.home.postnewerrand.confirm.creditcard');
          return;  
        }

        if (Object.keys($rootScope.errand).length) {
          $rootScope.errand.submitted = true;
          $http.post(API_URL + '/client/tasks', {task: $rootScope.errand})
          .then(function(data) {
            $rootScope.errand = {};
            $rootScope.errand.submitted = false;
            $rootScope.errand.task_uploads = {};
            toastr.success('Your errand has posted.<br>You will not be directed to errands in progress.', {allowHtml: true});
            $state.go('app.home.errandsprogress', {errand_id: data.data.id});
          }, function(data) {
            if (data.data && data.data.alert) {
              toastr.warning(data.data.alert);
            } else {
              toastr.warning("error");
            }
            $rootScope.errand.submitted = false;
          });           
        }
      });     

    }
})();