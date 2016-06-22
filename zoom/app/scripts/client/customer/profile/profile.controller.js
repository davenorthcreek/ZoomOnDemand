
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
        if (vm.accountSetting.zoom_office_id == null || vm.accountSetting.zoom_office_id == undefined) {
          toastr.error("Service location can't be blank");
          return;
        }
        $auth.updateAccount(vm.accountSetting)
        .then(function (resp) {
          vm.editing = false;
          $rootScope.user = resp.data.data;
          toastr.success('Account setting updated successfully!');
        }, function(resp) {
          toastr.error(resp.data.errors.full_messages[0]);
        });
      }

      vm.uploadFile = function(file) {
        if (file) {
          var reader = new FileReader();

          reader.onload = function (e) {
            $timeout(function() {
              vm.photo = e.target.result;
              Upload.upload({
                  url: API_URL + '/auth',
                  data: { photo: e.target.result },
                  method: 'put'
              }).then(function (resp) {
                $rootScope.user.photoUrl = resp.data.data.photoUrl;
                toastr.success('Photo changed successfully!');
              }, function(resp) {
                toastr.error(resp.data.errors.full_messages[0]);
              });
            });
          }

          reader.readAsDataURL(file);          
        }
      }

    }
})();