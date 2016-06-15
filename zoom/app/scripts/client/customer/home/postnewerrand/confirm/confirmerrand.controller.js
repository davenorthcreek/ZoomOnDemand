
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
        if (Object.keys($rootScope.errand).length) {
          $http.post(API_URL + '/client/tasks', {task: $rootScope.errand})
          .then(function(data) {
            vm.submitted = true;
            $state.go('app.home.errandsprogress', {errand_id: data.data.id});
          }, function(data) {
            if (data.data && data.data.alert) {
              toastr.warning(data.data.alert);
            } else {
              toastr.warning("error");
            }
          });           
        }
      }

    }
})();