
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('SelectErrandController', SelectErrandController);

    /** @ngInject */
    SelectErrandController.$inject = ['$rootScope', '$state', '$scope', '$http', 'API_URL', '$log', 'dateFilter', '$window', 'Upload'];
    function SelectErrandController($rootScope, $state, $scope, $http, API_URL, $log, dateFilter, $window, Upload) {
      var vm = this;

      //************************************************
      // errand details
      //************************************************


      vm.addresserror = false;
      vm.detailserror = false;
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

      $rootScope.errand.pick_up_addr = "los angeles";

      vm.autocompleteOptions = {
          componentRestrictions: { country: 'us' },
          types: ['geocode']
      }

       vm.blurAddress = function () {
          if (($rootScope.errand.addr) && ($rootScope.errand.addr.types)) {
              var p = $rootScope.errand.addr;
              for (var i = 0; i < p.address_components.length; i++) {
                  var addressType = p.address_components[i].types[0];
                  if (addressType == "locality") {
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

      vm.blurPickUpAddress = function () {
          var city;
          if (($rootScope.errand.pick_up_addr) && ($rootScope.errand.pick_up_addr.types)) {
              var p = $rootScope.errand.pick_up_addr;
              for (var i = 0; i < p.address_components.length; i++) {
                  var addressType = p.address_components[i].types[0];
                  if (addressType == "locality") {
                      city = p.address_components[i]['long_name'];
                      break;
                  }
              }
              if (!city) {
                  vm.invalidPickUpAddress = true;
                  return;
              }

              $rootScope.errand.pick_up_address = $rootScope.errand.pick_up_addr.formatted_address;
              $rootScope.errand.pick_up_addrlat = $rootScope.errand.pick_up_addr.geometry.location.lat();
              $rootScope.errand.pick_up_addrlng = $rootScope.errand.pick_up_addr.geometry.location.lng();
              vm.invalidPickUpAddress = false;
          } else {
              vm.invalidPickUpAddress = true;
          }
      }

      vm.uploadFile = function (files, category) {
          if (files && files.length) {
              Upload.upload({
                  url: API_URL + '/bclient/tasks/upload_files',
                  data: { file: files, category: category }
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

        $rootScope.$watch('errand.address', function () {
            if ($rootScope.errand.address == undefined) {
                //  vm.addresserror = true;
            } else {
                vm.addresserror = false;
            }
        }, true);
        $rootScope.$watch('errand.pick_up_address', function () {
            if ($rootScope.errand.pick_up_address == undefined) {
                //  vm.addresserror = true;
            } else {
                vm.pick_up_address_error = false;
            }
        }, true);        
        $rootScope.$watch('errand.details', function () {
            if ($rootScope.errand.details == undefined) {
                // vm.detailserror = true;
            } else {
                vm.detailserror = false;
            }
        }, true);
        $rootScope.$watch('errand.item', function () {
            if ($rootScope.errand.item == undefined) {
                // vm.detailserror = true;
            } else {
                vm.item_error = false;
            }
        }, true);

      //*******************************************************
      //select errand
      //*******************************************************

      vm.locations = ['Los Angeles', 'San Diego'];
      vm.frequencies = [];
      var i;
      for (i = 1; i <= 15; i ++) {
        vm.frequencies.push(i);
      }
      vm.datetimeerror = false;
      vm.datetimeerrorShow = false;
      vm.type_iderror = false;
       $scope.minDate = new Date();
      $scope.minDate.setDate($scope.minDate.getDate() - 1);
       $scope.showMeridian = true;
       $scope.disabled = false;

       $scope.stopPropogation=function(){
           jQuery(".pickadate-header").addClass("hii");

       }

      $scope.$watch('date', function () {
          tryCombineDateTime();
      }, true);

      function tryCombineDateTime() {
         var date = new Date($scope.date);
          var mydate = $scope.date.split('-');
          $rootScope.errand.datetime = new Date(mydate[0], date.getMonth(), mydate[2], $rootScope.errand.datetime.getHours(), $rootScope.errand.datetime.getMinutes());

      }

      if ($rootScope.errand.datetime) {
          $rootScope.errand.datetime = new Date($rootScope.errand.datetime);
          $scope.date =  dateFilter($rootScope.errand.datetime, 'yyyy-MM-dd');
      } else {
          $rootScope.errand.datetime = new Date;
          $scope.date =  dateFilter($rootScope.errand.datetime, 'yyyy-MM-dd');

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

      $http.get(API_URL + '/bclient/zoomoffices')
        .then(function(resp) {
          vm.zoomoffices = resp.data;
          $log.log(vm.zoomoffices);
        });

      $rootScope.$watch('errand.datetime', function (event) {
          var currentdate = new Date();
          currentdate.setHours(currentdate.getHours()+1);
          if ($rootScope.errand.datetime < currentdate) {
              vm.datetimeerror = true;
          } else {
              vm.datetimeerrorShow = false;
              vm.datetimeerror = false;
          }
          $scope.showcalendarflag = false;

      }, true);
      $rootScope.$watch('errand.type_id', function () {
          if($rootScope.errand.type_id != undefined){
              vm.type_iderror = false;
          } else {
             // vm.type_iderror = true;
          }
      }, true);
    vm.selectNext = function() {
          $log.log($rootScope.errand);
          vm.datetimeerror = false;
          vm.datetimeerrorShow = false;
          vm.type_iderror = false;
          var count = 0;
          var currentdate = new Date();
          currentdate.setHours(currentdate.getHours()+1);
          if ($rootScope.errand.datetime < currentdate)
          {
              vm.datetimeerror = true;
              vm.datetimeerrorShow = true;
              count++;
          }
          //***************************************************
          //errand details
          //***************************************************

          console.log("$rootScope.errand", $rootScope.errand)
          vm.addresserror = false;
          vm.detailserror = false;

          if ($rootScope.errand.address == undefined)
          {
            count++;
            vm.addresserror = true;
          }

          if ($rootScope.errand.details == undefined ||$rootScope.errand.details == "")
          {
            count++;
            vm.detailserror = true
          }

          if (count == 0)
          {
              $state.go('app.home.postnewerrand.details');
          }

          // if (count == 0) {
          //     $state.go('app.home.postnewerrand.confirm.usehours');
          //   }

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
      $scope.showcalendar = function (status) {
          if (status) {
              $scope.showcalendarflag = true;
          }
          $window.onclick = function (event) {
              $scope.showcalendarstatus = false;
             $scope.$apply();
          };
          if ($scope.showcalendarflag) {
              $scope.showcalendarstatus = true;
          } else {
              $scope.showcalendarstatus = false;
          }
      }

      // vm.next = function() {
      //   console.log('next');
      //   console.log(vm.form);
      // }
    }
})();
