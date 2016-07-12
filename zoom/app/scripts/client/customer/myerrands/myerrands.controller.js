'use strict';

/**
 * @ngdoc function
 * @name zoomApp.controller:MyErrandsController
 * @description
 * # MyErrandsController
 * MyErrandsController of the zoomApp
 */
zoomApp.controller('MyErrandsController', MyErrandsController);
MyErrandsController.$inject = ['$rootScope', '$scope', '$state', '$http', 'moment', 'API_URL', 'toastr', '$window', 'dateFilter'];

function MyErrandsController($rootScope, $scope, $state, $http, moment, API_URL, toastr, $window, dateFilter) {
	
	var vm                   = this;
	vm.orderAgain            = orderAgain;
	vm.editErrandRow         = editErrandRow;
	vm.editErrandType        = editErrandType;
	vm.editErrandDetails 		 = editErrandDetails;
	vm.saveOrder             = saveOrder;

	vm.editing_errand_status = {}
	vm.errand_status_title = { open: 'Active', close: 'Completed', cancel: 'Cancelled'};
	vm.busy = true;
	


	$scope.minDate = new Date();
	//$scope.minDate.setDate($scope.minDate.getDate() - 1);
	$scope.showMeridian = true;
	$scope.disabled = false;
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
	        if (vm.editing_errand.datetime < currentdate) {
	            vm.datetimeerror = true;
	        } else {
	            vm.datetimeerror = false;
	        }
	    }
	}, true);
	$scope.showcalendarstatus = false;
	$scope.showcalendar = function () {
	    $window.onclick = function (event) {
	        $scope.showcalendarstatus = false;
	        $scope.$apply();
	    };
	    $scope.showcalendarstatus = true;
	}








  $http.get(API_URL + '/all_types')
  .then(function(resp) {
    vm.all_types = resp.data; 
  });

  $http.get(API_URL + '/client/tasks/summary')
  .then(function(resp) {
    vm.errands_counts = resp.data; 
  });

  vm.getErrands = function(status, title) {
  	vm.errands_status = status;
		vm.errands_title = vm.errand_status_title[status] || 'All';	
		vm.busy = true;
		vm.offset = 0;
		vm.limit = 10;

    $http.get(API_URL + '/client/tasks/summary')
	  .then(function(resp) {
	    vm.errands_counts = resp.data; 
	  });
	
  	$http.get(API_URL + '/client/tasks/mytasks', {params: { status: vm.errands_status, limit: vm.limit }})
	  .then(function(resp) {   
	    vm.errands = resp.data.tasks;
	    vm.busy = !resp.data.moredata;
	  }, function(resp) {
	  	vm.busy = true;
	  });
  }

  vm.loadMoreErrands = function() {
  	vm.busy = true;
  	vm.offset += vm.limit;
  	$http.get(API_URL + '/client/tasks/mytasks', {params: { status: vm.errands_status, limit: vm.limit, offset: vm.offset }})
	  .then(function(resp) {   
	    vm.errands = vm.errands.concat(resp.data.tasks);
	    vm.busy = !resp.data.moredata;
	  }, function(resp) {
	  	vm.busy = true;
	  });
  }

  vm.editableErrand = function(errand) {
    return errand.datetime && (new Date(errand.datetime)) > (new Date())
  }


  vm.getErrands('open', 'Active');

	function orderAgain(errand) {
		$rootScope.errand = errand;
    $rootScope.errand.task_uploads = {};
    $rootScope.errand.datetime = null;
		$state.go('app.home.postnewerrand');
	}

	function editErrandRow(index, errand) {
		vm.editing_errand = angular.copy(errand);
    if (vm.editing_errand.datetime) {
      vm.editing_errand.datetime = new Date(vm.editing_errand.datetime);  
      vm.date = dateFilter(vm.editing_errand.datetime, 'yyyy-MM-dd');

    } else {
      vm.editing_errand.datetime = new Date;
      vm.date = dateFilter(vm.editing_errand.datetime, 'yyyy-MM-dd');

    }

		vm.editing_errand_status.index = index;
		vm.editing_errand_status.type = index;
		vm.editing_errand_status.details = index;
	}

	function editErrandType(index, errand) {
		vm.editing_errand_status.index = index;
		vm.editing_errand_status.type = index;
		if (vm.editing_errand_status.details != index) {
			vm.editing_errand = angular.copy(errand);
      if (vm.editing_errand.datetime) {
        vm.editing_errand.datetime = new Date(vm.editing_errand.datetime);  
      } else {
        vm.editing_errand.datetime = new Date;
      }
			vm.editing_errand_status.details = null;
		}
	}

	function editErrandDetails(index, errand) {
		vm.editing_errand_status.index = index;
		vm.editing_errand_status.details = index;
		if (vm.editing_errand_status.type != index) {
			vm.editing_errand = angular.copy(errand);
      if (vm.editing_errand.datetime) {
        vm.editing_errand.datetime = new Date(vm.editing_errand.datetime);  
      } else {
        vm.editing_errand.datetime = new Date;
      }
			vm.editing_errand_status.type = null;
		}		
	}

	function saveOrder(index, errand) {
		$http.put(API_URL + '/client/tasks/' + errand.id, {task: vm.editing_errand})
	  .then(function(data) {
	  	angular.extend(errand, data.data);
	  }, function(data) {
	    if (data.data && data.data.alert) {
	      toastr.warning(data.data.alert);
	    } else {
	      toastr.warning("error");
	    }
	  });  
		vm.editing_errand_status.index = null;
		vm.editing_errand_status.type = null;
		vm.editing_errand_status.details = null;
	}

  vm.setDate = function(newDate, oldDate) {
    vm.editing_errand.datetime.setFullYear(newDate.getFullYear());
    vm.editing_errand.datetime.setMonth(newDate.getMonth());
    vm.editing_errand.datetime.setDate(newDate.getDate());
  }

};
