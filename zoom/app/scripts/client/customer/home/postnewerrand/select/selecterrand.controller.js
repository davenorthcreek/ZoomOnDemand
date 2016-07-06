
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('SelectErrandController', SelectErrandController);

    /** @ngInject */
    SelectErrandController.$inject = ['$rootScope', '$state', '$scope', '$http', 'API_URL', '$log', 'dateFilter', '$window'];
    function SelectErrandController($rootScope, $state, $scope, $http, API_URL, $log, dateFilter, $window) {
      var vm = this;

      vm.locations = ['Los Angeles', 'San Diego'];
      vm.datetimeerror = false;
      vm.type_iderror = false;
       $scope.minDate = new Date();
       $scope.minDate.setDate($scope.minDate.getDate() - 1);
   
       $scope.showMeridian = true;
       $scope.disabled = false;

      $scope.$watch('date', function () {
          tryCombineDateTime();
      }, true);
 
      function tryCombineDateTime() {
          var date = new Date($scope.date);
          $rootScope.errand.datetime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), $scope.errand.datetime.getHours(), $scope.errand.datetime.getMinutes());
         
      }

      if ($rootScope.errand.datetime) {
          $rootScope.errand.datetime = new Date($rootScope.errand.datetime);
          $scope.date = dateFilter($rootScope.errand.datetime, 'yyyy-MM-dd');
      } else {
          $rootScope.errand.datetime = new Date;
          $scope.date = dateFilter($rootScope.errand.datetime, 'yyyy-MM-dd');
      }      

      if (!$rootScope.errand.frequency) {
        $rootScope.errand.frequency = 0;
      }

      if (!$rootScope.errand.zoom_office_id) {
        $rootScope.errand.zoom_office_id = $scope.user.zoom_office_id;
      }

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

      $rootScope.$watch('errand.datetime', function () {
          var currentdate = new Date();
          if ($rootScope.errand.datetime < currentdate) {
              vm.datetimeerror = true;
          } else {
              vm.datetimeerror = false;
          }
      }, true);
      $rootScope.$watch('errand.type_id', function () {
          if($rootScope.errand.type_id == undefined){
              vm.type_iderror = true;
          } else {
              vm.type_iderror = false;
          }
      }, true);
    vm.selectNext = function() {
          $log.log($rootScope.errand);
          vm.datetimeerror = false;
          vm.type_iderror = false;
          var count = 0;
          var currentdate = new Date();
          if ($rootScope.errand.datetime < currentdate)
          {
              vm.datetimeerror = true;
              count++;
          }
          if($rootScope.errand.type_id == undefined)
          {
              vm.type_iderror = true;
              count++;
          }
          if (count == 0)
          {
              $state.go('app.home.postnewerrand.details');
          }
       
      }  

      vm.selectedObject = function(selected){
        if (selected != undefined) {
          $rootScope.errand.type_id = selected.originalObject.id;
          $rootScope.errand.type = selected.originalObject;
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
      $scope.showcalendarstatus = false;
      $scope.showcalendar = function () {
         $window.onclick = function (event) {
              $scope.showcalendarstatus = false;
              $scope.$apply();
          };
         $scope.showcalendarstatus = true;
      }
      // vm.next = function() {
      //   console.log('next');
      //   console.log(vm.form);
      // }
    }
})();
