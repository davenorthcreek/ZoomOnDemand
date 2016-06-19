
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('PaymentHistoryController', PaymentHistoryController);

    /** @ngInject */
    PaymentHistoryController.$inject = ['$state', '$scope', '$http', 'API_URL', 'toastr'];
    function PaymentHistoryController($state, $scope, $http, API_URL, toastr) {
      var vm = this;
      $http.get(API_URL + '/client/payments')
      .then(function(resp) {
        vm.payments = resp.data; 
      }); 
    }
})();