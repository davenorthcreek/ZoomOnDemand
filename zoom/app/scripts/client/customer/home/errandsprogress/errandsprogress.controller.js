
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('ErrandsProgressController', ErrandsProgressController);

    /** @ngInject */
    ErrandsProgressController.$inject = ['$state', '$scope', '$http', 'API_URL', 'toastr'];
    function ErrandsProgressController($state, $scope, $http, API_URL, toastr) {
      var vm = this;   

      vm.oneAtATime = true;
        
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

      $http.get(API_URL + '/client/tasks/mytasks', { status: 'open' })
      .then(function(resp) {   
          vm.errands = resp.data.tasks;
      });

      vm.toggleOpen = function(index, errand) {
      	//event.currentTarget
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
        if (vm.errands.length) {
        	vm.errands[0].is_open = true;
        	vm.toggleOpen(0, vm.errands[0]);
        }
      }
    }
})();
