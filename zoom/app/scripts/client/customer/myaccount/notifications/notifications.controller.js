
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('NotificationsController', NotificationsController);

    /** @ngInject */
    NotificationsController.$inject = ['$state', '$scope', '$http', 'API_URL', 'toastr'];
    function NotificationsController($state, $scope, $http, API_URL, toastr) {
      var vm = this;
      vm.hours = [
        {value: 1, text: '1 Hr'},
        {value: 2, text: '2 Hrs'},
        {value: 3, text: '3 Hrs'},
        {value: 4, text: '4 Hrs'},
        {value: 5, text: '5 Hrs'}
      ];
      $http.get(API_URL + '/client/client_setting')
      .then(function(resp) {
        vm.client_setting = resp.data; 
      });

      vm.saveSetting = function()
      {
        $http.put(API_URL + '/client/client_setting', vm.client_setting)
        .then(function(data) {
          toastr.success('Successfully saved');
        }, function(data) {
          if (data.data && data.data.alert) {
            toastr.warning(data.data.alert);
          } else {
            toastr.warning("error");
          }
        });  
      } 
    }
})();