
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('ErrandDetailsController', ErrandDetailsController);

    /** @ngInject */
    ErrandDetailsController.$inject = ['$rootScope', '$state', '$scope', 'API_URL', 'Upload'];

    function ErrandDetailsController($rootScope, $state, $scope, API_URL, Upload) {
      var vm      = this;
      if (!$rootScope.errand.funds) {
        $rootScope.errand.funds = 0;
      }
      if (!$rootScope.errand.task_uploads) {
        $rootScope.errand.task_uploads = {};
      }
      if (!$rootScope.errand.task_uploads['normal']) {
        $rootScope.errand.task_uploads['normal'] = [];
      }
      if (!$rootScope.errand.task_uploads['funds']) {
        $rootScope.errand.task_uploads['funds'] = [];
      }

      vm.dolar    = numeral($rootScope.errand.funds).format('$0,0.00');

      vm.add = function() {
        $rootScope.errand.funds ++;
        vm.dolar = numeral($rootScope.errand.funds).format('$0,0.00');
      }

      vm.subtract = function() {
        if ($rootScope.errand.funds > 0) {
          $rootScope.errand.funds --;
          vm.dolar = numeral($rootScope.errand.funds).format('$0,0.00');
        }
      }

      vm.autocompleteOptions = {
        componentRestrictions: { country: 'us' },
        types: ['geocode']
      }

      vm.blurAddress = function() {
        if (($rootScope.errand.addr) && ($rootScope.errand.addr.types)) {
          var p = $rootScope.errand.addr;
          for (var i = 0; i < p.address_components.length; i++) {
            var addressType = p.address_components[i].types[0];
            if (addressType=="locality"){
              $rootScope.errand.city = p.address_components[i]['long_name'];
              break;              
            }
          }
          if (!$rootScope.errand.city) {
              vm.invalidAddress = true;
              return; 
          }
          
          $rootScope.errand.address = $rootScope.errand.addr.formatted_address;
          $rootScope.errand.addrlat = $rootScope.errand.addr.geometry.location.lat();
          $rootScope.errand.addrlng = $rootScope.errand.addr.geometry.location.lng();
          vm.invalidAddress = false;    
        } else {
          vm.invalidAddress = true;        
        }
      }

      vm.uploadFiles = function(files, category) {
        if (files && files.length) {
          Upload.upload({
              url: API_URL + '/client/tasks/upload_files',
              data: {file: files, category: category}
          }).then(function (resp) {
              console.log('Success uploaded. Response: ' + resp.data);
              $rootScope.errand.task_uploads[category] = $rootScope.errand.task_uploads[category].concat(resp.data)
          }, function (resp) {
              console.log('Error status: ' + resp.status);
          }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ');
          });          
        }
      }

    }

})();