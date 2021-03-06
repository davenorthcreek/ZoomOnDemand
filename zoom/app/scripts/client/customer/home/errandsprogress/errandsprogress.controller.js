
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('ErrandsProgressController', ErrandsProgressController);

    /** @ngInject */
    ErrandsProgressController.$inject = ['$state', '$scope', '$stateParams', '$http', 'API_URL', 'toastr', '$window', 'dateFilter'];
    function ErrandsProgressController($state, $scope, $stateParams, $http, API_URL, toastr, $window, dateFilter) {
      var vm = this;
      vm.datetimeerror = false;
      vm.oneAtATime = true;
      vm.busy = true;
      vm.offset = 0;
      vm.limit = 3;

      $scope.minDate = new Date();
      $scope.minDate.setDate($scope.minDate.getDate() - 1);
      $scope.showMeridian = true;
      $scope.disabled = false;

      $window.scrollTo(0, 0);

      $scope.$watch('vm.date', function () {
          tryCombineDateTime();
      }, true);
      function tryCombineDateTime() {
          if (vm.editing_errand) {
              var date = new Date(vm.date);
              var mydate = vm.date.split('-');
              vm.editing_errand.datetime = new Date(mydate[0], date.getMonth(), mydate[2], vm.editing_errand.datetime.getHours(), vm.editing_errand.datetime.getMinutes());
          }
      }
      $scope.$watch('vm.editing_errand.datetime', function () {
          if (vm.editing_errand) {
              var currentdate = new Date();
              currentdate.setHours(currentdate.getHours()+1);
              if (vm.editing_errand.datetime < currentdate) {
                  vm.datetimeerror = true;
              } else {
                  vm.datetimeerror = false;
              }
          }
          $scope.showcalendarflag = false;
      }, true);

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



      var directionsDisplay;
			var directionsService = new google.maps.DirectionsService();
			var map;
			var marker;

		  directionsDisplay = new google.maps.DirectionsRenderer();
		  var mapOptions = {
		    zoom: 14,
		    center: new google.maps.LatLng(34.0522, 118.2437)
		  }
		  map = new google.maps.Map(document.getElementById("map"), mapOptions);

      $http.get(API_URL + '/all_types')
      .then(function(resp) {
        vm.all_types = resp.data;
      });

      $http.get(API_URL + '/client/tasks/mytasks', {params: { status: 'open', limit: vm.limit, offset: vm.offset }})
      .then(function(resp) {
          vm.errands = resp.data.tasks;
          vm.busy = !resp.data.moredata;
          if (vm.errands && vm.errands.length) {
          	angular.forEach(vm.errands, function(errand, index) {
          		$scope.$watch("vm.errands[" + index + "].is_open", function (newValue, oldValue) {
          			if (newValue) {
              		vm.toggleOpen(index, errand);
          			}
              });
            });
          } else {
            $('#map').hide();
          }
      }, function(resp) {
        vm.busy = true;
      });

      vm.loadMoreErrands = function() {
        vm.busy = true;
        vm.offset += vm.limit;
        $http.get(API_URL + '/client/tasks/mytasks', {params: { status: 'open', limit: vm.limit, offset: vm.offset }})
        .then(function(resp) {
          vm.errands = vm.errands.concat(resp.data.tasks);
          vm.busy = !resp.data.moredata;
          if (resp.data.tasks && resp.data.tasks.length) {
            // for (index=vm.errands.length-resp.data.tasks.length-1; index<vm.errands.length; index++){
            //   $scope.$watch("vm.errands[" + index + "].is_open", function (newValue, oldValue) {
            //     if (newValue) {
            //       vm.toggleOpen(index, errand);
            //     }
            //   });
            // }
            angular.forEach(vm.errands, function(errand, index) {
              $scope.$watch("vm.errands[" + index + "].is_open", function (newValue, oldValue) {
                if (newValue) {
                  vm.toggleOpen(index, errand);
                }
              });
            });
          } else {
            $('#map').hide();
          }
        }, function(resp) {
          vm.busy = true;
        });
      }

      vm.toggleOpen = function(index, errand) {
      	errand.editing = false;

      	if (marker) {
      		marker.setMap(null);
      	}
      	if (errand.type.name == 'Delivery') {
      		directionsDisplay.setMap(map);
				  var request = {
				      origin: new google.maps.LatLng(errand.pick_up_addrlat, errand.pick_up_addrlng),
				      destination: new google.maps.LatLng(errand.addrlat, errand.addrlng),
				      travelMode: google.maps.TravelMode.DRIVING
				  };

				  directionsService.route(request, function(response, status) {
				    if (status == google.maps.DirectionsStatus.OK) {
				      directionsDisplay.setDirections(response);
				    }
				  });
      	} else {
      		directionsDisplay.setMap(null);
      		marker = new google.maps.Marker({
				    position: new google.maps.LatLng(errand.addrlat, errand.addrlng)
				  });
				  marker.setMap(map);
				  map.setCenter(marker.getPosition());
      	}
      	$('#map').appendTo($('.map-container').eq(index));
      }

      vm.repeatEndErrands = function() {
        if (vm.errands && vm.errands.length) {
          if ($stateParams['errand_id']) {
            angular.forEach(vm.errands, function(errand, index) {
              if (errand.id == $stateParams['errand_id']) {
                errand.is_open = true;
              }
            });
          } else {
            vm.errands[0].is_open = true;
          }
        }
      }

      vm.editableErrand = function(errand) {
        return errand.datetime && (new Date(errand.datetime)) > (new Date())
      }

      vm.editErrand = function(errand) {
      	errand.editing = true;
      	vm.editing_errand = angular.copy(errand);
      	if (vm.editing_errand.datetime) {
      	    vm.editing_errand.datetime = new Date(vm.editing_errand.datetime);
      	    vm.date = dateFilter(vm.editing_errand.datetime, 'yyyy-MM-dd');
      	} else {
      	    vm.editing_errand.datetime = new Date;
      	    vm.date = dateFilter(vm.editing_errand.datetime, 'yyyy-MM-dd');
      	}
      	vm.invalidAddress = false;
      	vm.invalidPickUpAddress = false;
      }

      vm.cancelEditingErrand = function(errand) {
      	errand.editing = false;
      }

      vm.saveErrand = function(index, errand) {
      	$http.put(API_URL + '/client/tasks/' + errand.id, {task: vm.editing_errand})
        .then(function(data) {
	      	angular.extend(errand, vm.editing_errand);
	      	errand.editing = false;
	      	vm.toggleOpen(index, errand);
        }, function(data) {
          if (data.data && data.data.alert) {
            toastr.warning(data.data.alert);
          } else {
            toastr.warning("error");
          }
        });
      }

      vm.autocompleteOptions = {
        componentRestrictions: { country: 'us' },
        types: ['geocode']
      }

      vm.blurAddress = function() {
      	var city;
        if ((vm.editing_errand.addr) && (vm.editing_errand.addr.types)) {
          var p = vm.editing_errand.addr;
          for (var i = 0; i < p.address_components.length; i++) {
            var addressType = p.address_components[i].types[0];
            if (addressType=="locality"){
              vm.editing_errand.city = p.address_components[i]['long_name'];
              city = vm.editing_errand.city;
              break;
            }
          }
          if (!city) {
              vm.invalidAddress = true;
              return;
          }

          vm.editing_errand.address = vm.editing_errand.addr.formatted_address;
          vm.editing_errand.addrlat = vm.editing_errand.addr.geometry.location.lat();
          vm.editing_errand.addrlng = vm.editing_errand.addr.geometry.location.lng();
          vm.invalidAddress = false;
        } else {
          vm.invalidAddress = true;
        }
      }

      vm.blurPickUpAddress = function() {
        var city;
        if ((vm.editing_errand.pick_up_addr) && (vm.editing_errand.pick_up_addr.types)) {
          var p = vm.editing_errand.pick_up_addr;
          for (var i = 0; i < p.address_components.length; i++) {
            var addressType = p.address_components[i].types[0];
            if (addressType=="locality"){
              city = p.address_components[i]['long_name'];
              break;
            }
          }
          if (!city) {
              vm.invalidPickUpAddress = true;
              return;
          }

          vm.editing_errand.pick_up_address = vm.editing_errand.pick_up_addr.formatted_address;
          vm.editing_errand.pick_up_addrlat = vm.editing_errand.pick_up_addr.geometry.location.lat();
          vm.editing_errand.pick_up_addrlng = vm.editing_errand.pick_up_addr.geometry.location.lng();
          vm.invalidPickUpAddress = false;
        } else {
          vm.invalidPickUpAddress = true;
        }
      }

      vm.selectedObject = function(selected){
        if (selected != undefined) {
          vm.editing_errand.type_id = selected.originalObject.id;
          vm.editing_errand.type = selected.originalObject;
          console.log(vm.editing_errand);
        }
      }

      vm.setTime = function(newDate, oldDate) {
        console.log('newTime: ' + newDate);
        vm.editing_errand.datetime.setHours(newDate.getHours());
        vm.editing_errand.datetime.setMinutes(newDate.getMinutes());
      }

      vm.setDate = function(newDate, oldDate) {
        vm.editing_errand.datetime.setFullYear(newDate.getFullYear());
        vm.editing_errand.datetime.setMonth(newDate.getMonth());
        vm.editing_errand.datetime.setDate(newDate.getDate());
      }

    }
})();
