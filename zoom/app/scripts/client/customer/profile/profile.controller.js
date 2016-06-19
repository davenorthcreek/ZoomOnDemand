
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    ProfileController.$inject = ['$rootScope', '$state', '$scope', '$http', '$auth', '$timeout', 'API_URL', 'toastr', 'Upload'];
    function ProfileController($rootScope, $state, $scope, $http, $auth, $timeout, API_URL, toastr, Upload) {
      var vm = this;        
      vm.accountSetting = angular.copy($rootScope.user);
      
      $http.get(API_URL + '/client/zoomoffices')
      .then(function(resp) {
        vm.zoomoffices = resp.data; 
      });  

      vm.updateAccount = function()
      {
        Upload.upload({
            url: API_URL + '/auth',
            data: vm.accountSetting,
            method: 'put'
        }).then(function (resp) {
          vm.editing = false;
          $rootScope.user = resp.data.data;
          toastr.success('Account setting updated successfully!');
        }, function(resp) {
          toastr.error(resp.data.errors.full_messages[0]);
        });
      }

      vm.uploadFile = function(file) {
        if (file) {
          vm.accountSetting.photo = file;
          var reader = new FileReader();

          reader.onload = function (e) {
            $timeout(function() {
              vm.photo = e.target.result;  
            });            
          }

          reader.readAsDataURL(file);          
        }
      }

    }
})();