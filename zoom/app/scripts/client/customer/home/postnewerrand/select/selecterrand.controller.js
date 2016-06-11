
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('SelectErrandController', SelectErrandController);

    /** @ngInject */
    SelectErrandController.$inject = ['$rootScope', '$state', '$scope', '$http', 'API_URL', '$log'];
    function SelectErrandController($rootScope, $state, $scope, $http, API_URL, $log) {
      var vm = this;

      vm.locations = ['Los Angeles', 'San Diego'];

      if ($rootScope.errand.datetime == undefined) {
        $rootScope.errand.datetime = new Date();
      }

      vm.form = {
        frequencyNumber: 1,
        frequencyWord: ''
      };

      console.log(vm.date);

      $http.get(API_URL + '/all_types')
        .then(function(resp) {
          vm.all_types = resp.data; 
          $log.log(vm.all_types);
        });

      $http.get(API_URL + '/client/zoomoffices')
        .then(function(resp) {
          vm.zoomoffices = resp.data; 
          $log.log(vm.zoomoffices);
        });  

      vm.selectNext = function() {
        $log.log($rootScope.errand);
        $state.go('app.home.postnewerrand.details');
      }  

      vm.selectedObject = function(selected){
        if (selected != undefined) {
          $rootScope.errand.type_id = selected.originalObject.id;
          $log.log($rootScope.errand);  
        } 
        
      }


      vm.getFormatedDate = function(date) {
        return moment(date).format('MM/DD/YYYY');
      }

      vm.getWeekDayName = function(date) {
        return moment(date).format('dddd');
      }

      vm.getTimeWithTimeZone = function(date) {
        return moment(date).format('LT');
      }

      vm.setDate = function(newDate, oldDate) {
        console.log('newDate: ' + newDate);
        console.log('oldDate: ' + oldDate);
        $rootScope.errand.datetime.setFullYear(newDate.getFullYear());
        $rootScope.errand.datetime.setMonth(newDate.getMonth());
        $rootScope.errand.datetime.setDate(newDate.getDate());
      }

      vm.setTime = function(newDate, oldDate) {
        console.log('newTime: ' + newDate);
        $rootScope.errand.datetime.setHours(newDate.getHours());
        $rootScope.errand.datetime.setMinutes(newDate.getMinutes());

      }

      vm.setFrequency = function(frequency) {
        $rootScope.errand.frequency = frequency;        
      }

      // vm.next = function() {
      //   console.log('next');
      //   console.log(vm.form);
      // }
    }
})();
