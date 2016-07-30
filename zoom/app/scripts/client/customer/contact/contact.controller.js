
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('ContactController', ContactController);

    /** @ngInject */
    ContactController.$inject = ['$rootScope', '$state', '$scope', '$http', '$auth', '$timeout', 'API_URL', 'toastr', 'Upload'];
    function ContactController($rootScope, $state, $scope, $http, $auth, $timeout, API_URL, toastr, Upload) {
      var vm = this;        
      
      vm.contact = function(index, errand) {
        if (!vm.contact_email || !vm.contact_body) {
          toastr.warning("Please input all fields");
          return;  
        }

        $http.post(API_URL + '/contacts', {email: vm.contact_email, body: vm.contact_body})
        .then(function(data) {
          toastr.success('Successfully sent')
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