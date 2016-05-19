
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('PaymentHistoryController', PaymentHistoryController);

    /** @ngInject */
    PaymentHistoryController.$inject = ['$state', '$scope', 'toastr', 'Restangular'];
    function PaymentHistoryController($state, $scope, toastr, Restangular) {
        var vm = this;

       
    }
})();